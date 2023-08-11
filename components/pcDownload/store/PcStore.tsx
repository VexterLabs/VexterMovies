import React, { FC } from "react";
import styles from "@/components/pcDownload/store/PcStore.module.scss";
import QRCode from "qrcode.react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Toast } from "antd-mobile";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store";
import { ELanguage } from "@/typings/home.interface";

interface IProps {
}

const PcStore: FC<IProps> = () => {
  const { t } = useTranslation('common');

  const router = useRouter();

  const copyUrl = useAppSelector(state => {
    const bookId = state.hive.clipboard.bid;
    const locale = state.hive.language;
    if (locale === ELanguage.ZhHans) {
      return `${process.env.WebDomain}/download?filmId=${bookId}`
    }
    return `${process.env.WebDomain}/${router.locale}/download?filmId=${bookId}`
  })

  return <div className={styles.storeBox}>
    <h3 className={styles.storeTitle}>DramaBox App</h3>
    <p className={styles.storeSub}>{t('appPage.slogan')}</p>
    <div className={styles.storeContent}>
      <QRCode value={copyUrl} className={styles.qrCode}/>
      <p className={styles.copyTxt}>{t('appPage.copyGuide')}</p>
      <CopyToClipboard text={copyUrl} onCopy={() => {
        Toast.show(t('appPage.copied'))
      }}>
        <p className={styles.clickToCopy}>{t('appPage.clickCopy')}</p>
      </CopyToClipboard>
    </div>
  </div>
}

export default PcStore;
