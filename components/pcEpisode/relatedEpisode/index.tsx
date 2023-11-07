import React, { FC, useEffect, useState } from 'react'
import Link from "next/link";
import Image from "next/image";
import ImageLegacy from "next/legacy/image";
import { onImgError } from "@/components/common/image/ImageCover";
import { IBookItem, IChapterList } from "@/typings/home.interface";
import styles from "@/components/pcEpisode/relatedEpisode/index.module.scss";

// 该页面是展示pc端更多剧情的，需要修改后期
interface IProps {
  current: number;
  chapterList: IChapterList[];
  bookInfo:IBookItem;
  onChooseEpisode: (index: number) => void;
}

const RelatedEpisode: FC<IProps> = ({ current, chapterList = [], bookInfo, onChooseEpisode}) => {

  const [relatedList, setRelatedList] = useState(() => {
    const item = chapterList.slice(0 , current);
    const newList = chapterList.slice(current, chapterList.length);
    return newList.concat(item);
  });

  useEffect(() => {
    setRelatedList(() => {
      const item = chapterList.slice(0 , current);
      const newList = chapterList.slice(current, chapterList.length);
      return newList.concat(item);
    })
  }, [current]);

  return <div className={styles.relatedEpisode}>
    <div className={styles.relatedTitle}>Related Episodes</div>
    <div className={styles.listInfo}>
      { relatedList.map((item, index) => {
        const routerToVideoInfo = `/episode/${bookInfo.bookId}/${item.id}`;
        const isShow = index !== 0 && index <= (chapterList.length > 18 ? 18 : chapterList.length);
        return <div key={item.id} className={styles.listItem} style={isShow? {} : { display: 'none' }}>
          <Link
            className={styles.imgBox}
            href={routerToVideoInfo}
            onClick={() => onChooseEpisode(index)}
            shallow
            replace>
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
          <Link
            className={styles.rightIntro}
            href={routerToVideoInfo}
            onClick={() => onChooseEpisode(index)}
            shallow
            replace>
            <p className={styles.title}>{item.name}</p>
            <p className={styles.pageNum}>EP.{item.index + 1}</p>
          </Link>
        </div>
      })}
    </div>

  </div>
}

export default RelatedEpisode;
