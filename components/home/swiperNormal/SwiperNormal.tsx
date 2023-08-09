import { Swiper } from 'antd-mobile'
import React, { FC } from 'react'
import styles from '@/components/home/swiperNormal/SwiperNormal.module.scss'
import { IBookItem } from "@/typings/home.interface";
import Link from "next/link";
import ImageCover from "@/components/common/image/ImageCover";
import { useTranslation } from "next-i18next";

interface IProps {
  bigList: IBookItem[];
}

const SwiperNormal: FC<IProps> = ({ bigList }) => {
  const { t } = useTranslation()
  const items = bigList.map((item) => (
    <Swiper.Item key={item.bookId} className={styles.content}>
      <div className={styles.swiperItem}>
        <ImageCover
          href={`/book/${item.bookId}`}
          className={styles.contentImgBox}
          src={item.cover}
          width={218}
          height={294}
          alt={item.bookName}
        />

        <div className={styles.rightCard}>
          <div className={styles.rightCardTop}>
            <Link className={styles.bookName} href={`/book/${item.bookId}`}>
              {item.bookName}
            </Link>
            <p className={styles.chapterCount}>{item.chapterCount || 0} {t('home.episodes')}</p>
            <p className={styles.intro}>{item.introduction}</p>
          </div>
          <div className={styles.rightCardBottom}>
            { (item.tags || []).map(val => {
              return <div key={val} className={styles.rightTag}>{val}</div>
            })}
          </div>
        </div>
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

export default SwiperNormal
