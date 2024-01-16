import React, { FC } from 'react';
import Link from "next/link";
import { useTranslation } from "next-i18next";
import ClientConfig from "@/client.config";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from '@/components/layout/mFooter/MFooter.module.scss';

interface IProps {}

const MFooter: FC<IProps> = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return <div className={styles.footerBox}>
    <Link href={'/privacy'} className={styles.agreementItem}>
      <span>{t('home.privacyPolicy')}</span>
      <Image
        className={styles.agreementIcon}
        width={24}
        height={24}
        src={'/images/layout/link.png'}
        alt={'more'}
      />
    </Link>
    <Link href={'/terms'} className={styles.agreementItem}>
      <span>{t('home.termsOfUse')}</span>
      <Image
        className={styles.agreementIcon}
        width={24}
        height={24}
        src={'/images/layout/link.png'}
        alt={'more'}
      />
    </Link>

    <div className={styles.footerContent}>
      <Image
        className={styles.logoBox}
        width={181}
        height={40}
        src={'/images/logo2.png'}
        placeholder="blur"
        blurDataURL={'/images/logo2.png'}
        alt={ClientConfig.name}
      />

      <div className={styles.community}>
        <div className={styles.communityLabel}>{t("home.community")}:</div>
        <Link
          rel={'nofollow'}
          className={styles.communityItem}
          href={'https://www.facebook.com/profile.php?id=61552540530213'}
          target={'_blank'}>
          Facebook
        </Link>
        <Link
          rel={'nofollow'}
          className={styles.communityItem}
          href={'https://www.youtube.com/@dramaboxapp'}
          target={'_blank'}>
          Youtube
        </Link>
        <Link
          className={styles.communityItem}
          rel={'nofollow'}
          href={(router.locale === 'zh' || router.locale === 'zhHans') ? 'https://www.tiktok.com/@dramaboxtok' : 'https://www.tiktok.com/@dramaboxtik'}
          target={'_blank'}>
          Tiktok
        </Link>
      </div>

      <Link rel={'nofollow'} className={styles.fmail} href={`mailto:${ClientConfig.email}`}>
        {t("home.email")}: &nbsp;{ ClientConfig.email }
      </Link>
      <p className={styles.fText}>© {ClientConfig.name}, {t('home.allRightsReserved')} {ClientConfig.companyName}</p>
    </div>
  </div>
}

export default MFooter
