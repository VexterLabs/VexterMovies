import React, { FC, useEffect, useState } from 'react'
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { onImgError } from "@/components/common/image/ImageCover";
import { useTranslation } from "next-i18next";
import { IBookItem, IChapterList } from "@/typings/home.interface";
import styles from "@/components/pcEpisode/relatedEpisode/index.module.scss";

// 该页面是展示pc端更多剧情的，需要修改后期
interface IProps {
  current: number;
  chapterList: IChapterList[];
  bookInfo:IBookItem;
  onChooseEpisode: (index: number,id: string) => void;
}

const RelatedEpisode: FC<IProps> = ({ current, chapterList = [], bookInfo, onChooseEpisode}) => {

  const [relatedList, setRelatedList] = useState(() => {
    const item = chapterList.slice(0 , current);
    const newList = chapterList.slice(current, chapterList.length);
    return newList.concat(item);
  });
  const router = useRouter()
  const language = router?.locale || ''
  const { t } = useTranslation();
  useEffect(() => {
    setRelatedList(() => {
      const item = chapterList.slice(0 , current);
      const newList = chapterList.slice(current, chapterList.length);
      return newList.concat(item);
    })
  }, [current]);

  return <div className={styles.relatedEpisode}>
    <div className={styles.relatedTitle}>{t("bookInfo.relatedEpisodes")}</div>
    <div className={styles.listInfo}>
      { relatedList.map((item, index) => {
        const routerToVideoInfo = `/episode/${bookInfo.bookId}/${item.id}`;
        const isShow = index !== 0 && index <= (chapterList.length > 18 ? 18 : chapterList.length) || (index === 0 && chapterList.length === 1);
        return <div key={item.id} className={styles.listItem} style={isShow? {} : { display: 'none' }}>
          <Link
            className={styles.imgBox}
            href={routerToVideoInfo}
            onClick={() => onChooseEpisode(index,item.id)}
            shallow
            replace>
            <Image
              className={styles.imageItem}
              onError={onImgError}
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
          <Link
            className={styles.rightIntro}
            href={routerToVideoInfo}
            onClick={() => onChooseEpisode(index,item.id)}
            shallow
            replace>
            <span className={styles.title}>{bookInfo.bookName}</span>
            <span className={styles.pageNum}>
              {language==='en' || !language ?  `EP.${item.index + 1}` :  `${item.index + 1} ${t("home.episodes")}`}
              </span>
          </Link>
        </div>
      })}
    </div>

  </div>
}

export default RelatedEpisode;
