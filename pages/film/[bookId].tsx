import React from "react";
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from "next";
import { netBookDetail } from "@/server/home";
import PcDetail from "@/components/pcFilm";
import MDetail from "@/components/film";
import { isIos, ownOs } from "@/utils/ownOs";
import { ELanguage, IBookItem, IChapterList } from "@/typings/home.interface";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SSRConfig, useTranslation } from "next-i18next";
import { IBreadcrumb } from "@/components/common/breadcrumb";
import BookCrumbs from "@/components/film/crumbs";
import PcCrumbs from "@/components/pcFilm/crumbs";

interface IProps extends SSRConfig {
  isPc: boolean;
  bookId: string;
  bookInfo: IBookItem;
  isApple: boolean;
  languages: ELanguage[]; // tdk需要， 勿删
  recommends: IBookItem[];
  chapterList: IChapterList[];
  chapterName: string;
}

const Film: NextPage<IProps> = (
  { isPc, bookInfo, isApple, recommends, chapterList, chapterName }
) => {

  const { t } = useTranslation();

  const breadData: IBreadcrumb[] = [
    { title: t('home.home'), link: "/" },
    { title: bookInfo.typeTwoNames[0], link: `/browse/${bookInfo.typeTwoIds[0]}` },
    { title: bookInfo.bookName },
  ]

  return <>
    { isPc ?
      <PcDetail
        breadData={breadData}
        bookInfo={bookInfo}
        recommends={recommends}
        chapterList={chapterList}
        chapterName={chapterName}
      /> :
      <MDetail
        breadData={breadData}
        chapterName={chapterName}
        isApple={isApple}
        bookInfo={bookInfo}
        recommends={recommends}
        chapterList={chapterList}
      />
    }
  </>
}

export default Film;

// ssr
export const getServerSideProps: GetServerSideProps = async ({ req, query, locale }):Promise<GetServerSidePropsResult<IProps>> => {
  const ua = req?.headers['user-agent'] || ''
  const { bookId } = query as { bookId: string;};
  if (!bookId) {
    return { notFound: true }
  }
  const response = await netBookDetail(bookId, locale as ELanguage);
  if (response === 'BadRequest_404') {
    return { notFound: true }
  }
  if (response === 'BadRequest_500') {
    return { redirect: { destination: '/500', permanent: false } }
  }
  const { book = {} as IBookItem, recommends = [], chapterList = [], languages = [] } = response;
  const chapterName = book.bookName
  return {
    props: {
      bookId,
      chapterName,
      bookInfo: book,
      isPc: ownOs(ua).isPc,
      isApple: isIos(ua),
      recommends,
      chapterList,
      languages,
      ...(await serverSideTranslations(locale || ELanguage.English, ['common'])),
    },
  }
}
