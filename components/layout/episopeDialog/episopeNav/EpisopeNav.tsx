import React, { FC } from 'react'
import styles from '@/components/layout/episopeNav/EpisopeNav.module.scss'
import Link from "next/link";
import { useTranslation } from "next-i18next";
import ClientConfig from "@/client.config";
import Image from "next/image";

interface IProps {

}

const EpisopeDialog: FC<IProps> = () => {
  const { t } = useTranslation();
  const dataList = [
    {key:1,href:'/'},
    {key:2,href:'/'},
    {key:3,href:'/'},
    {key:4,href:'/'},
    {key:5,href:'/'},
    {key:6,href:'/'},
    {key:7,href:'/'},
    {key:8,href:'/'},
    {key:9,href:'/'},
    {key:10,href:'/'},
    {key:11,href:'/'},
    {key:13,href:'/'},
    {key:14,href:'/'},
    {key:15,href:'/'},
    {key:16,href:'/'},
    {key:17,href:'/'},
    {key:18,href:'/'},
    {key:19,href:'/'},
    {key:20,href:'/'},
    {key:21,href:'/'},
    {key:22,href:'/'},
  ]
  const show={display:"block",color:'red',fontSize:"32px"}
  const hide={display:"none"}
  const currentIndex = 3
  return <div className={styles.dialogBox}>
    <h1>当前页数{currentIndex + 1}，展示5集</h1>
    {
      dataList.map((item,index) => {
        return <div style={Math.floor(index/5) === currentIndex?show:hide}>
          {item.key}
        </div>
      })
    }
  </div>
}

export default EpisopeDialog
