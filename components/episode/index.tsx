import React, { FC, useEffect, useRef, useState, SyntheticEvent} from "react";
import Player, { Events } from 'xgplayer';
import 'xgplayer/dist/index.min.css';
import Link from "next/link";
import Image from "next/image";
import { onImgError } from "@/components/common/image/ImageCover";
import { useAppSelector } from "@/store";
import ClientConfig from "@/client.config";
import useHiveLog from "@/hooks/useHiveLog";
import { netIpUa } from "@/server/clientLog";
import { IBookItem, IChapterList } from "@/typings/home.interface";
import { useRouter } from "next/router";
import EpisopeDialog from '@/components/episode/episopeDialog/EpisopeDialog';
import { onCopyText } from "@/utils/copy";
import Breadcrumb, { IBreadcrumb } from "@/components/common/breadcrumb";
import LikeTitle from "@/components/film/likeTitle/LikeTitle";
import LikeItem from "@/components/film/likeItem/LikeItem";
import { useTranslation } from "next-i18next";
import { Ellipsis } from "antd-mobile";
import EpisodeNav from "@/components/episode/episodeNav/EpisodeNav";
import styles from "@/components/episode/index.module.scss";

interface IProps {
  bookInfo: IBookItem;
  recommends: IBookItem[];
  chapterList: IChapterList[];
  currentPage: number;
  isApple: boolean;
  onBookClick: (book: IBookItem) => void;
  onChannel: (name: string, e?: SyntheticEvent) => void;
}

