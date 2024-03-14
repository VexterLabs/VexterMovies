import React, { FC, useMemo } from "react";
import Image from "next/image";
import { onCopyText } from "@/utils/copy";
import { Toast } from "antd-mobile";
import { getShareList } from "@/components/film/wapShare/functions";
import { useTranslation } from "next-i18next";
import useHiveLog from "@/hooks/useHiveLog";
import { ELanguage, IBookItem } from "@/typings/home.interface";
import { useRouter } from "next/router";
import styles from "@/components/film/wapShare/index.module.scss";

interface IProps {
  bookInfo: IBookItem;
}

const WapShare: FC<IProps> = ({ bookInfo }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const copyLink = useMemo(() => {
    if (router.locale === ELanguage.English) {
      return process.env.WebDomain + router.asPath;
    }
    return `${process.env.WebDomain}/${router.locale + router.asPath}`
  }, [router.locale]);

  const shareList = useMemo(() => getShareList(copyLink, bookInfo), [copyLink, bookInfo]);

  const HiveLog = useHiveLog();

  // 创建并打开一个新的对话框
  const onShare = (id: string, url: string) => {
    HiveLog.track('Share_click', { share_platform: id })
    window.open(url, "_blank");
  }

  return <div className={styles.shareBox}>
    <div className={styles.shareLabel}>{t('bookInfo.share')}:</div>

    <div className={styles.shareIconBox}>
      {shareList.map(share => (
        <Image
          onClick={() => onShare(share.id, share.link)}
          key={share.id}
          className={styles.shareIcon}
          width={40}
          height={40}
          src={share.icon}
          alt={share.id}
        />
      ))}
      <Image
        onClick={() => {
          onCopyText(copyLink, () => {
            Toast.show(t('bookInfo.shareCopy'))
          })
        }}
        className={styles.shareIcon}
        width={34}
        height={34}
        src={'/images/common/copy-blue.svg'}
        alt={'copy'}
      />
    </div>
  </div>
}

export default WapShare;
