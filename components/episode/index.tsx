import React, { FC, useEffect, useRef, useState, } from "react";
import Player, { Events, Util } from 'xgplayer'
import styles from "@/components/episode/index.module.scss"
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


interface IProps {
    bookInfo: IBookItem;
    recommends: IBookItem[];
    chapterList: IChapterList[];
    chapterName: string;
    currentPage: number;
    isApple: boolean;
}
// 引入视频组件 引入剧集组件 引入相关剧集组件 引入你可能喜欢

const WapEpisode:  FC<IProps> = (
  {
    bookInfo,
    recommends = [],
    currentPage = 1,
    chapterList = [],
    chapterName,
    isApple,
  }
) => {
    const router = useRouter()
    const chapterId = router.query.chapterId as string
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
    const curChapterData = chapterList.find(item => item.id === chapterId ) //&& item.unlock === true
    currentPage = curChapterData?.index as number
    const breadDatas: IBreadcrumb[] = [
      { title: t('home.home'), link: "/" },
      { title: bookInfo.typeTwoNames[0], link: `/browse/${bookInfo.typeTwoIds[0]}` },
      { title: bookInfo.bookName,  link: `/film/${bookInfo.bookId}`},
      { title: chapterList?.[currentPage]?.name },
    ]
    let preChapterData:any //后面再改
    if(curChapterData) {
      preChapterData = chapterList.find(item => curChapterData.index + 1 === item.index )//&& item.unlock === true
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
      if(curId?.unlock === false) {
        setErrorBg(cover as string)
      }
    },[chapterList])
    // 播放器设置
    useEffect(() => {
      // 查找当前视频中下一个有MP4
      playerInstance.current = new Player({
        id: "mPlay",
        icons: {
          play: () => {
            return Util.createDom('div', '<img src="/images/book/play.png" style="width:0.32rem;height:0.32rem" alt=""/>', {}, 'customclass')
          },
          pause: () => {
            return Util.createDom('div', '<img src="/images/book/pause.png" style="width:0.32rem;height:0.32rem" alt=""/>', {}, 'customclass')
          },
          fullscreen: () => {
            return Util.createDom('div', '<img src="/images/book/fullscreen.png" style="width:0.32rem;height:0.32rem" alt=""/>', {}, 'customclass')
          },
          volumeMuted: () => {
            return Util.createDom('div', '<img src="/images/book/muted.png" style="width:0.32rem;height:0.32rem" alt=""/>', {}, 'customclass')
          },
          volumeLarge: () => {
            return Util.createDom('div', '<img src="/images/book/voice.png" style="width:0.32rem;height:0.32rem" alt=""/>', {}, 'customclass')
          },
        },
        autoplay: true,
        autoplayMuted: false,
        url: curChapterData?.mp4,
        width:'100%',
        height:'100%',
        videoFillMode: "fillHeight",
        playsinline: true,
        ignores:['playbackRate'],
        cssFullscreen:false,
      })
      // 播放
      playerInstance.current.on(Events.PLAY, () => {})
      // EVENTS.ENDED 结束播放,播放完后
      playerInstance.current.on(Events.ENDED, () => {
        if(preChapterData) {
          router.replace(`/episode/${bookInfo.bookId}/${preChapterData.id}`,undefined)
        }
        playerInstance.current.playNext({
          url: preChapterData?.mp4,
        })
      })
    },[curChapterData])

    // 点击右侧全部剧集，选择播放剧集
    const chooseEpisode = (item: IChapterList) => {
      setErrorBg(item.unlock ? '' : item.cover)
      if(item.unlock) {
        playerInstance.current&&playerInstance.current.switchURL(item.mp4)
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
                <p className={styles.downTip}>This episode needs to be downloaded to watch</p>
                <div className={styles.btnDown}>
                  <div>Download the App</div>
                </div>
              </div>
            </div> : null}
          </div>
          <div className={styles.videoIntro}>
            <p className={styles.videoTit}>{bookInfo.bookName} {currentPage + 1}</p>
            <div className={styles.videoScore}>
              <Image
                className={styles.epoImg}
                onError={onImgError}
                width={40}
                height={40}
                src='/images/book/start-m.png'
                alt='photo'
              />
              <p className={styles.epoScore}>{bookInfo.chapterCount}</p>
            </div>
            {
              bookInfo?.typeTwoList && bookInfo.typeTwoList.length > 0 ?
                <div className={styles.videoTag}>
                {(bookInfo?.typeTwoList || []).slice(0, 5).map((val,ind) => {
                  return <Link key={ind} href={`/browse/${val.id}`} className={styles.tagItem}>{val}</Link>
                })}
              </div> : null
            }
            <Ellipsis
              rows={2}
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
              content={bookInfo.introduction} />
          </div>
        </div>
        <div  className={styles.epiList}>
            <div className={styles.titleList}>
              <p className={styles.titleLeft}>{t('bookInfo.episodeList')}</p>
              <p className={styles.titleRight}>({chapterList&&chapterList.length} {t('bookInfo.episodes')})</p>
            </div>
            <div className={styles.epilistBox}>
              {
                chapterList&&chapterList.slice(0,9).map((chapterItem) => {
                  return <div className={styles.epiOuter} key={chapterItem.id}>
                    <Link href={`/episode/${bookInfo.bookId}/${chapterItem.id}`} shallow>
                      <div className={chapterItem.unlock ? styles.epiItem : styles.epiItemMask} onClick={() => {chooseEpisode(chapterItem)}}>
                        <p>{chapterItem.index + 1}</p>
                      </div>
                    </Link>
                  </div>
                })
              }
              {
                chapterList&&chapterList.length>9 ? <div className={styles.epiOuter}>
                  <div className={styles.epiItem} onClick={() => {showEpisodeDialog()}}>
                    <p>{t('home.more')}</p>
                  </div>
                </div> : null
              }

            </div>
        </div>
        <div className={styles.mightLike} style={recommends?.length>0 ? {} : {display:'none'}}>
          <LikeTitle title={t('bookInfo.recLike')}/>
          <LikeItem dataSource={recommends || []}/>
        </div>
        <div className={styles.navBox}>
          <div className={styles.episodesIcon} onClick={() => {showEpisodeDialog()}}>
            <Image
              className={styles.navIcon}
              width={64}
              height={64}
              src={'/images/book/episode-d.png'}
              alt={'more'}
            />
            {/* <span>{t('home.privacyPolicy')}</span> */}
            <span>{t('bookInfo.episodes')}</span>
          </div>
          <Link href={`/episode/${bookInfo.bookId}/${curChapterData?.id}`} className={styles.playIcon}>
            <Image
              className={styles.navIcon}
              width={64}
              height={64}
              src={'/images/book/botplay-d.png'}
              alt={'more'}
            />
            {/* <span>{t('home.termsOfUse')}</span> */}
            <span className={styles.playTxt}>{t('home.play')}</span>
          </Link>
          <Link href={shopLink} className={styles.downloadIcon} onClick={() => {
            onCopyText(copyText, () => {
              netIpUa(clipboard)
              HiveLog.trackDownload('turnPage_click', { book_ID: bookInfo.bookId, chapter_id: 0 })
            })
          }}>
            <Image
              className={styles.navIcon}
              width={64}
              height={64}
              src={'/images/book/download-d.png'}
              alt={'more'}
            />
            {/* <span>{t('home.termsOfUse')}</span> */}
            <span>{t('appPage.download')}</span>
          </Link>
        </div>
      </div>
      <EpisopeDialog
        bookInfo={bookInfo}
        chapterList={chapterList}
        closeDialog={closeEpisodeDialog}
        chapterName={chapterName}
        showDialog={showDialog}/>
    </>
  }

  export default WapEpisode
