import React, { FC } from 'react'
import styles from '@/components/episode/episopeNav/EpisopeNav.module.scss'
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Image from "next/image";

interface IProps {
}

const MNav: FC<IProps> = () => {
  const { t } = useTranslation();

  return <div className={styles.navBox}>
    <Link href={'/privacy'} className={styles.episodesIcon}>
      <Image
        className={styles.navIcon}
        width={64}
        height={64}
        src={'/images/book/episode-d.png'}
        alt={'more'}
      />
      {/* <span>{t('home.privacyPolicy')}</span> */}
      <span>Episodes</span>
    </Link>
    <Link href={'/terms'} className={styles.playIcon}>
      <Image
        className={styles.navIcon}
        width={64}
        height={64}
        src={'/images/book/botplay-d.png'}
        alt={'more'}
      />
      {/* <span>{t('home.termsOfUse')}</span> */}
      <span className={styles.playTxt}>Play</span>
    </Link>
    <Link href={'/terms'} className={styles.downloadIcon}>
      <Image
        className={styles.navIcon}
        width={64}
        height={64}
        src={'/images/book/download-d.png'}
        alt={'more'}
      />
      {/* <span>{t('home.termsOfUse')}</span> */}
      <span>Download</span>
    </Link>
  </div>
}

export default MNav
