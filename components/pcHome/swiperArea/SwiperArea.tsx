import React, { FC } from 'react'
import styles from '@/components/pcHome/swiperArea/SwiperArea.module.scss'
import { IBookItem } from "@/typings/home.interface";
import Link from "next/link";
import ImageCover from "@/components/common/image/ImageCover";
import { useTranslation } from "next-i18next";

interface IProps {
  bigList: IBookItem[];
}

const SwiperArea: FC<IProps> = ({ bigList = [] }) => {
  const { t } = useTranslation()
  const { bookId, tags = [] } = bigList?.[0]
  const routerToBookInfo = `/book/${bookId}`
  return <div className={styles.swiperWrap}>
    <div className={styles.swiperBox}>
      <div className={styles.leftCard}>
        <ImageCover
          scale
          priority
          href={routerToBookInfo}
          className={styles.leftCardImg}
          width={345}
          height={460}
          src={bigList[0].cover}
          alt={bigList[0].bookName}/>

        <Link href={routerToBookInfo} className={styles.leftCardContent}>
          <div className={styles.leftCardContentTop}>
            <h2>{bigList[0].bookName}</h2>
            <p className={styles.viewCountDisplay}>{`${bigList[0].viewCountDisplay || "0"} ${t("home.episodes")}`}</p>
            <p className={styles.intro}>{bigList[0].introduction}</p>
          </div>

          <div className={styles.leftCardContentBottom}>
            { tags.map(val => {
              return <div key={val} className={styles.leftTag}>{val}</div>
            })}
          </div>
        </Link>
      </div>

      <div className={styles.rightCard}>
        { [ bigList[1], bigList[2] ].map(item => {
          return <div key={item.bookId} className={styles.rightCardItem}>
            <ImageCover
              scale
              priority
              href={`/book/${item.bookId}`}
              className={styles.rightCardItemImg}
              width={165}
              height={220}
              src={item.cover}
              alt={item.bookName}/>
            <div className={styles.rightCardContent}>
              <div className={styles.rightCardContentTop}>
                <Link className={styles.bookName} href={`/book/${item.bookId}`}>
                  {item.bookName}
                </Link>
                <Link href={`/book/${item.bookId}`} className={styles.viewCountDisplay}>{`${item.viewCountDisplay || '0'} ${t("home.episodes")}`} </Link>
                <Link href={`/book/${item.bookId}`} className={styles.intro}>{item.introduction}</Link>
              </div>
              <Link href={`/book/${item.bookId}`} className={styles.rightCardContentBottom}>
                { (item?.tags || []).map(val => {
                  return <div key={val} className={styles.rightTag}>{val}</div>
                })}
              </Link>
            </div>
          </div>
        }) }
      </div>
    </div>
  </div>
}

export default SwiperArea
