import React, { FC } from 'react'
import styles from "@/components/pcBook/index.module.scss";
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

const PcBook: FC<IProps> = ({ bookInfo, firstChapterId, recommends = []  }) => {
  const { t } = useTranslation()

  const routerToBook = `/download?${bookInfo.bookId}`;

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
      <Image
        onError={onImgError}
        className={styles.detailBookCover}
        width={272}
        height={363}
        src={bookInfo.cover}
        placeholder="blur"
        blurDataURL={bookInfo.cover || '/images/defaultBook.png'}
        alt={bookInfo.bookName}
      />

      <div className={styles.detailBoxRight}>
        <div className={styles.detailBoxRightTop}>
          <Link href={routerToBook}>
            <h1 className={styles.bookName}>{bookInfo.bookName}</h1>
          </Link>
          <Link href={routerToBook} className={styles.viewCountDisplay}>
            {`${bookInfo.viewCountDisplay || "0"} ${t("home.episodes")}`}
          </Link>

          <Link href={routerToBook} className={styles.intro}>
            {bookInfo.introduction}
          </Link>

          <div className={styles.tagsContent}>
            { (bookInfo?.tags || []).map(val => {
              return <Link key={val} href={routerToBook} className={styles.tagItem}>{val}</Link>
            })}
          </div>
        </div>

        <Link href={`/download?${bookInfo.bookId}`} className={styles.playBtn}>
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

export default PcBook;
