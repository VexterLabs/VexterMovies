import React, { FC, useEffect, useState } from 'react'
// import styles from "@/components/pcEpisope/index.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { onImgError } from "@/components/common/image/ImageCover";
import { IBookItem, IEpisopeItem } from "@/typings/home.interface";
import { useTranslation } from "next-i18next";
import MVideo from '@/components/video'

// 该页面是展示pc端更多剧情的，需要修改后期
interface IProps {

}

const MEspoise: FC<IProps> = () => {
  const { t } = useTranslation()

  return <>
    <MVideo></MVideo>
  </>
}

export default MEspoise;
