import type { NextPage, GetServerSidePropsResult, GetServerSideProps } from 'next'
import React, { SyntheticEvent } from "react";
import { netBookDetail } from "@/server/home";
import { ELanguage, IBookItem, IChapterList } from "@/typings/home.interface";
import { isIos, ownOs } from "@/utils/ownOs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PcEpisode from '@/components/pcEpisode';
import WapEpisode from '@/components/episode'
import useHiveLog from "@/hooks/useHiveLog";

interface IProps {
  isPc: boolean;
  bookId: string;
  bookInfo: IBookItem;
  recommends: IBookItem[];
  chapterList: IChapterList[];
  isApple: boolean;
  current: number;
}

const Episode: NextPage<IProps> = (
  { isPc, bookInfo, isApple, recommends, chapterList, current }) => {

  const HiveLog = useHiveLog();
  const onBookClick = (book: IBookItem) => {
    HiveLog.track("ReadRecommend_click", {
      bookId: book.bookId,
      bookName: book.bookName
    })
  }

  const onChannel = (name: string,e?: SyntheticEvent) => {
    HiveLog.track("ReadChannel_click", {
      typeTwoName: name
    })
  }

  return <>
    {isPc ?
      <PcEpisode
        onChannel={onChannel}
        onBookClick={onBookClick}
        bookInfo={bookInfo}
        recommends={recommends}
        chapterList={chapterList}
        current={current}
      /> :
      <WapEpisode
        onChannel={onChannel}
        onBookClick={onBookClick}
        bookInfo={bookInfo}
        recommends={recommends}
        chapterList={chapterList}
        currentPage={current}
        isApple={isApple}
      />}
  </>
}

export const getServerSideProps: GetServerSideProps = async ({ req, query, locale }):Promise<GetServerSidePropsResult<IProps>> => {
  const ua = req?.headers['user-agent'] || ''
  const { bookId, chapterId } = query as { bookId: string,chapterId: string};
  console.log('chapterId', chapterId)
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
  const current = chapterList.findIndex(val => val.id === chapterId) || 0;
  return {
    props: {
      bookId,
      bookInfo: book,
      isPc: ownOs(ua).isPc,
      isApple: isIos(ua),
      recommends,
      chapterList,
      current,
      ...(await serverSideTranslations(locale || ELanguage.English, ['common'])),
    },
  }
}

export default Episode;
