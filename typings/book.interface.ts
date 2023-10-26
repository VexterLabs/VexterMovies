import { ELanguage, IBookItem, EnumPosition } from "@/typings/home.interface";
import { ESearchType } from "./sitemap.interface";

export interface INetBookReq {
  bookId: string;
  language?: ELanguage;
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
}

export interface INetBookRes extends IBookItem{
  book: IBookItem;
  recommends: IBookItem[];
  chapter: {
    id: string;
    name: string;
  };
  column: {
    bookId: string;
    bookName: string;
    columnName: string;
  };
  languages: ELanguage[]
}

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
