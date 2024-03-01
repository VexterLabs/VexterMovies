import React, { FC } from 'react'
import styles from '@/components/film/likeTitle/LikeTitle.module.scss'
import Link from "next/link";
import Image from "next/image";
import ImagePline from "@/components/common/image/ImagePline";

interface IProps {
  title: string;
  href?: string;
}

const HomeTitle: FC<IProps> = ({ title, href }) => {
  return <div className={styles.titleWrap}>
    <div className={styles.title}>
      <p>{title}</p>
      {href ? <Link className={styles.moreBox} href={href}>
        <ImagePline
          className={styles.moreIcon}
          width={32}
          height={32}
          src={'/images/pline/link.png'}
          alt={'more'}
        />
      </Link> : null}
    </div>
  </div>;
}

export default HomeTitle
