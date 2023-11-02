import React, {FC, useEffect, useState} from "react";
import Player,{ Events } from 'xgplayer'
import styles from "@/components/pcEpisode/index.module.scss"
import 'xgplayer/dist/index.min.css';
import Link from "next/link";
import Image from "next/image";
import { onImgError } from "@/components/common/image/ImageCover";
import { PcEmpty } from "@/components/common/empty";
import { useTranslation } from "next-i18next";
import { IBookItemDetail, IChapterList } from "@/typings/home.interface";
import { useRouter } from "next/router";

interface IProps {
    bookInfo: IBookItemDetail;
    recommends: IBookItemDetail[];
    chapterList: IChapterList[];
    chapterName: string;
}
// 引入视频组件 引入剧集组件 引入相关剧集组件 引入你可能喜欢

const VideoPlayer:  FC<IProps> = (bookInfo, recommends = [],chapterList = [] ) => {
    console.log('chapterList', chapterList)
    const [url, setUrl] = useState('')
    const router = useRouter()
    useEffect(() => {
      console.log('url', url)
      let playIns: any;
      setTimeout(() => {
        playIns = new Player({
          id: "playVideo",
          autoplay: true,
          autoplayMuted: true,
          url: 'http://vjs.zencdn.net/v/oceans.mp4',
          width:'100%',
          height:'100%',
          videoFillMode: "fillHeight",
          playsinline: true,
          ignores:['playbackRate'],
          cssFullscreen:false
        })
        // 播放
        playIns.on(Events.PLAY, () => {
          // TODO
          console.log('-------------------------------')
        })
        // EVENTS.ENDED 结束播放,播放完后
        playIns.on(Events.ENDED, () => {
          // TODO
          router.replace('/',undefined)
          console.log('播放---end')
        })
        playIns.on(Events.AUTOPLAY_PREVENTED, () => {
          console.log('autoplay was prevented!!')
        })
        
        playIns.on(Events.AUTOPLAY_STARTED, () => {
          console.log('autoplay success!!')
        })
      }, 0);
  
    },[])
    const episopeList = [
      {name:'神雕神雕侠侣神雕侠侣侠侣神雕神雕侠侣神雕侠侣侠侣神雕神雕侠侣神雕侠侣侠侣神雕神雕侠侣神雕侠侣侠侣神雕神雕侠侣神雕侠侣侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
      {name:'神雕侠侣神雕侠侣神雕侠侣神雕侠侣神雕侠侣神雕侠侣神雕侠侣',chapterCount:2, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
      {name:'神雕侠侣神雕侠侣',chapterCount:3, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
      {name:'神雕侠侣神雕侠侣神雕侠侣',chapterCount:4, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
      {name:'神雕侠侣神雕侠侣神雕侠侣神雕侠侣神雕侠侣神雕侠侣',chapterCount:5, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
      {name:'神雕侠侣',chapterCount:6, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
      {name:'神雕侠侣',chapterCount:7, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
      {name:'神雕侠侣',chapterCount:8, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
      {name:'神雕侠侣',chapterCount:9, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
      {name:'神雕侠侣',chapterCount:10, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
      {name:'神雕侠侣',chapterCount:11, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
      {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
      {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
      {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
      {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
      {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
      {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
      {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
      {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
      {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
      {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
      {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
      {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
      {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
      {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
      {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
    ]
    return <>
      <div className={styles.videoBox}>
        <div className={styles.leftVideo}>
          <div className={styles.videoContainer}>
            <div id="playVideo"></div>
          </div>
          <div className={styles.videoInfo}>
            <p className={styles.videoTitle}>Returning to ancient times and becoming the emperor-Episodes 1</p>
            <p className={styles.videoStar}>
              <Image 
                className={styles.imageStar}
                src = '/images/book/play-icon.png'
                width={24}
                height={24}
                alt="star"
              />
              <span className={styles.videoScore}>22.4K</span>
            </p>
            <p className={styles.videoDesc}>In the desert sands of Saqqara, the latest hotspot of Egyptian archaeology, two of the world’s most famous Egyptologists seek to unearth ancient treasures. The…</p>
          </div>
        </div>
        <div className={styles.eposipeAll}>
          <div className={styles.eposipeTop}>
            <p className={styles.eposipeTit}>Episodes</p>
            <p className={styles.eposipeCur}>(1/180)</p>
          </div>
          <div className={styles.allEpo}>
            {
              chapterList.map((item,ind) => {
                return <Link href={`/`} className={styles.linkItem}>
                  <Image
                    className={styles.EpoItem}
                    onError={onImgError}
                    placeholder="blur"
                    blurDataURL={item.cover}
                    width={88}
                    height={117}
                    src={item.cover}
                    alt='photo'
                  />
                  <span className={styles.linkText}>{item.name}</span>
                  </Link>
              })
            }
          </div>
          
          
        </div>
      </div>
    </>
  }
  
  export default VideoPlayer
