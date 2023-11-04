import React, { FC } from 'react'
import styles from '@/components/PcTag/tagBookList/TagBookList.module.scss'
import ImageCommon from "@/components/common/ImageCommon";
import Link from "next/link";
import { EAggregatePageProperties, ETagBookItemIsHot, ITagBookItem } from "typings/book.interface";
import { useTranslation } from "next-i18next";
import { ELanguage } from "typings/home.interface";
import useHiveLog from "@/hooks/useHiveLog";
import Image from "next/image";
import ClientConfig from "@/client.config";

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

export const printKeywordBookName = (content: string, keyword: string) => {
  if (!keyword) return content;
  const _keyword = `<span style="color: #FF5F27">${keyword.split('').join('<span style="color: #333333">*</span>')}</span>`
  const contentArr = content.split(keyword).map(val => {
    return val.split('').join('*')
  })
  return contentArr.join(`*${_keyword}*`) || content
}

const TagBookList: FC<IProps> = ({dataSource, keyword}) => {
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
  return <div className={styles.moreBookWrap}>
    { dataSource.map((book, bookInd) => {
      const { bookId, bookName, introduction, cover, author, tag,  replacedBookName, typeTwoName, typeTwoNames = [], typeTwoIds = [], firstChapterId, isHot } = book;
      const bookNameDom = printKeyword(bookName, keyword)
      const introDom = printKeyword(introduction, keyword)
      // const linkUrl = `/detail/${bookId}/${typeTwoName || 'all'}/${replacedBookName || 'null'}`;
      const linkUrl = `/detail/${bookId}`;
      // const authorDom = printKeyword(`${t('others.by')}: ${author} ${tag ? `/${tag}` : ''}`, keyword)
      const recommend = isHot === ETagBookItemIsHot.yes
      const browseLink = `/browse/${typeTwoIds[0] || 0}`
      const simpleLanguage = Object.values(ELanguage).includes(book.simpleLanguage) ? book.simpleLanguage : ELanguage.English;

      return <div key={bookId + bookInd} className={styles.imageItemMoreWrap}>
        <Link 
          href={linkUrl} 
          locale={simpleLanguage}
          className={styles.bookImageBox}
          onClick={() => tagBookClick(keyword, bookId, recommend)}>
            <ImageCommon w={150} h={200} className={styles.bookImage} source={cover} alt={bookName}/>
            {/* { recommend ? <div className={styles.bookHot}>HOT</div> : null } */}
        </Link>

        <div className={styles.bookInfo}>
          <div className={styles.bookNameBox}>
            <Link 
                href={linkUrl} 
                locale={simpleLanguage} 
                className={styles.bookName}
                dangerouslySetInnerHTML={{ __html: bookNameDom }}
                onClick={() => tagBookClick(keyword, bookId, recommend)}
              >
            </Link>
          </div>
          {/* <Link href={linkUrl} locale={simpleLanguage} legacyBehavior>
            <a
              className={styles.bookAuthor}
              dangerouslySetInnerHTML={{ __html: authorDom }}
              onClick={() => tagBookClick(keyword, bookId, recommend)}/>
          </Link> */}

          { 
            !!(typeTwoNames && typeTwoNames.length) && typeTwoNames.map((typeTwoNamesItem, typeTwoNamesIdx) => (
                <Link 
                  key={bookId + '_browse_' + typeTwoNamesIdx}
                  href={`/browse/${typeTwoIds[typeTwoNamesIdx] || 0}/`} 
                  locale={simpleLanguage} 
                  className={styles.bookTypeTwoName}
                  onClick={() => tagBookClick(keyword, bookId, recommend)}>
                    {typeTwoNamesItem}
                </Link>
            ))
          }

          <Link 
            href={linkUrl} 
            locale={simpleLanguage}
            className={styles.intro}
            dangerouslySetInnerHTML={{__html: introDom}}
            onClick={() => tagBookClick(keyword, bookId, recommend)}>
          </Link>
        </div>

        {firstChapterId ? <div className={styles.playBtnBox}>
          <Link 
            href={`/episode/${replacedBookName}_${bookId}/Chapter-1_${firstChapterId}`} 
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
              {t('home.play')}
          </Link>
        </div> : null}
      </div>
    })}
  </div>
}

export default TagBookList;
