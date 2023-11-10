import React, { FC } from 'react'
import { IBookItem } from "@/typings/home.interface";
import Link from "next/link";
import { onImgError } from "@/components/common/image/ImageCover";
import Image from "next/legacy/image";
import { useTranslation } from "next-i18next";
import styles from '@/components/pcHome/secondList/SecondList.module.scss'

interface IProps {
  dataSource: IBookItem[];
  typeTwoId: number;
  typeTwoName: string;
}

const SecondList: FC<IProps> = ({ dataSource = [], typeTwoName = '', typeTwoId = 0 }) => {
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
      const routerToBookInfo = `/film/${bookId}?typeTwoName=${typeTwoName == 'all' ? '' : typeTwoName}&typeTwoId=${typeTwoId}`
      return <div key={bookId} className={styles.secondListBox}>

        <Link href={routerToBookInfo} className={styles.bookImage}>
          <Image
            className={styles.imageItem}
            onError={onImgError}
            placeholder="blur"
            blurDataURL={'/images/defaultFilm.png'}
            width={228}
            height={304}
            src={book.cover}
            alt={book.bookName}
          />
        </Link>

        <Link className={styles.chapterCount} href={routerToBookInfo}>
          <p>{`${chapterCount} ${t("home.episodes")}`}</p>
        </Link>

        <Link href={routerToBookInfo} className={styles.bookName}>
          {bookName}
        </Link>

        <Link href={routerToBookInfo} className={styles.bookNameBox}>
          <div className={styles.bookNameHover}>
            {bookName}
          </div>
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

export default SecondList;
