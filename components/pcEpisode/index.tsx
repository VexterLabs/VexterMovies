import React, { FC } from "react";
import styles from "@/components/pcEspoise/index.module.scss"
import Link from "next/link";
import { PcEmpty } from "@/components/common/empty";
import { useTranslation } from "next-i18next";
import PcVideo from "@/components/pcVideo"

interface IProps {

}
// 引入视频组件 引入剧集组件 引入相关剧集组件 引入你可能喜欢

const pcEspoise: FC<IProps> = ({}) => {
    return <>
        <PcVideo></PcVideo>
    </>
}

export default pcEspoise
