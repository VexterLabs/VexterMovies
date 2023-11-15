import React, { FC } from 'react';
import { IBookItem } from "@/typings/home.interface";
import Link from "next/link";
import { onImgError } from "@/components/common/image/ImageCover";
import { useTranslation } from "next-i18next";
import Image from "next/legacy/image";
import TypeTwoTag from "@/components/common/typeTwoTag";
import styles from '@/components/pcHome/swiperArea/SwiperArea.module.scss';

interface IProps {
  bigList: IBookItem[];
}

const SwiperArea: FC<IProps> = ({ bigList = [] }) => {
  const { t } = useTranslation()
  const { bookId, typeTwoList = [] } = bigList?.[0]
  const routerToBookInfo = `/film/${bookId}`
  return <div className={styles.swiperWrap}>
    <div className={styles.swiperBox}>
      <div className={styles.leftCard}>
        <Link href={routerToBookInfo} className={styles.leftCardImg}>
          <Image
            src={bigList[0].cover}
            className={styles.imageItem}
            onError={onImgError}
            placeholder="blur"
            blurDataURL={'/images/defaultFilm.png'}
            width={345}
            height={460}
            alt={bigList[0].bookName}
          />
        </Link>
        <div className={styles.leftCardContent}>
          <div className={styles.leftCardContentTop}>
            <Link href={routerToBookInfo} className={styles.leftBookName}>{bigList[0].bookName}</Link>
            <Link href={routerToBookInfo} className={styles.chapterCount}>{`${bigList[0].chapterCount || 0} ${t("home.episodes")}`}</Link>
            <Link href={routerToBookInfo} className={styles.intro}>{bigList[0].introduction}</Link>
          </div>
          {typeTwoList && typeTwoList.length > 0 ? <TypeTwoTag typeTwoList={typeTwoList}/> : null}
        </div>
      </div>

      <div className={styles.rightCard}>
        {[bigList[1], bigList[2]].map(item => {
          return <div key={item.bookId} className={styles.rightCardItem}>
            <Link href={`/film/${item.bookId}`} className={styles.rightCardItemImg}>
              <Image
                src={item.cover}
                className={styles.imageItem}
                onError={onImgError}
                placeholder="blur"
                blurDataURL={'/images/defaultFilm.png'}
                width={165}
                height={220}
                alt={item.bookName}
              />
            </Link>

            <div className={styles.rightCardContent}>
              <div  className={styles.rightCardContentTop}>
                <Link href={`/film/${item.bookId}`} className={styles.bookName}>
                  {item.bookName}
                </Link>
                <Link href={`/film/${item.bookId}`} className={styles.chapterCount}>{`${item.chapterCount || 0} ${t("home.episodes")}`} </Link>
                <Link href={`/film/${item.bookId}`} className={styles.intro}>{item.introduction}</Link>
              </div>
              {item?.typeTwoList && item.typeTwoList.length > 0 ? <TypeTwoTag typeTwoList={item.typeTwoList}/> : null}
            </div>
          </div>
        })}
      </div>
    </div>
  </div>
}

export default SwiperArea;
