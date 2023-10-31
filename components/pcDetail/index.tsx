import React, { FC } from 'react'
import styles from "@/components/pcDetail/index.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { onImgError } from "@/components/common/image/ImageCover";
import { IBookItem, IEpisopeItem } from "@/typings/home.interface";
import { useTranslation } from "next-i18next";
import SecondList from "@/components/pcHome/secondList/SecondList";
import PcSeries from '@/components/pcSeries';
import PcLike from '@/components/pcLike';

interface IProps {
  bookInfo: IBookItem;
  firstChapterId: string;
  recommends: IBookItem[];
  episopeList:IEpisopeItem[];
  mockRecommends:IBookItem[];
}

const PcDetail: FC<IProps> = ({ bookInfo, firstChapterId, recommends = [], episopeList = [], mockRecommends = []  }) => {
  const { t } = useTranslation()

  const router = useRouter();
  
  return <>
    <div className={styles.detailBox}>
      <div className={styles.detailBookCoverBox}>
        <Image
          onError={onImgError}
          className={styles.detailBookCover}
          width={315}
          height={420}
          src={bookInfo.cover}
          placeholder="blur"
          blurDataURL={bookInfo.cover}
          alt={bookInfo.bookName}
        />
      </div>

      <div className={styles.detailBoxRight}>
        <div className={styles.detailBoxRightTop}>
          <Link href={`/film/${bookInfo.bookId}`}>
            <h1 className={styles.bookName}>{bookInfo.bookName}</h1>
          </Link>
          {/* <p className={styles.chapterCount}>
            {`${bookInfo.chapterCount || 0} ${t("home.episodes")}`}
          </p> */}

          <p className={styles.intro}>
            {bookInfo.introduction}
          </p>

          <div className={styles.tagsContent}>
            { (bookInfo?.tags || []).map(val => {
              return <div key={val} className={styles.tagItem}>{val}</div>
            })}
          </div>
        </div>

        <Link rel={"nofollow"} href={`/download?filmId=${bookInfo?.replacedBookId || bookInfo.bookId}`} className={styles.playBtn}>
          <Image
            className={styles.playIcon}
            width={16}
            height={16}
            src={'/images/book/play-icon.png'}
            alt={''}
          />
          <span>{t("home.play")}</span>
        </Link>
      </div>
    </div>
    {/* pc端详情页剧集列表 */}
    <PcSeries episope={episopeList}></PcSeries>
    {/* <PcHomeTitle title={t(item.name)} href={`/more/${ColumnNameRoute[item.name]}`}/> */}
    <PcLike dataSource={mockRecommends}></PcLike>
    {/* {recommends.length > 0 ? <div className={styles.recommendBox}>
      <h2 className={styles.titleText}>{t('bookInfo.like')}</h2>
      <SecondList dataSource={recommends}/>
    </div> : null } */}
  </>
}

export default PcDetail;
