import React, {FC, useEffect, useState, } from "react";
import Player,{ Events } from 'xgplayer';
import 'xgplayer/dist/index.min.css';
import Link from "next/link";
import Image from "next/image";
import { onImgError } from "@/components/common/image/ImageCover";
import { useTranslation } from "next-i18next";
import { IBookItem, IChapterList } from "@/typings/home.interface";
import { useRouter } from "next/router";
import PcLike from '@/components/pcDetail/pcLike';
import Breadcrumb, { IBreadcrumb } from "@/components/common/breadcrumb";
import styles from "@/components/pcEpisode/index.module.scss";

interface IProps {
  bookInfo: IBookItem;
  recommends: IBookItem[];
  chapterList: IChapterList[];
  chapterName: string;
  currentPage: number;
  breadData: IBreadcrumb[];
}
// 引入视频组件 引入剧集组件 引入相关剧集组件 引入你可能喜欢

const PcEpisode:  FC<IProps> = (
  {
    bookInfo,
    recommends = [],
    chapterList = [],
    currentPage = 1,
    breadData,
  } ) => {
  const { t } = useTranslation()
    const router = useRouter()
    const { id } = router.query
    const chapterId = router.query.chapterId as string
    const [currentEpi, setCurEpisode] = useState(0)
    const [relateComputeEpi, setComputedEpi] = useState(chapterList)//相关剧集，点击第三集，相关剧集展示 4 5 6 7 8...集
    const [playerInstace, setIns] = useState<any>()
    const [curClickInd, setClickIndex] = useState(0)
    const [recordCurEpi, setrecordCurEpi] = useState<object>()
    const [errorBgsrc, setErrorBg] = useState('')
    // 根据剧集id，查询对应的第几集，如果没有剧集id，就默认去第一集
    const curChapterData = chapterList.find(item => item.id === chapterId ) //&& item.unlock === true
    currentPage = curChapterData?.index as number
    let preChapterData:any //后面再改
    if(curChapterData) {
      preChapterData = chapterList.find(item => curChapterData.index + 1 === item.index )//&& item.unlock === true
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
      playIns = new Player({
        id: "playVideo",
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
          router.replace(`/episode/${id}/${preChapterData.id}`,undefined)
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
      setComputedEpi(newArr)
    }
    return <main className={styles.episodeWrap}>
      <div className={styles.episodeHeader}>
        <Breadcrumb data={breadData} />
      </div>

      <div className={styles.videoBox}>
        <div className={styles.leftVideo}>
          <div className={styles.videoContainer}>
            <div id="playVideo"></div>
            <div className={styles.downloads} style={errorBgsrc ? {} : {display:'none'}}>
              {
                errorBgsrc?  <Image
                className={styles.errBg}
                width={398}
                height={708}
                src={errorBgsrc}
                alt='photo'/>:
                null
              }
              <div className={styles.downInfo}>
                <p  className={styles.downTip}>This episode needs t0 be downloaded to watch</p>
                <div className={styles.btnDown}>Download the App to continue watching</div>
              </div>
            </div>
          </div>
          <div className={styles.videoInfo}>
            <p className={styles.videoTitle}>{bookInfo.bookName} {currentPage + 1}</p>
            <p className={styles.videoStar}>
              <Image
                className={styles.imageStar}
                src = '/images/book/star-d.png'
                width={24}
                height={24}
                alt="star"
              />
              <span className={styles.videoScore}>{bookInfo.chapterCount}K</span>
            </p>
            <p className={styles.videoDesc}>{bookInfo.introduction}</p>
          </div>
          <div className={styles.tagBox}>
            {(bookInfo?.tags || []).slice(0, 2).map(val => {
              return <div key={val} className={styles.tagItem}>{val}</div>
            })}
          </div>
        </div>
        {/* 视频右侧所有剧集 */}
        <div className={styles.eposipeAll}>
          <div className={styles.eposipeTop}>
            <p className={styles.eposipeTit}>Episodes</p>
            <p className={styles.eposipeCur}>({currentPage + 1}/{bookInfo.chapterCount})</p>
          </div>
          <div className={styles.allEpo}>
            {
              chapterList.map((item,ind) => {
                return <div className={item.unlock ? styles.listItem : styles.listItemMask} key={item.id} onClick={() => {chooseEpisode(item)}}>
                  <Link href={`/episode/${id}/${item.id}`} shallow>
                    <div className={styles.imgItem}>
                      <Image
                        className={styles.EpoItem}
                        onError={onImgError}
                        placeholder="blur"
                        blurDataURL={'/images/defaultFilm.png'}
                        width={88}
                        height={89}
                        src={item.cover}
                        alt='photo'
                      />
                    </div>
                    <p className={styles.linkText}>{item.name}</p>
                  </Link>
                </div>
              })
            }
          </div>
        </div>
      </div>
      {/* 相关剧集 */}
      <div className={styles.relatedEpisode}>
        <div className={styles.relatedTitle}>Related Episodes</div>
        <div className={styles.relatedEpo}>
          {
            relateComputeEpi.map((item,ind) => {
              return <div className={styles.listBox} key={item.id} onClick={() => {chooseEpisode(item)}}>
                <div className={item.unlock ? styles.listItem : styles.listItemMask}>
                  <Link href={`/episode/${id}/${item.id}`} className={styles.imgLeft} shallow replace>
                    <Image
                      className={styles.imageItem}
                      onError={onImgError}
                      placeholder="blur"
                      blurDataURL={'/images/defaultFilm.png'}
                      width={88}
                      height={117}
                      src={item.cover}
                      alt={item.name}
                    />
                  </Link>
                  <Link href={`/episode/${id}/${item.id}`} className={styles.rightIntro} shallow replace>
                    <p className={styles.title}>{bookInfo.bookName}</p>
                    <p className={styles.pageNum}>{item.name}</p>
                  </Link>
                </div>
          </div>
            })
          }
        </div>
      </div>
      <PcLike dataSource={recommends}/>
    </main>
  }

  export default PcEpisode
