import React, { useEffect, useState } from "react";
import styles from "@/components/layout/mHeader/mLanguage/MLanguage.module.scss";
import { Popover } from "antd-mobile";
import { LanguageActions } from "@/typings/home.interface";
import { Action } from "antd-mobile/2x/es/components/popover";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAppDispatch } from "@/store";
import { setIsPopChange } from "@/store/modules/app.module";

const MLanguage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const _index = LanguageActions.findIndex(val => val.key === router.locale);
  const [language, setLanguage] = useState(_index !== -1 ? LanguageActions[_index].text : LanguageActions[0].text);
  useEffect(() => {
    const ind = LanguageActions.findIndex(val => val.key === router.locale);
    setLanguage(ind !== -1 ? LanguageActions[_index].text : LanguageActions[0].text);
  }, [router.locale, router]) // eslint-disable-line

  // 切换语言
  const changeLanguage = (item: Action) => {
    if (router.pathname.includes('/browse/[typeTwoId]')) {
      router.replace('/browse/0', undefined, { locale: item.key as string })
    } else {
      router.replace(router.asPath, router.asPath, { locale: item.key as string })
    }
  }

  return <div className={styles.language} onClick={() => dispatch(setIsPopChange(false))}>
    <Popover.Menu
      mode={'light'}
      actions={LanguageActions}
      getContainer={null}
      onAction={(item) => changeLanguage(item)}
      trigger='click'
      placement='bottom'
      defaultVisible={false}
      style={{
        'background': '#292929',
      }}
    >
      <div className={styles.rightBox}>
        <Image
          className={styles.languageIcon}
          width={32}
          height={32}
          src={'/images/home/language.png'}
          alt={'language'}
        />
        <span>{language}</span>
      </div>
    </Popover.Menu>
  </div>
}

export default MLanguage;
