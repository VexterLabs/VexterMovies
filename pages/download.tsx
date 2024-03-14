import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { isIos, ownOs } from "@/utils/ownOs";
import PcDownload from "@/components/pcDownload";
import MDownload from "@/components/download";
import { ELanguage } from "@/typings/home.interface";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SSRConfig } from "next-i18next";

interface IProps extends SSRConfig {
  isPc: boolean;
  isApple: boolean;
  bookId: string; // 勿删，剪切板使用
  chapterId: string | number;  // 勿删，剪切板使用
}

const DownloadApp: NextPage<IProps> = ({ isPc, isApple }) => {

  return <>
    {isPc ? <PcDownload /> : <MDownload isApple={isApple}/>}
  </>
}

export const getServerSideProps: GetServerSideProps = async ({ req, query, locale }) => {
  const ua = req?.headers['user-agent'] || '';
  const { bookId = '', chapterId = '' } = query as { bookId: string; chapterId?: string; };
  // 返回的参数将会按照 key 值赋值到 Home 组件的同名入参中
  return {
    props: {
      isPc: ownOs(ua).isPc,
      isApple: isIos(ua),
      bookId,
      chapterId: chapterId || 0,
      ...(await serverSideTranslations(locale || ELanguage.English, ['common']))
    }
  }
}

export default DownloadApp;
