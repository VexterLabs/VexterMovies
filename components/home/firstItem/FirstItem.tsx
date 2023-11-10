import React, { FC } from 'react'
import styles from '@/components/home/firstItem/FirstItem.module.scss'
import { IBookItem } from "@/typings/home.interface";
import Link from "next/link";
import { onImgError } from "@/components/common/image/ImageCover";
import Image from "next/legacy/image";

interface IProps {
  dataSource: IBookItem[];
  typeTwoId: number;
  typeTwoName: string;
}

const FirstItem: FC<IProps> = ({ dataSource, typeTwoId = 0, typeTwoName = ''}) => {
  return <div className={styles.firstItemWrap}>
    {dataSource && dataSource.length > 0 ? (dataSource as IBookItem[]).map((filmItem) => {

      const routerToBookInfo = `/film/${filmItem.bookId}?typeTwoName=${typeTwoName == 'all' ? '' : typeTwoName}&typeTwoId=${typeTwoId}`
      
      return <div key={filmItem.bookId} className={styles.itemBox}>
        <Link href={routerToBookInfo} className={styles.bookImage}>
          <Image
            className={styles.imageItem}
            onError={onImgError}
            placeholder="blur"
            blurDataURL={'/images/defaultFilm.png'}
            width={218}
            height={294}
            src={filmItem.cover}
            alt={filmItem.bookName}
          />
        </Link>

        <Link href={routerToBookInfo} className={styles.bookName}>
          {filmItem.bookName}
        </Link>
      </div>
    }) : null}
  </div>
}

export default FirstItem;
