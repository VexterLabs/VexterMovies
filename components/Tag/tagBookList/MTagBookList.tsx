import React, { FC } from 'react'
import styles from '@/components/Tag/tagBookList/MTagBookList.module.scss'
import ImageCommon from "@/components/common/ImageCommon";
import Link from "next/link";
import { EAggregatePageProperties, ETagBookItemIsHot, ITagBookItem } from "typings/book.interface";
import { printKeyword } from "@/components/PcTag/tagBookList/TagBookList";
import { ELanguage } from "typings/home.interface";
import useHiveLog from "@/hooks/useHiveLog";

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
  return <div className={styles.bookListWrap}>
    {dataSource && dataSource.length > 0 ? dataSource.map((book, bookInd) => {
      let { bookId, bookName, introduction, cover, author, tag, typeTwoName = 'all', replacedBookName, typeTwoNames = [], typeTwoIds = [], isHot} = book;
      const bookNameDom = printKeyword(bookName, keyword)
      const introDom = printKeyword(introduction, keyword)
      const linkUrl = `/detail/${bookId}`;
      const authorDom = printKeyword(author + (tag ? `/${tag}` : ''), keyword)
      const recommend = isHot === ETagBookItemIsHot.yes
      const browseLink = `/browse/${typeTwoIds[0] || 0}/`;
      const simpleLanguage = Object.values(ELanguage).includes(book.simpleLanguage) ? book.simpleLanguage : ELanguage.English;
      return <div key={bookId + bookInd} className={styles.imageItem1Wrap}>
        <Link 
          href={linkUrl} 
          locale={simpleLanguage} 
          className={styles.bookImageBox} 
          onClick={() => tagBookClick(keyword, bookId, recommend)}
        >
          <ImageCommon w={130} h={172} className={styles.bookImage} source={cover} alt={bookName}/>
          {/* {recommend ? <div className={styles.bookStatus}>HOT</div> : null} */}
        </Link>
        <div className={styles.bookInfo}>
          <Link 
            href={linkUrl} 
            locale={simpleLanguage} 
            onClick={() => tagBookClick(keyword, bookId, recommend)}
            >
              <h2 className={styles.bookName} dangerouslySetInnerHTML={{__html: bookNameDom}}/>
          </Link>
          <div className={styles.bookLine2}>
            {/* <Link href={linkUrl} locale={simpleLanguage} legacyBehavior>
              <a
                className={styles.author}
                dangerouslySetInnerHTML={{ __html: authorDom }}
                onClick={() => tagBookClick(keyword, bookId, recommend)}/>
            </Link> */}
      
            { 
              !!(typeTwoNames && typeTwoNames.length) && typeTwoNames.map((typeTwoNamesItem, typeTwoNamesIdx) => (
                  <Link 
                    key={bookId + '_browse_' + typeTwoNamesIdx }
                    href={`/browse/${typeTwoIds[typeTwoNamesIdx] || 0}/`} 
                    locale={simpleLanguage} 
                    className={styles.bookTypeTwoName}
                    onClick={() => tagBookClick(keyword, bookId, recommend)}
                  >
                      {typeTwoNamesItem}
                  </Link>
              ))
            }
          </div>

          <Link 
            href={linkUrl} 
            locale={simpleLanguage} 
            className={styles.intro}
            dangerouslySetInnerHTML={{__html: introDom}}
            onClick={() => tagBookClick(keyword, bookId, recommend)}
          >
          </Link>
        </div>
      </div>
    }) : null}
  </div>
}

export default MTagBookList;
