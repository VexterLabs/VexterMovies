import React, { FC, useState } from 'react'
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import ImageLegacy from "next/legacy/image";
import { onImgError } from "@/components/common/image/ImageCover";
import { IBookItem, IChapterList } from "@/typings/home.interface";
import { useTranslation } from "next-i18next";
import classNames from "classnames";
import styles from "@/components/pcFilm/pcSeries/index.module.scss";

// 该页面是展示pc端更多剧情的，需要修改后期
interface IProps {
  chapterList: IChapterList[];
  bookInfo:IBookItem;
}

const PcSeries: FC<IProps> = ({ chapterList = [], bookInfo}) => {
  const [showMore, setShowMore] = useState(true);
  const tabList = Array.from({length: Math.ceil(chapterList.length / 30)},(v, i) => {
    return 1 + i * 30 + '-' + (i + 1) * 30
  });
  const [tabIndex, setTabIndex] = useState(0);
  const router = useRouter()
  const language = router?.locale || ''
  const { t } = useTranslation();

  return <div className={styles.episodeListBox}>
    <div className={styles.topInfo}>
      <div className={styles.episodeTitle}>{t("bookInfo.episodeList")}</div>
      <div className={styles.allCounts}>({chapterList.length} {t("bookInfo.episodes")})</div>
    </div>
    <div className={styles.listInfo}>
      { chapterList.map((item, index) => {
        const routerToVideoInfo = `/episode/${bookInfo.bookId}/${item.id}`;
        const isShow = showMore ? index < 11 : (index >= tabIndex * 30 && index < (tabIndex + 1) * 30);
        return <div key={item.id} className={styles.listItem} style={isShow? {} : { display: 'none' }}>
          <Link href={routerToVideoInfo} className={styles.imgBox}>
            <ImageLegacy
              className={styles.imageItem}
              onError={onImgError}
              placeholder="blur"
              blurDataURL={'/images/defaultFilm.png'}
              width={88}
              height={117}
              src={item.cover || bookInfo.cover}
              alt={item.name}
            />
            { !item.unlock ? <div className={styles.imageMark}>
              <Image
                className={styles.lockIcon}
                width={24}
                height={24}
                src={'/images/book/lock-video.png'}
                alt={''}
              />
            </div> : null }
          </Link>
          <Link href={routerToVideoInfo} className={styles.rightIntro}>
            <span className={styles.title}>{bookInfo.bookName}</span>
            <span className={styles.pageNum}>{language==='en' || !language ?  `EP.${item.index + 1}` :  `${item.index + 1} ${t("home.episodes")}`}</span>
          </Link>
        </div>
      })}
      {chapterList.length > 11 && showMore ? <div className={styles.listItem} onClick={() => setShowMore(false)}>
        <div className={styles.viewMore}>
          <span>{t("bookInfo.viewMore")}</span>
          <Image
            className={styles.moreIcon}
            width={16}
            height={16}
            src={'/images/book/view-more.png'}
            alt={''}
          />
        </div>
      </div> : null}
    </div>

    {!showMore && tabList.length > 1 ?
      <div className={styles.tabBox}>
        {tabList.map((val,index) => (
          <div
            key={val}
            className={classNames(styles.tabItem, index === tabIndex && styles.tabItemActive)}
            onClick={() => setTabIndex(index)}>{val}</div>
        ))}
      </div>
      : null}
  </div>
}

export default PcSeries;
