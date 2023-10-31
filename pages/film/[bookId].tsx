import React from "react";
import { GetServerSideProps, GetServerSidePropsResult, GetStaticPathsResult, NextPage } from "next";
import { netBook } from "@/server/home";
import PcFilm from "@/components/pcFilm";
import MFilm from "@/components/film";
import { isIos, ownOs } from "@/utils/ownOs";
import { ELanguage, IBookItem } from "@/typings/home.interface";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BookCrumbs from "@/components/film/crumbs";
import { SSRConfig } from "next-i18next";

interface IProps extends SSRConfig {
  isPc: boolean;
  bookId: string;
  bookInfo: IBookItem;
  firstChapterId: string;
  isApple: boolean;
  languages: ELanguage[]; // tdk需要， 勿删
  recommends: IBookItem[];
}

const Book: NextPage<IProps> = (
  { isPc, bookInfo, firstChapterId, isApple, recommends }
) => {
  return <>
    <BookCrumbs bookInfo={bookInfo} isPc={isPc}/>
    { isPc ?
      <PcFilm
        firstChapterId={firstChapterId}
        bookInfo={bookInfo}
        recommends={recommends}
      /> :
      <MFilm
        isApple={isApple}
        bookInfo={bookInfo}
      />
    }
  </>
}

export default Book;

// ssr
export const getServerSideProps: GetServerSideProps = async ({ req, query, locale }):Promise<GetServerSidePropsResult<IProps>> => {
  const ua = req?.headers['user-agent'] || ''
  const { bookId = '' } = query as { bookId: string;};

  const response = await netBook({ bookId }, locale as ELanguage);
  console.log('response---1', JSON.stringify(response))
  if (response === 'BadRequest_404') {
    return { notFound: true }
  }
  if (response === 'BadRequest_500') {
    return { redirect: { destination: '/500', permanent: false } }
  }
  const { book = {} as IBookItem, chapter, languages = [], recommends = [] } = response;

  return {
    props: {
      bookId,
      firstChapterId: chapter?.id || '',
      bookInfo: book,
      isPc: ownOs(ua).isPc,
      isApple: isIos(ua),
      recommends,
      languages,
      ...(await serverSideTranslations(locale ?? ELanguage.English, ['common'])),
    },
  }
}
