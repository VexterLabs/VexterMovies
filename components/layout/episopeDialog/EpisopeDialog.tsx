import React, { FC, useEffect, useState } from 'react'
import styles from '@/components/layout/episopeDialog/EpisopeDialog.module.scss'
import Link from "next/link";
import { useTranslation } from "next-i18next";
import ClientConfig from "@/client.config";
import Image from "next/image";
import Item from 'antd-mobile/es/components/dropdown/item';

interface IProps {

}

const EpisopeDialog: FC<IProps> = () => {
  const { t } = useTranslation();
  const dataList = [
    {key:1,href:'/',styleShow:true},
    {key:2,href:'/',styleShow:true},
    {key:3,href:'/',styleShow:true},
    {key:4,href:'/',styleShow:true},
    {key:5,href:'/',styleShow:true},
    {key:6,href:'/',styleShow:true},
    {key:7,href:'/',styleShow:true},
    {key:8,href:'/',styleShow:true},
    {key:9,href:'/',styleShow:true},
    {key:10,href:'/',styleShow:true},
    {key:11,href:'/',styleShow:true},
    {key:13,href:'/',styleShow:true},
    {key:14,href:'/',styleShow:true},
    {key:15,href:'/',styleShow:true},
    {key:16,href:'/',styleShow:true},
    {key:17,href:'/',styleShow:true},
    {key:18,href:'/',styleShow:true},
    {key:19,href:'/',styleShow:true},
    {key:20,href:'/',styleShow:true},
    {key:21,href:'/',styleShow:true},
    {key:22,href:'/',styleShow:true},
    {key:1,href:'/',styleShow:true},
    {key:2,href:'/',styleShow:true},
    {key:3,href:'/',styleShow:true},
    {key:4,href:'/',styleShow:true},
    {key:5,href:'/',styleShow:true},
    {key:6,href:'/',styleShow:true},
    {key:7,href:'/',styleShow:true},
    {key:8,href:'/',styleShow:true},
    {key:9,href:'/',styleShow:true},
    {key:10,href:'/',styleShow:true},
    {key:11,href:'/',styleShow:true},
    {key:13,href:'/',styleShow:true},
    {key:14,href:'/',styleShow:true},
    {key:15,href:'/',styleShow:true},
    {key:16,href:'/',styleShow:true},
    {key:17,href:'/',styleShow:true},
    {key:18,href:'/',styleShow:true},
    {key:19,href:'/',styleShow:true},
    {key:20,href:'/',styleShow:true},
    {key:21,href:'/',styleShow:true},
    {key:22,href:'/',styleShow:true},
    {key:1,href:'/',styleShow:true},
    {key:2,href:'/',styleShow:true},
    {key:3,href:'/',styleShow:true},
    {key:4,href:'/',styleShow:true},
    {key:5,href:'/',styleShow:true},
    {key:6,href:'/',styleShow:true},
    {key:7,href:'/',styleShow:true},
    {key:8,href:'/',styleShow:true},
    {key:9,href:'/',styleShow:true},
    {key:10,href:'/',styleShow:true},
    {key:11,href:'/',styleShow:true},
    {key:13,href:'/',styleShow:true},
    {key:14,href:'/',styleShow:true},
    {key:15,href:'/',styleShow:true},
    {key:16,href:'/',styleShow:true},
    {key:17,href:'/',styleShow:true},
    {key:18,href:'/',styleShow:true},
    {key:19,href:'/',styleShow:true},
    {key:20,href:'/',styleShow:true},
    {key:21,href:'/',styleShow:true},
    {key:22,href:'/',styleShow:true},
    {key:1,href:'/',styleShow:true},
    {key:2,href:'/',styleShow:true},
    {key:3,href:'/',styleShow:true},
    {key:4,href:'/',styleShow:true},
    {key:5,href:'/',styleShow:true},
    {key:6,href:'/',styleShow:true},
    {key:7,href:'/',styleShow:true},
    {key:8,href:'/',styleShow:true},
    {key:9,href:'/',styleShow:true},
    {key:10,href:'/',styleShow:true},
    {key:11,href:'/',styleShow:true},
    {key:13,href:'/',styleShow:true},
    {key:14,href:'/',styleShow:true},
    {key:15,href:'/',styleShow:true},
    {key:16,href:'/',styleShow:true},
    {key:17,href:'/',styleShow:true},
    {key:18,href:'/',styleShow:true},
    {key:19,href:'/',styleShow:true},
    {key:20,href:'/',styleShow:true},
    {key:21,href:'/',styleShow:true},
    {key:22,href:'/',styleShow:true},
    {key:1,href:'/',styleShow:true},
    {key:2,href:'/',styleShow:true},
    {key:3,href:'/',styleShow:true},
    {key:4,href:'/',styleShow:true},
    {key:5,href:'/',styleShow:true},
    {key:6,href:'/',styleShow:true},
    {key:7,href:'/',styleShow:true},
    {key:8,href:'/',styleShow:true},
    {key:9,href:'/',styleShow:true},
    {key:10,href:'/',styleShow:true},
    {key:11,href:'/',styleShow:true},
    {key:13,href:'/',styleShow:true},
    {key:14,href:'/',styleShow:true},
    {key:15,href:'/',styleShow:true},
    {key:16,href:'/',styleShow:true},
    {key:17,href:'/',styleShow:true},
    {key:18,href:'/',styleShow:true},
    {key:19,href:'/',styleShow:true},
    {key:20,href:'/',styleShow:true},
    {key:21,href:'/',styleShow:true},
    {key:22,href:'/',styleShow:true},
    {key:1,href:'/',styleShow:true},
    {key:2,href:'/',styleShow:true},
    {key:3,href:'/',styleShow:true},
    {key:4,href:'/',styleShow:true},
    {key:5,href:'/',styleShow:true},
    {key:6,href:'/',styleShow:true},
    {key:7,href:'/',styleShow:true},
    {key:8,href:'/',styleShow:true},
    {key:9,href:'/',styleShow:true},
    {key:10,href:'/',styleShow:true},
    {key:11,href:'/',styleShow:true},
    {key:13,href:'/',styleShow:true},
    {key:14,href:'/',styleShow:true},
    {key:15,href:'/',styleShow:true},
    {key:16,href:'/',styleShow:true},
    {key:17,href:'/',styleShow:true},
    {key:18,href:'/',styleShow:true},
    {key:19,href:'/',styleShow:true},
    {key:20,href:'/',styleShow:true},
    {key:21,href:'/',styleShow:true},
    {key:22,href:'/',styleShow:true},
  ]
  const [tabArr, setTab] = useState([])
  const [listArr, setList] = useState([])
  const [isShow, setShow] = useState(true)
  const show={display:"block",color:'red',fontSize:"32px"}
  const hide={display:"none"}
  // 处理剧集数据
  const dealArr = (curInd: number) => {
   dataList.map((val,ind) => {
      if(Math.floor(ind/50) === curInd) {
        val.styleShow = true
      } else {
        val.styleShow = false
      }
    })
    setList(dataList as any)
  }
  const closeDialog = () => {
    console.log('guanbi')
    setShow(false)
  }
  // 处理tab数据
  const dealTabArr = () => {
    const temArr = Array.from({length: Math.ceil(126/50)},(v, i) => {
      return {
        id: i + 'tab',
        label: 1 + i * 50 + '-' + (i + 1) * 50
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
          return <div className={styles.episodeItem} style={item.styleShow?show:hide}>
            <span>{item.key}</span>
          </div>
        })
      }
    </div>
  </div>
}

export default EpisopeDialog
