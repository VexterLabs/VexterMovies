import React, { FC } from "react";
import styles from '@/components/Keywords/MKeywords.module.scss'
import Link from "next/link";
import ImageCommon from "@/components/common/ImageCommon";
import MorePagination from "@/components/more/pagination/MorePagination";
import { IKeywordItem } from "typings/book.interface";
import { MEmpty } from "@/components/common/empty";

interface IProps {
  keywordList: IKeywordItem[]
  pageNo: number;
  totalPage: number;
  keywordClick: (keyword: string) => void;
}

const MKeywords: FC<IProps> = ({ pageNo, totalPage, keywordList, keywordClick }) => {

  return <div className={styles.keywordsWrap}>
    {/* <div className={styles.moreBox}>
      <Link href="/" legacyBehavior>
        <a className={styles.moreBack}>
          <ImageCommon source={'/images/more/more-back.png'} className={styles.backIcon}/>
        </a>
      </Link>
      <h1 className={styles.moreBoxTitle}>Keyword Summary</h1>
    </div> */}
    { keywordList.length === 0 ?
      <MEmpty/> :
      <div className={styles.keywordBox}>
        {keywordList.map(val => {
          return <Link 
                  key={val.id} 
                  href={`/tag/${val.id}`} 
                  onClick={() => keywordClick(val.name)} 
                  className={styles.keywordItem}
                >
                  {val.name}
                </Link>
        })}
      </div>
    }
    {totalPage && totalPage > 1 ? <MorePagination
      prevPath={'/keywords/'}
      page={pageNo}
      totalPage={totalPage}
    /> : null}
  </div>
}

export default MKeywords;
