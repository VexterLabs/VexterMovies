import type { NextPage, GetServerSidePropsResult, GetServerSideProps } from 'next'
import React from "react";
import { netBookDetail } from "@/server/home";
import { ELanguage, IBookItemDetail, IChapterList } from "@/typings/home.interface";
import { isIos, ownOs } from "@/utils/ownOs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PcEpisode from '@/components/pcEpisode';
import MEspoise from '@/components/espoise'
import { useRouter } from 'next/router';
import DetailPCrumbs from '@/components/pcEpisode/crumbs';

interface IProps {
  isPc: boolean;
  id: string;
  bookInfo: IBookItemDetail;
  recommends: IBookItemDetail[];
  chapterList: IChapterList[];
  chapterName: string;
  isApple: boolean;
}

const Espoise: NextPage<IProps> = (
  { isPc, bookInfo, isApple, recommends, chapterList, chapterName }) => {
  const router = useRouter()
  return <>
    {/* <DetailPCrumbs  isPc={!isPc}></DetailPCrumbs> */}
    {isPc ?
      <PcEpisode
        bookInfo={bookInfo}
        recommends={recommends}
        chapterList={chapterList}
        chapterName={chapterName}
      /> :
      <MEspoise
      />}
  </>
}

export const getServerSideProps: GetServerSideProps = async ({ req, query, locale }):Promise<GetServerSidePropsResult<IProps>> => {
  console.log('response-11111111111110')
  const ua = req?.headers['user-agent'] || ''
  const { id = '' } = query as { id: string;};
  const response = await netBookDetail({ id }, locale as ELanguage);
   console.log('response-110' ,response)
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

export default Espoise;
