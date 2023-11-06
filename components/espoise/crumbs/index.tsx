import Link from "next/link";
import styles from "@/components/espoise/crumbs/index.module.scss";
import React, { FC } from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { IBookItemDetail } from "@/typings/home.interface";

interface IProps {
  bookInfo: IBookItemDetail;
  isPc?: boolean;
  currentPage: number;
}

const BookCrumbs: FC<IProps> = ({ bookInfo, currentPage }) => {
  const { t } = useTranslation();

  const typeTwoId = bookInfo.typeTwoIds?.[0] || 0;
  let typeTwoName = t('browse.all')
  if (bookInfo.typeTwoNames?.[0] && bookInfo.typeTwoNames?.[0] !== 'all') {
    typeTwoName = bookInfo.typeTwoNames?.[0]
  }
  return <div className={styles.crumbsWrap} >
    <Link href="/" className={styles.crumbsItem}>
      {t('home.home')}
      <Image
        className={styles.crumbsIcon}
        width={48}
        height={48}
        src={'/images/layout/link.png'}
        alt={'>'}
      />
    </Link>
    <Link className={styles.crumbsItem} href={`/browse/${typeTwoId}`}>
      {typeTwoName}
      <Image
        className={styles.crumbsIcon}
        width={48}
        height={48}
        src={'/images/layout/link.png'}
        alt={'>'}
      />
    </Link>
    <Link className={styles.crumbsItemTwo} href={`/film/${bookInfo.bookId}`}>
      {bookInfo.bookName}
    </Link>
    <div className={styles.currentNum}>
      <Image
        className={styles.crumbsIcon}
        width={48}
        height={48}
        src={'/images/layout/link.png'}
        alt={'>'}
      />
      <div className={styles.crumbsItemTxt}>{currentPage + 1}</div>
    </div>
    
  </div>
}

export default BookCrumbs;
