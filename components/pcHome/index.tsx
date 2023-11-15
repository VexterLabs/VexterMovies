import React, { FC } from "react";
import { ColumnNameRoute, IBookItem, IHomeResItem } from "@/typings/home.interface";
import PcHomeTitle from "@/components/pcHome/homeTitle/HomeTitle";
import SwiperArea from "@/components/pcHome/swiperArea/SwiperArea";
import SecondList from "@/components/pcHome/secondList/SecondList";
import { PcEmpty } from "@/components/common/empty";
import { useTranslation } from "next-i18next";
import styles from '@/components/pcHome/index.module.scss';

interface IProps {
  bigList: IBookItem[];
  smallData: IHomeResItem[];
}

const PcHome: FC<IProps> = ({ bigList, smallData }) => {

  const { t } = useTranslation()
  return <main className={styles.homeWrap}>
    <div className={styles.container}>
      {bigList.length > 0 ? <SwiperArea bigList={bigList}/> : null}
      {
        smallData.length > 0 && smallData.map((item, index) => {
          if (item?.items && item.items.length > 0) {
            return <div key={item.id}>
              <PcHomeTitle title={t(item.name)} href={`/more/${ColumnNameRoute[item.name]}`}/>
              <SecondList dataSource={(item.items || []).slice(0, 6)}/>
            </div>
          }
          return null;
        })
      }
      {bigList.length === 0 && smallData.length === 0 ? <PcEmpty/> : null}
    </div>
  </main>
}

export default PcHome
