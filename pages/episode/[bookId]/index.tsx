import type { NextPage, GetServerSidePropsResult, GetServerSideProps } from 'next'
import React from "react";
import { netBookDetail } from "@/server/home";
import { ELanguage, IBookItem, IChapterList } from "@/typings/home.interface";
import { isIos, ownOs } from "@/utils/ownOs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PcEpisode from '@/components/pcEpisode';
import MEspoise from '@/components/espoise'
import { IBreadcrumb } from "@/components/common/breadcrumb";
import { useTranslation } from "next-i18next";

interface IProps {
  isPc: boolean;
  bookId: string;
  bookInfo: IBookItem;
  recommends: IBookItem[];
  chapterList: IChapterList[];
  chapterName: string;
  isApple: boolean;
  currentPage: number;
}

const Espoise: NextPage<IProps> = (
  { isPc, bookInfo, isApple, recommends, chapterList, chapterName,currentPage }) => {
  const { t } = useTranslation();

  const breadData: IBreadcrumb[] = [
    { title: t('home.home'), link: "/" },
    { title: bookInfo.typeTwoNames[0], link: `/browse/${bookInfo.typeTwoIds[0]}` },
    { title: bookInfo.bookName,  link: `/film/${bookInfo.bookId}`},
    { title: chapterName },
  ]

  return <>
    {isPc ?
      <PcEpisode
        breadData={breadData}
        bookInfo={bookInfo}
        recommends={recommends}
        chapterList={chapterList}
        chapterName={chapterName}
        currentPage={currentPage}
      /> :
      <MEspoise
        breadData={breadData}
        bookInfo={bookInfo}
        recommends={recommends}
        chapterList={chapterList}
        chapterName={chapterName}
        currentPage={currentPage}
        isApple={isApple}
      />}
  </>
}

export const getServerSideProps: GetServerSideProps = async ({ req, query, locale }):Promise<GetServerSidePropsResult<IProps>> => {
  const ua = req?.headers['user-agent'] || ''
  const { bookId, chapterId } = query as { bookId: string,chapterId: string};
  if (!bookId) {
    return { notFound: true };
  }

  const response = await netBookDetail(bookId, locale as ELanguage);

  if (response === 'BadRequest_404') {
    return { notFound: true }
  }
  if (response === 'BadRequest_500') {
    return { redirect: { destination: '/500', permanent: false } }
  }
  const { book = {} as IBookItem, recommends = [], chapterList = [] } = response; // chapter, languages = []
  const chapterName = book.bookName
  const currentPage = 0
  return {
    props: {
      bookId,
      chapterName,
      bookInfo: book,
      isPc: ownOs(ua).isPc,
      isApple: isIos(ua),
      recommends,
      chapterList,
      currentPage,
      ...(await serverSideTranslations(locale || ELanguage.English, ['common'])),
    },
  }
}

export default Espoise;
