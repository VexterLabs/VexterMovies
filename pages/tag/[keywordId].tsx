import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { ownOs } from "@/utils/ownOs";
import { netKeywordTag } from "@/server/home";
import PcTag from "@/components/pcTag";
import MTag from "@/components/tag";
import { ITagBookItem, IKeywordItem } from "typings/book.interface";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ELanguage } from "typings/home.interface";
import { IBreadcrumb } from "@/components/common/breadcrumb";
import { SSRConfig } from "next-i18next";
import useHiveLog from "@/hooks/useHiveLog";

interface IProps extends SSRConfig {
  bookList: ITagBookItem[];
  relationKeywords: IKeywordItem[];
  isPc: boolean;
  currentPage: number;
  pages: number;
  keywordId: string;
  keyword: string;
}

const ConvergencePage: NextPage<IProps> = (
  {
    isPc,
    currentPage,
    pages = 0,
    keywordId, keyword,
    bookList,
    relationKeywords = []
  }) => {

  const breadData: IBreadcrumb[] = [
    { title: 'Home', link: "/" },
    { title: 'Keywords', link: "/keywords" },
    { title: keyword },
  ]
  const HiveLog = useHiveLog();
  const onBookClick = (book: ITagBookItem) => {
    HiveLog.track("PolymerizationBook_click", {
      bookId: book.bookId,
      bookName: book.bookName,
    })
  }

  return <>
    {isPc ?
      <PcTag
        onBookClick={onBookClick}
        breadData={breadData}
        relationKeywords={relationKeywords}
        pageNo={currentPage}
        totalPage={pages}
        keywordId={keywordId}
        keyword={keyword}
        bookList={bookList}/> :
      <MTag
        onBookClick={onBookClick}
        breadData={breadData}
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
  const { page, keywordId } = query as { page: string; keywordId: string; };
  if (page === "1") {
    return { redirect: { destination: `/tag/${keywordId}`, permanent: false } }
  }
  const response = await netKeywordTag({
    id: keywordId,
    pageNum: Number(page) || 1,
    pageSize: 10,
  })

  if (response === 'BadRequest_404' || !response) {
    return { notFound: true }
  }
  if (response === 'BadRequest_500') {
    return { redirect: { destination: '/500', permanent: false } }
  }
  const { books = [], relationKeywords = [], keyword = '', pages = 1, currentPage = 1 } = response;

  return {
    props: {
      bookList: books,
      relationKeywords,
      isPc: ownOs(ua).isPc,
      currentPage,
      pages,
      keywordId,
      keyword: keyword.trim(),
      ...(await serverSideTranslations(locale || ELanguage.English, ['common'])),
    }
  }
}
