import { Swiper } from 'antd-mobile'
import React, { FC } from 'react'
import styles from '@/components/home/swiperNormal/SwiperNormal.module.scss'
import { IBookItem } from "@/typings/home.interface";
import Link from "next/link";
import { ImageCover, onImgError } from "@/components/common/image/ImageCover";
import { useTranslation } from "next-i18next";
import Image from "next/image";

interface IProps {
  bigList: IBookItem[];
}

const SwiperNormal: FC<IProps> = ({ bigList }) => {
  const { t } = useTranslation()
  const items = bigList.map((item) => (
    <Swiper.Item key={item.bookId} className={styles.content}>
      <div className={styles.swiperItem}>

        <ImageCover
          href={`/film/${item.bookId}`}
          className={styles.contentImgBox}
          width={218}
          height={294}
          src={item.cover}
          alt={item.bookName}
        />

        <Link className={styles.rightCard} href={`/film/${item.bookId}`}>
          <div className={styles.rightCardTop}>
            <h2 className={styles.bookName} >
              {item.bookName}
            </h2>
            <p className={styles.chapterCount}>{item.chapterCount || 0} {t('home.episodes')}</p>
            <p className={styles.intro}>{item.introduction}</p>
          </div>

          {
            !!(item?.typeTwoList && item.typeTwoList.length) ? <div className={styles.rightCardBottom}>
              {
                item.typeTwoList.map((typeTwoListItem, typeTwoListIdx) => (
                  <div key={typeTwoListItem + '_' +typeTwoListIdx} className={styles.rightTag}>{typeTwoListItem.name}</div>
                ))
              }
            </div> : null
          }
        </Link>
      </div>
    </Swiper.Item>
  ))
  return <Swiper
    style={{
      '--height': '3.16rem',
    }}
    indicatorProps={{
      style: {
        '--dot-spacing': '0.08rem',
      }
    }}
    trackOffset={2}
    slideSize={96}
    className={styles.swiperBox}
    autoplay
    loop>{items}</Swiper>
}

export default SwiperNormal;
