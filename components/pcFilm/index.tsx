import React, { FC } from 'react'
import styles from "@/components/pcFilm/index.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { onImgError } from "@/components/common/image/ImageCover";
import { IBookItem } from "@/typings/home.interface";
import { useTranslation } from "next-i18next";
import SecondList from "@/components/pcHome/secondList/SecondList";

interface IProps {
  bookInfo: IBookItem;
  firstChapterId: string;
  recommends: IBookItem[];
}

const PcFilm: FC<IProps> = ({ bookInfo, firstChapterId, recommends = []  }) => {
  const { t } = useTranslation()

  const router = useRouter();

  return <>
    <div className={styles.backHead}>
      <div className={styles.backBox}>
        <div className={styles.backBoxLink} onClick={() => {
          router.back();
        }}>
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
        </div>
      </div>
    </div>
    <div className={styles.detailBox}>
      <div className={styles.detailBookCoverBox}>
        <Image
          onError={onImgError}
          className={styles.detailBookCover}
          width={272}
          height={363}
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
          <p className={styles.chapterCount}>
            {`${bookInfo.chapterCount || 0} ${t("home.episodes")}`}
          </p>

          <p className={styles.intro}>
            {bookInfo.introduction}
          </p>

          <div className={styles.tagsContent}>
            { (bookInfo?.tags || []).map(val => {
              return <div key={val} className={styles.tagItem}>{val}</div>
            })}
          </div>
        </div>

        <Link rel={"nofollow"} href={`/download?filmId=${bookInfo.bookId}`} className={styles.playBtn}>
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
    {recommends.length > 0 ? <div className={styles.recommendBox}>
      <h2 className={styles.titleText}>{t('bookInfo.like')}</h2>
      <SecondList dataSource={recommends}/>
    </div> : null }
  </>
}

export default PcFilm;
