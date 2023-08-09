import React, { FC } from 'react'
import styles from '@/components/home/homeTitle/HomeTitle.module.scss'
import Link from "next/link";
import Image from "next/image";

interface IProps {
  title: string;
  href?: string;
}

const HomeTitle: FC<IProps> = ({ title, href }) => {
  return <div className={styles.titleWrap}>
    <div className={styles.title}>
      <p>{title}</p>
      {href ? <Link className={styles.moreBox} href={href}>
        <Image
          className={styles.moreIcon}
          width={32}
          height={32}
          src={'/images/layout/link.png'}
          alt={'more'}
        />
      </Link> : null}
    </div>
  </div>;
}

export default HomeTitle
