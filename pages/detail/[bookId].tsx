import React from "react";
import { GetServerSideProps, GetServerSidePropsResult, GetStaticPathsResult, NextPage } from "next";
import { netBook } from "@/server/home";
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
  bookId: string;
  bookInfo: IBookItemDetail;
  isApple: boolean;
  // languages: ELanguage[]; // tdk需要， 勿删 PcCrumbs
  recommends: IBookItemDetail[];
  chapterList: IChapterList[];
}

const Book: NextPage<IProps> = (
  { isPc, bookInfo, isApple, recommends, chapterList }
) => {
  return <>
    {/* <BookCrumbs bookInfo={bookInfo} isPc={isPc}/>
    <PcCrumbs bookInfo={bookInfo} isPc={!isPc}/> */}
    { isPc ?
      <PcDetail
        bookInfo={bookInfo}
        recommends={recommends}
        chapterList={chapterList}
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
  const { bookId = '' } = query as { bookId: string;};
  // const response = await netBook({ bookId }, locale as ELanguage);
   const response = {
    "book": {
      "bookId": "41000010030",
      "bookName": "Revenge of the poor boy",
      "chapterCount": 22,
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
      "followCount": 0,
      "introduction": "男主提着礼物和准备的5万块钱到丈母娘家提亲，因礼物少遭丈母娘嘲笑，丈母娘又提高50万的高价彩礼钱，并要求买房买车，男主无法满足，又遭丈母娘和女朋友侮辱，并告知分手",
      "labels": ['复仇', '逆袭'],
      "language": "ENGLISH",
      "simpleLanguage": "en",
      "tagIds": "",
      "tags": ['复仇', '逆袭'],
      "typeTwoIds": [227],
      "typeTwoName": "kitchen",
      "typeTwoNames": ['kitchen'],
      "viewCount": 15.2
    },
    "chapterList": [
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 0,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
         "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第1集的名称",
        "unlock": true
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 1,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "name": "视频的第2集的名称",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "unlock": true
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 2,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第3集的名称",
        "unlock": true
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 3,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第4集的名称",
        "unlock": true
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 4,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第5集的名称",
        "unlock": true
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 5,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第6集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 6,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第7集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 7,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第8集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 8,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第9集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 9,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第10集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 10,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第11集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 11,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 12,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 13,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 14,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 15,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 15,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 17,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 18,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 19,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 20,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 0,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
         "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第1集的名称",
        "unlock": true
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 1,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "name": "视频的第2集的名称",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "unlock": true
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 2,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第3集的名称",
        "unlock": true
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 3,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第4集的名称",
        "unlock": true
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 4,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第5集的名称",
        "unlock": true
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 5,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第6集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 6,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第7集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 7,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第8集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 8,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第9集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 9,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第10集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 10,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第11集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 11,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 12,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 13,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 14,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 15,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 15,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 17,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 18,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 19,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 20,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 0,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
         "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第1集的名称",
        "unlock": true
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 1,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "name": "视频的第2集的名称",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "unlock": true
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 2,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第3集的名称",
        "unlock": true
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 3,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第4集的名称",
        "unlock": true
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 4,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第5集的名称",
        "unlock": true
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 5,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第6集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 6,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第7集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 7,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第8集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 8,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第9集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 9,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第10集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 10,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第11集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 11,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 12,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 13,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 14,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 15,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 15,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 17,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 18,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 19,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 20,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 0,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
         "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第1集的名称",
        "unlock": true
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 1,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "name": "视频的第2集的名称",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "unlock": true
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 2,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第3集的名称",
        "unlock": true
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 3,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第4集的名称",
        "unlock": true
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 4,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第5集的名称",
        "unlock": true
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 5,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第6集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 6,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第7集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 7,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第8集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 8,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第9集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 9,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第10集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 10,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
      "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",

        "name": "视频的第11集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 11,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 12,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 13,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 14,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 15,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 15,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 17,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 18,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 19,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
      {
        "bookId": "41000010030",
        "id": "0001",
        "index": 20,
        "mp4": "http://vjs.zencdn.net/v/oceans.mp4",
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "name": "视频的第12集的名称",
        "unlock": false
      },
    ],
    "recommends": [
      {
        "bookId": "41000010030",
        "bookName": "Revenge of the poor boy",
        "chapterCount": 22,
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "followCount": 0,
        "introduction": "男主提着礼物和准备的5万块钱到丈母娘家提亲",
        "labels": ['复仇', '逆袭'],
        "language": "ENGLISH",
        "simpleLanguage": "en",
        "tagIds": "",
        "tags": ['复仇', '逆袭'],
        "typeTwoIds": [],
        "typeTwoName": "kitchen",
        "typeTwoNames": ['kitchen'],
        "viewCount": 15.2
      },
      {
        "bookId": "41000010030",
        "bookName": "Revenge of the poor boy",
        "chapterCount": 22,
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "followCount": 0,
        "introduction": "男主提着礼物和准备的5万块钱到丈母娘家提亲",
        "labels": ['复仇', '逆袭'],
        "language": "ENGLISH",
        "simpleLanguage": "en",
        "tagIds": "",
        "tags": ['复仇', '逆袭'],
        "typeTwoIds": [],
        "typeTwoName": "kitchen",
        "typeTwoNames": ['kitchen'],
        "viewCount": 15.2
      },
      {
        "bookId": "41000010030",
        "bookName": "Revenge of the poor boy",
        "chapterCount": 22,
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "followCount": 0,
        "introduction": "男主提着礼物和准备的5万块钱到丈母娘家提亲",
        "labels": ['复仇', '逆袭'],
        "language": "ENGLISH",
        "simpleLanguage": "en",
        "tagIds": "",
        "tags": ['复仇', '逆袭'],
        "typeTwoIds": [],
        "typeTwoName": "kitchen",
        "typeTwoNames": ['kitchen'],
        "viewCount": 15.2
      },
      {
        "bookId": "41000010030",
        "bookName": "Revenge of the poor boy",
        "chapterCount": 22,
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "followCount": 0,
        "introduction": "男主提着礼物和准备的5万块钱到丈母娘家提亲",
        "labels": ['复仇', '逆袭'],
        "language": "ENGLISH",
        "simpleLanguage": "en",
        "tagIds": "",
        "tags": ['复仇', '逆袭'],
        "typeTwoIds": [],
        "typeTwoName": "kitchen",
        "typeTwoNames": ['kitchen'],
        "viewCount": 15.2
      },
      {
        "bookId": "41000010030",
        "bookName": "Revenge of the poor boy",
        "chapterCount": 22,
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "followCount": 0,
        "introduction": "男主提着礼物和准备的5万块钱到丈母娘家提亲",
        "labels": ['复仇', '逆袭'],
        "language": "ENGLISH",
        "simpleLanguage": "en",
        "tagIds": "",
        "tags": ['复仇', '逆袭'],
        "typeTwoIds": [],
        "typeTwoName": "kitchen",
        "typeTwoNames": ['kitchen'],
        "viewCount": 15.2
      },
      {
        "bookId": "41000010030",
        "bookName": "Revenge of the poor boy",
        "chapterCount": 22,
        "cover": "http://nas2osstest.wpzkj.cn/cppartner/4x1/41x0/410x0/41000010030/41000010030.jpg?t=1659682744720&image_process=resize,h_300",
        "followCount": 0,
        "introduction": "男主提着礼物和准备的5万块钱到丈母娘家提亲",
        "labels": ['复仇', '逆袭'],
        "language": "ENGLISH",
        "simpleLanguage": "en",
        "tagIds": "",
        "tags": ['复仇', '逆袭'],
        "typeTwoIds": [],
        "typeTwoName": "kitchen",
        "typeTwoNames": ['kitchen'],
        "viewCount": 15.2
      },
    ],
  "message": "",
  "status": 0,
  "success": true,
  "timestamp": 0
  }
  // if (response === 'BadRequest_404') {
  //   return { notFound: true }
  // }
  // if (response === 'BadRequest_500') {
  //   return { redirect: { destination: '/500', permanent: false } }
  // }
  const { book = {} as IBookItemDetail, recommends = [], chapterList = [] } = response; // chapter, languages = []

  return {
    props: {
      bookId,
      bookInfo: book,
      isPc: ownOs(ua).isPc,
      isApple: isIos(ua),
      recommends,
      chapterList,
      ...(await serverSideTranslations(locale ?? ELanguage.English, ['common'])),
    },
  }
}
