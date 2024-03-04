import type { NextApiRequest, NextApiResponse } from 'next'
import { netBookDetail } from "@/server/home";
import { IBookItem, IChapterList } from "@/typings/home.interface";

type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  const { bookId = "" } = req.query as { bookId: string; }

  if (!bookId) {
    res.status(200).end(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:dcterms="http://purl.org/dc/terms/"><channel></channel></rss>`);
  }

  const response = await netBookDetail(bookId);
  if (response !== 'BadRequest_500' && response !== 'BadRequest_404'){
    const { chapterList = [] as IChapterList[], book = {} as IBookItem } = response;
    const bodyFrond = `<?xml version="1.0" encoding="UTF-8"?>
      <rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:dcterms="http://purl.org/dc/terms/">
<channel>
<title>${book.bookName || "DramaBox"}</title>
<link>${"https://www.dramabox.com/film/" + book.bookId}</link>
<description>${book.introduction || "DramaBox"}</description>
`;
    const bodyEnd = `</channel></rss>`;

    const item = chapterList.map((chapter, index) => {

      const contentUrl = (chapter?.mp4 || chapterList?.[0]?.mp4 || "").replaceAll('&','&amp;');

      return `<item xmlns:media="http://search.yahoo.com/mrss/" xmlns:dcterms="http://purl.org/dc/terms/">
    <link>${'https://www.dramabox.com/episode/' + book.bookId + '/' + chapter.id}</link>
    <media:content url="${contentUrl}" fileSize="11321" type="video/mp4" height="320" width="240" duration="60" medium="video" isDefault="true">
      <media:player url="${contentUrl}" />
      <media:title>${book.bookName + ' Episode ' + (index + 1)}</media:title>
      <media:description>${(book.introduction || "DramaBox").replaceAll('&','&amp;')}</media:description>
      <media:thumbnail url="${(chapter.cover || book.cover).replaceAll('&','&amp;')}" height="120" width="160"/>
    </media:content>
  </item>`
    }).join('')

    res.status(200).end(bodyFrond + item + bodyEnd)
  }
  res.status(200).end(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:dcterms="http://purl.org/dc/terms/"><channel></channel></rss>`);
}
