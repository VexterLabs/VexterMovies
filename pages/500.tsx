import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ELanguage } from "@/typings/home.interface";
import { useTranslation } from "next-i18next";
import { useAppSelector } from '@/store';
import { EDevice } from "@/store/store.interfaces";
import ImagePline from "@/components/common/image/ImagePline";
import styles from '@/styles/404.module.scss';

interface IProps {
}

const Custom500: NextPage<IProps> = () => {
  const device = useAppSelector(state => state.app.device)
  const { t } = useTranslation()
  const [isShow, setIsShow] = useState(false); // 兼容：默认展示M端, pc端显示会有闪M的页面
  useEffect(() => {
    setIsShow(true)
  }, []);
  return <>

    {device === EDevice.pc ? <div className={styles.pc404Wrap}>
      <ImagePline
        className={styles.pcEmptyImg}
        width={320}
        height={240}
        src={'/images/pline/500.png'}
        placeholder="blur"
        blurDataURL={'/images/pline/500.png'}
        alt={'500'}
      />
      <Link href="/" className={styles.pcIntro}>
        <span>{t('others.error')}</span>
      </Link>
    </div> : null}

    {device === EDevice.mobile && isShow ? <div className={styles.m404Wrap}>
      <ImagePline
        className={styles.emptyImg}
        width={320}
        height={240}
        src={'/images/pline/500.png'}
        placeholder="blur"
        blurDataURL={'/images/pline/500.png'}
        alt={'500'}
      />

      <Link href="/" className={styles.mIntro}>
        <span>{t('others.error')}</span>
      </Link>
    </div> : null}
  </>
}

export default Custom500;

// `pages/404` can not have getInitialProps/getServerSideProps
export const getStaticProps: GetStaticProps = async ({ locale }) =>{
  return {
    props: {
      ...(await serverSideTranslations(locale || ELanguage.English, ['common']))
    },
  };
}
