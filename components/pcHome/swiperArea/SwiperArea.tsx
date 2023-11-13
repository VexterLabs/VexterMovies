import React, { FC } from 'react';
import { IBookItem } from "@/typings/home.interface";
import Link from "next/link";
import { onImgError } from "@/components/common/image/ImageCover";
import { useTranslation } from "next-i18next";
import Image from "next/legacy/image";
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
        <Link href={routerToBookInfo} className={styles.leftCardContent}>
          <div className={styles.leftCardContentTop}>
            <h2>{bigList[0].bookName}</h2>
            <p className={styles.chapterCount}>{`${bigList[0].chapterCount || 0} ${t("home.episodes")}`}</p>
            <p className={styles.intro}>{bigList[0].introduction}</p>
          </div>

          {
            !!(typeTwoList && typeTwoList.length) ? <div className={styles.leftCardContentBottom}>
              {
                typeTwoList.map((typeTwoListItem, typeTwoListIdx) => (
                  <div key={typeTwoListItem + '_' +typeTwoListIdx} className={styles.leftTag}>{typeTwoListItem.name}</div>
                ))
              }
            </div> : null
          }
        </Link>
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

            <Link href={`/film/${item.bookId}`} className={styles.rightCardContent}>
              <div className={styles.rightCardContentTop}>
                <h2 className={styles.bookName}>
                  {item.bookName}
                </h2>
                <p className={styles.chapterCount}>{`${item.chapterCount || 0} ${t("home.episodes")}`} </p>
                <p className={styles.intro}>{item.introduction}</p>
              </div>
              {
                !!(item?.typeTwoList && item.typeTwoList.length) ? <div className={styles.rightCardContentBottom}>
                  {
                    item.typeTwoList.map((typeTwoListItem, typeTwoListIdx) => (
                      <div key={typeTwoListItem + '_' +typeTwoListIdx} className={styles.rightTag}>{typeTwoListItem.name}</div>
                    ))
                  }
                </div> : null
              }
            </Link>
          </div>
        })}
      </div>
    </div>
  </div>
}

export default SwiperArea;
