import React, { FC } from 'react';
import Link from "next/link";
import Image from "next/image";
import { onImgError } from "@/components/common/image/ImageCover";
import { IChapterList, IBookItem } from "@/typings/home.interface";
import { useTranslation } from "next-i18next";
import PcSeries from '@/components/pcFilm/pcSeries';
import PcLike from '@/components/pcFilm/pcLike';
import Breadcrumb, { IBreadcrumb } from "@/components/common/breadcrumb";
import styles from "@/components/pcFilm/index.module.scss";

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
            <h1 className={styles.bookName}>{bookInfo.bookName}</h1>

            <p className={styles.intro}>
              {bookInfo.introduction}
            </p>

            {
              bookInfo?.tags && bookInfo?.tags.length > 0 ?
                <div className={styles.tagsContent}>
                { (bookInfo.tags).map(val => {
                  return <Link href={`/browse/${bookInfo?.typeTwoIds[0] || 0}/`}>
                   <div key={val} className={styles.tagItem}>{val}</div>
                  </Link>
                })}
              </div> : null
            }
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
      <PcSeries chapterList={chapterList} bookInfo={bookInfo}/>
      <PcLike dataSource={recommends}/>
    </div>

  </main>
}

export default PcDetail;
