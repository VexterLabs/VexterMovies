import { SitemapBuilder, withXMLResponseLegacy } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { ISitemapField } from "next-sitemap/dist/@types/interface";
import { netAllBook, netAllColumn, netBookDetail, netBrowseType, netKeywords } from "@/server/home";
import dayjs from "dayjs";
import { ColumnNameRoute, ELanguage, IBookItem, IChapterList } from "@/typings/home.interface";
import { ESearchType, INetAllBookRes, INetAllColumnRes } from "@/typings/sitemap.interface";
import { INetBrowseTypeRes } from "@/typings/browse.interface";
import { IKeywordItem } from "@/typings/book.interface";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const sitemapBuilder = new SitemapBuilder()
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
      fields.push({
        ...options,
        lastmod: isNewBook ? book.utime : options.lastmod,
        changefreq: isNewBook ? 'daily' : options.changefreq,
        loc: `${options.loc}/film/${book.bookId}`,
        alternateRefs: (book.languages || []).map(lan => {
          let _loc = `/film/${book.bookId}`;
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
      return {
        ...options,
        changefreq: 'daily',
        lastmod: book.utime,
        loc: `${options.loc}/film/${book.bookId}`,
        alternateRefs: (book.languages || []).map(lan => {
          let _loc = `/film/${book.bookId}`;
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
      const { chapterList = [], languages = [] } = response;

      fields = chapterList.map((val, index) => {
        return {
          ...options,
          changefreq: val.new ? 'daily' : 'weekly',
          lastmod: val.new ? val.utime : lastmod,
          loc: `${options.loc}/episode/${bookId}/${val.id}`,
          alternateRefs: languages.map(lan => {
            let _loc = `/episode/${bookId}/${val.id}`;
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
  // 视频地图
  if (state.includes('video_')) {
    const bookId = state.replace('video_', '');
    const response = await netBookDetail(bookId);
    // console.log(response);
    let fields = [] as ISitemapField[];
    if (response !== 'BadRequest_500' && response !== 'BadRequest_404'){
      const { chapterList = [] as IChapterList[], languages = [], book = {} as IBookItem } = response;

      fields = chapterList.map((val, index) => {
        const data = {
          ...options,
          changefreq: val.new ? 'daily' : 'weekly',
          lastmod: val.new ? val.utime : lastmod,
          loc: `${options.loc}/episode/${bookId}/${val.id}`,
          alternateRefs: languages.map(lan => {
            let _loc = `/episode/${bookId}/${val.id}`;
            if (lan !== ELanguage.English) {
              _loc = '/' + lan + _loc
            }
            return {
              href: options.loc + _loc,
              hreflang: lan,
              hrefIsAbsolute: false
            }
          }),
          trailingSlash: false,
        }

        return {
          ...data,
          videos: [
            {
              title: book.bookName + ' episode ' + (index + 1),
              thumbnailLoc: {
                href: val.cover || book.cover
              },
              description: book.introduction,
              contentLoc: val.mp4 ? { href: val.mp4 } : undefined, // 实际视频媒体文件的网址
              playerLoc: val.mp4 ? { href: val.mp4 } : undefined, // 特定视频的播放器的网址 ？
              // duration: 60, // 视频的时长
              // expirationDate: new Date().toISOString(), // 视频的失效日期
              // rating: book.ratings, // 视频的评分
              viewCount: book.viewCount,
              // publicationDate: new Date(book.lastUpdateTime || "").toISOString(), // 首次发布视频的日期
              familyFriendly: true, // 用户能否在安全搜索模式下搜到该视频
              // restriction?: IRestriction; // 是否在特定国家/地区的搜索结果中显示或隐藏您的视频。
              // platform?: IRestriction; // 是否在所列类型的平台的搜索结果中显示或隐藏您的视频
              requiresSubscription: false, // 指明是否需要订阅才能观看视频。支持的值包括：
              // uploader?: { // 视频上传者的名称。
              //   name: string;
              //   info?: URL;
              // };
              live: false, // 视频是否为直播视频
              // tag?: string; // 描述视频的任意字符串标记
            }
          ]
        } as ISitemapField
      })
    }

    const content = sitemapBuilder.buildSitemapXml(fields).replace(/xmlns:.*="(.*)"/g, 'xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"');
    return withXMLResponseLegacy(ctx, content)
  }

  return { notFound: true }
}

// Default export to prevent next.js errors
// eslint-disable-next-line
export default () => {}
