import React, { FC } from 'react'
import styles from '@/components/detail/likeItem/LikeItem.module.scss'
import { IBookItem, IBookItemDetail } from "@/typings/home.interface";
import Link from "next/link";
import { onImgError } from "@/components/common/image/ImageCover";
import Image from "next/legacy/image";

interface IProps {
  dataSource: IBookItemDetail[];
  priority?: boolean;
}

const LikeItem: FC<IProps> = ({ dataSource, priority }) => {
  return <div className={styles.firstItemWrap}>
    {dataSource && dataSource.length > 0 ? (dataSource as IBookItemDetail[]).map((detailItem) => {

      return <div key={detailItem.bookId} className={styles.itemBox}>
        <Link href={`/detail/${detailItem.bookId}`} className={styles.bookImage}>
          <Image
            priority={priority}
            className={styles.imageItem}
            onError={onImgError}
            placeholder="blur"
            blurDataURL={detailItem.cover}
            width={218}
            height={294}
            src={detailItem.cover}
            alt={detailItem.bookName}
          />
        </Link>

        <Link href={`/detail/${detailItem.bookId}`} className={styles.bookName}>
          {detailItem.bookName}
        </Link>
        <Link href={`/detail/${detailItem.bookId}`} className={styles.bookTags}>
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
