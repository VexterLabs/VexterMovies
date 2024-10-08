import { ELanguage, IHomeResItem } from "@/typings/home.interface";
import { INetMoreReq, INetMoreResult } from "@/typings/more.interface";
import {
  INetBookRes,
  INetKeywordsReq,
  INetKeywordsRes,
  INetKeywordTagReq,
  INetKeywordTagRes,
} from "@/typings/book.interface";
import {
  INetAllBookReq,
  INetAllBookRes,
  INetAllColumnRes,
  INetIncrementBookRes
} from "@/typings/sitemap.interface";
import { INetBrowseReq, INetBrowseRes, INetBrowseTypeRes } from "@/typings/browse.interface";
import { geFetch, poFetch } from "@/server/fetch";

// 获取首页index
export const netHomeData = (language?: ELanguage): Promise<IHomeResItem[] | 'BadRequest_404' | 'BadRequest_500'> => {
  return poFetch('/webfic/home/index', undefined, language || ELanguage.English)
}
// 浏览
export const netBrowse = (params: INetBrowseReq, language?: ELanguage): Promise<INetBrowseRes | 'BadRequest_404' | 'BadRequest_500'> => {
  return poFetch('/webfic/home/browse', { pageSize: 60, ...params }, language || ELanguage.English)
}

// 查看更多
export const netMoreBook = (params: INetMoreReq, language?: ELanguage): Promise<INetMoreResult | 'BadRequest_404' | 'BadRequest_500'> => {
  return poFetch('/webfic/home/more', { pageNum: 1, pageSize: 18, ...params },  language || ELanguage.English)
}

// 获取书籍详情
export const netBook = (bookId: string, language?: ELanguage): Promise<INetBookRes | 'BadRequest_404' | 'BadRequest_500'> => {
  return poFetch('/webfic/book/detail', { id: bookId, language },  language || ELanguage.English);
}

// 获取书籍详情--新接口查询书籍详情
export const netBookDetail = (bookId: string, language?: ELanguage): Promise<INetBookRes | 'BadRequest_404' | 'BadRequest_500'> => {
  return geFetch('/webfic/book/detail/v2', { id: bookId, language });
}

// 获取所有书籍id
export const netAllBook = (params: INetAllBookReq): Promise<INetAllBookRes[] | 'BadRequest_404' | 'BadRequest_500'> => {
  return geFetch('/webfic/website/all', params)
}

// 获取所有栏目信息
export const netAllColumn = (): Promise<INetAllColumnRes[] | 'BadRequest_404' | 'BadRequest_500'> => {
  return geFetch('/webfic/website/column/stat');
}

// 本周有追更的书籍列表
export const netIncrementBook = (pageNo = 1, pageSize = 10): Promise<INetIncrementBookRes | 'BadRequest_404' | 'BadRequest_500'> => {
  return geFetch('/webfic/website/book/update',  { pageNo, pageSize })
}

// 全部浏览类目
export const netBrowseType = (): Promise<INetBrowseTypeRes[] | 'BadRequest_404' | 'BadRequest_500'> => {
  return geFetch('/webfic/website/type/list')
}

// 关键词列表
export const netKeywords = async (params: INetKeywordsReq): Promise<INetKeywordsRes | 'BadRequest_404' | 'BadRequest_500'> => {
  return await poFetch('/webfic/keyword/list', { pageSize: 10, ...params })
}

// 关键词聚合页
export const netKeywordTag = async (params: INetKeywordTagReq): Promise<INetKeywordTagRes | 'BadRequest_404' | 'BadRequest_500'> => {
  return await poFetch('/webfic/keyword/info', { pageSize: 10, ...params })
}
