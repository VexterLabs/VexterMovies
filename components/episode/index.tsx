import React, {FC, useEffect, useState, } from "react";
import Player,{ Events, Util } from 'xgplayer'
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
import EpisopeDialog from '@/components/layout/episopeDialog/EpisopeDialog';
import { onCopyText } from "@/utils/copy";
import Breadcrumb, { IBreadcrumb } from "@/components/common/breadcrumb";
import LikeTitle from "@/components/film/likeTitle/LikeTitle";
import LikeItem from "@/components/film/likeItem/LikeItem";
import { useTranslation } from "next-i18next";


interface IProps {
    bookInfo: IBookItem;
    recommends: IBookItem[];
    chapterList: IChapterList[];
    chapterName: string;
    currentPage: number;
    isApple: boolean;
  breadData: IBreadcrumb[];
}
// 引入视频组件 引入剧集组件 引入相关剧集组件 引入你可能喜欢

const WapEpisode:  FC<IProps> = (
  {
    bookInfo,
    recommends = [],
    chapterList = [],
    currentPage = 1,
    chapterName,
    isApple,
    breadData
  }
) => {
    const router = useRouter()
    const { id } = router.query
    const chapterId = router.query.chapterId as string
    const [currentEpi, setCurEpisode] = useState(0)
    const [playerInstace, setIns] = useState<any>()
    const [curClickInd, setClickIndex] = useState(0)
    const [recordCurEpi, setrecordCurEpi] = useState<object>()
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

    const {
      bookId,
      bookName,
      introduction
    } = bookInfo;
    // 根据剧集id，查询对应的第几集，如果没有剧集id，就默认去第一集
    const curChapterData = chapterList.find(item => item.id === chapterId ) //&& item.unlock === true
    currentPage = curChapterData?.index as number
    const breadDatas: IBreadcrumb[] = [
      { title: t('home.home'), link: "/" },
      { title: bookInfo.typeTwoNames[0], link: `/browse/${bookInfo.typeTwoIds[0]}` },
      { title: bookInfo.bookName,  link: `/film/${bookInfo.bookId}`},
      { title: currentPage + 1},
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
      const ind = curId?.index
      const curIUrl = curId?.mp4
      setCurEpisode(ind as number)
      dealReaEpi(ind as number)
      const cover = curId?.cover
      if(curId?.unlock === false) {
        setErrorBg(cover as string)
      }
    },[chapterList])
    let playIns: any;
    // 播放器设置
    useEffect(() => {
      // 查找当前视频中下一个有MP4
      playIns = new Player({
        id: "mPlay",
        icons: {
          play: () => {
            const dom = Util.createDom('div', '<img src="/images/book/play.png" style="width:0.32rem;height:0.32rem"/>', {}, 'customclass')
            return dom
          },
          pause: () => {
            const dom = Util.createDom('div', '<img src="/images/book/pause.png" style="width:0.32rem;height:0.32rem"/>', {}, 'customclass')
            return dom
          },
          fullscreen: () => {
            const dom = Util.createDom('div', '<img src="/images/book/fullscreen.png" style="width:0.32rem;height:0.32rem"/>', {}, 'customclass')
            return dom
          },
          volumeMuted: () => {
            const dom = Util.createDom('div', '<img src="/images/book/muted.png" style="width:0.32rem;height:0.32rem"/>', {}, 'customclass')
            return dom
          },
          volumeLarge: () => {
            const dom = Util.createDom('div', '<img src="/images/book/voice.png" style="width:0.32rem;height:0.32rem"/>', {}, 'customclass')
            return dom
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
      setIns(playIns)//保存播放器实例
      // 播放
      playIns.on(Events.PLAY, () => {})
      // EVENTS.ENDED 结束播放,播放完后
      playIns.on(Events.ENDED, () => {
        dealReaEpi(preChapterData?.index)
        if(preChapterData) {
          router.replace(`/episode/${bookInfo.bookId}/${preChapterData.id}`,undefined)
        }
        playIns.playNext({
          url: preChapterData?.mp4,
        })
      })
    },[curChapterData])
    // 切换短剧
    const switchVideo = (url: any) => {
      playerInstace&&playerInstace.switchURL(url?.mp4)
    }
    // 点击右侧全部剧集，选择播放剧集
    const chooseEpisode = (item: any) => {
      const curInd = item.index
      dealReaEpi(curInd)
      setCurEpisode(curInd)
      setClickIndex(item.index)//保存当前用户点击的index，防止用户重复点击用
      // if(curClickInd === item.index) {
      //   return
      // }
      if(item.unlock === false) {
        setErrorBg(item.cover)
      } else {
        setErrorBg('')
      }
      if(item.unlock === false) {//当前剧集已锁
        return
      }
      switchVideo(item)
    }
    // 计算点击剧集后应该展示的相关剧集目录
    const dealReaEpi = (index:number) => {
      let newArr = [] as any
      if(chapterList && chapterList.length > 18) {
        newArr = chapterList.slice(index+1)
        let len = newArr.length
        if(len < 18) {
          let rangLen = 18 - len
          newArr = newArr.concat(chapterList.slice(0,rangLen))
        } else if(len > 18) {
          newArr = newArr.slice(0,18)
        } else {
          newArr = chapterList
        }
      } else {
        newArr = chapterList
      }
    }
    return <>
      <div className={styles.episodeHeader}>
        <Breadcrumb data={breadDatas} isWap={true}/>
      </div>
      <div className={styles.mEpibox}>
        <div className={styles.videoContainer}>
          <div className={styles.videoArea}>
            <div id='mPlay' className={styles.videoPlace}></div>
            <div className={styles.downloads} style={errorBgsrc ? {} : {display:'none'}}>
              {
                errorBgsrc?  <Image
                className={styles.errBg}
                width={360}
                height={563}
                src={errorBgsrc}
                alt='photo'/>:
                null
              }
              <div className={styles.downInfo}>
                <p className={styles.downTip}>This episode needs t0 be downloaded to watch</p>
                <div className={styles.btnDown}>
                  <div>Download the App</div>
                </div>
              </div>
            </div>
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
              <p className={styles.epoScore}>{bookInfo.chapterCount}K</p>
            </div>
            {
              bookInfo?.tags && bookInfo.tags.length > 0 ?
                <div className={styles.videoTag}>
                {(bookInfo?.tags || []).slice(0, 5).map((val,ind) => {
                  return <div key={ind} className={styles.tagItem}>{val}</div>
                })}
              </div> : null
            }
            <div className={styles.videoDesc}>
              <p>{bookInfo.introduction}</p>
            </div>
          </div>
        </div>
        <div  className={styles.epiList}>
            <div className={styles.titleList}>
              <p className={styles.titleLeft}>{t('bookInfo.episodeList')}</p>
              <p className={styles.titleRight}>({chapterList&&chapterList.length} {t('bookInfo.episodes')})</p>
            </div>
            <div className={styles.epilistBox}>
              {
                chapterList&&chapterList.slice(0,9).map((chapterItem,chapterIndex) => {
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
          {/* <LikeTitle title={t(item.name)} href={`/more/${ColumnNameRoute[item.name]}`}/> */}
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
              HiveLog.trackDownload('turnPage_click', { book_ID: bookId, chapter_id: 0 })
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
        showDialog={showDialog}></EpisopeDialog>
    </>
  }

  export default WapEpisode
