import { ELanguage, IBookItem, IChapterList, EnumPosition } from "@/typings/home.interface";
import { ESearchType } from "./sitemap.interface";


export interface INetBookRes extends IBookItem{
  book: IBookItem;
  recommends: IBookItem[];
  chapterList: IChapterList[];
  chapter: {
    id: string;
    name: string;
  };
  // column: {
  //   bookId: string;
  //   bookName: string;
  //   columnName: string;
  // };
  languages: ELanguage[]
}
export interface IBook {
  bookId: string;
  bookName: string;
  chapterCount: number;
  commentCount: number;
  contractStatus: string;
  contractType: string;
  cover: string;
  defaultChapterId: number;
  editor: string;
  introduction: string;
  language: ELanguage;
  lastChapterId: number;
  lastChapterName: string;
  lastChapterTime: string;
  lastUpdateTimeDisplay: string;
  ratings: number;
  totalWords: number;
  viewCountDisplay: string;
  writeStatus: string;
  author: string;
  replacedBookName: string;
  firstChapterId?: string;
  columnName: EnumPosition;
  typeTwoNames: string[];
  typeTwoIds: number[];
  typeTwoName: string;
  labels: string[];
}

// export interface INetBookRes extends IBookItem{
//   book: IBookItemDetail;
//   recommends: IBookItemDetail[];
//   chapter: {
//     id: string;
//     name: string;
//   };
//   column: {
//     bookId: string;
//     bookName: string;
//     columnName: string;
//   };
//   languages: ELanguage[]
// }

export interface INetKeywordsReq {
  searchType: ESearchType;
  pageNum: number;
  pageSize?: number;
}

export interface IKeywordItem {
  id: string;
  name: string;
  utime: string;
}

export interface INetKeywordsRes {
  data: IKeywordItem[];
  currentPage: number;
  total: number;
  pages: number;
}

export interface INetKeywordTagReq {
  id: string;
  pageNum: number;
  pageSize?: number;
}

export interface INetKeywordTagRes {
  books: IBook[];
  currentPage: number;
  pages: number;
  total: number;
  relationKeywords: IKeywordItem[];
  keyword: string;
  keyStatus: 0 | 1;
}

export interface ITagBookItem extends IBook {
  bookId: string;
  bookName: string;
  copyrighted: boolean;
  cover: string;
  introduction: string;
  recommend: boolean;
  tag: string;
  simpleLanguage: ELanguage;
  isHot: ETagBookItemIsHot;
}

export enum EAggregatePageProperties {
  有版权书籍 = 'y',
  推荐书籍 = "t"
}

export enum ETagBookItemIsHot {
  yes = 1,
  no = 0
}
