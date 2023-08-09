import { IHomeResItem } from "@/typings/home.interface";

export interface INetMoreReq {
  name: string;
  pageNum?: number;
  pageSize?: number;
}

export interface INetMoreResult {
  data: IHomeResItem;
  currentPage: number;
  pages: number;
}
