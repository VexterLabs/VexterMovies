import React, { FC } from 'react';
import Link from "next/link";
import { useTranslation } from "next-i18next";
import ClientConfig from "@/client.config";
import styles from '@/components/layout/pcFooter/PcFooter.module.scss'
import { useRouter } from "next/router";

interface IProps {
}

const PcFooter: FC<IProps> = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return <div className={styles.footerWrap}>
    <div className={styles.footerContent}>
      <div className={styles.footerBox}>
        <div className={styles.footerLabel}>{t("home.about")}</div>
        <div className={styles.footerLink}>
          <Link href={'/terms'} className={styles.otherBtn}>
            {t('home.termsOfUse')}
          </Link>
          <Link href={'/privacy'} className={styles.otherBtn}>
            {t('home.privacyPolicy')}
          </Link>
        </div>
      </div>

      <div className={styles.footerBox}>
        <div className={styles.footerLabel}>{t("home.contact")}</div>
        <Link className={styles.fmail} rel={'nofollow'} href={`mailto:${ClientConfig.email}`}>
          {t("home.email")}:&nbsp;{ ClientConfig.email }
        </Link>
      </div>

      <div className={styles.footerBox}>
        <div className={styles.footerLabel}>{t("home.community")}</div>
        <div className={styles.community}>
          <Link className={styles.fmail} rel={'nofollow'} href={'https://www.facebook.com/profile.php?id=61552540530213'} target={'_blank'}>
            Facebook
          </Link>
          <Link className={styles.fmail} rel={'nofollow'} href={'https://www.youtube.com/@dramaboxapp'} target={'_blank'}>
            Youtube
          </Link>
          <Link
            className={styles.fmail}
            rel={'nofollow'}
            href={(router.locale === 'zh' || router.locale === 'zhHans') ? 'https://www.tiktok.com/@dramaboxtok' : 'https://www.tiktok.com/@dramaboxtik'}
            target={'_blank'}>
            Tiktok
          </Link>
        </div>
      </div>
    </div>
    <p className={styles.company}>© {ClientConfig.name}, {t('home.allRightsReserved')}&nbsp;&nbsp;{ClientConfig.companyName}</p>
  </div>
}

export default PcFooter
