import { SitemapBuilder, withXMLResponseLegacy } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { ISitemapField } from "next-sitemap/dist/@types/interface";
import { netAllBook, netAllColumn, netBrowseType } from "@/server/home";
import dayjs from "dayjs";
import { ColumnNameRoute, ELanguage } from "@/typings/home.interface";
import { ESearchType } from "@/typings/sitemap.interface";

const sitemapBuilder = new SitemapBuilder()

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const lastmod = dayjs().day(1).format('YYYY-MM-DD');
  const options: ISitemapField = { loc: process.env.WebDomain as string, changefreq: 'weekly', priority: 0.7, lastmod };
  const { state = '' } = ctx.query as { state: string };
  const languageArr = Object.values(ELanguage);
  // 站内页
  if (state === 'inside') {
    const insidePage = ['', '/download', '/privacy', '/terms']
    const insideFields: ISitemapField[] = insidePage.map(val => ({
      ...options,
      loc: options.loc + val,
      alternateRefs: languageArr.map(lan => {
        const _loc = lan === ELanguage.ZhHans ? val : `/${lan}${val}`
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
    const response = await netAllColumn();
    if (response === 'BadRequest_500') return { redirect: { destination: '/500', permanent: false } }
    if (response === 'BadRequest_404') return { notFound: true }
    let fields: ISitemapField[] = [];
    (response || []).forEach(val => {
      const pages = Array.from({ length: Math.ceil(val.bookCount / 15) }, (v, i) => {
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
    const response = await netBrowseType();
    // console.log(response);
    if (response === 'BadRequest_500') return { redirect: { destination: '/500', permanent: false } }
    if (response === 'BadRequest_404') return { notFound: true }
    let fields: ISitemapField[] = [];
    (response || []).forEach(val => {
      const pages = Array.from({ length: Math.ceil(val.total / 15) }, (v, i) => {
        let _loc = `/browse/${val.id}`;
        if (val.simpleLanguage !== ELanguage.ZhHans) {
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
    const response = await netAllBook({ searchType: ESearchType.ALL });
    // console.log(response);
    const bookResponse = await netAllBook({ searchType: ESearchType.INCREASE });
    if (response === 'BadRequest_500' || bookResponse === 'BadRequest_500') return {
      redirect: {
        destination: '/500',
        permanent: false
      }
    }
    if (response === 'BadRequest_404' || bookResponse === 'BadRequest_404') return { notFound: true }
    const fields: ISitemapField[] = []
    response.forEach(book => {
      const isNewBook = bookResponse && bookResponse.length > 0 && bookResponse.findIndex(addBook => addBook.bookId === book.bookId) > 0;

      fields.push({
        ...options,
        lastmod: isNewBook ? book.utime : options.lastmod,
        changefreq: isNewBook ? 'daily' : options.changefreq,
        loc: `${options.loc}/film/${book.bookId}`,
        alternateRefs: (book.languages || []).map(lan => {
          let _loc = `/film/${book.bookId}`;
          if (lan !== ELanguage.ZhHans) {
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
  // 增量书籍数据
  if (state === 'incremental') {
    const bookResponse = await netAllBook({ searchType: ESearchType.INCREASE });
    if (bookResponse === 'BadRequest_500') return { redirect: { destination: '/500', permanent: false } }
    if (bookResponse === 'BadRequest_404') return { notFound: true }
    const fields = (bookResponse || []).map(book => {
      return {
        ...options,
        changefreq: 'daily',
        lastmod: book.utime,
        loc: `${options.loc}/film/${book.bookId}`,
        alternateRefs: (book.languages || []).map(lan => {
          let _loc = `/film/${book.bookId}`;
          if (lan !== ELanguage.ZhHans) {
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

  return { notFound: true }
}

// Default export to prevent next.js errors
// eslint-disable-next-line
export default () => {}
