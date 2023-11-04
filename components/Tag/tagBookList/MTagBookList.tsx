import React, { FC } from 'react'
import styles from '@/components/Tag/tagBookList/MTagBookList.module.scss'
import Link from "next/link";
import { EAggregatePageProperties, ETagBookItemIsHot, ITagBookItem } from "typings/book.interface";
import { printKeyword } from "@/components/PcTag/tagBookList/TagBookList";
import { ELanguage } from "typings/home.interface";
import useHiveLog from "@/hooks/useHiveLog";
import { ImageCover } from "@/components/common/image/ImageCover";

interface IProps {
  dataSource: ITagBookItem[];
  keyword: string;
}

const MTagBookList: FC<IProps> = ({dataSource, keyword}) => {
  const HiveLog = useHiveLog();
  // 聚合页书籍列表点击
  const tagBookClick = (keyword: string, bookId: string, recommend: boolean) => {
    HiveLog.track('Aggregate_page_click', {
      key_word: keyword,
      book_ID: bookId,
      AggregatePage_Properties: recommend ? EAggregatePageProperties.推荐书籍 : EAggregatePageProperties.有版权书籍,
    })
  };
  return <div className={styles.listBox}>
    {dataSource && dataSource.length > 0 ? dataSource.map((book, bookInd) => {
      const { bookId, bookName, introduction, cover, labels, tag, typeTwoName = 'all', replacedBookName, typeTwoNames = [], typeTwoIds = [], isHot} = book;
      const bookNameDom = printKeyword(bookName, keyword)
      const introDom = printKeyword(introduction, keyword)
      const linkUrl = `/book_info/${bookId}/${typeTwoName || 'all'}/${replacedBookName || 'null'}`;
      const recommend = isHot === ETagBookItemIsHot.yes
      const browseLink = `/browse/${typeTwoIds[0] || 0}/${typeTwoName || 'all'}`;
      const simpleLanguage = Object.values(ELanguage).includes(book.simpleLanguage) ? book.simpleLanguage : ELanguage.English;

      return <div key={bookId + bookInd} className={styles.listItem}>
        <ImageCover
          onClick={() => tagBookClick(keyword, bookId, recommend)}
          locale={simpleLanguage}
          href={linkUrl}
          className={styles.bookImage}
          src={cover}
          width={165}
          height={220}
          alt={bookName}
        />

        <div className={styles.bookInfo}>
          <Link
            href={linkUrl}
            locale={simpleLanguage}
            onClick={() => tagBookClick(keyword, bookId, recommend)}
            className={styles.bookName}
            dangerouslySetInnerHTML={{__html: bookNameDom}}
          />

          { labels.length > 0 ? <div className={styles.bookLabels}>
            {labels.map(val => {
              if (!val) return null;
              return  <Link
                key={val}
                className={styles.bookLabel}
                onClick={() => tagBookClick(keyword, bookId, recommend)}
                href={browseLink}
                locale={simpleLanguage}>
                {val}
              </Link>
            })}
          </div> : null }

          <Link
            className={styles.intro}
            dangerouslySetInnerHTML={{__html: introDom}}
            onClick={() => tagBookClick(keyword, bookId, recommend)}
            href={linkUrl}
            locale={simpleLanguage} />
        </div>

      </div>
    }) : null}
  </div>
}

export default MTagBookList;
