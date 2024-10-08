import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { ownOs } from "@/utils/ownOs";
import { netKeywords } from "@/server/home";
import PcKeywords from "@/components/pcKeywords";
import MKeywords from "@/components/keywords";
import { IKeywordItem } from "typings/book.interface";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ELanguage } from "typings/home.interface";
import { ESearchType } from "typings/sitemap.interface";
import useHiveLog from "@/hooks/useHiveLog";
import { IBreadcrumb } from "@/components/common/breadcrumb";
import { SSRConfig } from "next-i18next";
import { getSource } from "@/utils/getSource";

interface IProps extends SSRConfig {
  keywordList: IKeywordItem[]
  isPc: boolean;
  currentPage: number;
  totalPage: number;
  source: string;
}

const KeywordsPage: NextPage<IProps> = ({ isPc, currentPage, totalPage = 0, keywordList = [] }) => {
  const HiveLog = useHiveLog();
  // 关键词列表页点击
  const keywordClick = (item: IKeywordItem) => {
    HiveLog.track('Keyword_click', { keyword: item.name, keywordId: item.id })
  }

  const breadData: IBreadcrumb[] = [
    { title: 'Home', link: "/" },
    { title: 'Keywords' },
  ]

  return <>
    {isPc ?
      <PcKeywords
        breadData={breadData}
        keywordList={keywordList}
        pageNo={currentPage}
        totalPage={totalPage}
        keywordClick={keywordClick}/>
      :
      <MKeywords
        breadData={breadData}
        keywordList={keywordList}
        pageNo={currentPage}
        totalPage={totalPage}
        keywordClick={keywordClick}/>}
  </>
}

export default KeywordsPage;

export const getServerSideProps: GetServerSideProps = async ({ req, query, locale }) => {
  const ua = req?.headers['user-agent'] || ''
  const { page } = query as { page: string; };
  if (page === '1') {
    return { redirect: { destination: '/keywords', permanent: false } }
  }
  const res = await netKeywords({
    pageNum: Number(page) || 1,
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

  return {
    props: {
      keywordList: data,
      isPc: ownOs(ua).isPc,
      currentPage,
      totalPage: pages,
      source: getSource(req),
      ...(await serverSideTranslations(locale || ELanguage.English, ['common'])),
    }
  }
}
