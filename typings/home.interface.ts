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
  bookId: string;
  bookName: string;
  cover: string;
  viewCount: number;
  followCount?: number;
  introduction: string;
  chapterCount: number;
  tags: string[];
  typeTwoNames: string[];
  typeTwoName: string;
  typeTwoIds: string[];
  language: string;
  simpleLanguage?: ELanguage;
  typeTwoList?: { id: number; name: string; }[]
  name: string;
  actionType: string;
  action: string;
  ratings: number;
  author: string;
  lastUpdateTime: string;
  viewCountDisplay: string;
  lastUpdateTimeDisplay: string;
  replacedBookName: string;
  firstChapterId?: string;
  columnName: string;
  bookNameEn?: string; // 英文名称替换字段
}

export interface IChapterList {
  id: string;
  index: number;
  mp4: string;
  name: string;
  unlock: boolean;
  cover: string;
  new: boolean;
  utime: string;
  showEposide?: boolean;
  newInd?: number;
}


export enum ELanguage {
  English = 'en',
  Spanish = 'es',
  ZhHans = 'zhHans', // 简体中文
  Zh = 'zh', // 繁體中文
  Korean = 'ko', // 韩语
}

export const LanguageActions: { text: string; key: ELanguage; label: string; }[] = [
  { text: 'English', key: ELanguage.English, label: "EN" },
  { text: '简体中文', key: ELanguage.ZhHans, label: "CN" },
  { text: '繁體中文', key: ELanguage.Zh, label: "TC" },
  { text: 'Español', key: ELanguage.Spanish, label: "ESP" },
  { text: '한국인', key: ELanguage.Korean, label: "KO" },
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

export enum EnumPosition {
  banner = 'banner',
  popular = 'Popular',
  trending = 'Trending',
  ranking = 'Ranking',
  'new-releases' = 'New Releases',
  romance = 'Romance',
  completed = 'Completed',
  'editors-picks' = "Editors' Picks",
  customInset = "inset"
}
