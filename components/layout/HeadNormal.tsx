import React, { FC, useEffect, useState } from 'react'
import ClientConfig from "@/client.config";
import Head from "next/head";
import { Router } from "next/router";
import { TDK } from "@/components/layout/tdk";
import { ELanguage } from "@/typings/home.interface";
import Script from "next/script";
import { useTranslation } from "next-i18next";

const { googleCode } = ClientConfig;

export const pathnameData = {
  browse: '/browse',
  more: '/more/[position]',
  book: '/film/[bookId]',
  episode: '/episode/[bookId]',
  download: '/download',
  error404: '/404',
  error500: '/500',
  agreementPrivacy: '/privacy',
  agreementUser: '/terms',
  tag: '/tag/[keywordId]',
  keywords: '/keywords'
}

const HeadNormal: FC<any> = ({ pageProps = {}, router }: { pageProps: any; router: Router }) => {

  const { t } = useTranslation()
  const getTdk = (): { title: string; keywords: string; description: string; } => {
    const _locale = (router.locale && Object.values(ELanguage).includes(router.locale as ELanguage) ? router.locale : ELanguage.English) as ELanguage;
    // @ts-ignore
    if (!TDK[_locale]) {
      return TDK[ELanguage.English].index;
    }
    if (router.pathname === '/') {
      return TDK[_locale].index
    } else if (router.pathname.includes('/more/[position]')) {
      const positionName = t(pageProps.positionName) || '';
      return TDK[_locale].more({ ...router.query, positionName })
    } else if (router.pathname.includes('/browse')) {
      const  _typeTwoName = pageProps.typeTwoId === 0 ? t(`browse.all`) : pageProps.typeTwoName;
      return TDK[_locale].browse({ ...router.query, typeTwoName: _typeTwoName })
    } else {
      try {
        for(const item in pathnameData) {
          // @ts-ignore
          if (router.pathname.includes(pathnameData[item]) && TDK[_locale] && TDK[_locale][item]) {
            // @ts-ignore
            const tdkItem = TDK[_locale][item]
            return typeof tdkItem === 'function' ? tdkItem({ ...router.query, ...pageProps }) : tdkItem
          }
        }
      } catch (e) {
        return TDK[_locale].index;
      }
    }
    return TDK[_locale].index;
  }
  const [pageTdk, setPageTdk] = useState(() => getTdk());

  useEffect(() => {
    setPageTdk(getTdk())
  },[router, router.locale, t]); // eslint-disable-line

  const getUrl = (lan = ELanguage.English) => {
    const _locale = lan === ELanguage.English ? '' : `/${lan}`
    const _asPath = router.asPath === '/' ? '' : router.asPath
    return process.env.WebDomain +_locale + _asPath;
  }

  // 拓展多语言字段
  const AlternateLink = () => {
    if (router.pathname.includes(pathnameData.tag) || router.pathname.includes(pathnameData.keywords)) return null;

    if (router.pathname.includes(pathnameData.book)) {
      return <>
        {pageProps.languages && pageProps.languages.length > 0 && pageProps.languages.map((lanUrl: ELanguage) => {
          return <link key={lanUrl} rel="alternate" hrefLang={lanUrl} href={getUrl(lanUrl)}/>
        })}
      </>
    } else {
      return <>
        <link rel="alternate" hrefLang={ELanguage.English} href={getUrl(ELanguage.English)}/>
        <link rel="alternate" hrefLang={ELanguage.Korean} href={getUrl(ELanguage.Korean)}/>
        <link rel="alternate" hrefLang={ELanguage.ZhHans} href={getUrl(ELanguage.ZhHans)}/>
        <link rel="alternate" hrefLang={ELanguage.Zh} href={getUrl(ELanguage.Zh)}/>
      </>
    }
  }

  return <>
    <Head>
      <title>{pageTdk.title || ClientConfig.name}</title>
      <meta key="keywords" name="keywords" content={pageTdk.keywords}/>
      {pageTdk.description ? <meta key="description" name="description" content={pageTdk.description}/> : null}
      <meta key="httpEquiv" httpEquiv="X-UA-Compatible" content="IE=edge"/>
      <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"/>
      {/*防止xss攻击*/}
      <meta key="httpEquiv2" httpEquiv="Content-Security-Policy"/>
      {/*Sets whether a web application runs in full-screen mode.*/}
      <meta key={'ios_web'} name="apple-mobile-web-app-capable" content="yes" />
      <link rel="icon" href={'/favicon.ico'}/>
      <link rel="canonical" href={getUrl(router.locale as ELanguage)}/>
      <AlternateLink />
    </Head>
    {/* Global Site Tag (gtag.js) - Google Analytics */}
    <Script
      id={'google_sdk'}
      strategy={'afterInteractive'}
      dangerouslySetInnerHTML={{
        __html: `!function(f,b,e,v,n,t,s){
    t=b.createElement(e);
    t.defer=!0;
    t.src=v;
    s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://www.googletagmanager.com/gtag/js?id=${googleCode}');
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', '${googleCode}');`,
      }}
    />
  </>
}

export default HeadNormal;


