import React, { FC, useState } from 'react'
import styles from "@/components/pcFilm/index.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { onImgError } from "@/components/common/image/ImageCover";
import { IBookItemDetail, IChapterList, ColumnNameRoute, IBookItem } from "@/typings/home.interface";
import { useTranslation } from "next-i18next";
import PcSeries from '@/components/pcFilm/pcSeries';
import PcLike from '@/components/pcFilm/pcLike';
import UsualTitle from "@/components/layout/usualTitle/UsualTitle";

interface IProps {
  bookInfo: IBookItem;
  recommends: IBookItem[];
  chapterList: IChapterList[];
  chapterName: string;
}

const PcDetail: FC<IProps> = ({ bookInfo, recommends = [], chapterList = [], chapterName}) => {
  const { t } = useTranslation()
  const [chapterFirstId, setChapterId] = useState(chapterList&&chapterList.length>0&&chapterList[0].id)//设置剧集的首剧集id

  const router = useRouter();

  return <>
    <main className={styles.filmWrap}>
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

          <Link  href={`/episode/${bookInfo?.replacedBookId || bookInfo.bookId}/${chapterFirstId}`} className={styles.playBtn}>
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
      <PcSeries chapterList={chapterList} chapterName={chapterName} bookInfo={bookInfo}></PcSeries>
      <div className="styles.mightLikc" style={recommends?.length>0 ? {} : {display:'none'}}>
        {/* <PcHomeTitle title={t(item.name)} href={`/more/${ColumnNameRoute[item.name]}`}/> */}
        <UsualTitle title='YOU Might Like'/>
        <PcLike dataSource={recommends}></PcLike>
      </div>
    </main>
  </>
}

export default PcDetail;
