import React, { FC } from "react";
import styles from "@/components/Tag/MTag.module.scss";
import Link from "next/link";
import ImageCommon from "@/components/common/ImageCommon";
import MTagBookList from "@/components/Tag/tagBookList/MTagBookList";
import MorePagination from "@/components/more/pagination/MorePagination";
import { IKeywordItem, ITagBookItem } from "typings/book.interface";
import { useTranslation } from "next-i18next";

interface IProps {
  relationKeywords: IKeywordItem[];
  bookList: ITagBookItem[];
  pageNo: number;
  totalPage: number;
  keywordId: string;
  keyword: string;
}

const MTag: FC<IProps> = ({ pageNo, totalPage, keywordId, bookList, keyword, relationKeywords }) => {
  const { t } = useTranslation();
  return <div className={styles.tagWrap}>
    {/* <div className={styles.moreBox}>
      <Link href="/" legacyBehavior>
        <a className={styles.moreBack}>
          <ImageCommon source={'/images/more/more-back.png'} className={styles.backIcon}/>
        </a>
      </Link>
      <h1 className={styles.moreBoxTitle}>{keyword}</h1>
    </div> */}
    <div className={styles.keywordBox}>
      <h1 className={styles.title}>{keyword}</h1>
      <p className={styles.sub}>
        {t('tag.relation1')}<span style={{ color: "#FF375F" }}>{keyword} &nbsp;</span>
        {t('tag.relation2')}<span style={{ color: "#FF375F" }}>{keyword}</span>
        {t('tag.relation3')}<span style={{ color: "#FF375F" }}>{keyword} &nbsp;</span>
        {t('tag.relation4')}
      </p>
    </div>
    <MTagBookList keyword={keyword} dataSource={bookList}/>
    {totalPage && totalPage > 1 ? <MorePagination
      prevPath={`/tag/${keywordId}/`}
      page={pageNo}
      totalPage={totalPage}
    /> : null}
    <div className={styles.keywordConnect}>
      {relationKeywords.length > 0 ? <>
        <p className={styles.keywordConnectTitle}>{t('tag.relevant')}：</p>
        {relationKeywords.map(val => {
          return <Link 
                  key={val.id} 
                  href={`/tag/${val.id}`} 
                  replace
                  className={styles.keywordConnectItem}>
                    {val.name}
                </Link>
        })}
      </> : null}
    </div>
  </div>
}

export default MTag
