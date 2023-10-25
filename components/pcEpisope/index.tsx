import React, { FC, useEffect, useState } from 'react'
import styles from "@/components/pcEpisope/index.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { onImgError } from "@/components/common/image/ImageCover";
import { IBookItem, IEpisopeItem } from "@/typings/home.interface";
import { useTranslation } from "next-i18next";

interface IProps {
  episope: IEpisopeItem[]
  // bookInfo: IBookItem;
  // firstChapterId: string;
  // recommends: IBookItem[];
}

const PcEpisope: FC<IProps> = ({ episope = [] }) => {
  const { t } = useTranslation()
  const [showMore, setMore] = useState<Boolean>(false)
  const [listData, setData] = useState(episope.slice(0,11))
  const setDataFn = () => {
    setData(episope)
    // 判断更多框是否要出现
    setMore(true)
  }
  useEffect(() => {
    
  })
  
  return <>
    <div className={styles.episopeBox}>
      <div className={styles.topInfo}>
        <div className={styles.episopeTitle}>EpisodesList</div>
        <div className={styles.allCounts}>(180 Episopes)</div>
      </div>
      <div className={styles.listInfo}>
        { listData.map(episopeItem => {
          const {
            name,
            cover,
            chapterCount
          } = episopeItem
          const routerToVideoInfo = `/`
          return <div className={styles.listBox}>
            <Link href={routerToVideoInfo} className={styles.listLink}>
              <div key={chapterCount} className={styles.listItem}>
                <div className={styles.imgLeft}>
                  <Image
                    className={styles.imageItem}
                    onError={onImgError}
                    placeholder="blur"
                    blurDataURL={episopeItem.cover}
                    width={88}
                    height={117}
                    src={episopeItem.cover}
                    alt={episopeItem.name}
                  />
                </div>
                <div className={styles.rightIntro}>
                  <p className={styles.title}>{episopeItem.name}</p>
                  <p className={styles.pageNum}>{episopeItem.chapterCount}</p>
                </div>
              </div>
            </Link>
          </div>
        })}
        <div className={styles.listItem} style={showMore && listData.length > 11 ? {display:'none'} : {}} onClick={() => setDataFn()}>
          <p className={styles.viewMore}>View More</p>
        </div>
      </div>
    </div>
  </>
}

export default PcEpisope;
