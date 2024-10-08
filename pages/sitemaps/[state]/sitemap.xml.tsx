import { SitemapBuilder, withXMLResponseLegacy } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { ISitemapField } from "next-sitemap/dist/@types/interface";
import { netAllBook, netAllColumn, netBookDetail, netBrowseType, netKeywords } from "@/server/home";
import dayjs from "dayjs";
import { ColumnNameRoute, ELanguage, IBookItem } from "@/typings/home.interface";
import { ESearchType, INetAllBookRes, INetAllColumnRes } from "@/typings/sitemap.interface";
import { INetBrowseTypeRes } from "@/typings/browse.interface";
import { IKeywordItem } from "@/typings/book.interface";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const sitemapBuilder = new SitemapBuilder()
  const lastmod = dayjs().day(1).format('YYYY-MM-DD');
  const options: ISitemapField = { loc: process.env.Platform === "dramabox" ? 'https://www.dramabox.com' : 'https://www.dramaboxapp.com', changefreq: 'weekly', priority: 0.7, lastmod };
  const { state = '' } = ctx.query as { state: string };
  const languageArr = Object.values(ELanguage);
  // 站内页
  if (state === 'inside') {
    const insidePage = ['', '/download', '/privacy', '/terms']
    const insideFields: ISitemapField[] = insidePage.map(val => ({
      ...options,
      loc: options.loc + val,
      alternateRefs: languageArr.map(lan => {
        const _loc = lan === ELanguage.English ? val : `/${lan}${val}`
        return { href: options.loc + _loc, hreflang: lan, hrefIsAbsolute: false }
      }),
      changefreq: 'monthly',
      lastmod: dayjs().date(1).format('YYYY-MM-DD'),
      trailingSlash: false
    }));
    const fields = [...insideFields] as ISitemapField[];
    const content = sitemapBuilder.buildSitemapXml(fields).replace(/xmlns:.*="(.*)"/g, 'xmlns:xhtml="http://www.w3.org/1999/xhtml"');
    return withXMLResponseLegacy(ctx, content)
  }
  // 栏目
  if (state === 'columns') {
    let list = [] as INetAllColumnRes[];
    const response = await netAllColumn();
    if (response !== 'BadRequest_500' && response !== 'BadRequest_404' && response && response.length) {
      list = response;
    }
    let fields: ISitemapField[] = [];
    list.forEach(val => {
      const pages = Array.from({ length: Math.ceil(val.bookCount / 18) }, (v, i) => {
        const _loc = `${options.loc}/more/${ColumnNameRoute?.[val.name]}` + (i > 0 ? `/${i + 1}` : '')
        return { ...options, loc: _loc }
      })
      fields = fields.concat(pages);
    })
    const content = sitemapBuilder.buildSitemapXml(fields).replace(/ xmlns:.*="(.*)"/g, '');
    return withXMLResponseLegacy(ctx, content)
  }
  // 浏览
  if (state === 'browse') {
    let list = [] as INetBrowseTypeRes[];
    const response = await netBrowseType();
    if (response !== 'BadRequest_500' && response !== 'BadRequest_404' && response && response.length) {
      list = response
    }
    let fields: ISitemapField[] = [];
    list.forEach(val => {
      const pages = Array.from({ length: Math.ceil(val.total / 18) }, (v, i) => {
        let _loc = `/browse/${val.id}`;
        if (val.simpleLanguage !== ELanguage.English) {
          _loc = '/' + val.simpleLanguage + _loc
        }
        if (i > 0) {
          _loc += `/${i + 1}`
        }
        return { ...options, loc: options.loc + _loc }
      })
      fields = fields.concat(pages);
    })
    const content = sitemapBuilder.buildSitemapXml(fields).replace(/ xmlns:.*="(.*)"/g, '');
    return withXMLResponseLegacy(ctx, content)
  }
  // 书籍详情
  if (state === 'films') {
    let allData = [] as INetAllBookRes[];
    let increaseData = [] as INetAllBookRes[];

    const response = await netAllBook({ searchType: ESearchType.ALL });
    // console.log('films=======>', response);
    if (response !== 'BadRequest_500' && response !== 'BadRequest_404' && response && response.length) {
      allData = response
    }
    const bookResponse = await netAllBook({ searchType: ESearchType.INCREASE });
    if (bookResponse !== 'BadRequest_500' && bookResponse !== 'BadRequest_404' && bookResponse && bookResponse.length) {
      increaseData = bookResponse
    }
    const fields: ISitemapField[] = [];

    allData.forEach(book => {
      const isNewBook = increaseData && increaseData.length > 0 && increaseData.findIndex(addBook => addBook.bookId === book.bookId) > 0;

      const linkUrl = process.env.Platform === 'dramabox' ? `/drama/${book.bookId}/${book.bookNameEn || ''}` : `/film/${book.bookId}`

      fields.push({
        ...options,
        lastmod: isNewBook ? book.utime : options.lastmod,
        changefreq: isNewBook ? 'daily' : options.changefreq,
        loc: options.loc + linkUrl,
        alternateRefs: (book.languages || []).map(lan => {
          let _loc = linkUrl;
          if (lan !== ELanguage.English) {
            _loc = '/' + lan + _loc
          }
          return {
            href: options.loc + _loc,
            hreflang: lan,
            hrefIsAbsolute: false
          }
        }),
        trailingSlash: false
      })
    });
    const content = sitemapBuilder.buildSitemapXml(fields).replace(/xmlns:.*="(.*)"/g, 'xmlns:xhtml="http://www.w3.org/1999/xhtml"');

    return withXMLResponseLegacy(ctx, content)
  }
  // 关键词
  if (state === 'keywords') {
    const response = await netKeywords({ pageNum: 1, pageSize: 10, searchType: ESearchType.ALL });
    let total = 0;
    if (response !== 'BadRequest_500' && response !== 'BadRequest_404' && response) {
      total = response.total || 0;
    }
    const fields = Array.from({ length: Math.ceil(total / 300) }, (v, i) => {
      return { ...options, loc: `${options.loc}/keywords/${i + 1}` }
    })
    const content = sitemapBuilder.buildSitemapXml(fields).replace(/xmlns:.*="(.*)"/g, '');
    return withXMLResponseLegacy(ctx, content)
  }
  // 聚合页（新增）
  if (state.includes('incremental_tag_page_')) {
    const page = Number(state.replace('incremental_tag_page_', '')) || 0;
    const response = await netKeywords({ pageNum: page, pageSize: 10000, searchType: ESearchType.INCREASE });
    let list = [] as IKeywordItem[];
    if (response !== 'BadRequest_500' && response !== 'BadRequest_404' && response && response.data && response.data.length) {
      list = response.data;
    }
    const fields = list.map(value => {
      return { ...options, lastmod: value.utime, changefreq: 'daily', loc: `${options.loc}/tag/${value.id}` }
    }) as ISitemapField[];

    const content = sitemapBuilder.buildSitemapXml(fields).replace(/xmlns:.*="(.*)"/g, '');
    return withXMLResponseLegacy(ctx, content)
  }
  // 聚合页 （总）
  if (state.includes('tag_page_')) {
    const page = Number(state.replace('tag_page_', '')) || 0;
    const response = await netKeywords({ pageNum: page, pageSize: 10000, searchType: ESearchType.ALL });
    let list = [] as IKeywordItem[];
    if (response !== 'BadRequest_500' && response !== 'BadRequest_404' && response && response.data && response.data.length) {
      list = response.data;
    }
    const fields = list.map(value => {
      return { ...options, loc: `${options.loc}/tag/${value.id}` }
    });
    const content = sitemapBuilder.buildSitemapXml(fields).replace(/xmlns:.*="(.*)"/g, '');
    return withXMLResponseLegacy(ctx, content)
  }
  // 增量书籍数据
  if (state === 'incremental') {
    const bookResponse = await netAllBook({ searchType: ESearchType.INCREASE });
    // console.log(bookResponse);
    let increaseData = [] as INetAllBookRes[];
    if (bookResponse !== 'BadRequest_500' && bookResponse !== 'BadRequest_404' && bookResponse && bookResponse.length) {
      increaseData = bookResponse
    }
    const fields = increaseData.map(book => {
      const linkUrl = process.env.Platform === 'dramabox' ? `/drama/${book.bookId}/${book.bookNameEn || ''}` : `/film/${book.bookId}`
      return {
        ...options,
        changefreq: 'daily',
        lastmod: book.utime,
        loc: options.loc + linkUrl,
        alternateRefs: (book.languages || []).map(lan => {
          let _loc = linkUrl;
          if (lan !== ELanguage.English) {
            _loc = '/' + lan + _loc
          }
          return {
            href: options.loc + _loc,
            hreflang: lan,
            hrefIsAbsolute: false
          }
        }),
        trailingSlash: false
      }
    }) as ISitemapField[]
    const content = sitemapBuilder.buildSitemapXml(fields).replace(/xmlns:.*="(.*)"/g, 'xmlns:xhtml="http://www.w3.org/1999/xhtml"');
    return withXMLResponseLegacy(ctx, content)
  }
  // 书籍id类
  if (state.includes('film_')) {
    const bookId = state.replace('film_', '');
    const response = await netBookDetail(bookId);
    // console.log(response);
    let fields = [] as ISitemapField[];
    if (response !== 'BadRequest_500' && response !== 'BadRequest_404'){
      const { chapterList = [], languages = [], book = {} as IBookItem } = response;

      const { bookNameEn = '' } = book;

      fields = chapterList.map((val, index) => {
        const linkUrl = process.env.Platform === 'dramabox' ? `/video/${bookId}_${bookNameEn}/${val.id}_Episode-${index + 1}` : `/episode/${bookId}/${val.id}`
        return {
          ...options,
          changefreq: val.new ? 'daily' : 'weekly',
          lastmod: val.new ? val.utime : lastmod,
          loc: options.loc + linkUrl,
          alternateRefs: languages.map(lan => {
            let _loc = linkUrl;
            if (lan !== ELanguage.English) {
              _loc = '/' + lan + _loc
            }
            return {
              href: options.loc + _loc,
              hreflang: lan,
              hrefIsAbsolute: false
            }
          }),
          trailingSlash: false
        }
      })
    }

    const content = sitemapBuilder.buildSitemapXml(fields).replace(/xmlns:.*="(.*)"/g, 'xmlns:xhtml="http://www.w3.org/1999/xhtml"');
    return withXMLResponseLegacy(ctx, content)
  }

  return { notFound: true }
}

// Default export to prevent next.js errors
// eslint-disable-next-line
export default () => {}