const WapEpisode: FC<IProps> = (
  {
    bookInfo,
    recommends = [],
    currentPage = 1,
    chapterList = [],
    isApple,
    onBookClick,
    onChannel
  }
) => {
  const router = useRouter()
  const chapterId = router.query.chapterId as string || chapterList[0].id
  const playerInstance = useRef<Player>({} as Player);
  const [showDialog, setEpiDialog] = useState(false);//展示所有剧集的弹框
  const [errorBgsrc, setErrorBg] = useState('')
  const clipboard = useAppSelector(state => state.hive.clipboard)
  const copyText = useAppSelector(state => state.hive.copyText);
  const shopLink = useAppSelector(state => {
    if (isApple) {
      return ClientConfig.ios.deeplink + state.hive.copyText;
    }
    return ClientConfig.android.link;
  });
  const { t } = useTranslation();
  const HiveLog = useHiveLog();

  // 根据剧集id，查询对应的第几集，如果没有剧集id，就默认去第一集
  const curChapterData = chapterList.find(item => item.id === chapterId) || chapterList[0]
  currentPage = curChapterData?.index as number;
  const breadDatas: IBreadcrumb[] = [
    { title: t('home.home'), link: "/" },
    { title: bookInfo.typeTwoNames[0], link: `/browse/${bookInfo.typeTwoIds[0]}` },
    { title: bookInfo.bookName, link: `/film/${bookInfo.bookId}` },
    { title: `${t("bookInfo.first")} ${currentPage + 1} ${t("bookInfo.episode")}`},
  ]
  let preChapterData: any //后面再改
  if (curChapterData) {
    preChapterData = chapterList.find(item => curChapterData.index + 1 === item.index)//&& item.unlock === true
  }
  const closeEpisodeDialog = () => {
    setEpiDialog(false)
  }
  // 展示剧集弹框
  const showEpisodeDialog = () => {
    setEpiDialog(true)
  }
  useEffect(() => {
    const curId = chapterList.find(item => item.id === chapterId)
    const cover = curId?.cover
    if (curId?.unlock === false) {
      setErrorBg(cover as string)
    }
  }, [chapterList])
  // 播放器设置
  useEffect(() => {
    // 查找当前视频中下一个有MP4
    playerInstance.current = new Player({
      id: "mPlay",
      autoplay: true,
      autoplayMuted: false,
      url: curChapterData?.mp4,
      width: '100%',
      height: '100%',
      videoFillMode: "fillHeight",
      playsinline: true,
      ignores: ['playbackRate'],
      cssFullscreen: false,
    })
    // 播放
    playerInstance.current.on(Events.PLAY, () => {
    })
    // EVENTS.ENDED 结束播放,播放完后
    playerInstance.current.on(Events.ENDED, () => {
      if (preChapterData) {
        router.replace(`/episode/${bookInfo.bookId}/${preChapterData.id}`, undefined)
      }
      playerInstance.current.playNext({
        url: preChapterData?.mp4,
      })
    })
    return () => {
      playerInstance && playerInstance.current && playerInstance.current.destroy()
    }
  }, [curChapterData])

  // 点击右侧全部剧集，选择播放剧集
  const chooseEpisode = (item: IChapterList) => {

    setErrorBg(item.unlock ? '' : item.cover)
    if (item.unlock) {
      playerInstance.current && playerInstance.current.switchURL(item.mp4)
    }
  }

  return <>
    <div className={styles.episodeHeader}>
      <Breadcrumb data={breadDatas} isWap={true}/>
    </div>
    <div className={styles.mEpibox}>
      <div className={styles.videoContainer}>
        <div className={styles.videoArea}>
          <div id='mPlay' className={styles.videoPlace}/>
          {errorBgsrc ? <div className={styles.downloads}>
            <Image
              className={styles.errBg}
              width={360}
              height={563}
              src={errorBgsrc}
              alt=''/>
            <div className={styles.downInfo}>

              <Link href={shopLink} className={styles.btnDown} onClick={() => {
                onCopyText(copyText, () => {
                  netIpUa(clipboard)
                  HiveLog.trackDownload('PayChapterDownload_click', {
                    bookId: bookInfo.bookId,
                    bookName: bookInfo.bookName,
                    chapterId: chapterList?.[currentPage]?.id,
                    chapterName: chapterList?.[currentPage]?.name,
                  })
                })
              }}>
                {t('bookInfo.episodesDownload')}
              </Link>
            </div>
          </div> : null}
        </div>
        <div className={styles.videoIntro}>
          <h1 className={styles.videoTit}>
            {`${bookInfo.bookName} ${t("bookInfo.first")} ${currentPage + 1} ${t("bookInfo.episode")}`}
          </h1>
          <div className={styles.videoScore}>
            <Image
              className={styles.epoImg}
              onError={onImgError}
              width={40}
              height={40}
              src='/images/book/start-m.png'
              alt=''
            />
            <p className={styles.epoScore}>{bookInfo.followCount}</p>
          </div>
          {
            bookInfo?.typeTwoList && bookInfo.typeTwoList.length > 0 ?
              <div className={styles.videoTag}>
                {(bookInfo?.typeTwoList || []).slice(0, 5).map((val, ind) => {
                  return <Link
                    onClick={(e) => onChannel(val.name, e)}
                    key={ind}
                    href={`/browse/${val.id}`}
                    className={styles.tagItem}>{val.name}</Link>
                })}
              </div> : null
          }
          <Ellipsis
            rows={3}
            className={styles.introText}
            direction='end'
            expandText={
              <span className={styles.expand}>
                {t("home.more")}
                <Image
                  className={styles.moreIcon}
                  width={24}
                  height={24}
                  src={'/images/episode/wap-more.png'}
                  alt={''}
                />
              </span>
            }
            collapseText={<span className={styles.retract}>
                <Image
                  className={styles.moreIcon}
                  width={24}
                  height={24}
                  src={'/images/episode/wap-more.png'}
                  alt={''}
                />
              </span>}
            content={bookInfo.introduction}/>
        </div>
      </div>
      <div className={styles.epiList}>
        <div className={styles.titleList}>
          <p className={styles.titleLeft}>{t('bookInfo.episodeList')}</p>
          <p className={styles.titleRight}>({chapterList && chapterList.length} {t('bookInfo.episodes')})</p>
        </div>
        <div className={styles.epilistBox}>
          {
            chapterList && chapterList.slice(0, 9).map((chapterItem) => {
              return <div className={styles.epiOuter} key={chapterItem.id}>
                <Link href={`/episode/${bookInfo.bookId}/${chapterItem.id}`} shallow>
                  <span className={chapterItem.unlock ? styles.epiItem : styles.epiItemMask} onClick={() => {
                    chooseEpisode(chapterItem)
                  }}>
                    <span>{chapterItem.index + 1}</span>
                  </span>
                </Link>
              </div>
            })
          }
          {
            chapterList && chapterList.length > 9 ? <div className={styles.epiOuter}>
              <div className={styles.epiItem} onClick={() => {
                showEpisodeDialog()
              }}>
                <p>{t('home.more')}</p>
              </div>
            </div> : null
          }
        </div>
      </div>
      {recommends.length > 0 ? <div className={styles.mightLike}>
        <LikeTitle title={t('bookInfo.recLike')}/>
        <LikeItem dataSource={recommends} onBookClick={onBookClick} onChannel={onChannel}/>
      </div> : null}
      <EpisodeNav
        isApple={isApple}
        bookInfo={bookInfo}
        chapterId={curChapterData?.id}
        showEpisodeDialog={showEpisodeDialog}
      />
    </div>
    <EpisopeDialog
      bookInfo={bookInfo}
      chapterList={chapterList}
      closeDialog={closeEpisodeDialog}
      showDialog={showDialog}/>
  </>
}

export default WapEpisode
