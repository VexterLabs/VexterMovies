import React, { FC } from "react";
import { IBookItem } from "@/typings/home.interface";
import Head from "next/head";
import ClientConfig from "@/client.config";
import { useRouter } from "next/router";

interface IProps {
  bookInfo: IBookItem;
}

const ShareHead: FC<IProps> = ({ bookInfo }) => {

  const router = useRouter();

  const locationUrl = process.env.WebDomain + router.asPath;

  return <Head>
    {/*facebook分享*/}
    <meta property="fb:app_id" content="61552540530213"/>
    <meta property="og:url" content={process.env.WebDomain}/>
    <meta property="og:title" content={bookInfo.bookName || ClientConfig.name}/>
    <meta property="og:description" content={bookInfo.introduction}/>
    <meta property="og:image" content={bookInfo.cover}/>
    <meta property="og:site_name" content={ClientConfig.name}/>
    <meta property="og:type" content="website"/>
    {/*twitter分享*/}
    <meta property="twitter:url" content={process.env.WebDomain}/>
    <meta name="twitter:title" content={bookInfo.bookName || ClientConfig.name}/>
    <meta name="twitter:description" content={bookInfo.introduction}/>
    <meta name="twitter:site" content={locationUrl}/>
    <meta name="twitter:card" content="summary"/>
    <meta name="twitter:image" content={bookInfo.cover}/>
    {/*whatsapp分享*/}
    <meta property="whatsapp:url" content={locationUrl}/>
    <meta name="whatsapp:title" content={bookInfo.bookName || ClientConfig.name}/>
  </Head>
}

export default ShareHead;
