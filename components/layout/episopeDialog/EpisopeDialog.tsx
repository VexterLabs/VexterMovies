import React, { FC, useEffect, useState } from 'react'
import styles from '@/components/layout/episopeDialog/EpisopeDialog.module.scss'
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { IChapterList, IBookItemDetail } from "@/typings/home.interface";
import { useRouter } from "next/router";

interface IProps {
  chapterList:IChapterList[];
  showDialog: boolean;
  closeDialog: Function;
  chapterName: string;
  bookInfo: IBookItemDetail;
}

const EpisopeDialog: FC<IProps> = ({chapterList = [], showDialog, closeDialog, chapterName, bookInfo}) => {
  const { t } = useTranslation();
  const [tabArr, setTab] = useState([])
  // const [listArr, setList] = useState(chapterList)
  const [videoList, setVideoList] = useState<IChapterList[]>(chapterList)
  const [isShow, setShow] = useState(false)
  const router = useRouter()
  const { id } = router.query
  // 处理剧集数据
  const dealVideoData = (curInd: number) => {
    setVideoList(prevState => {
      return prevState.map((val,ind) => { 
        if(Math.floor(ind/30) === curInd) {
          return {...val, showEposide: true}
        }
        return {...val, showEposide: false}
      })
    })
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
      <div className={styles.title}>{chapterName}</div>
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
      {videoList?.length&&videoList.map((item,ind) => {
        const {
          name,
          cover,
          index
        } = item
        return <div className={styles.linkBox} key={ind} style={item.showEposide?{}:{display:"none"}} >
          <Link  href={`/episode/${bookInfo.bookId}/${item.id}`} className={styles.linkBox}>
            <div className={item.unlock ? styles.episodeItem : styles.episodeItemLock} onClick={() => {closeDialog()}}>
              <span>{item.index + 1}</span>
            </div>
          </Link>
        </div>
      })
      }
    </div>
  </div>
}

export default EpisopeDialog
