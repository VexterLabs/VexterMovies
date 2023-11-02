import { ELanguage, IBookItem, IBookItemDetail, IChapterList } from "@/typings/home.interface";

export interface INetBookReq {
  id: string;
  language?: ELanguage;
}

export interface INetBookRes extends IBookItemDetail{
  book: IBookItemDetail;
  recommends: IBookItemDetail[];
  chapterList: IChapterList[];
  // chapter: {
  //   id: string;
  //   name: string;
  // };
  // column: {
  //   bookId: string;
  //   bookName: string;
  //   columnName: string;
  // };
  // languages: ELanguage[]
}
