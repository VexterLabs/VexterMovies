import React, { FC } from 'react';
import { IBookItem } from "@/typings/home.interface";
import Link from "next/link";
import { onImgError } from "@/components/common/image/ImageCover";
import Image from "next/legacy/image";
import styles from '@/components/film/likeItem/LikeItem.module.scss';

interface IProps {
  dataSource: IBookItem[];
  onBookClick?: (item: IBookItem) => void;
}

const LikeItem: FC<IProps> = ({ dataSource, onBookClick }) => {
  return <div className={styles.firstItemWrap}>
    {dataSource && dataSource.length > 0 ? (dataSource as IBookItem[]).map((detailItem, index) => {
      return <div key={detailItem.bookId} className={styles.itemBox} onClick={() => onBookClick && onBookClick(detailItem)}>
        <Link href={`/film/${detailItem.bookId}`} className={styles.bookImage} replace>
          <Image
            className={styles.imageItem}
            onError={onImgError}
            placeholder="blur"
            blurDataURL={'/images/defaultFilm.png'}
            width={218}
            height={294}
            src={detailItem.cover}
            alt={detailItem.bookName}
          />
        </Link>

        <Link href={`/film/${detailItem.bookId}`} className={styles.bookName} replace>
          {detailItem.bookName}
        </Link>
        {detailItem.typeTwoIds && detailItem.typeTwoIds.length > 0 ?
          <Link href={`/browse/${detailItem.typeTwoIds[0]}`} className={styles.bookTags}>
            { detailItem.typeTwoName }
          </Link> : null}
      </div>
    }) : null}
  </div>
}

export default LikeItem;
