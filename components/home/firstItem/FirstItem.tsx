import React, { FC } from 'react'
import styles from '@/components/home/firstItem/FirstItem.module.scss'
import { IBookItem } from "@/typings/home.interface";
import Link from "next/link";
import { ImageCover, onImgError } from "@/components/common/image/ImageCover";
import Image from "next/image";

interface IProps {
  dataSource: IBookItem[];
}

const FirstItem: FC<IProps> = ({ dataSource}) => {
  return <div className={styles.firstItemWrap}>
    {dataSource && dataSource.length > 0 ? (dataSource as IBookItem[]).map((filmItem) => {

      const routerToBookInfo = `/film/${filmItem.bookId}`

      return <div key={filmItem.bookId} className={styles.itemBox}>
        <ImageCover
          href={routerToBookInfo}
          className={styles.bookImage}
          width={218}
          height={294}
          src={filmItem.cover}
          alt={filmItem.bookName}
        />
        <Link href={routerToBookInfo} className={styles.bookName}>
          {filmItem.bookName}
        </Link>
      </div>
    }) : null}
  </div>
}

export default FirstItem;
