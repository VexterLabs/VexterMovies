import React, { FC } from 'react';
import Link from "next/link";
import { EAggregatePageProperties, ETagBookItemIsHot, ITagBookItem } from "typings/book.interface";
import { useTranslation } from "next-i18next";
import { ELanguage } from "typings/home.interface";
import useHiveLog from "@/hooks/useHiveLog";
import Image from "next/image";
import ClientConfig from "@/client.config";
import { onImgError } from "@/components/common/image/ImageCover";
import styles from '@/components/PcTag/tagBookList/TagBookList.module.scss';

interface IProps {
  dataSource: ITagBookItem[];
  keyword: string;
}

export const printKeyword = (content: string, keyword: string) => {
  if (!keyword || !content) return content;
  const index = content.indexOf(keyword);
  const c = index > -1 ? content.substr(index, keyword.length) : '';
  const res = `<span style="color: #FF375F">${c}</span>`
  const regS = new RegExp(keyword, 'gi')
  return content.replace(regS, res) || content
}

const TagBookList: FC<IProps> = ({ dataSource, keyword }) => {
  const { t } = useTranslation();
  const HiveLog = useHiveLog();
  // 聚合页书籍列表点击
  const tagBookClick = (keyword: string, bookId: string, recommend: boolean) => {
    HiveLog.track('Aggregate_page_click', {
      key_word: keyword,
      book_ID: bookId,
      AggregatePage_Properties: recommend ? EAggregatePageProperties.推荐书籍 : EAggregatePageProperties.有版权书籍,
    })
  };
  return <div className={styles.tagBookBox}>
    {dataSource.map((book, bookInd) => {

      const {
        bookId,
        bookName,
        introduction,
        labels = [],
        replacedBookName,
        typeTwoName,
        typeTwoNames = [],
        typeTwoIds = [],
        firstChapterId,
        isHot
      } = book;
      const bookNameDom = printKeyword(bookName, keyword)
      const introDom = printKeyword(introduction, keyword)
      const linkUrl = `/book_info/${bookId}/${typeTwoName || 'all'}/${replacedBookName || 'null'}`;
      const recommend = isHot === ETagBookItemIsHot.yes
      const browseLink = `/browse/${typeTwoIds[0] || 0}/${typeTwoName || 'all'}`
      const simpleLanguage = Object.values(ELanguage).includes(book.simpleLanguage) ? book.simpleLanguage : ELanguage.English;

      return <div key={bookId} className={styles.listItem}>
        <Link
          href={linkUrl}
          locale={simpleLanguage}
          className={styles.bookImageBox}
          onClick={() => tagBookClick(keyword, bookId, recommend)}>
          <Image
            className={styles.bookImage}
            onError={onImgError}
            placeholder="blur"
            blurDataURL={'/images/defaultFilm.png'}
            width={150}
            height={200}
            src={book.cover}
            alt={book.bookName}
          />
        </Link>

        <div className={styles.bookInfo}>
          <Link
            href={linkUrl}
            locale={simpleLanguage}
            className={styles.bookName}
            dangerouslySetInnerHTML={{ __html: bookNameDom }}
            onClick={() => tagBookClick(keyword, bookId, recommend)}
          />

          {labels.length > 0 ? <div className={styles.bookLabelBox}>
            {labels.map(label => {
              if (!label) return null;
              return <Link
                key={label}
                href={browseLink}
                locale={simpleLanguage}
                className={styles.bookLabel}
                onClick={() => tagBookClick(keyword, bookId, recommend)}
              >
                {printKeyword(label, keyword)}
              </Link>

            })}
          </div> : null}

          <Link
            href={linkUrl}
            locale={simpleLanguage}
            className={styles.intro}
            dangerouslySetInnerHTML={{ __html: introDom }}
            onClick={() => tagBookClick(keyword, bookId, recommend)}/>
        </div>

        {
          firstChapterId ? <Link
            href={`/book/${replacedBookName}_${bookId}/Chapter-1_${firstChapterId}`}
            locale={simpleLanguage}
            className={styles.readBtn}
            onClick={() => tagBookClick(keyword, bookId, recommend)}>
            <Image
              className={styles.playBtnImage}
              width={28}
              height={28}
              src={'/images/book/bookinfo_play.png'}
              alt={ClientConfig.name}
            />
            {t('bookInfo.Play')}
          </Link> : null
        }
      </div>
    })}
  </div>
}

export default TagBookList;
