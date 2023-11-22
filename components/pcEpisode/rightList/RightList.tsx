import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { onImgError } from "@/components/common/image/ImageCover";
import { IChapterList } from "@/typings/home.interface";
import classNames from "classnames";
import { useRouter } from "next/router";
import styles from "@/components/pcEpisode/rightList/RightList.module.scss";

interface IProps {
  bookId: string;
  current: number;
  chapterList: IChapterList[];
  onChooseEpisode: (index: number, id: string) => void;
}

const RightList: FC<IProps> = ({ current, chapterList, bookId, onChooseEpisode }) => {
  const { t } = useTranslation();
  const router = useRouter()
  const language = router?.locale || ''
  return <div className={styles.rightBox}>
    <div className={styles.rightTop}>
      <span className={styles.title}>{t("home.episodes")}</span>
      <span className={styles.current}>({current + 1}/{chapterList.length})</span>
    </div>
    <div className={styles.allEpo}>
      {
        chapterList.map((item, index) => {
          return <div
            key={item.id}
            className={styles.listItem}
            onClick={() => {onChooseEpisode(index, item.id)}}>
            <Link href={`/episode/${bookId}/${item.id}`} className={styles.imgBox} shallow replace>
              <Image
                className={styles.imgItem}
                onError={onImgError}
                placeholder="blur"
                blurDataURL={'/images/defaultFilm.png'}
                width={88}
                height={89}
                src={item.cover}
                alt='photo'
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
              href={`/episode/${bookId}/${item.id}`}
              shallow
              replace
              className={classNames(styles.linkText, current === index && styles.active)}>
              {language==='en' || !language ?  `EP.${index + 1}` :  `${index + 1} ${t("home.episodes")}`}
            </Link>
          </div>
        })
      }
    </div>
  </div>
}

export default RightList;
