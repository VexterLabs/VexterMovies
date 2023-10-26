import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { ownOs } from "@/utils/ownOs";
import { netKeywordTag } from "@/server/home";
import CrumbsTagCom from "@/components/common/Crumbs/CrumbsTagCom";
import PcTag from "@/components/PcTag/PcTag";
import { ITagBookItem, IKeywordItem } from "typings/book.interface";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ELanguage } from "typings/home.interface";
import dataMock from "./data.js"

interface IProps {
  bookList: ITagBookItem[];
  relationKeywords: IKeywordItem[];
  isPc: boolean;
  currentPage: number;
  pages: number;
  keywordId: string;
  keyword: string;
}

const ConvergencePage: NextPage<IProps> = (
  { isPc, currentPage, pages = 0, keywordId, keyword, bookList, relationKeywords = [] }) => {

  return <>
    <CrumbsTagCom isPc={isPc} keyword={keyword}/>
    {
      <PcTag
        relationKeywords={relationKeywords}
        pageNo={currentPage}
        totalPage={pages}
        keywordId={keywordId}
        keyword={keyword}
        bookList={bookList}/>}
  </>
}

export default ConvergencePage;

export const getServerSideProps: GetServerSideProps = async ({ req, query, locale }) => {
  const ua = req?.headers['user-agent'] || ''
  const { page = '1', keywordId } = query as { page: string; keywordId: string; };
  // const response = await netKeywordTag({
  //   id: keywordId,
  //   pageNum: Number(page),
  //   pageSize: 30,
  // })

  // if (response === 'BadRequest_404' || !response) {
  //   return { notFound: true }
  // }
  // if (response === 'BadRequest_500') {
  //   return { redirect: { destination: '/500', permanent: false } }
  // }
  const response = dataMock;
  const { books = [], relationKeywords = [], keyword = '', pages = 1, currentPage = 1, keyStatus } = response;

  if (keyStatus === 0) {
    return { notFound: true }
  }

  return {
    props: {
      bookList: books,
      relationKeywords,
      isPc: ownOs(ua).isPc,
      currentPage,
      pages,
      keywordId,
      keyword: keyword.trim(),
      ...(await serverSideTranslations(locale ?? ELanguage.English, ['common'])),
    }
  }
}
