import React, { FC } from "react";
import styles from '@/components/PcKeywords/PcKeywords.module.scss'
import Link from "next/link";
import PaginationCom from "@/components/common/paginationCom";
import { IKeywordItem } from "typings/book.interface";
import ImageCommon from "@/components/common/ImageCommon";

interface IProps {
  keywordList: IKeywordItem[]
  pageNo: number;
  totalPage: number;
  keywordClick: (keyword: string) => void;
}

const PcKeywords: FC<IProps> = ({ pageNo, totalPage, keywordList, keywordClick }) => {

  if (keywordList.length === 0) {
    return <div className={styles.mainContentEmpty}>
      <ImageCommon source={'/images/common/empty.png'} className={styles.emptyImg}/>
      <p className={styles.pcEmptyIntro}>No keywords</p>
    </div>
  }
  return <div className={styles.keywordsWrap}>
    <div className={styles.keywordBox}>
      {keywordList.map(val => {
        return <Link key={val.id} href={`/tag/${val.id}`} legacyBehavior>
          <a onClick={() => keywordClick(val.name)} className={styles.keywordItem}>{val.name}</a>
        </Link>
      })}
    </div>
    {totalPage && totalPage > 1 ? <PaginationCom
      path={'/keywords/'}
      pageNo={pageNo}
      totalPage={totalPage}
      isScroll={true}
    /> : null}
  </div>
}

export default PcKeywords;
