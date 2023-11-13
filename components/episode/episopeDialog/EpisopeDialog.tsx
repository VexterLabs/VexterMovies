import React, { FC, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { IChapterList, IBookItem } from "@/typings/home.interface";
import styles from '@/components/episode/episopeDialog/EpisopeDialog.module.scss';

interface IProps {
  chapterList:IChapterList[];
  showDialog: boolean;
  closeDialog: Function;
  chapterName: string;
  bookInfo: IBookItem;
}

const EpisopeDialog: FC<IProps> = ({chapterList = [], showDialog, closeDialog, chapterName, bookInfo}) => {
  const [curIndex, setCurIndex] = useState<number>(0)

  return <div className={styles.dialogBox} style={showDialog ? {} : {display:'none'}}>
    <div className={styles.topInfo}>
      <div className={styles.title}>{bookInfo.bookName}</div>
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
        Array.from({length: Math.ceil(chapterList.length/50)},(v, i) => {
          return <div key={i} className={styles.tabs}>
             <div
              onClick={() => setCurIndex(i)}
              className={curIndex === i ? styles.tabTopActive : styles.tabTop}>{1 + i * 50 + '-' + (i + 1) * 50}</div>
               <div className={styles.tabLine} style={i == Math.ceil(chapterList.length/50) - 1 ? {display:"none"} : {}}>|</div>
          </div>
        })
      }
    </div>
     

    <div className={styles.episodeList}>
      {chapterList.length > 0 ? chapterList.map((item,ind) => {
        return <div className={styles.linkBox} key={ind} style={ind >= curIndex * 50 && ind < (curIndex + 1) * 50 ?{}:{display:"none"}} >
          <Link  href={`/episode/${bookInfo.bookId}/${item.id}`} className={styles.linkBox}>
            <span className={item.unlock ? styles.episodeItem : styles.episodeItemLock} onClick={() => {closeDialog()}}>
              <span>{item.index + 1}</span>
            </span>
          </Link>
        </div>
      }) : null}
    </div>
  </div>
}

export default EpisopeDialog
