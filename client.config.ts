import { ELanguage } from "@/typings/home.interface";

const ClientConfig = {
  // app-310390558121791
  // 用来使用Facebook 成效分析，必须将应用编号添加到您的公共主页中。您可以通过成效分析查看 Facebook 到您网站的流量分析。在应用面板中查看应用编号
  // Facebook 分析现已停用 ?? https://www.facebook.com/business/help/966883707418907
  fbAppId: "310390558121791",
  name: "DramaBox",
  companyName: "STORYMATRIX PTE.LTD.",
  productName: "db",
  googleCode: "G-BXDJ8KNG7N",
  email: "dramaboxbusiness@gmail.com", // "dramaboxapp@gmail.com",
  ios: {
    // deeplink: "dramabox://open?bid=41000101854&cid=564421029&chid=DASEO1000000&media=fb",
    universalLink: "https://app.dramaboxdb.com/ios/open?c=",
    pname: "com.storymatrix.drama",
    link: "https://apps.apple.com/us/app/id6445905219",
    channelCode: "DISEO1000000",
  },
  android: {
    // deeplink: "dramabox://open?bid=41000101854&cid=564421029&chid=DASEO1000000&media=fb",
    pname: "com.storymatrix.drama",
    link: "https://play.google.com/store/apps/details?id=com.storymatrix.drama",
    channelCode: "DASEO1000000",
  },
  logDataType: "dramabox",
  netHiveLink: "https://log.dramaboxdb.com/h5_stand_final_log.php"
}

export default ClientConfig;

export const LanguageDefaultBookId = {
  [ELanguage.ZhHans]: '41000100369', // 简体：41000100369 爱你心动为止
  [ELanguage.Zh]: '41000100354', // 繁体：41000100354 離婚後冷爺他知錯了
  [ELanguage.English]: '41000100599', // 英语：41000100599 Sleeping Handsome, Let's Mate!
  [ELanguage.Korean]: '41000100396', // 韩语：41000100396 내 와이프는 쾌걸 의사
}
