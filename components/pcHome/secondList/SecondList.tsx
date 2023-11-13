import React, { FC } from 'react'
import { IBookItem } from "@/typings/home.interface";
import Link from "next/link";
import { onImgError } from "@/components/common/image/ImageCover";
import Image from "next/legacy/image";
import { useTranslation } from "next-i18next";
import styles from '@/components/pcHome/secondList/SecondList.module.scss'
import TypeTwoTag from "@/components/common/typeTwoTag";

interface IProps {
  dataSource: IBookItem[];
  typeTwoId?: number;
}

const SecondList: FC<IProps> = ({ dataSource = [], typeTwoId }) => {
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
      const routerToBookInfo = typeTwoId ? `/film/${bookId}?typeTwoId=${typeTwoId}` : `/film/${bookId}`

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

        <div className={styles.bookNameBox}>
          <Link href={routerToBookInfo} className={styles.bookNameHover}>
            {bookName}
          </Link>

          {book?.typeTwoList && book.typeTwoList.length > 0 ? <TypeTwoTag typeTwoList={book.typeTwoList}/> : null}
        </div>
      </div>
    })}
  </div>
}

export default SecondList;
