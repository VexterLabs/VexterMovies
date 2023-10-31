import React from "react";
import { GetServerSideProps, GetServerSidePropsResult, GetStaticPathsResult, NextPage } from "next";
import { netBook } from "@/server/home";
import PcDetail from "@/components/pcDetail";
import MFilm from "@/components/film";
import { isIos, ownOs } from "@/utils/ownOs";
import { ELanguage, IBookItem, IEpisopeItem } from "@/typings/home.interface";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BookCrumbs from "@/components/film/crumbs";
import PcCrumbs from "@/components/pcDetail/crumbs";
import { SSRConfig } from "next-i18next";

interface IProps extends SSRConfig {
  isPc: boolean;
  bookId: string;
  bookInfo: IBookItem;
  firstChapterId: string;
  isApple: boolean;
  languages: ELanguage[]; // tdk需要， 勿删 PcCrumbs
  recommends: IBookItem[];
  mockRecommends: IBookItem[];
  episopeList: IEpisopeItem[];
}

const Book: NextPage<IProps> = (
  { isPc, bookInfo, firstChapterId, isApple, recommends, episopeList, mockRecommends }
) => {
  return <>
    <BookCrumbs bookInfo={bookInfo} isPc={isPc}/>
    <PcCrumbs bookInfo={bookInfo} isPc={!isPc}/>
    { isPc ?
      <PcDetail
        firstChapterId={firstChapterId}
        bookInfo={bookInfo}
        recommends={recommends}
        mockRecommends = {mockRecommends}
        episopeList={episopeList}
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
  const episopeList = [
    {name:'神雕神雕侠侣神雕侠侣侠侣神雕神雕侠侣神雕侠侣侠侣神雕神雕侠侣神雕侠侣侠侣神雕神雕侠侣神雕侠侣侠侣神雕神雕侠侣神雕侠侣侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
    {name:'神雕侠侣神雕侠侣神雕侠侣神雕侠侣神雕侠侣神雕侠侣神雕侠侣',chapterCount:2, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
    {name:'神雕侠侣神雕侠侣',chapterCount:3, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
    {name:'神雕侠侣神雕侠侣神雕侠侣',chapterCount:4, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
    {name:'神雕侠侣神雕侠侣神雕侠侣神雕侠侣神雕侠侣神雕侠侣',chapterCount:5, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
    {name:'神雕侠侣',chapterCount:6, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
    {name:'神雕侠侣',chapterCount:7, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
    {name:'神雕侠侣',chapterCount:8, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
    {name:'神雕侠侣',chapterCount:9, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
    {name:'神雕侠侣',chapterCount:10, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
    {name:'神雕侠侣',chapterCount:11, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
    {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
    {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
    {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
    {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
    {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
    {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
    {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
    {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
    {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
    {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
    {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
    {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
    {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
    {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
    {name:'神雕侠侣',chapterCount:1, cover: 'https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100504/41000100504.jpg?t=1692683073562&image_process=resize,h_300'},
  ]
  const mockRecommends = [
    {action:"41000100199",actionType:'BOOK',author:"Webfic",bookId:"41000100199",bookName:"迟来的心动",chapterCount:'101',cover:"https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100199/41000100199.jpg?t=1692684908126&image_process=resize,h_300",introduction:"富家千金被偷梁换柱，处处被人欺负陷害，千亿总裁从天而降将其宠上天。",labels:["甜宠"],lastUpdateTimeDisplay:"Completed",name:"迟来的心动",replacedBookName:"迟来的心动",tags:["甜宠"],top:0,typeOneName:'女频',typeOneNames:['女频'],typeTwoName:"现代言情",typeTwoNames:'现代言情',viewCount:11637,viewCountDisplay:"11.6K"},
    {action:"41000100199",actionType:'BOOK',author:"Webfic",bookId:"41000100199",bookName:"迟来的心动",chapterCount:'101',cover:"https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100199/41000100199.jpg?t=1692684908126&image_process=resize,h_300",introduction:"富家千金被偷梁换柱，处处被人欺负陷害，千亿总裁从天而降将其宠上天。",labels:["甜宠"],lastUpdateTimeDisplay:"Completed",name:"迟来的心动",replacedBookName:"迟来的心动",tags:["甜宠"],top:0,typeOneName:'女频',typeOneNames:['女频'],typeTwoName:"现代言情",typeTwoNames:'现代言情',viewCount:11637,viewCountDisplay:"11.6K"},
    {action:"41000100199",actionType:'BOOK',author:"Webfic",bookId:"41000100199",bookName:"迟来的心动",chapterCount:'101',cover:"https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100199/41000100199.jpg?t=1692684908126&image_process=resize,h_300",introduction:"富家千金被偷梁换柱，处处被人欺负陷害，千亿总裁从天而降将其宠上天。",labels:["甜宠"],lastUpdateTimeDisplay:"Completed",name:"迟来的心动",replacedBookName:"迟来的心动",tags:["甜宠"],top:0,typeOneName:'女频',typeOneNames:['女频'],typeTwoName:"现代言情",typeTwoNames:'现代言情',viewCount:11637,viewCountDisplay:"11.6K"},
    {action:"41000100199",actionType:'BOOK',author:"Webfic",bookId:"41000100199",bookName:"迟来的心动",chapterCount:'101',cover:"https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100199/41000100199.jpg?t=1692684908126&image_process=resize,h_300",introduction:"富家千金被偷梁换柱，处处被人欺负陷害，千亿总裁从天而降将其宠上天。",labels:["甜宠"],lastUpdateTimeDisplay:"Completed",name:"迟来的心动",replacedBookName:"迟来的心动",tags:["甜宠"],top:0,typeOneName:'女频',typeOneNames:['女频'],typeTwoName:"现代言情",typeTwoNames:'现代言情',viewCount:11637,viewCountDisplay:"11.6K"},
    {action:"41000100199",actionType:'BOOK',author:"Webfic",bookId:"41000100199",bookName:"迟来的心动",chapterCount:'101',cover:"https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100199/41000100199.jpg?t=1692684908126&image_process=resize,h_300",introduction:"富家千金被偷梁换柱，处处被人欺负陷害，千亿总裁从天而降将其宠上天。",labels:["甜宠"],lastUpdateTimeDisplay:"Completed",name:"迟来的心动",replacedBookName:"迟来的心动",tags:["甜宠"],top:0,typeOneName:'女频',typeOneNames:['女频'],typeTwoName:"现代言情",typeTwoNames:'现代言情',viewCount:11637,viewCountDisplay:"11.6K"},
    {action:"41000100199",actionType:'BOOK',author:"Webfic",bookId:"41000100199",bookName:"迟来的心动",chapterCount:'101',cover:"https://nchapter.dramaboxdb.com/data/cppartner/4x1/41x0/410x0/41000100199/41000100199.jpg?t=1692684908126&image_process=resize,h_300",introduction:"富家千金被偷梁换柱，处处被人欺负陷害，千亿总裁从天而降将其宠上天。",labels:["甜宠"],lastUpdateTimeDisplay:"Completed",name:"迟来的心动",replacedBookName:"迟来的心动",tags:["甜宠"],top:0,typeOneName:'女频',typeOneNames:['女频'],typeTwoName:"现代言情",typeTwoNames:'现代言情',viewCount:11637,viewCountDisplay:"11.6K"},
  ]
  const response = await netBook({ bookId }, locale as ELanguage);
  if (response === 'BadRequest_404') {
    return { notFound: true }
  }
  if (response === 'BadRequest_500') {
    return { redirect: { destination: '/500', permanent: false } }
  }
  console.log('response-detail',response)
  const { book = {} as IBookItem, chapter, languages = [], recommends = [] } = response;

  return {
    props: {
      bookId,
      firstChapterId: chapter?.id || '',
      bookInfo: book,
      isPc: ownOs(ua).isPc,
      isApple: isIos(ua),
      recommends,
      episopeList,
      mockRecommends,
      languages,
      ...(await serverSideTranslations(locale ?? ELanguage.English, ['common'])),
    },
  }
}
