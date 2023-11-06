import React, { FC } from 'react';
import { IBookItem } from "@/typings/home.interface";
import Link from "next/link";
import { onImgError } from "@/components/common/image/ImageCover";
import ImageLegacy from "next/legacy/image";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import styles from '@/components/pcDetail/pcLike/PcLike.module.scss';

interface IProps {
  dataSource: IBookItem[];
}

const PcLike: FC<IProps> = ({ dataSource = [] }) => {
  const { t } = useTranslation()

  if (dataSource.length === 0) {
    return null
  }

  return <div className={styles.recommendBox}>
    <h2 className={styles.titleText}>{t('bookInfo.like')}</h2>
    <div className={styles.listBox}>
      {dataSource.map((book) => {

        return <div key={book.bookId} className={styles.listItem}>

          <div className={styles.coverBox}>
            <Link href={`/film/${book.bookId}`} className={styles.bookImage}>
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

            <Link className={styles.chapterCount} href={`/film/${book.bookId}`}>
              <Image
                className={styles.playIcon}
                onError={onImgError}
                width={16}
                height={16}
                src='/images/layout/play.png'
                alt=''
              />
              <span className={styles.chapterText}>{`${book.chapterCount} ${t("home.episodes")}`}</span>
            </Link>
          </div>

          <Link href={`/film/${book.bookId}`} className={styles.bookName}>
            {book.bookName}
          </Link>
          <Link href={`/film/${book.bookId}`} className={styles.tagBox}>
            {(book?.tags || []).slice(0, 2).map(val => {
              return <div key={val} className={styles.tagItem}>{val}</div>
            })}
          </Link>
        </div>
      })}
    </div>
  </div>


}

export default PcLike;
