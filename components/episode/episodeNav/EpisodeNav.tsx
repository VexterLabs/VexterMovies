import React, { FC } from 'react'
import styles from '@/components/episode/episodeNav/EpisodeNav.module.scss'
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { onCopyText } from "@/utils/copy";
import { netIpUa } from "@/server/clientLog";
import useHiveLog from "@/hooks/useHiveLog";
import { IBookItem } from "@/typings/home.interface";
import { useAppSelector } from "@/store";
import ClientConfig from "@/client.config";

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
      return ClientConfig.ios.deeplink + state.hive.copyText;
    }
    return ClientConfig.android.link;
  });

  return <div className={styles.navBox}>
    <div className={styles.episodesIcon} onClick={() => {showEpisodeDialog()}}>
      <Image
        className={styles.navIcon}
        width={64}
        height={64}
        src={'/images/book/episode-d.png'}
        alt={'more'}
      />
      {/* <span>{t('home.privacyPolicy')}</span> */}
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
        alt={'more'}
      />
      {/* <span>{t('home.termsOfUse')}</span> */}
      <span className={styles.playTxt}>{t('home.play')}</span>
    </Link>
    <Link href={shopLink} className={styles.downloadIcon} onClick={() => {
      onCopyText(copyText, () => {
        netIpUa(clipboard)
        HiveLog.trackDownload('Download_click', { bookId: bookInfo.bookId, chapterId: 0 })
      })
    }}>
      <Image
        className={styles.navIcon}
        width={64}
        height={64}
        src={'/images/book/download-d.png'}
        alt={'more'}
      />
      {/* <span>{t('home.termsOfUse')}</span> */}
      <span>{t('appPage.download')}</span>
    </Link>
  </div>
}

export default EpisodeNav;
