import React, { FC } from 'react';
import Link from "next/link";
import { useTranslation } from "next-i18next";
import ClientConfig from "@/client.config";
import styles from '@/components/layout/pcFooter/PcFooter.module.scss'

interface IProps {
}

const PcFooter: FC<IProps> = () => {
  const { t } = useTranslation();

  return <div className={styles.footerWrap}>
    <div className={styles.footerContent}>

      <div className={styles.footerText}>
        <p className={styles.fText}>© {ClientConfig.name}, {t('home.allRightsReserved')}&nbsp;&nbsp;{ClientConfig.companyName}</p>
        <Link className={styles.fmail} href={`mailto:${ClientConfig.email}`}>
          {t("home.email")}:&nbsp;{ ClientConfig.email }
        </Link>
      </div>

      <div className={styles.footerLink}>
        <Link href={'/terms'} className={styles.otherBtn}>
          {t('home.termsOfUse')}
        </Link>
        <Link href={'/privacy'} className={styles.otherBtn}>
          {t('home.privacyPolicy')}
        </Link>
      </div>
    </div>
  </div>
}

export default PcFooter
