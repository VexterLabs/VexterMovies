import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { ownOs } from "@/utils/ownOs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ELanguage } from "@/typings/home.interface";
import { useTranslation } from "next-i18next"
import Head from "next/head";
import { getRequestMeta } from "next/dist/server/request-meta";
import styles from 'styles/Privacy.module.scss';
import { getSource } from "@/utils/getSource";

interface IProps {
  isPc: boolean;
  source: string;
}

const AgreementPrivacy: NextPage<IProps> = ({ isPc }) => {
  const { t } = useTranslation()
  return <>
    <Head>
      <meta key="description" name="description" content={(t('privacy.privacyContent') || '').slice(0, 200)}/>
    </Head>
    {isPc ? <div className={styles.privacyWrap}>
        <div className={styles.privacyBox}>
          <div className={styles.privacyTitle}>{t('privacy.privacyTitle')}</div>
          <div className={styles.privacyContent}>
            {t('privacy.privacyContent')}
            {/*<a href="mailto:booksourceofficial@gmail.com" style={{color:"rgba(255, 126, 66, 1)"}}></a>*/}
          </div>
        </div>
      </div> :
      <div className={styles.mPrivacyWrap}>
        <div className={styles.mPrivacyTitle}>{t('privacy.privacyTitle')}</div>
        <div className={styles.mPrivacyIntro}>
          {t('privacy.privacyContent')}
        </div>
      </div>
    }
  </>
}

export const getServerSideProps: GetServerSideProps = async ({ req, locale }) => {
  const ua = req?.headers['user-agent'] || '';
  try {
    const clientUrl = getRequestMeta(req, '__NEXT_INIT_URL');
    if (clientUrl && clientUrl.includes('/en/') && !clientUrl.includes('/_next/data')){
      return { redirect: { destination: '/privacy', permanent: false } }
    }
  } catch (e) {}

  return {
    props: {
      isPc: ownOs(ua).isPc,
      source: getSource(req),
      ...(await serverSideTranslations(locale || ELanguage.English, ['common'])),
    }
  }
}

export default AgreementPrivacy;
