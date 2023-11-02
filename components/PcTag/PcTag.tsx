import React, { FC } from "react";
import styles from "@/components/PcTag/PcTag.module.scss";
import PaginationCom from "@/components/common/paginationCom";
import Link from "next/link";
import TagBookList from "@/components/PcTag/tagBookList/TagBookList";
import { ITagBookItem, IKeywordItem } from "typings/book.interface";
import { useTranslation } from "next-i18next";

interface IProps {
  bookList: ITagBookItem[];
  relationKeywords: IKeywordItem[];
  pageNo: number;
  totalPage: number;
  keywordId: string;
  keyword: string;
}

const PcTag: FC<IProps> = (
  { pageNo, totalPage, keywordId, bookList, keyword, relationKeywords}) => {
  const { t } = useTranslation();
  return <div className={styles.tagWrap}>
    {keyword ? <div className={styles.keywordBox}>
      <h1 className={styles.title}>{keyword}</h1>
      <p className={styles.sub}>
        {t('tag.relation1')}<span style={{ color: "#FF375F" }}>{keyword} &nbsp;</span>
        {t('tag.relation2')}<span style={{ color: "#FF375F" }}>{keyword}</span>
        {t('tag.relation3')}<span style={{ color: "#FF375F" }}>{keyword} &nbsp;</span>
        {t('tag.relation4')}
      </p>
      <div className={styles.keywordConnect}>
        {relationKeywords.length > 0 ? <>
          <p className={styles.keywordConnectTitle}>{t('tag.relevant')}：</p>
          {relationKeywords.map(val => {
            return <Link key={val.id} href={`/tag/${val.id}`} replace legacyBehavior>
              <a className={styles.keywordConnectItem}>{val.name}</a>
            </Link>
          })}
        </> : null}
      </div>
    </div> : null}
    <TagBookList dataSource={bookList} keyword={keyword}/>
    {totalPage && totalPage > 1 ? <PaginationCom
      path={`/tag/${keywordId}/`}
      pageNo={pageNo}
      totalPage={totalPage}
      isScroll={true}
    /> : null}
  </div>
}

export default PcTag
