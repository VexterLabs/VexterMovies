import React, { FC } from "react";
import Link from "next/link";
import styles from "@/components/common/Crumbs/index.module.scss";
import ImageCommon from "@/components/common/ImageCommon";

interface IProps {
  keyword: string;
  isPc: boolean;
}

const CrumbsTagCom: FC<IProps> = ({ isPc, keyword }) => {

  return <div className={styles.crumbsTagWrapBox} style={!isPc ? { height: 0, width: 0, overflow: "hidden" } : {}}>
    <div className={styles.crumbsWrap}>
      <Link href="/" legacyBehavior>
        <a className={styles.crumbsItem}>
          Home
          <ImageCommon source={'/images/book/crumbs.png'} className={styles.crumbsIcon}/>
        </a>
      </Link>

      <Link href={`/keywords`} legacyBehavior>
        <a className={styles.crumbsItem}>
          keywords
          <ImageCommon source={'/images/book/crumbs.png'} className={styles.crumbsIcon}/>
        </a>
      </Link>
      {keyword && <div className={styles.crumbsItemTxt}>{keyword}</div>}
    </div>
  </div>
}

export default CrumbsTagCom;
