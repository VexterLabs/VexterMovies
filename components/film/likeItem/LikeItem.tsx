import React, { FC } from 'react';
import { IBookItem } from "@/typings/home.interface";
import Link from "next/link";
import { onImgError } from "@/components/common/image/ImageCover";
import Image from "next/legacy/image";
import styles from '@/components/film/likeItem/LikeItem.module.scss';

interface IProps {
  dataSource: IBookItem[];
}

const LikeItem: FC<IProps> = ({ dataSource }) => {
  return <div className={styles.firstItemWrap}>
    {dataSource && dataSource.length > 0 ? (dataSource as IBookItem[]).map((detailItem, index) => {
      return <div key={detailItem.bookId} className={styles.itemBox}>
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
        <Link href={`/film/${detailItem.bookId}`} className={styles.bookTags} replace>
          <div className={styles.tagBox}>
            {(detailItem?.tags || []).slice(0, 2).map(val => {
              return <div key={val} className={styles.tagItem}>{val}</div>
            })}
          </div>
        </Link>
      </div>
    }) : null}
  </div>
}

export default LikeItem;
