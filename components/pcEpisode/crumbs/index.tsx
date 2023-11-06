import Link from "next/link";
import styles from "@/components/pcEpisode/crumbs/index.module.scss";
import React, { FC } from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { IBookItem, IBookItemDetail } from "@/typings/home.interface";

interface IProps {
  bookInfo: IBookItemDetail;
  isPc?: boolean;
  currentPage: number;
}

const PcCrumbs: FC<IProps> = ({ bookInfo, isPc, currentPage }) => {
  const { t } = useTranslation();

  const typeTwoId = bookInfo.typeTwoIds?.[0] || 0;
  let typeTwoName = t('browse.all')
  if (bookInfo.typeTwoNames?.[0] && bookInfo.typeTwoNames?.[0] !== 'all') {
    typeTwoName = bookInfo.typeTwoNames?.[0]
  }

  return <div className={styles.crumbsWrap} style={isPc ? { display: 'none' } : {}}>
    <Link href="/" className={styles.crumbsItem}>
      {t('home.home')}
      <Image
        className={styles.crumbsIcon}
        width={16}
        height={16}
        src={'/images/layout/link.png'}
        alt={'>'}
      />
    </Link>
    <Link className={styles.crumbsItem} href={`/browse/${typeTwoId}`}>
      {typeTwoName}
      <Image
        className={styles.crumbsIcon}
        width={16}
        height={16}
        src={'/images/layout/link.png'}
        alt={'>'}
      />
    </Link>
    <Link className={styles.crumbsItem} href={`/film/${bookInfo.bookId}`}>
      {bookInfo.bookName}
      <Image
        className={styles.crumbsIcon}
        width={16}
        height={16}
        src={'/images/layout/link.png'}
        alt={'>'}
      />
    </Link>
    {/* <div className={styles.crumbsItemTxt}>{bookInfo.bookName}</div> */}
    <div className={styles.crumbsItemTxt}>{currentPage + 1}</div>
  </div>
}

export default PcCrumbs;
