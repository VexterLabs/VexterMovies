import type { NextApiRequest, NextApiResponse } from 'next'
import { netBookDetail } from "@/server/home";
import { ELanguage, IBookItem, IChapterList } from "@/typings/home.interface";
import dayjs from "dayjs";

type ResponseData = {
  message: string
}
// 视频地图
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  const { bookId = "" } = req.query as { bookId: string; }

  if (!bookId) {
    res.status(200).end(`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"></urlset>`);
  }

  const response = await netBookDetail(bookId);
  if (response !== 'BadRequest_500' && response !== 'BadRequest_404'){
    const { chapterList = [] as IChapterList[], languages = [] as ELanguage[], book = {} as IBookItem } = response;
    const bodyFrond = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;
    const bodyEnd = `</urlset>`
    const lastmod = dayjs().day(1).format('YYYY-MM-DD');
    const item = chapterList.map((chapter, index) => {

      const contentUrl = (chapter?.mp4 || chapterList?.[0]?.mp4 || "").replaceAll('&','&amp;');

      return `
<url>
  <loc>${'https://www.dramabox.com/episode/' + book.bookId + '/' + chapter.id}</loc>
  <lastmod>${chapter.new ? chapter.utime : lastmod}</lastmod>
  <changefreq>${chapter.new ? 'daily' : 'weekly'}</changefreq>
  <priority>0.7</priority>
  ${languages.map(lan => {
        let _loc = `/episode/${bookId}/${chapter.id}`;
        if (lan !== ELanguage.English) {
          _loc = '/' + lan + _loc
        }
        return `<xhtml:link rel="alternate" hreflang="${lan}" href="${'https://www.dramabox.com' + _loc}"/>`
      }).join('')}
  <video:video>
    <video:title>${book.bookName + ' Episode ' + (index + 1)}</video:title>
    <video:thumbnail_loc>${(chapter.cover || book.cover).replaceAll('&','&amp;')}</video:thumbnail_loc>
    <video:description>${(book.introduction || "DramaBox").replaceAll('&','&amp;')}</video:description>
    <video:content_loc>${contentUrl}</video:content_loc>
    <video:player_loc>${contentUrl}</video:player_loc>
    <video:view_count>${book.viewCount}</video:view_count>
    <video:family_friendly>yes</video:family_friendly>
    <video:requires_subscription>no</video:requires_subscription>
    <video:live>no</video:live>
  </video:video>
</url>`
    }).join('')

    res.status(200).end(bodyFrond + item + bodyEnd)
  }
  res.status(200).end(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:dcterms="http://purl.org/dc/terms/"><channel></channel></rss>`);
}
