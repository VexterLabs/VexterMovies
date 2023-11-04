import React, { FC } from 'react';
import Link from "next/link";
import Image from "next/image";
import { onImgError } from "@/components/common/image/ImageCover";
import { IChapterList, IBookItem } from "@/typings/home.interface";
import { useTranslation } from "next-i18next";
import SecondList from "@/components/pcHome/secondList/SecondList";
import PcSeries from '@/components/pcDetail/pcSeries';
import PcLike from '@/components/pcDetail/pcLike';
import UsualTitle from "@/components/layout/usualTitle/UsualTitle";
import Breadcrumb, { IBreadcrumb } from "@/components/common/breadcrumb";
import styles from "@/components/pcDetail/index.module.scss";

interface IProps {
  bookInfo: IBookItem;
  recommends: IBookItem[];
  chapterList: IChapterList[];
  chapterName: string;
  breadData: IBreadcrumb[];
}

const PcDetail: FC<IProps> = ({ bookInfo, recommends = [], chapterList = [], chapterName, breadData}) => {
  const { t } = useTranslation()

  return <main className={styles.detailWrap}>
    <div className={styles.detailHeader}>
      <Breadcrumb data={breadData} />
    </div>

    <div className={styles.container}>
      <div className={styles.detailBox}>
        <div className={styles.detailBookCoverBox}>
          <Image
            onError={onImgError}
            className={styles.detailBookCover}
            width={315}
            height={420}
            src={bookInfo.cover}
            placeholder="blur"
            blurDataURL={'/images/defaultFilm.png'}
            alt={bookInfo.bookName}
          />
        </div>

        <div className={styles.detailBoxRight}>
          <div className={styles.detailBoxRightTop}>
            <Link href={`/film/${bookInfo.bookId}`}>
              <h1 className={styles.bookName}>{bookInfo.bookName}</h1>
            </Link>

            <p className={styles.intro}>
              {bookInfo.introduction}
            </p>

            <div className={styles.tagsContent}>
              { (bookInfo?.tags || []).map(val => {
                return <div key={val} className={styles.tagItem}>{val}</div>
              })}
            </div>
          </div>

          {chapterList?.[0]?.id ? <Link href={`/episode/${bookInfo.bookId}/${chapterList?.[0]?.id}`}
                                        className={styles.playBtn}>
            <Image
              className={styles.playIcon}
              width={16}
              height={16}
              src={'/images/book/play-icon.png'}
              alt={''}
            />
            <span>{t("home.play")}</span>
          </Link> : null}
        </div>
      </div>
      {/* pc端详情页剧集列表 */}
      <PcSeries chapterList={chapterList} chapterName={chapterName} bookInfo={bookInfo}/>
      {/* <PcHomeTitle title={t(item.name)} href={`/more/${ColumnNameRoute[item.name]}`}/> */}

      <div className={styles.recommendBox} style={recommends?.length>0 ? {} : {display:'none'}}>
        <h2 className={styles.titleText}>{t('bookInfo.like')}</h2>
        <PcLike dataSource={recommends}/>
      </div>

    </div>

  </main>
}

export default PcDetail;
