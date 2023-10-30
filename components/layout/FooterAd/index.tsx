import React, { FC } from 'react'
import styles from './index.module.scss'
import ImageCommon from "@/components/common/ImageCommon";
import Link from "next/link";
import ClientConfig from "@/client.config";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { netIpUa } from "@/server/clientLog";
import { useTranslation } from "next-i18next";
import { useAppSelector } from "@/store";
import { isIos } from "@/utils/ownOs";
import useHiveLog from "@/hooks/useHiveLog";

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
      <ImageCommon
        className={styles.adClose}
        source={ '/images/ad/close_footer_ad.png'} onClick={() => fAdClose()}/>
      <ImageCommon className={styles.logo} source={'/images/logo.png'}/>
      <div className={styles.intro}>{t('banner.OpenApp')}</div>
    </div>

    <Link href={isIos(clipboard.ua) ? iosLink : androidLink} legacyBehavior>
      <a rel={'nofollow'}>
        <CopyToClipboard text={copyText} onCopy={() => {
          HiveLog.trackDownload('BannerDownloadButton_Click');
          netIpUa(clipboard)
        }}>
          <div className={styles.openBtn}>{t('banner.Open')}</div>
        </CopyToClipboard>
      </a>
    </Link>
  </div>
}

export default FooterAd
