export enum EHomeStyle {
  small = 'SMALL_CARD_LIST',
  big = 'BIG_CARD_COMBINATION',
}

export interface IHomeResItem {
  id: number;
  name: EHomeName;
  style: EHomeStyle;
  items: IBookItem[];
  more: boolean;
  subName: string;
}

export interface IBookItem {
  name: string;
  actionType: string;
  action: string;
  chapterCount: number;
  ratings: number;
  bookId: string;
  bookName: string;
  author: string;
  introduction: string;
  cover: string;
  tags: string[];
  labels: string[];
  viewCount: number;
  lastUpdateTime: string;
  writeStatus: string; // COMPLETE
  viewCountDisplay: string;
  lastUpdateTimeDisplay: string;
  replacedBookId?: string;
  replacedBookName: string;
  firstChapterId?: string;
  columnName: string;
  typeTwoNames: string[];
  typeTwoName: string;
  typeTwoIds: string[];
}

export interface IBookItemDetail {
  bookId: string;
  bookName: string;
  chapterCount: number;
  cover: string;
  followCount: number;
  introduction: string;
  labels: string[];
  language: string;
  simpleLanguage: string;
  tagIds: string;
  tags: string[];
  typeTwoIds: number[];
  typeTwoName: string;
  typeTwoNames: string[];
  viewCount: number;
  replacedBookId?: string;
}

export interface IChapterList {
  bookId: string;
  id: string;
  index: number;
  mp4: string;
  name: string;
  unlock: boolean;
  cover: string;
  showEposide?: boolean;
}


export interface IEpisopeTab {
  id: string,
  label: string,
}

export enum ELanguage {
  English = 'en',
  ZhHans = 'zhHans', // 简体中文
  Zh = 'zh', // 繁體中文
  Korean = 'ko', // 韩语
}

export const LanguageActions: { text: string; key: ELanguage }[] = [
  { text: 'English', key: ELanguage.English },
  { text: '简体中文', key: ELanguage.ZhHans },
  { text: '繁體中文', key: ELanguage.Zh },
  { text: '한국인', key: ELanguage.Korean },
]

export enum EHomeName {
  TopHits = '热门好剧',
  MustSees = '必看好剧',
  Trending = '当前热播',
  HiddenGems = '精彩剧集',
  // MightLike = '为你推荐',
}

export const ColumnNameRoute = {
  [EHomeName.TopHits]: 'top-hits',
  [EHomeName.MustSees]: 'must-sees',
  [EHomeName.Trending]: 'trending',
  [EHomeName.HiddenGems]: 'hidden-gems',
  // [EHomeName.MightLike]: 'might-like',
}

export const ColumnNameRouteReversion = {
  'top-hits': EHomeName.TopHits,
  'must-sees': EHomeName.MustSees,
  'trending': EHomeName.Trending,
  'hidden-gems': EHomeName.HiddenGems,
  // 'might-like': EHomeName.MightLike,
}
