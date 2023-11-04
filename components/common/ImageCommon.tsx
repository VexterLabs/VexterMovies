import React, { FC, useMemo } from 'react'
import Image from 'next/image'

interface IProps {
  className?: string | undefined;
  source: string;
  onClick?: () => void;
  alt?: string;
  w?: number;
  h?: number;
}

const ImageCommon: FC<IProps> = (
  { className , source, onClick, alt = '', w, h}
) => {

  const imgError = (e: any) => {
    e.target.style.visibility = 'hidden';
    e.target.src = '/images/defaultFilm.png';
    e.target.onload = function (){
      e.target.style.visibility = 'visible';
    }
  }

  const getSource = () => {
    if(!source) {
      return '/images/defaultFilm.png';
    }
    return source;
  }

  const imgSource = useMemo(() => getSource(), [source, w, h]); // eslint-disable-line
  const imgBlurDataURL = useMemo(() => source && source.includes('/images/') ? source : '/images/defaultFilm.png', [source]);
  // 删掉懒加载，解决LCP问题
  return <div style={{ position: 'relative' }} className={className} onClick={() => onClick && onClick()}>
    <Image
      style={{ color: "transparent" }}
      onError={(e)=> imgError(e)}
      unoptimized
      layout={'fill'}
      // objectFit="cover"
      quality={100}
      placeholder={'blur'}
      blurDataURL={imgBlurDataURL}
      src={imgSource}
      // loading={'lazy'}
      alt={alt} />
  </div>
}

// const ImageCommon: FC<IProps> = ({ className , source, onClick, alt = ''}) => {
//   return <picture className={className} onClick={() => onClick && onClick()}>
//     <source srcSet={source} type="image/webp" />
//     <img width='100%' height='100%' placeholder='/images/home/imgDefault.png' src={source} alt={alt} />
//   </picture>
// }

export default ImageCommon;
