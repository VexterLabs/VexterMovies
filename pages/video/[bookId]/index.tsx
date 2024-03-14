import type { NextPage, GetServerSidePropsResult, GetServerSideProps } from 'next'
import React from "react";
import { netBookDetail } from "@/server/home";
import { ELanguage, IBookItem, IChapterList } from "@/typings/home.interface";
import { isIos, ownOs } from "@/utils/ownOs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PcEpisode from '@/components/pcEpisode';
import WapEpisode from '@/components/episode'
import useHiveLog from "@/hooks/useHiveLog";
import { getSource } from "@/utils/getSource";

interface IProps {
  isPc: boolean;
  bookId: string;
  chapterId: string | number; // 勿删
  bookInfo: IBookItem;
  recommends: IBookItem[];
  chapterList: IChapterList[];
  isApple: boolean;
  current: number;
  source: string;
}

const EpisodePage: NextPage<IProps> = (
  { isPc, bookInfo, isApple, recommends, chapterList, current }) => {

  const HiveLog = useHiveLog();
  const onBookClick = (book: IBookItem) => {
    HiveLog.track("ReadRecommend_click", {
      bookId: book.bookId,
      bookName: book.bookName
    })
  }

  const onChannel = (name: string) => {
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
        current={current}
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

  const _bookId = process.env.Platform === 'dramabox' ? bookId.split('_')[0] : bookId;
  const _chapterId = process.env.Platform === 'dramabox' ? (chapterId ? chapterId?.split('_')?.[0] : '') : chapterId;

  const response = await netBookDetail(_bookId, locale as ELanguage);

  if (response === 'BadRequest_404') {
    return { notFound: true }
  }
  if (response === 'BadRequest_500') {
    return { redirect: { destination: '/500', permanent: false } }
  }
  const { book = {} as IBookItem, recommends = [], chapterList = [] } = response; // chapter, languages = []
  const current = chapterList.findIndex(val => val.id === _chapterId);

  return {
    props: {
      bookId: _bookId,
      chapterId: chapterId || chapterList?.[0]?.id || 0,
      bookInfo: book,
      isPc: ownOs(ua).isPc,
      isApple: isIos(ua),
      recommends,
      chapterList,
      current: current === -1 ? 0 : current,
      source: getSource(req),
      ...(await serverSideTranslations(locale || ELanguage.English, ['common'])),
    },
  }
}

export default EpisodePage;
