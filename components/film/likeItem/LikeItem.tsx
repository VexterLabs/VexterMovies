import React, { FC } from 'react';
import { IBookItem } from "@/typings/home.interface";
import Link from "next/link";
import { ImageCover } from "@/components/common/image/ImageCover";
import styles from '@/components/film/likeItem/LikeItem.module.scss';

interface IProps {
  dataSource: IBookItem[];
  onBookClick?: (item: IBookItem) => void;
  onChannel: (name: string) => void;
}

const LikeItem: FC<IProps> = ({ dataSource, onBookClick, onChannel }) => {
  return <div className={styles.firstItemWrap}>
    {dataSource && dataSource.length > 0 ? (dataSource as IBookItem[]).map((detailItem) => {
      return <div key={detailItem.bookId} className={styles.itemBox}>
        <ImageCover
          onClick={() => onBookClick && onBookClick(detailItem)}
          href={`/film/${detailItem.bookId}`}
          className={styles.bookImage}
          replace={true}
          width={218}
          height={294}
          src={detailItem.cover}
          alt={detailItem.bookName}
        />

        <Link
          onClick={() => onBookClick && onBookClick(detailItem)}
          href={`/film/${detailItem.bookId}`} className={styles.bookName} replace>
          {detailItem.bookName}
        </Link>
        {detailItem.typeTwoIds && detailItem.typeTwoIds.length > 0 ?
          <Link
            onClick={() => onChannel(detailItem.typeTwoName)}
            href={`/browse/${detailItem.typeTwoIds[0]}`}
            className={styles.bookTags}>
            { detailItem.typeTwoName }
          </Link> : null}
      </div>
    }) : null}
  </div>
}

export default LikeItem;
