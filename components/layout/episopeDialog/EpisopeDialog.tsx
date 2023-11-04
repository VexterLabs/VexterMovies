import React, { FC, useEffect, useState } from 'react'
import styles from '@/components/layout/episopeDialog/EpisopeDialog.module.scss'
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { IChapterList } from "@/typings/home.interface";

interface IProps {
  chapterList:IChapterList[];
  showDialog: boolean;
  closeDialog: Function;
}

const EpisopeDialog: FC<IProps> = ({chapterList = [], showDialog, closeDialog}) => {
  const { t } = useTranslation();
  const [tabArr, setTab] = useState([])
  // const [listArr, setList] = useState(chapterList)
  const [videoList, setVideoList] = useState(chapterList)
  const [isShow, setShow] = useState(false)
  // 处理剧集数据
  const dealVideoData = (curInd: number) => {
    console.log('curInd', curInd)
    videoList.map((val,ind) => {
      if(Math.floor(ind/30) === curInd) {
        val.showEposide = true
      } else {
        val.showEposide = false
      }
    })
    const newCatArr = videoList.concat()
    setVideoList(newCatArr)
  }
  // 处理tab数据
  const dealTabArr = () => {
    const leg = videoList && videoList.length
    const temTabArr = Array.from({length: Math.ceil(leg/30)},(v, i) => {
      return {
        id: i + 'tab',
        label: 1 + i * 30 + '-' + (i + 1) * 30
      }
    })
    setTab(temTabArr as any)
  }
  useEffect(() => {
    // 默认展示剧集的第一页
    dealVideoData(0)
    dealTabArr()
  },[])
  return <div className={styles.dialogBox} style={showDialog ? {} : {display:'none'}}>
    <div className={styles.topInfo}>
      <div className={styles.title}>{videoList&&videoList.length>0&&videoList[0].name}</div>
      <Image
        className={styles.closeIcon}
        onClick={() => {closeDialog()}}
        width={48}
        height={48}
        src={'/images/book/close-d.png'}
        alt={''}
      />
    </div>
    <div className={styles.titleTab}>
      {
        tabArr.map((item: any,ind: number) => {
          return <div onClick={() => dealVideoData(ind)} className={styles.tabTop} key={ind}>{item.label}</div>
        })
      }
    </div>

    <div className={styles.episodeList}>
      {videoList?.length&&videoList.map((item:any,ind:number) => {
        const {
          name,
          cover,
          index
        } = item
        return <div key={ind} style={item.showEposide?{}:{display:"none"}}>
          <Link href='/'>
            <div className={item.unlock ? styles.episodeItem : styles.episodeItemLock}>
              <span>{item.name}</span>
            </div>
          </Link>
        </div>
      })
      }
    </div>
  </div>
}

export default EpisopeDialog
