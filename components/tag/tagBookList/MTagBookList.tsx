import React, { FC } from 'react';
import Link from "next/link";
import { EAggregatePageProperties, ETagBookItemIsHot, ITagBookItem } from "@/typings/book.interface";
import { printKeyword } from "@/components/pcTag/tagBookList/TagBookList";
import { ELanguage } from "@/typings/home.interface";
import useHiveLog from "@/hooks/useHiveLog";
import { ImageCover } from "@/components/common/image/ImageCover";
import styles from '@/components/tag/tagBookList/MTagBookList.module.scss';

interface IProps {
  dataSource: ITagBookItem[];
  keyword: string;
  onBookClick?: (book: ITagBookItem) => void;
}

const MTagBookList: FC<IProps> = ({dataSource, keyword, onBookClick}) => {
  const HiveLog = useHiveLog();
  // 聚合页书籍列表点击
  const tagBookClick = (keyword: string, bookId: string, recommend: boolean) => {
    HiveLog.track('Aggregate_page_click', {
      key_word: keyword,
      bookId: bookId,
      AggregatePage_Properties: recommend ? EAggregatePageProperties.推荐书籍 : EAggregatePageProperties.有版权书籍,
    })
  };
  return <div className={styles.listBox}>
    {dataSource && dataSource.length > 0 ? dataSource.map((book, bookInd) => {
      const { bookId, bookName, introduction, cover, typeTwoNames = [], typeTwoIds = [], isHot} = book;
      const bookNameDom = printKeyword(bookName, keyword)
      const introDom = printKeyword(introduction, keyword)
      const linkUrl = `/film/${bookId}`;
      const recommend = isHot === ETagBookItemIsHot.yes
      const simpleLanguage = Object.values(ELanguage).includes(book.simpleLanguage) ? book.simpleLanguage : ELanguage.English;

      return <div key={bookId + bookInd} className={styles.listItem} onClick={() => onBookClick && onBookClick(book)}>
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

          {
            !!(typeTwoNames && typeTwoNames.length) && <div className={styles.bookLabels}>
              {
                typeTwoNames.map((typeTwoNamesItem, typeTwoNamesIdx) => (
                  <Link
                    key={bookId + '_browse_' + typeTwoNamesIdx}
                    href={`/browse/${typeTwoIds[typeTwoNamesIdx] || 0}/`}
                    locale={simpleLanguage}
                    className={styles.bookLabel}
                    onClick={() => tagBookClick(keyword, bookId, recommend)}>
                      {typeTwoNamesItem}
                  </Link>
                ))
              }
            </div>
          }

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
