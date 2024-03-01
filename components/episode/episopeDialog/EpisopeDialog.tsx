import React, { FC, useState, useRef} from 'react';
import Link from "next/link";
import ImagePline from "@/components/common/image/ImagePline";
import classNames from "classnames";
import { IChapterList, IBookItem } from "@/typings/home.interface";
import styles from '@/components/episode/episopeDialog/EpisopeDialog.module.scss';

interface IProps {
  chapterList:IChapterList[];
  showDialog: boolean;
  closeDialog: Function;
  bookInfo: IBookItem;
}

const EpisopeDialog: FC<IProps> = ({chapterList = [], showDialog, closeDialog, bookInfo}) => {
  const [curIndex, setCurIndex] = useState<number>(0)
  const navRef = useRef<HTMLDivElement>(null);
  const setCurIndexInd = (i: number) => {
    setCurIndex(i)
    navRef?.current && (navRef.current.scrollTop = 0)
  }

  return <div className={styles.dialogContainer} style={showDialog ? {} : {display:'none'}}>
    <div className={styles.dialogMark} onClick={() => {closeDialog()}} />
    <div className={styles.dialogBox}  ref={navRef}>
      <div className={styles.headerTop}>
        <div className={styles.topInfo}>
          <div className={styles.title}>{bookInfo.bookName}</div>
          <ImagePline
            className={styles.closeIcon}
            onClick={() => {closeDialog()}}
            width={48}
            height={48}
            src={'/images/pline/close-d.png'}
            alt={''}
          />
        </div>
        <div className={styles.titleTab}>
          {
            Array.from({length: Math.ceil(chapterList.length/50)},(v, i) => {
              return <div key={i} className={styles.tabs}>
                <div
                  onClick={() => setCurIndexInd(i)}
                  className={curIndex === i ? styles.tabTopActive : styles.tabTop}>{1 + i * 50 + '-' + (i + 1) * 50}</div>
                <div className={styles.tabLine} style={i == Math.ceil(chapterList.length/50) - 1 ? {display:"none"} : {}}>|</div>
              </div>
            })
          }
        </div>
      </div>


      <div className={styles.episodeList}>
        {chapterList.length > 0 ? chapterList.map((item,ind) => {
          return <div className={styles.linkBox} key={ind} style={ind >= curIndex * 50 && ind < (curIndex + 1) * 50 ?{}:{display:"none"}} >
            <Link  href={`/episode/${bookInfo.bookId}/${item.id}`} className={styles.linkBox}>
            <div className={ classNames(styles.episodeItem, !item.unlock && styles.episodeItemLock)} onClick={() => {closeDialog()}}>
              <span>{item.index + 1}</span>
              {item.unlock ? null : <ImagePline
                className={styles.episodeItemIcon}
                width={24}
                height={24}
                src={'/images/pline/m-lock.png'}
                alt={''}
              />}
            </div>
            </Link>
          </div>
        }) : null}
      </div>
    </div>
  </div>
}

export default EpisopeDialog
