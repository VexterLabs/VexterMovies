import { GetServerSideProps } from 'next'
import { getServerSideSitemapIndexLegacy } from "next-sitemap";
import { ESearchType, INetAllBookRes } from "@/typings/sitemap.interface";
import { netAllBook, netKeywords } from "@/server/home";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let allBookList: INetAllBookRes[] = [];
  let keywordsTotal = 0;
  let incrementKeywordsTotal = 0;
  try {
    const response = await netAllBook({ searchType: ESearchType.ALL })
    if (response !== 'BadRequest_500' && response !== 'BadRequest_404') {
      allBookList = response;
    }
    const keywordsResponse = await netKeywords({ pageNum: 1, pageSize: 10, searchType: ESearchType.ALL })
    if (keywordsResponse !== 'BadRequest_500' && keywordsResponse !== 'BadRequest_404') {
      keywordsTotal = Number(keywordsResponse.total) || 0;
    }
    const incrementKeywordsResponse = await netKeywords({ pageNum: 1, pageSize: 10, searchType: ESearchType.INCREASE })
    if (incrementKeywordsResponse !== 'BadRequest_500' && incrementKeywordsResponse !== 'BadRequest_404') {
      incrementKeywordsTotal = Number(incrementKeywordsResponse.total) || 0;
    }
  } catch (e) {
    console.error(`Sitemap Index api has error request - ${e}`)
  }

  const bookMap = allBookList.map(book => {
    return `${process.env.WebDomain}/sitemaps/film_${book.bookId}/sitemap.xml`
  });

  const videoMap = allBookList.map(book => {
    return `${process.env.WebDomain}/sitemaps/video_${book.bookId}/sitemap.xml`
  });

  const mrssMap = allBookList.map(book => {
    return `${process.env.WebDomain}/api/mrss/${book.bookId}/sitemap.xml`
  });

  const tagMap = Array.from({ length: Math.ceil(keywordsTotal/10000) }, (v, i) => {
    return `${process.env.WebDomain}/sitemaps/tag_page_${i + 1}/sitemap.xml`
  });
  const tagIncrementalMap = Array.from({ length: Math.ceil(incrementKeywordsTotal/10000) }, (v, i) => {
    return `${process.env.WebDomain}/sitemaps/incremental_tag_page_${i + 1}/sitemap.xml`
  });

  const sitemaps: string[] = [
    `${process.env.WebDomain}/sitemaps/inside/sitemap.xml`,
    `${process.env.WebDomain}/sitemaps/columns/sitemap.xml`,
    `${process.env.WebDomain}/sitemaps/films/sitemap.xml`,
    `${process.env.WebDomain}/sitemaps/browse/sitemap.xml`,
    `${process.env.WebDomain}/sitemaps/keywords/sitemap.xml`,
    ...bookMap,
    ...videoMap,
    ...mrssMap,
    ...tagMap,
    ...tagIncrementalMap,
    `${process.env.WebDomain}/sitemaps/incremental/sitemap.xml`, // 新增地图 daily
  ]
  return getServerSideSitemapIndexLegacy(ctx, sitemaps)
}

// Default export to prevent next.js errors
// eslint-disable-next-line
export default () => {}
