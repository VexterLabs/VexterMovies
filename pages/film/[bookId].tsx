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
import { getRequestMeta } from "next/dist/server/request-meta";
import Head from "next/head";
import ClientConfig from "@/client.config";

interface IProps extends SSRConfig {
  isPc: boolean;
  bookId: string;
  bookInfo: IBookItem;
  isApple: boolean;
  languages: ELanguage[]; // tdk需要， 勿删
  recommends: IBookItem[];
  chapterList: IChapterList[];
}

const Film: NextPage<IProps> = (
  { isPc, bookInfo, isApple, recommends, chapterList }
) => {

  const { t } = useTranslation();
  const HiveLog = useHiveLog();
  const breadData: IBreadcrumb[] = [
    { title: t('home.home'), link: "/" },
    { title: bookInfo?.typeTwoNames?.[0], link: `/browse/${bookInfo?.typeTwoIds?.[0]}` },
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

  const locationUrl = process.env.WebDomain + '/film/' + bookInfo.bookId;
  const shareArr = [
    { id: 'facebook', icon: '/images/common/facebook.png', link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(locationUrl)}` },
    { id: 'twitter', icon: '/images/common/twitter.svg', link: `https://twitter.com/share?text=DramaBox&url=${encodeURIComponent(locationUrl)}` },
    { id: 'instagram', icon: '/images/common/instagram.png', link: 'https://www.instagram.com' },
    { id: 'pinterest', icon: '/images/common/pinterest.svg', link: `https://www.pinterest.com/pin/create/button/?description=${encodeURIComponent(bookInfo.bookName || 'DramaBox')}&media=${encodeURIComponent(bookInfo.cover)}&url=${encodeURIComponent(locationUrl)}` },
    { id: 'whatsapp', icon: '/images/common/whatsapp.svg', link: `https://api.whatsapp.com/send?text=${encodeURIComponent(locationUrl)}` },
    { id: 'reddit', icon: '/images/common/reddit.svg', link: `https://www.reddit.com/submit?url=${encodeURIComponent(locationUrl)}&title=${encodeURIComponent(bookInfo.bookName || 'DramaBox')}` },
  ]

  const onShare = (url: string) => {
    // 创建并打开一个新的对话框
    window.open(url,
      "_blank", 'height=500, width=560, left=200, top=200'
    ); // ""表示空白页面作为对话框内容
  }


  return <>

    <Head>
      {/*facebook分享*/}
      <meta property="og:url" content={locationUrl}/>
      <meta property="og:title" content={bookInfo.bookName || ClientConfig.name}/>
      <meta property="og:description" content={bookInfo.introduction}/>
      <meta property="og:image" content={bookInfo.cover}/>
      <meta property="og:site_name" content={ClientConfig.name}/>
      <meta property="og:type" content="website"/>
      {/*twitter分享*/}
      <meta property="twitter:url" content={locationUrl}/>
      <meta name="twitter:title" content={bookInfo.bookName || ClientConfig.name}/>
      <meta name="twitter:description" content={bookInfo.introduction}/>
      <meta name="twitter:site" content={locationUrl}/>
      <meta name="twitter:card" content="summary"/>
      <meta name="twitter:image" content={bookInfo.cover}/>
      {/*whatsapp分享*/}
      <meta property="whatsapp:url" content={locationUrl}/>
      <meta name="whatsapp:title" content={bookInfo.bookName || ClientConfig.name}/>
    </Head>

    { isPc ?
      <PcFilm
        onChannel={onChannel}
        onBookClick={onBookClick}
        breadData={breadData}
        bookInfo={bookInfo}
        recommends={recommends}
        chapterList={chapterList}
        shareArr={shareArr}
        onShare={onShare}
      /> :
      <MFilm
        onChannel={onChannel}
        onBookClick={onBookClick}
        breadData={breadData}
        isApple={isApple}
        bookInfo={bookInfo}
        recommends={recommends}
        chapterList={chapterList}
        shareArr={shareArr}
        onShare={onShare}
      />
    }
  </>
}

export default Film;

// ssr
export const getServerSideProps: GetServerSideProps = async ({ req, query, locale }):Promise<GetServerSidePropsResult<IProps>> => {
  const ua = req?.headers['user-agent'] || ''
  const { bookId } = query as { bookId: string };
  if (!bookId) {
    return { notFound: true }
  }
  try {
    const clientUrl = getRequestMeta(req, '__NEXT_INIT_URL');
    if (clientUrl && clientUrl.includes('/en/') && !clientUrl.includes('/_next/data')){
      return { redirect: { destination: `/film/${bookId}`, permanent: false } }
    }
  } catch (e) {}

  const response = await netBookDetail(bookId, locale as ELanguage);
  if (response === 'BadRequest_404') {
    return { notFound: true }
  }
  if (response === 'BadRequest_500') {
    return { redirect: { destination: '/500', permanent: false } }
  }
  const { book = {} as IBookItem, recommends = [], chapterList = [], languages = [] } = response;
  return {
    props: {
      bookId,
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
