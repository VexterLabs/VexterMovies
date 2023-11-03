import React, {FC, useEffect, useState} from "react";
import styles from '@/components/pcVideo/index.module.scss'
import Player,{ Events } from 'xgplayer'
import 'xgplayer/dist/index.min.css';
import Image from "next/image";
import Link from "next/link";
import { onImgError } from "@/components/common/image/ImageCover";
import { Router, useRouter } from "next/router";
import { IBookItemDetail, IChapterList } from "@/typings/home.interface";



interface IProps {
  videoUrl: string;
  chapterList:IChapterList[];
}
const VideoPlayer:  FC<IProps> = ({videoUrl, chapterList = []}) => {
  const [url, setUrl] = useState('')
  const queryObj = useRouter()
  const { id, chapterId } = queryObj.query

  console.log('videoUrl----shipin', videoUrl)
  let playIns: any;
  useEffect(() => {
    const curId = chapterList.find(item => item.id === chapterId)
    console.log('视频组件',chapterList, curId)
    playIns = null;
    playIns = new Player({
      id: "playVideo",
      autoplay: true,
      autoplayMuted: true,
      url: videoUrl,
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
      // router.replace('/episode/41000010001/527972183',undefined)
      console.log('播放---end')
      // playIns.playNext({
      //   url: videoUrl
      // })
    })
    playIns.on(Events.AUTOPLAY_PREVENTED, () => {
      console.log('autoplay was prevented!!')
    })
    // 切换剧集
    
    playIns.on(Events.AUTOPLAY_STARTED, () => {
      console.log('autoplay success!!')
    })
  },[])
  const switchVideo = () => {
    playIns.switchURL(videoUrl)
  }

  return <>
    <div className={styles.videoBox}>
      <div className={styles.leftVideo}>
        <div className={styles.videoContainer}>
          <div id="playVideo"></div>
        </div>
        {/* <div className={styles.videoInfo}>
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
        </div> */}
      </div>
    </div>
  </>
}

export default VideoPlayer