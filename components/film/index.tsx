import React, { FC, useState } from 'react';
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { onImgError } from "@/components/common/image/ImageCover";
import { IBookItem, IChapterList } from "@/typings/home.interface";
import useHiveLog from "@/hooks/useHiveLog";
import EpisopeDialog from '@/components/episode/episopeDialog/EpisopeDialog';
import Breadcrumb, { IBreadcrumb } from "@/components/common/breadcrumb";
import LikeTitle from "@/components/film/likeTitle/LikeTitle";
import LikeItem from "@/components/film/likeItem/LikeItem";
import { Ellipsis } from "antd-mobile";
import EpisodeNav from "@/components/episode/episodeNav/EpisodeNav";
import styles from "@/components/film/index.module.scss";

interface IProps {
  breadData: IBreadcrumb[];
  bookInfo: IBookItem;
  isApple: boolean;
  recommends: IBookItem[];
  chapterList: IChapterList[];
  chapterName: string;
  onBookClick: (book: IBookItem) => void;
  onChannel: (name: string) => void;
}

const MFilm: FC<IProps> = (
  {
    bookInfo,
    isApple,
    recommends = [],
    chapterList = [],
    chapterName,
    breadData,
    onBookClick,
    onChannel
  }) => {
  const { t } = useTranslation();
  const HiveLog = useHiveLog();

  const [showDialog, setEpiDialog] = useState(false);//展示所有剧集的弹框

  // 展示剧集弹框
  const showEpisodeDialog = () => {
    setEpiDialog(true);
    HiveLog.track('EpisodesList_click')
  }
  // 关闭剧集弹框
  const closeEpisodeDialog = () => {
    setEpiDialog(false)
  }

  return <div className={styles.filmWrap}>
    <div className={styles.filmHeader}>
      <Breadcrumb data={breadData} isWap={true}/>
    </div>
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

      {bookInfo.bookName ? <h1 className={styles.bookName}>{bookInfo.bookName}</h1> : null}

      {bookInfo?.typeTwoList && bookInfo?.typeTwoList.length > 0 ? <div className={styles.tagBox}>
        {(bookInfo?.typeTwoList || []).map(val => {
          return <Link
            onClick={() => onChannel(val.name)}
            key={val.id}
            href={`/browse/${val.id}`}
            className={styles.tagItem}>{val.name}</Link>
        })}
      </div> : null}

      <div className={styles.footerBox}>
        <Link rel={"nofollow"} className={styles.footerBtn} href={`/episode/${bookInfo.bookId}`}>
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

      {bookInfo.introduction ? <div className={styles.introBox}>
        <p className={styles.introTitle}>{t('bookInfo.introduction')}</p>

        <Ellipsis
          rows={3}
          className={styles.introText}
          direction='end'
          expandText={<span className={styles.expand}>
            {t("home.more")}
            <Image
              className={styles.moreIcon}
              width={24}
              height={24}
              src={'/images/episode/wap-more.png'}
              alt={''}
            />
          </span>}
          collapseText={<span className={styles.retract}>
            <Image
              className={styles.moreIcon}
              width={24}
              height={24}
              src={'/images/episode/wap-more.png'}
              alt={''}
            />
          </span>}
          content={bookInfo.introduction}/>
      </div> : null}
    </div>

    <div className={styles.episodeNav} onClick={() => {
      showEpisodeDialog()
    }}>
      <div className={styles.leftInfo}>
        <p className={styles.innerPt}>{t('bookInfo.episodeList')}</p>
        <p className={styles.innerPl}>({chapterList && chapterList.length} {t('bookInfo.episodes')})</p>
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

    {recommends.length > 0 ? <>
      <LikeTitle title={t('bookInfo.recLike')}/>
      <LikeItem dataSource={recommends || []} onBookClick={onBookClick}/>
    </> : null}

    <EpisopeDialog
      bookInfo={bookInfo}
      chapterName={chapterName}
      chapterList={chapterList}
      closeDialog={closeEpisodeDialog}
      showDialog={showDialog}/>

    <EpisodeNav
      isApple={isApple}
      bookInfo={bookInfo}
      showEpisodeDialog={showEpisodeDialog}
    />
  </div>

}

export default MFilm;
