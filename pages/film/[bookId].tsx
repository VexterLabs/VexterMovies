import React from "react";
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from "next";
import { netBookDetail } from "@/server/home";
import PcFilm from "@/components/pcFilm";
import MFilm from "@/components/film";
import { isIos, ownOs } from "@/utils/ownOs";
import { ELanguage, IBookItem, IChapterList } from "@/typings/home.interface";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SSRConfig, useTranslation } from "next-i18next";
import { IBreadcrumb } from "@/components/common/breadcrumb";
import useHiveLog from "@/hooks/useHiveLog";

interface IProps extends SSRConfig {
  isPc: boolean;
  bookId: string;
  bookInfo: IBookItem;
  isApple: boolean;
  languages: ELanguage[]; // tdk需要， 勿删
  recommends: IBookItem[];
  chapterList: IChapterList[];
  typeTwoId: number;
  typeTwoName: string;
}

const Film: NextPage<IProps> = (
  { isPc, bookInfo, isApple, recommends, chapterList, typeTwoId, typeTwoName }
) => {

  const { t } = useTranslation();
  const HiveLog = useHiveLog();
  const breadData: IBreadcrumb[] = [
    { title: t('home.home'), link: "/" },
    { title: typeTwoName || bookInfo.typeTwoNames[0], link: `/browse/${typeTwoId || bookInfo.typeTwoIds[0]}` },
    { title: bookInfo.bookName },
  ];

  const onBookClick = (book: IBookItem) => {
    HiveLog.track("Recommend_click", {
      bookId: book.bookId,
      bookName: book.bookName
    })
  }
  const onChannel = (name: string) => {
    HiveLog.track("Channel_click", {
      typeTwoName: name,
    })
  }

  return <>
    { isPc ?
      <PcFilm
        onChannel={onChannel}
        onBookClick={onBookClick}
        breadData={breadData}
        bookInfo={bookInfo}
        recommends={recommends}
        chapterList={chapterList}
      /> :
      <MFilm
        onChannel={onChannel}
        onBookClick={onBookClick}
        breadData={breadData}
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
  const { bookId, typeTwoId } = query as { bookId: string, typeTwoId: string };
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
  const _typeTwoId = Number(typeTwoId) ? Number(typeTwoId) : book.typeTwoList && book.typeTwoList.length > 0 ? book.typeTwoList[0].id : 0;
  const typeTwoName = book.typeTwoList && book.typeTwoList.length > 0 ? book.typeTwoList.find(val => val.id == _typeTwoId)?.name || '' : '';
  return {
    props: {
      bookId,
      bookInfo: book,
      isPc: ownOs(ua).isPc,
      isApple: isIos(ua),
      recommends,
      chapterList,
      typeTwoId: _typeTwoId,
      typeTwoName,
      languages,
      ...(await serverSideTranslations(locale || ELanguage.English, ['common'])),
    },
  }
}
