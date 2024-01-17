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
  const shopLink = useAppSelector(state => {
    // const { bid, cid, channelCode, ua } = state.hive.clipboard;
    if (isIos(clipboard.ua)) {
      return ClientConfig.ios.deeplink + state.hive.copyText;
    }
    return ClientConfig.android.link;
    // const intentParam = `open?bid=${bid}&cid=${cid || ''}&chid=${channelCode}&media=other`;
    // return `intent://${intentParam}#Intent;scheme=dramabox;package=${ClientConfig.android.pname};S.browser_fallback_url=${ClientConfig.android.link};end`;
  });

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

    <Link href={shopLink} rel={'nofollow'} onClick={() => {
      onCopyText(copyText, () => {
        HiveLog.trackDownload('BannerDownloadButton_Click');
        netIpUa(clipboard)
      })
    }}>
      <span className={styles.openBtn}>{t('banner.Open')}</span>
    </Link>
  </div>
}

export default FooterAd
