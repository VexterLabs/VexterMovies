import React, { FC, useMemo } from 'react';
import Image from 'next/image';
import { ImageProps } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";
import { UrlObject } from "url";
import { ELanguage } from "@/typings/home.interface";
import styles from "@/components/common/image/index.module.scss";

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
  e.target.style.visibility = 'hidden';
  e.target.src = '/images/defaultFilm.png';
  e.target.srcset = '/images/defaultFilm.png';
  e.target.onload = function (){
    e.target.style.visibility = 'visible';
  }
}

export const ImageCover: FC<IProps> = (props) => {

  const imageProps = useMemo(() => {
    const _props = {} as ImageProps;
    const blackAttributes = ['scale', 'locale', 'onClick', 'className', 'href', 'replace', 'rel'];
    for (const item in props) {
      if (blackAttributes.indexOf(item) === -1) {
        _props[item] = props[item]
      }
    }
    if(!_props.src) {
      _props.src = '/images/defaultFilm.png';
    }
    return _props;
  }, [props]);


  const { scale = false, href, className = '', alt = '', locale, onClick, replace = false, rel } = props;

  return <Link
    rel={rel}
    replace={replace}
    locale={locale}
    href={href}
    className={`${scale ? styles.imageScaleBox : styles.imageBox} ${className}`}
    onClick={() => onClick && onClick()}>
    {/* eslint-disable-next-line jsx-a11y/alt-text */}
    <Image
      className={styles.imageItem}
      onError={onImgError}
      {...imageProps}
      // placeholder="blur"
      // blurDataURL={'/images/defaultFilm.png'}
      alt={alt}
    />
  </Link>
}
