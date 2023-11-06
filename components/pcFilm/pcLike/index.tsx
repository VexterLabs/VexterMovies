import React, { FC } from 'react'
import { IBookItem } from "@/typings/home.interface";
import styles from '@/components/pcFilm/pcLike/PcLike.module.scss'
import Link from "next/link";
import { onImgError } from "@/components/common/image/ImageCover";
import ImageLegacy from "next/legacy/image";
import Image from "next/image";
import { useTranslation } from "next-i18next";

interface IProps {
  dataSource: IBookItem[];
  priority?: boolean;
}


const PcLike: FC<IProps> = ({ dataSource = [], priority = false }) => {
  const { t } = useTranslation()

  if (dataSource.length === 0) {
    return null
  }
  return <div className={styles.secondListWrap}>
    {dataSource.map((book) => {
      const {
        bookId,
        bookName,
        chapterCount = 0
      } = book;
      // const routerToBookInfo = `/film/${bookId}`
      const routerToBookInfo = `/film/${bookId}`
      return <div key={bookId} className={styles.secondListBox}>

        <Link href={routerToBookInfo} className={styles.bookImage}>
          <ImageLegacy
            className={styles.imageItem}
            onError={onImgError}
            placeholder="blur"
            blurDataURL={'/images/defaultFilm.png'}
            width={272}
            height={363}
            src={book.cover}
            alt={book.bookName}
          />
        </Link>

        <Link className={styles.chapterCount} href={routerToBookInfo}>
          <Image
            className={styles.playIcon}
            onError={onImgError}
            width={16}
            height={16}
            src='/images/layout/play.png'
            alt=''
          />
          <span className={styles.chapterText}>{`${chapterCount} ${t("home.episodes")}`}</span>
        </Link>

        <Link href={routerToBookInfo} className={styles.bookName}>
          {bookName}
        </Link>
         <Link href={routerToBookInfo} className={styles.bookNameBox}>
          <div className={styles.tagBox}>
            {(book?.tags || []).slice(0, 2).map(val => {
              return <div key={val} className={styles.tagItem}>{val}</div>
            })}
          </div>
        </Link>
      </div>
    })}
  </div>
}

export default PcLike;
