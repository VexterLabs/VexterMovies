import React, { FC } from "react";
import styles from '@/components/pcDownload/index.module.scss';
import { useTranslation } from "next-i18next";
import PcStore from "@/components/pcDownload/store/PcStore";
import Image from "next/image";

interface IProps {
}

const PcDownload: FC<IProps> = () => {
  const { t } = useTranslation();

  return <div className={styles.downloadWrap}>
    <div className={styles.downloadHeader}>
      <h3 className={styles.downloadTitle}>{t('appPage.title')}</h3>
      <div className={styles.downloadContent}>
        {t("appPage.content")}
      </div>
    </div>

    <div className={styles.downloadMain}>
      <Image
        className={styles.downloadCover}
        width={520}
        height={520}
        src={'/images/download/pc-cover.png'}
        placeholder="blur"
        blurDataURL={'/images/download/pc-cover.png'}
        alt={''}
      />
      <PcStore />
    </div>
  </div>
}

export default PcDownload;
