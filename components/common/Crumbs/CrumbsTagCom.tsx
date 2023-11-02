import React, { FC } from "react";
import Link from "next/link";
import styles from "@/components/common/Crumbs/index.module.scss";
import ImageCommon from "@/components/common/ImageCommon";

interface IProps {
  isShow: boolean;
  isPc: boolean,
  keyword: string;
}

const CrumbsTagCom: FC<IProps> = ({ isShow, isPc, keyword,  }) => {

  return <div className={styles.crumbsTagWrapBox} style={!isShow ? { height: 0, width: 0, overflow: "hidden" } : {}}>
    <div className={`${styles.crumbsWrap} ${!isPc ? styles.crumbsWrapM : ''}`}>
      <Link href="/" legacyBehavior>
        <a className={`${styles.crumbsItem} ${!isPc ? styles.crumbsItemM : ''}`}>
          Home
          <ImageCommon source={'/images/book/crumbs.png'} className={`${styles.crumbsIcon} ${!isPc ? styles.crumbsIconM : ''}`}/>
        </a>
      </Link>

      <Link href={`/keywords`} legacyBehavior>
        <a className={`${styles.crumbsItem} ${!isPc ? styles.crumbsItemM : ''}`}>
          keywords
          {
            !!keyword && <ImageCommon source={'/images/book/crumbs.png'} className={`${styles.crumbsIcon} ${!isPc ? styles.crumbsIconM : ''}`}/>
          }
        </a>
      </Link>
      {keyword && <div className={`${styles.crumbsItemTxt} ${!isPc ? styles.crumbsItemTxtM : ''}`}>{keyword}</div>}
    </div>
  </div>
}

export default CrumbsTagCom;
