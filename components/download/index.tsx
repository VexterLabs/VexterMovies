import React, { FC } from "react";
import styles from '@/components/download/index.module.scss'
import { useTranslation } from "next-i18next";
import { useAppSelector } from "@/store";
import ClientConfig from "@/client.config";
import Link from "next/link";
import Image from "next/image";
import { netIpUa } from "@/server/clientLog";
import useHiveLog from "@/hooks/useHiveLog";
import { onCopyText } from "@/utils/copy";

interface IProps {
  isApple: boolean;
}

const MDownload: FC<IProps> = ({ isApple }) => {
  const { t } = useTranslation();
  const clipboard = useAppSelector(state => state.hive.clipboard)
  const copyText = useAppSelector(state => state.hive.copyText);
  const shopLink = useAppSelector(state => {
    if (isApple) {
      return ClientConfig.ios.deeplink + state.hive.copyText;
    }
    return ClientConfig.android.link;
  });

  const HiveLog = useHiveLog();

  return <div className={styles.downloadWrap}>
    <div className={styles.downloadHead}>
      {t('appPage.title')}
    </div>
    <Image
      className={styles.downloadCover}
      width={440}
      height={440}
      src={'/images/download/cover.png'}
      placeholder="blur"
      blurDataURL={'/images/download/cover.png'}
      alt={ClientConfig.name}
    />
    <Link
      rel={"nofollow"}
      href={shopLink}
      onClick={() => {
        onCopyText(copyText, () => {
          netIpUa(clipboard)
          HiveLog.trackDownload('turnPage_click', { bookId: clipboard.bid, chapterId: clipboard.cid })
        })
      }}
    >
      <div className={styles.downloadBtn}>
        <Image
          className={styles.downloadBtnIcon}
          width={48}
          height={48}
          src={isApple ? '/images/download/ios.png' : '/images/download/android.png'}
          alt={ClientConfig.name}
        />
        <span>{t("appPage.download")}</span>
      </div>
    </Link>
    <div className={styles.downloadContent}>
      {t("appPage.content")}
    </div>
  </div>
}

export default MDownload;
