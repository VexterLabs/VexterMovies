import React, { FC } from 'react'
import styles from '@/components/pcMore/index.module.scss'
import PcHomeTitle from "@/components/pcHome/homeTitle/HomeTitle";
import { ColumnNameRoute, IHomeResItem } from "@/typings/home.interface";
import PaginationCom from "@/components/common/paginationCom";
import Link from "next/link";
import SecondList from "@/components/pcHome/secondList/SecondList";
import { PcEmpty } from "@/components/common/empty";
import Image from "next/image";
import { useTranslation } from "next-i18next";

interface IProps {
  moreData: IHomeResItem;
  pageNo: number;
  pages: number;
}

const PcMore: FC<IProps> = ({ moreData, pages, pageNo }) => {
  const { t } = useTranslation()
  return <>
    <div className={styles.backHead}>
      <div className={styles.backBox}>
        <Link href={'/'} className={styles.backBoxLink}>
          <Image
            className={styles.backIcon}
            width={16}
            height={16}
            src={'/images/home/pc-more.png'}
            alt={''}
          />
          <Image
            className={styles.backIconActive}
            width={16}
            height={16}
            src={'/images/home/pc-more-active.png'}
            alt={''}
          />
          <span>{t("home.back")}</span>
        </Link>
      </div>
    </div>
    <div className={styles.moreContent}>

      {moreData?.items && moreData.items.length > 0 ?
        <>
          <PcHomeTitle title={t(moreData.name)} />
          <div className={styles.moreBookList}>
            <SecondList dataSource={moreData.items} />
            {pages && pages > 1 ? <PaginationCom
              path={`/more/${ColumnNameRoute[moreData.name]}/`}
              pageNo={pageNo}
              totalPage={pages}
              isScroll={true}
            /> : null}
          </div>
        </> : <PcEmpty/>}
    </div>
  </>
}

export default PcMore
