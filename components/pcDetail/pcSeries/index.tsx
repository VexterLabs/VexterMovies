import React, { FC, useEffect, useState } from 'react'
import styles from "@/components/pcDetail/pcSeries/index.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { onImgError } from "@/components/common/image/ImageCover";
import { IBookItemDetail, IChapterList, IEpisopeTab } from "@/typings/home.interface";
import { useTranslation } from "next-i18next";

// 该页面是展示pc端更多剧情的，需要修改后期
interface IProps {
  chapterList: IChapterList[];
  chapterName: string;
}

const PcSeries: FC<IProps> = ({ chapterList = [], chapterName}) => {
  console.log('chapterList', chapterList)
  const { t } = useTranslation()
  const [showMore, setMore] = useState<Boolean>(true)
  // const [listData, setData] = useState(chapterList.length > 11 ? chapterList.slice(0,11) : chapterList)
  const [videoList, setVideoList] = useState(chapterList)
  const [tabArr, setTab] = useState([])
  const [curIndx, setCurindex] = useState(0)

  // 处理剧集是否展示相关属性showEposide
  const dealVideoData = (curInd: number) => {
    setCurindex(curInd)
    if(videoList.length < 12) {//剧集为11集或者小于11集
      setMore(false)//不展示showMore
      videoList.map(item => {
        item.showEposide = true
      })
      setVideoList(videoList)
    } else {
      // setMore(false)//展示showMore
      // 如果showmor按钮存在
      if(showMore) {
        videoList.map((item, index) => {
          if(index < 11) {
            item.showEposide = true
          } else {
            item.showEposide = false
          }
          setVideoList(videoList)
        })
      } else {
        videoList.map((item, index) => {
          if(Math.floor(index/30) === curInd) {//30集为一显示目录
            item.showEposide = true
          } else {
            item.showEposide = false
          }
          setVideoList(videoList)
        })
      }
    }
  }

  // 处理tab数据
  const dealTabArr = () => {
    const len = videoList && videoList.length
    const temArr = Array.from({length: Math.ceil(len/30)},(v, i) => {
      return {
        id: i + 'tabIndex',
        label: 1 + i * 30 + '-' + (i + 1) * 30
      }
    })
    setTab(temArr as any)
    console.log('tabArr', tabArr)
  }

  // 点击showMore，隐藏shouwmore按钮 + 展示tab + 完整剧集切换
  const setDataFn = () => {
    // 判断更多框是否要出现
    setMore(false)
    videoList.map((item, index) => {
      if(Math.floor(index/30) === 0) {//30集为一显示目录
        item.showEposide = true
      } else {
        item.showEposide = false
      }
      setVideoList(videoList)
    })
  }
  useEffect(() => {
    dealVideoData(0)
    dealTabArr()
  },[])
  
  return <>
    <div className={styles.episopeBox}>
      <div className={styles.topInfo}>
        <div className={styles.episopeTitle}>EpisodesList</div>
        <div className={styles.allCounts}>{chapterList&&chapterList.length} Episopes</div>
      </div>
      <div className={styles.listInfo}>
        { videoList.map(item => {
          const {
            name,
            cover,
            index
          } = item
          const routerToVideoInfo = `/`
          return <div className={styles.listBox} style={item.showEposide?{}:{display: 'none'}}>
            <Link href={routerToVideoInfo} className={styles.listLink}>
              <div key={index} className={item.unlock ? styles.listItem : styles.listItemMask}>
                <div className={styles.imgLeft}>
                  <Image
                    className={styles.imageItem}
                    onError={onImgError}
                    placeholder="blur"
                    blurDataURL={item.cover}
                    width={88}
                    height={117}
                    src={item.cover}
                    alt={item.name}
                  />
                </div>
                <div className={styles.rightIntro}>
                  <p className={styles.title}>{chapterName}</p>
                  <p className={styles.pageNum}>{item.name}</p>
                </div>
              </div>
            </Link>
          </div>
        })}
        <div className={styles.listItem} style={showMore && videoList.length > 11 ? {} : {display:'none'}} onClick={() => setDataFn()}>
          <p className={styles.viewMore}>View More</p>
        </div>
      </div>
      {tabArr?.length > 0 ? <div className={styles.tabItem} style={(showMore || videoList.length < 11) ? {display:'none'} : {}}>
        {tabArr?.length && tabArr.map((item:any,index:number) => {
          return <div 
            className={index==curIndx ? styles.tabIteActive : styles.tabIte}  
            onClick={() => dealVideoData(index)}>{item.label}</div>
        })}
        </div> 
      : null}
    </div>
  </>
}

export default PcSeries;
