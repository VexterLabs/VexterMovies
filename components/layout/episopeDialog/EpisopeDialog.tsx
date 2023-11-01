import React, { FC, useEffect, useState } from 'react'
import styles from '@/components/layout/episopeDialog/EpisopeDialog.module.scss'
import Link from "next/link";
import { useTranslation } from "next-i18next";
import ClientConfig from "@/client.config";
import Image from "next/image";
import Item from 'antd-mobile/es/components/dropdown/item';
import { IChapterList } from "@/typings/home.interface";

interface IProps {
  chapterList:IChapterList[]
}

const EpisopeDialog: FC<IProps> = ({chapterList = []}) => {
  const { t } = useTranslation();
  
  const [tabArr, setTab] = useState([])
  const [listArr, setList] = useState(chapterList)
  const [isShow, setShow] = useState(true)
  const show={display:"block",color:'red',fontSize:"32px"}
  const hide={display:"none"}
  // 处理剧集数据
  const dealArr = (curInd: number) => {
    chapterList.map((val,ind) => {
      if(Math.floor(ind/30) === curInd) {
        val.showEposide = true
      } else {
        val.showEposide = false
      }
    })
    setList(chapterList as any)
  }
  const closeDialog = () => {

    setShow(false)
  }
  // 处理tab数据
  const dealTabArr = () => {
    const leg = listArr && listArr.length
    const temArr = Array.from({length: Math.ceil(leg/30)},(v, i) => {
      return {
        id: i + 'tab',
        label: 1 + i * 30 + '-' + (i + 1) * 30
      }
    })
    setTab(temArr as any)
  }
  useEffect(() => {
    // 默认展示剧集的第一页
    dealArr(0)
    dealTabArr()
  },[])
  return <div className={styles.dialogBox} style={isShow ? {} : {display:'none'}}>
    <div className={styles.topInfo}>
      <div className={styles.title}>Returning to ancient times and becoming the emperor</div>
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
          return <span onClick={() => dealArr(ind)} className={styles.tabTop}>{item.label}</span>
        })
      }
    </div>
    
    <div className={styles.episodeList}>
      {
        listArr.map((item:any,index:number) => {
          return <div className={styles.episodeItem} style={item.showEposide?show:hide}>
            <span>{item.index}</span>
          </div>
        })
      }
    </div>
  </div>
}

export default EpisopeDialog
