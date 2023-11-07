import React, { FC } from 'react';
import Link from "next/link";
import ClientConfig from "@/client.config";
import { netIpUa } from "@/server/clientLog";
import { useTranslation } from "next-i18next";
import { useAppSelector } from "@/store";
import { isIos } from "@/utils/ownOs";
import useHiveLog from "@/hooks/useHiveLog";
import { onCopyText } from "@/utils/copy";
import Image from "next/image";
import styles from './index.module.scss';

const androidLink = ClientConfig.android.link;

interface IProps {
  adClose: () => void;
}

const FooterAd: FC<IProps> = ({ adClose }) => {
  const { t } = useTranslation()
  const clipboard = useAppSelector(state => state.hive.clipboard);
  const copyText = useAppSelector(state => state.hive.copyText);
  const HiveLog = useHiveLog();
  const fAdClose = () => {
    HiveLog.track('BannerDownloadButton_close');
    adClose()
  }
  const iosLink = ClientConfig.ios.deeplink + copyText;
   return <div className={styles.adWrap}>
    <div className={styles.adLeft}>
      <Image
        onClick={() => fAdClose()}
        className={styles.adClose}
        width={48}
        height={48}
        src={'/images/ad/close_footer_ad.png'}
        alt={ClientConfig.name}
      />
      <Image
        className={styles.logo}
        width={88}
        height={88}
        src={'/images/logo.png'}
        alt={ClientConfig.name}
      />
      <div className={styles.intro}>{t('banner.OpenApp')}</div>
    </div>

    <Link href={isIos(clipboard.ua) ? iosLink : androidLink} rel={'nofollow'} onClick={() => {
      onCopyText(copyText, () => {
        HiveLog.trackDownload('BannerDownloadButton_Click');
        netIpUa(clipboard)
      })
    }}>
      <div className={styles.openBtn}>{t('banner.Open')}</div>
    </Link>
  </div>
}

export default FooterAd
