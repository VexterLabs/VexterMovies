import React, { FC, useEffect, useState } from "react";
import styles from "@/components/layout/mHeader/MHeader.module.scss";
import MNav from "@/components/layout/mHeader/mNav";
import MLanguage from "@/components/layout/mHeader/mLanguage/MLanguage";
import ClientConfig from "@/client.config";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import useHiveLog from "@/hooks/useHiveLog";
import ImagePline from "@/components/common/image/ImagePline";
import HeaderAd from "@/components/layout/headerAd";

interface IProps {
}

const MHeader: FC<IProps> = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter()

  const [isLanguageShow, setIsLanguageShow] = useState<boolean | false>(false);
  const HiveLog = useHiveLog()
  useEffect(() => {
    if(router && router.pathname) {
      setIsLanguageShow((router.pathname === '/'))
    }
  }, [router])

  const navIconClick = () => {
    if (visible) {
      setVisible(false)
      document.body.style.overflow = ''
    } else {
      setVisible(true)
      document.body.style.overflow = 'hidden'
    }
  }

  return (<>
    <HeaderAd />
    <MNav visible={visible} cancel={() => navIconClick()}/>
    <div
      style={router.pathname.includes('/browse') ? { backgroundColor: process.env.Platform === "dramabox" ? "#FFFFFF" : "#000000" } : {}}
      className={styles.headerContent}>
      <ImagePline
        onClick={() => navIconClick()}
        className={styles.navMenuIcon}
        width={48}
        height={48}
        src={'/images/pline/m-menu.png'}
        alt={''}
      />
      <Link href={'/'} className={styles.logoBox} onClick={() => {
        HiveLog.track('Logo_click')
      }}>
        <ImagePline
          className={styles.logo}
          width={181}
          height={40}
          src={'/images/pline/m-logo.png'}
          alt={ClientConfig.name}
        />
      </Link>
      {
        isLanguageShow ? <MLanguage/> : null
      }

    </div>
    <div className={styles.headerOccupy}/>
  </>)
}

export default MHeader;
