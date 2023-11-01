import React, { FC } from 'react'
import styles from '@/components/home/firstItem/FirstItem.module.scss'
import { IBookItem } from "@/typings/home.interface";
import Link from "next/link";
import { onImgError } from "@/components/common/image/ImageCover";
import Image from "next/legacy/image";

interface IProps {
  dataSource: IBookItem[];
  priority?: boolean;
}

const FirstItem: FC<IProps> = ({ dataSource, priority }) => {
  return <div className={styles.firstItemWrap}>
    {dataSource && dataSource.length > 0 ? (dataSource as IBookItem[]).map((filmItem) => {

      return <div key={filmItem.bookId} className={styles.itemBox}>
        <Link href={`/detail/${filmItem.bookId}`} className={styles.bookImage}>
          <Image
            priority={priority}
            className={styles.imageItem}
            onError={onImgError}
            placeholder="blur"
            blurDataURL={filmItem.cover}
            width={218}
            height={294}
            src={filmItem.cover}
            alt={filmItem.bookName}
          />
        </Link>

        <Link href={`/detail/${filmItem.bookId}`} className={styles.bookName}>
          {filmItem.bookName}
        </Link>
      </div>
    }) : null}
  </div>
}

export default FirstItem;
