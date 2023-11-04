import React, { FC, useState } from 'react'
import styles from "@/components/detail/index.module.scss";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { onImgError } from "@/components/common/image/ImageCover";
import { IBookItem, IBookItemDetail, IChapterList } from "@/typings/home.interface";
import { netIpUa } from "@/server/clientLog";
import { useAppSelector } from "@/store";
import ClientConfig from "@/client.config";
import useHiveLog from "@/hooks/useHiveLog";
import EpisopeNav from "@/components/layout/episopeNav/EpisopeNav"
import EpisopeDialog from '@/components/layout/episopeDialog/EpisopeDialog';
import LikeTitle from "@/components/detail/likeTitle/LikeTitle";
import LikeItem from "@/components/detail/likeItem/LikeItem";
import { onCopyText } from "@/utils/copy";

interface IProps {
  bookInfo: IBookItem;
  isApple: boolean;
  recommends: IBookItem[];
  chapterList: IChapterList[];
}

const MFilm: FC<IProps> = ({ bookInfo, isApple, recommends = [], chapterList = [] }) => {
  console.log('bookInfo', bookInfo)
  const { t } = useTranslation();
  const clipboard = useAppSelector(state => state.hive.clipboard)
  const copyText = useAppSelector(state => state.hive.copyText);
  const shopLink = useAppSelector(state => {
    if (isApple) {
      return ClientConfig.ios.deeplink + state.hive.copyText;
    }
    return ClientConfig.android.link;
  });
  const HiveLog = useHiveLog();
  const {
    bookId,
    bookName,
    introduction
  } = bookInfo;

  const [isShowMore, setIsShowMore] = useState(false);//查看介绍详情
  const [showDialog, setEpiDialog] = useState(false);//展示所有剧集的弹框
  const onMore = () => {
    setIsShowMore(true)
  }
  // 展示剧集弹框
  const showEpisodeDialog = () => {
    setEpiDialog(true)
  }
  // 关闭剧集弹框
  const closeEpisodeDialog = () => {
    setEpiDialog(false)
  }

  return <div className={styles.filmWrap}>
    <div className={styles.detailBox}>
      <Image
        onError={onImgError}
        className={styles.bookCover}
        width={280}
        height={378}
        src={bookInfo.cover}
        placeholder="blur"
        blurDataURL={'/images/defaultFilm.png'}
        alt={bookInfo.bookName}
      />

      {bookName ? <h1 className={styles.bookName}>{bookName}</h1> : null}

      {bookInfo?.tags && bookInfo?.tags.length > 0 ? <div className={styles.tagBox}>
        {(bookInfo?.tags || []).map(val => {
          return <div key={val} className={styles.tagItem}>{val}</div>
        })}
      </div> : null}

      <div className={styles.footerBox}>
        <Link rel={"nofollow"} className={styles.footerBtn} href={shopLink} onClick={() => {
          onCopyText(copyText, () => {
            netIpUa(clipboard)
            HiveLog.trackDownload('turnPage_click', { book_ID: bookId, chapter_id: 0 })
          })
        }}>
          <Image
            className={styles.playIcon}
            width={48}
            height={48}
            src={'/images/book/play-d.png'}
            alt={''}
          />
          <span>{t("home.play")}</span>
        </Link>
      </div>

      {introduction ? <div className={styles.introBox}>
        <p className={styles.introTitle}>{t('bookInfo.introduction')}</p>
        <p className={isShowMore ? styles.introTextMore : styles.introText}>{introduction}</p>
        {!isShowMore ? <div className={styles.introMore} onClick={() => onMore()}>{t('bookInfo.more')}</div> : null}
      </div> : null}
    </div>

    <div className={styles.episodeNav}>
      <div className={styles.leftInfo}>
        <p className={styles.innerPt}>Episodes List</p>
        <p className={styles.innerPl}>(180 Episodes)</p>
      </div>
      <div className={styles.rightImg}>
        <Image
          className={styles.arrowIcon}
          width={24}
          height={24}
          src={'/images/book/arrow-r-d.png'}
          alt={''}
        />
      </div>
    </div>

    <div>
      {/* <LikeTitle title={t(item.name)} href={`/more/${ColumnNameRoute[item.name]}`}/> */}
      <LikeTitle title="You Might Like"/>
      <LikeItem dataSource={recommends || []}/>
    </div>

    <EpisopeDialog
      chapterList={chapterList}
      closeDialog={closeEpisodeDialog}
      showDialog={showDialog}></EpisopeDialog>
    <div className={styles.navBox}>
      <div className={styles.episodesIcon} onClick={() => {showEpisodeDialog()}}>
        <Image
          className={styles.navIcon}
          width={64}
          height={64}
          src={'/images/book/episode-d.png'}
          alt={'more'}
        />
        {/* <span>{t('home.privacyPolicy')}</span> */}
        <span>Episodes</span>
      </div>
      <Link href={'/terms'} className={styles.playIcon}>
        <Image
          className={styles.navIcon}
          width={64}
          height={64}
          src={'/images/book/botplay-d.png'}
          alt={'more'}
        />
        {/* <span>{t('home.termsOfUse')}</span> */}
        <span className={styles.playTxt}>Play</span>
      </Link>
      <Link href={'/terms'} className={styles.downloadIcon}>
        <Image
          className={styles.navIcon}
          width={64}
          height={64}
          src={'/images/book/download-d.png'}
          alt={'more'}
        />
        {/* <span>{t('home.termsOfUse')}</span> */}
        <span>Download</span>
      </Link>
    </div>
  </div>

}

export default MFilm;
