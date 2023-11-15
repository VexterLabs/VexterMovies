import type { NextPage } from 'next'
import { GetServerSideProps } from "next";
import React from "react";
import { netBrowse } from "@/server/home";
import { ELanguage, IBookItem } from "@/typings/home.interface";
import { ownOs } from "@/utils/ownOs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MBrowse from "@/components/browse";
import PcBrowse from "@/components/pcBrowse";
import { IBrowseTypes } from "@/typings/browse.interface";

interface IProps {
  isPc: boolean;
  bookList: IBookItem[];
  types: IBrowseTypes[];
  pageNo: number;
  pages: number;
  typeTwoId: number;
  typeTwoName: string;
}

const Browse: NextPage<IProps> = (
  { isPc, types, bookList, pageNo, pages, typeTwoId, typeTwoName }) => {
  return <>
    {isPc ?
      <PcBrowse
        pageNo={pageNo}
        types={types}
        bookList={bookList}
        pages={pages}
        typeTwoId={typeTwoId}
        typeTwoName={typeTwoName}
      /> :
      <MBrowse
        pageNo={pageNo}
        types={types}
        bookList={bookList}
        pages={pages}
        typeTwoId={typeTwoId}
        typeTwoName={typeTwoName}
      />}
  </>
}

export const getServerSideProps: GetServerSideProps = async ({ req, query, locale }) => {
  const ua = req?.headers['user-agent'] || ''
  const { page, typeTwoId = 0 } = query;
  if (page === "1") {
    return { redirect: { destination: `/browse/${typeTwoId}`, permanent: false } }
  }
  const response = await netBrowse({
    typeTwoId: Number(typeTwoId) || 0,
    pageNo: Number(page) || 1,
    pageSize: 18
  }, locale as ELanguage)
  if (response === 'BadRequest_404') {
    return { notFound: true }
  }
  if (response === 'BadRequest_500') {
    return { redirect: { destination: '/500', permanent: false } }
  }
  const { currentPage = 1, pages = 0, bookList = [], types = [] } = response;
  if (bookList.length !== 0 || types.length !== 0) {
    types.unshift({ id: 0, name: 'all', replaceName: 'all', checked: false });
  }
  const typeItem = types.find(val => val.id === Number(typeTwoId));
  const typeTwoName = typeItem && typeItem.name ? typeItem.name : "all";

  return {
    props: {
      types,
      bookList,
      pageNo: currentPage,
      pages,
      typeTwoId: Number(typeTwoId),
      isPc: ownOs(ua).isPc,
      typeTwoName,
      ...(await serverSideTranslations(locale || ELanguage.English, ['common'])),
    }
  }
}

export default Browse;
