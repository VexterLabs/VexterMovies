import React, { FC } from 'react';
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { onCopyText } from "@/utils/copy";
import { netIpUa } from "@/server/clientLog";
import useHiveLog from "@/hooks/useHiveLog";
import { IBookItem } from "@/typings/home.interface";
import { useAppSelector } from "@/store";
import ClientConfig from "@/client.config";
import styles from '@/components/episode/episodeNav/EpisodeNav.module.scss';
import ImagePline from "@/components/common/image/ImagePline";

interface IProps {
  bookInfo: IBookItem;
  showEpisodeDialog: () => void;
  chapterId?: string;
  isApple: boolean;
}

const EpisodeNav: FC<IProps> = ({bookInfo, showEpisodeDialog, chapterId, isApple}) => {
  const { t } = useTranslation();
  const HiveLog = useHiveLog();
  const clipboard = useAppSelector(state => state.hive.clipboard)
  const copyText = useAppSelector(state => state.hive.copyText);
  const shopLink = useAppSelector(state => {
    if (isApple) {
      const { bid = "", channelCode = "", cid = 0, h5uid = "" } = state.hive.clipboard;
      const queryStr = !cid ? `${h5uid}_${bid}_${channelCode}_other` : `${h5uid}_${bid}_${channelCode}_other_${cid}`;
      return ClientConfig.ios.universalLink + queryStr;
    }
    return ClientConfig.android.link;
    // const { bid, cid, channelCode } = state.hive.clipboard;
    // const intentParam = `open?bid=${bid}&cid=${cid || ''}&chid=${channelCode}&media=other`;
    // return `intent://${intentParam}#Intent;scheme=dramabox;package=${ClientConfig.android.pname};S.browser_fallback_url=${ClientConfig.android.link};end`;
  });

  const onDownload = () => {
    netIpUa(clipboard);
    onCopyText(copyText, () => {
      HiveLog.trackDownload('Download_click', { bookId: bookInfo.bookId, chapterId: 0 });
      window.location.href = shopLink;
    });
  }

  return <div className={styles.navBox}>
    <div className={styles.episodesIcon} onClick={() => {showEpisodeDialog()}}>
      <ImagePline
        className={styles.navIcon}
        width={64}
        height={64}
        src={'/images/pline/m-episode.png'}
        alt={''}
      />
      <span>{t('bookInfo.episodes')}</span>
    </div>
    <Link
      href={`/episode/${bookInfo.bookId}/${chapterId || ''}`}
      className={styles.playIcon}
      onClick={() => {
        HiveLog.track('Play_click')
      }}>
      <Image
        className={styles.navIcon}
        width={64}
        height={64}
        src={'/images/book/botplay-d.png'}
        alt={''}
      />
      <span className={styles.playTxt}>{t('home.play')}</span>
    </Link>
    <div className={styles.downloadIcon} onClick={onDownload}>
      <ImagePline
        className={styles.navIcon}
        width={64}
        height={64}
        src={'/images/pline/m-download.png'}
        alt={''}
      />
      {/* <span>{t('home.termsOfUse')}</span> */}
      <span>{t('appPage.download')}</span>
    </div>
  </div>
}

export default EpisodeNav;
