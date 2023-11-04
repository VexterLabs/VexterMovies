import React, { FC } from 'react';
import Image from 'next/image';
import { ImageProps } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";
import { UrlObject } from "url";
import styles from "@/components/common/image/index.module.scss";
import { ELanguage } from "@/typings/home.interface";

type Url = string | UrlObject;

interface IProps extends ImageProps {
  href: Url;
  replace?: boolean;
  scroll?: boolean;
  onClick?: () => void;
  scale?: boolean; // hover效果
  locale?: ELanguage
}

export const onImgError = (e: any) => {
  console.log('imgError:', e.target.src)
  e.target.style.visibility = 'hidden';
  e.target.src = '/images/defaultFilm.png';
  e.target.srcset = '/images/defaultFilm.png';
  e.target.onload = function (){
    e.target.style.visibility = 'visible';
  }
}

export const ImageCover: FC<IProps> = (props) => {

  const imageProps = Object.assign({}, props);

  if (Reflect.has(imageProps, 'locale')) {
    Reflect.deleteProperty(imageProps, 'locale')
  }
  if (Reflect.has(imageProps, 'onClick')) {
    Reflect.deleteProperty(imageProps, 'onClick')
  }
  if (Reflect.has(imageProps, 'className')) {
    Reflect.deleteProperty(imageProps, 'className')
  }
  if (Reflect.has(imageProps, 'href')) {
    Reflect.deleteProperty(imageProps, 'href')
  }

  const { scale = false, href, className = '', alt = '', onClick, locale = ELanguage.English } = props;

  return <Link
    locale={locale}
    href={href}
    className={`${scale ? styles.imageScaleBox : styles.imageBox} ${className}`}
    onClick={() => onClick && onClick()}>
    {/* eslint-disable-next-line jsx-a11y/alt-text */}
    <Image
      className={styles.imageItem}
      onError={onImgError}
      {...imageProps}
      placeholder="blur"
      blurDataURL={'/images/defaultBook.png'}
      alt={alt}
    />
  </Link>
}
