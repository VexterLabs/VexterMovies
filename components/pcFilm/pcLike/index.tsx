import React, { FC } from 'react';
import { IBookItem } from "@/typings/home.interface";
import Link from "next/link";
import { onImgError } from "@/components/common/image/ImageCover";
import Image from "next/image";
import ImageLegacy from "next/legacy/image";
import { useTranslation } from "next-i18next";
import styles from '@/components/pcFilm/pcLike/PcLike.module.scss';

interface IProps {
  dataSource: IBookItem[];
  onBookClick?: (book: IBookItem) => void;
  onChannel: (name: string) => void;
}

const PcLike: FC<IProps> = ({ dataSource = [], onBookClick, onChannel }) => {
  const { t } = useTranslation()

  if (dataSource.length === 0) {
    return null
  }

  return <div className={styles.recommendBox}>
    <h2 className={styles.titleText}>{t('bookInfo.recLike')}</h2>
    <div className={styles.listBox}>
      {dataSource.map((book) => {

        return <div key={book.bookId} className={styles.listItem}>
          <div className={styles.coverBox}>
            <Link
              href={`/film/${book.bookId}`}
              className={styles.bookImage}
              onClick={() => onBookClick && onBookClick(book)}>
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

            <Link
              className={styles.chapterCount}
              href={`/film/${book.bookId}`}
              onClick={() => onBookClick && onBookClick(book)}
            >
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
          <Link
            href={`/film/${book.bookId}`}
            className={styles.bookName}
            onClick={() => onBookClick && onBookClick(book)}>
            {book.bookName}
          </Link>
          {book?.typeTwoIds && book?.typeTwoIds.length > 0 ?
            <Link
              onClick={(e) => onChannel(book.typeTwoName)}
              href={`/browse/${book.typeTwoIds[0]}`}
              className={styles.tagItem}>{book.typeTwoName}</Link> : null
          }
        </div>
      })}
    </div>
  </div>


}

export default PcLike;
