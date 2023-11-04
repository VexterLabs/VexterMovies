import React, { FC } from "react";
import Link from "next/link";
import MTagBookList from "@/components/Tag/tagBookList/MTagBookList";
import MorePagination from "@/components/more/pagination/MorePagination";
import { IKeywordItem, ITagBookItem } from "typings/book.interface";
import { useTranslation } from "next-i18next";
import Breadcrumb, { IBreadcrumb } from "@/components/common/breadcrumb";
import { MEmpty } from "@/components/common/empty";
import styles from "@/components/Tag/MTag.module.scss";

interface IProps {
  breadData: IBreadcrumb[];
  relationKeywords: IKeywordItem[];
  bookList: ITagBookItem[];
  pageNo: number;
  totalPage: number;
  keywordId: string;
  keyword: string;
}

const MTag: FC<IProps> = (
  {
    pageNo,
    totalPage,
    keywordId,
    bookList,
    keyword,
    relationKeywords,
    breadData,

  }) => {
  const { t } = useTranslation();
  return <div className={styles.tagWrap}>
    <div className={styles.tagHeader}>
      <Breadcrumb data={breadData} isWap={true}/>
    </div>

    <div className={styles.keywordBox}>
      <h1 className={styles.title}>{keyword}</h1>
      <p className={styles.sub}>
        {t('tag.relation1')}<span>{keyword} &nbsp;</span>
        {t('tag.relation2')}<span>{keyword}</span>
        {t('tag.relation3')}<span>{keyword} &nbsp;</span>
        {t('tag.relation4')}
      </p>
    </div>

    {bookList.length > 0 ? <>
      <MTagBookList keyword={keyword} dataSource={bookList}/>

      {totalPage && totalPage > 1 ? <MorePagination
        prevPath={`/tag/${keywordId}/`}
        page={pageNo}
        totalPage={totalPage}
      /> : null}
    </> : <MEmpty />}

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
  </div>
}

export default MTag
