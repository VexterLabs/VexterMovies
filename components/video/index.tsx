import React, {FC, useEffect, useState} from "react";
import styles from '@/components/video/index.module.scss'
import Player,{ Events } from 'xgplayer'
import 'xgplayer/dist/index.min.css';
import Image from "next/image";
import Link from "next/link";
import { onImgError } from "@/components/common/image/ImageCover";
import { useRouter } from "next/router";


enum clsSt {
  wait = 0,
  early = 3,
  during = 1,
  lateExtra = 4,
  end = 2
}

interface IProps {

}


// http://vjs.zencdn.net/v/oceans.mp4
// https://media.w3.org/2010/05/sintel/trailer.mp4
// 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
const MVideo:  FC<IProps> = () => {
  const [url, setUrl] = useState('')
  const router = useRouter()
  useEffect(() => {
    console.log('url', url)
    let playIns: any;
    setTimeout(() => {
      playIns = new Player({
        id: "mPlay",
        autoplay: true,
        autoplayMuted: true,
        url: 'http://vjs.zencdn.net/v/oceans.mp4',
        width:'100%',
        height:'100%',
        videoFillMode: "contain",
        playsinline: true,
        ignores:['playbackRate'],
        cssFullscreen:false,
        fullscreen: {
          useCssFullscreen: true // 全屏按钮将会调用页面内全屏
        }
      })
      // 播放
      playIns.on(Events.PLAY, () => {
        // TODO
        console.log('视频开始播放')
      })
      // EVENTS.ENDED 结束播放,播放完后
      playIns.on(Events.ENDED, () => {
        // TODO
        playIns.destroy() // 销毁播放器
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
  return <>
    <div className={styles.videoContainer}>
      <div className={styles.videoArea}>
        <div id='mPlay' className={styles.videoPlace}></div>
      </div>
      <div className={styles.videoIntro}>
        <p className={styles.videoTit}>Returning to ancient times and becoming the emperor-Episodes 1</p>
        <div className={styles.videoScore}>
          <Image
            className={styles.epoImg}
            onError={onImgError}
            placeholder="blur"
            blurDataURL='/images/book/play-icon.png'
            width={20}
            height={20}
            src='/images/book/play-icon.png'
            alt='photo'
          />
          <p className={styles.epoScore}>22.4k</p>
        </div>
        <div className={styles.videoTag}>

        </div>
        <div className={styles.videoDesc}>
          <p>In the desert sands of Saqqara, the latest hotspot of Egyptian archaeology, two of the world’s most fam</p>,
        </div>
      </div>
    </div>

  </>
}

export default MVideo
