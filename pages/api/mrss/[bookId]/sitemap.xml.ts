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

  const { bookId = "" } = req.query

  const response = await netBookDetail(bookId);
  if (response !== 'BadRequest_500' && response !== 'BadRequest_404'){
    const { chapterList = [] as IChapterList[], languages = [], book = {} as IBookItem } = response;
    const bodyFrond = `<?xml version="1.0" encoding="UTF-8"?>
      <rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:dcterms="http://purl.org/dc/terms/">
<channel>
<title>${book.bookName || "DramaBox"}</title>
<link>${process.env.WebDomain}</link>
<description>${book.introduction || "DramaBox"}</description>
`
    const bodyEnd = `</channel></rss>`

    const item = chapterList.map((chapter, index) => {
      return `<item xmlns:media="http://search.yahoo.com/mrss/" xmlns:dcterms="http://purl.org/dc/terms/">
    <link>${process.env.WebDomain + '/episode/' + book.bookId + '/' + chapter.id}</link>
    <media:content url="${chapter.mp4}" fileSize="11321" type="video/mp4" height="320" width="240" duration="60" medium="video" isDefault="true">
      <media:player url="${process.env.WebDomain + '/episode/' + book.bookId + '/' + chapter.id}" />
      <media:title>${book.bookName + ' episode ' + (index + 1)}</media:title>
      <media:description>${book.introduction}</media:description>
      <media:thumbnail url="${chapter.cover || book.cover}" height="120" width="160"/>
    </media:content>
  </item>`
    }).join('')

    res.status(200).send(bodyFrond + item + bodyEnd)
  }
  res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:dcterms="http://purl.org/dc/terms/"><channel></channel></rss>`);
}
