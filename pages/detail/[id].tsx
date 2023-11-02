import React from "react";
import { GetServerSideProps, GetServerSidePropsResult, GetStaticPathsResult, NextPage } from "next";
import { netBook, netBookDetail } from "@/server/home";
import PcDetail from "@/components/pcDetail";
import MDetail from "@/components/detail";
import { isIos, ownOs } from "@/utils/ownOs";
import { ELanguage, IBookItem, IBookItemDetail, IChapterList } from "@/typings/home.interface";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BookCrumbs from "@/components/detail/crumbs";
import PcCrumbs from "@/components/pcDetail/crumbs";
import { SSRConfig } from "next-i18next";

interface IProps extends SSRConfig {
  isPc: boolean;
  id: string;
  bookInfo: IBookItemDetail;
  isApple: boolean;
  // languages: ELanguage[]; // tdk需要， 勿删 PcCrumbs
  recommends: IBookItemDetail[];
  chapterList: IChapterList[];
  chapterName: string;
}

const Book: NextPage<IProps> = (
  { isPc, bookInfo, isApple, recommends, chapterList, chapterName }
) => {
  return <>
    { isPc ?
      <PcCrumbs bookInfo={bookInfo} isPc={!isPc}/>:
      <BookCrumbs bookInfo={bookInfo} isPc={isPc}/>
    }
    { isPc ?
      <PcDetail
        bookInfo={bookInfo}
        recommends={recommends}
        chapterList={chapterList}
        chapterName={chapterName}
      /> :
      <MDetail
        isApple={isApple}
        bookInfo={bookInfo}
        recommends={recommends}
        chapterList={chapterList}
      />
    }
  </>
}

export default Book;

// ssr
export const getServerSideProps: GetServerSideProps = async ({ req, query, locale }):Promise<GetServerSidePropsResult<IProps>> => {
  const ua = req?.headers['user-agent'] || ''
  const { id = '' } = query as { id: string;};
  const response = await netBookDetail({ id }, locale as ELanguage);
   
  if (response === 'BadRequest_404') {
    return { notFound: true }
  }
  if (response === 'BadRequest_500') {
    return { redirect: { destination: '/500', permanent: false } }
  }
  const { book = {} as IBookItemDetail, recommends = [], chapterList = [] } = response; // chapter, languages = []
  const chapterName = book.bookName
  return {
    props: {
      id,
      chapterName,
      bookInfo: book,
      isPc: ownOs(ua).isPc,
      isApple: isIos(ua),
      recommends,
      chapterList,
      ...(await serverSideTranslations(locale ?? ELanguage.English, ['common'])),
    },
  }
}
