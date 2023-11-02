import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { ownOs } from "@/utils/ownOs";
import { netKeywords } from "@/server/home";
import PcKeywords from "@/components/PcKeywords/PcKeywords";
import MKeywords from "@/components/Keywords/MKeywords";
import { IKeywordItem } from "typings/book.interface";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ELanguage } from "typings/home.interface";
import { ESearchType } from "typings/sitemap.interface";
import useHiveLog from "@/hooks/useHiveLog";
import CrumbsTagCom from "@/components/common/Crumbs/CrumbsTagCom";
import dataListMock from "./data.json"

interface IProps {
  keywordList: IKeywordItem[]
  isPc: boolean;
  currentPage: number;
  totalPage: number;
}

const KeywordsPage: NextPage<IProps> = ({ isPc, currentPage, totalPage = 0, keywordList = [] }) => {
  const HiveLog = useHiveLog();
  // 关键词列表页点击
  const keywordClick = (keyword: string) => {
    HiveLog.track('ListPage_click', { key_word: keyword })
  }

  return <>
    <CrumbsTagCom isShow={true} isPc={isPc} keyword=""/>
    {isPc ?
      <PcKeywords keywordList={keywordList} pageNo={currentPage} totalPage={totalPage} keywordClick={keywordClick}/>
      : <MKeywords keywordList={keywordList} pageNo={currentPage} totalPage={totalPage} keywordClick={keywordClick}/>}
  </>
}

export default KeywordsPage;

export const getServerSideProps: GetServerSideProps = async ({ req, query, locale }) => {
  const ua = req?.headers['user-agent'] || ''
  const { page = '1' } = query as { page: string; };

  const res = await netKeywords({
    pageNum: Number(page),
    pageSize: 300,
    searchType: ESearchType.ALL
  })

  if (res === 'BadRequest_500') {
    return { redirect: { destination: '/500', permanent: false } }
  }
  if (res === 'BadRequest_404' || !res) {
    return { notFound: true }
  }

  const { data = [], currentPage = 1, pages = 1 } = res;

  // const data = dataListMock, currentPage = 1, pages = 1000;
  
  return {
    props: {
      keywordList: data,
      isPc: ownOs(ua).isPc,
      currentPage,
      totalPage: pages,
      ...(await serverSideTranslations(locale ?? ELanguage.English, ['common'])),
    }
  }
}
