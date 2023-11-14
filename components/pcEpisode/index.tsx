import React, { FC, useEffect, useRef, useState } from "react";
import Player, { Events } from 'xgplayer';
import 'xgplayer/dist/index.min.css';
import Image from "next/image";
import { ELanguage, IBookItem, IChapterList } from "@/typings/home.interface";
import { useRouter } from "next/router";
import Breadcrumb, { IBreadcrumb } from "@/components/common/breadcrumb";
import RightList from "@/components/pcEpisode/rightList/RightList";
import RelatedEpisode from "@/components/pcEpisode/relatedEpisode";
import PcLike from '@/components/pcFilm/pcLike';
import { Ellipsis } from "antd-mobile";
import useHiveLog from "@/hooks/useHiveLog";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import styles from "@/components/pcEpisode/index.module.scss";

interface IProps {
  bookInfo: IBookItem;
  recommends: IBookItem[];
  chapterList: IChapterList[];
  current: number;
  onBookClick: (book: IBookItem) => void;
  onChannel: (name: string) => void;
}

const PcEpisode: FC<IProps> = (
  {
    bookInfo,
    recommends = [],
    chapterList = [],
    current = 0,
    onBookClick,
    onChannel,
  }) => {

  const { t } = useTranslation();
  const HiveLog = useHiveLog();
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(current);
  const playerInstance = useRef<Player>({} as Player);
  const episodeIndex = useRef(current);
  const [errorBgsrc, setErrorBg] = useState('')
  const breadDatas: IBreadcrumb[] = [
    { title: t('home.home'), link: "/" },
    { title: bookInfo.typeTwoNames[0], link: `/browse/${bookInfo.typeTwoIds[0]}` },
    { title: bookInfo.bookName, link: `/film/${bookInfo.bookId}` },
    { title: router.locale === ELanguage.English ? `${t("bookInfo.episode")} ${currentPage + 1}` : `${currentPage + 1} ${t("bookInfo.episodes")}`},
  ]
  // 根据剧集id，查询对应的第几集，如果没有剧集id，就默认去第一集s
  useEffect(() => {
    currentPage === -1 && setCurrentPage(0)
    const curId = chapterList.find((item, index) => index === currentPage) || chapterList[0]
    const cover = curId?.cover
    if (curId?.unlock === false) {
      setErrorBg(cover as string)
    }


  }, [chapterList]);


  // 播放器设置
  useEffect(() => {
    playerInstance.current = new Player({
      id: "playVideo",
      autoplay: true,
      autoplayMuted: false,
      url: currentPage === -1 ? chapterList[0]?.mp4 : chapterList[currentPage]?.mp4,
      width: '100%',
      height: '100%',
      videoFillMode: "fillHeight",
      playsinline: true,
      ignores: ['playbackRate'],
      cssFullscreen: false,
    })

    if (playerInstance.current) {
      // 播放
      playerInstance.current.on(Events.PLAY, () => {
      })
      // EVENTS.ENDED 结束播放,播放完后
      playerInstance.current.on(Events.ENDED, () => {
        const nextChapter = chapterList[episodeIndex.current + 1];
        if (nextChapter) {
          router.replace(`/episode/${bookInfo.bookId}/${nextChapter.id}`, undefined, { shallow: true });
          setCurrentPage(prevState => prevState + 1);
          episodeIndex.current += 1;
          if (nextChapter.mp4 && nextChapter.unlock) {
            playerInstance.current.playNext({
              url: nextChapter.mp4
            })
          } else {
            setErrorBg(nextChapter.cover)
          }
        }
      })
    }
  }, []);

  // 点击右侧全部剧集，选择播放剧集
  const chooseEpisode = async (index: number,id: string) => {
    // 根据点击剧集的id，查找对应的index
    const tempCurInd = chapterList.find(item => item.id === id)?.index as number || 0
    setCurrentPage(tempCurInd == -1 ? 0 : tempCurInd);
    episodeIndex.current = tempCurInd;
    const item = chapterList[tempCurInd];
    !item.unlock && playerInstance && playerInstance.current.pause();//视频切换，暂停播放
    setErrorBg(item.unlock ? '' : item.cover)

    if (!item.unlock) return
    if (playerInstance.current) {
      playerInstance.current.currentTime = 0;
      await playerInstance.current.switchURL(item?.mp4, { seamless: true, currentTime: 0 });
      playerInstance.current.play();
    }
  }

  return <main className={styles.episodeWrap}>
    <div className={styles.episodeHeader}>
      <Breadcrumb data={breadDatas}/>
    </div>

    <div className={styles.videoBox}>
      <div className={styles.leftVideo}>
        <div className={styles.videoContainer}>
          <div id="playVideo"/>
          {errorBgsrc ? <div className={styles.downloads}>
            <Image
              className={styles.errBg}
              width={398}
              height={708}
              src={errorBgsrc}
              alt='photo'/>
            <div className={styles.downloadMark}/>
          </div> : null}
          {
            errorBgsrc ? <Link href={`/download?filmId=${bookInfo.bookId}`} className={styles.downInfo} onClick={() => {
              HiveLog.trackDownload('PayChapterDownload_click', {
                bookId: bookInfo.bookId,
                bookName: bookInfo.bookName,
                chapterId: chapterList?.[currentPage]?.id,
                chapterName: chapterList?.[currentPage]?.name,
              })
            }}>
            <div className={styles.btnDown}>{t('bookInfo.episodesDownload')}</div>
          </Link> : null}
        </div>

        <div className={styles.videoInfo}>
          <h1 className={styles.videoTitle}>
            {bookInfo.bookName +  (router.locale === ELanguage.English ? ` ${t("bookInfo.episode")} ${currentPage + 1}` : ` ${currentPage + 1} ${t("bookInfo.episodes")}`)}
          </h1>
          <p className={styles.videoStar}>
            <Image
              className={styles.imageStar}
              src={'/images/book/star-d.png'}
              width={24}
              height={24}
              alt="star"
            />
            <span className={styles.videoScore}>{bookInfo.chapterCount}</span>
          </p>

          <Ellipsis
            rows={1}
            className={styles.videoDesc}
            expandText={
              <span className={styles.extend}>
                {t('home.more')}
                <Image
                  className={styles.moreIcon}
                  width={16}
                  height={16}
                  src={'/images/episode/more.png'}
                  alt={''}
                />
              </span>
            }
            collapseText={
              <span className={styles.retract}>
                 <Image
                   className={styles.moreIcon}
                   width={16}
                   height={16}
                   src={'/images/episode/more.png'}
                   alt={''}
                 />
              </span>
            }
            content={bookInfo.introduction}/>
          <div className={styles.tagBox}>
            {(bookInfo?.typeTwoList || []).slice(0, 2).map(val => {
              return <Link
                onClick={() => onChannel(val.name)}
                key={val.id} href={`/browse/${val.id}`}
                className={styles.tagItem}>{val.name}</Link>
            })}
          </div>
        </div>
      </div>

      {/* 视频右侧所有剧集 */}
      <RightList
        chapterList={chapterList}
        current={currentPage}
        bookId={bookInfo.bookId}
        onChooseEpisode={chooseEpisode}/>
    </div>
    {/* 相关剧集 */}
    <div className={styles.bottomBox}>
      {chapterList.length > 0 ?
        <RelatedEpisode
          chapterList={chapterList}
          current={currentPage}
          bookInfo={bookInfo}
          onChooseEpisode={chooseEpisode}/> : null}

      <PcLike dataSource={recommends} onBookClick={onBookClick} onChannel={onChannel}/>
    </div>
  </main>
}

export default PcEpisode;
