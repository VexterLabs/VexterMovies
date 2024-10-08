import { ELanguage } from "@/typings/home.interface";

const DramaBoxAppConfig = {
  // app-310390558121791
  // 用来使用Facebook 成效分析，必须将应用编号添加到您的公共主页中。您可以通过成效分析查看 Facebook 到您网站的流量分析。在应用面板中查看应用编号
  // Facebook 分析现已停用 ?? https://www.facebook.com/business/help/966883707418907
  fbAppId: "310390558121791",
  name: "VexterMovies",
  companyName: "InfinityLabs Inc.",
  productName: "db",
  googleCode: "G-BXDJ8KNG7N",
  email: "ronaksenior@inbox.lv", // "dramaboxapp@gmail.com",
  ios: {
    // deeplink: "dramabox://open?bid=41000101854&cid=564421029&chid=DASEO1000000&media=fb",
    universalLink: "https://app.dramaboxdb.com/ios/open?c=",
    pname: "com.storymatrix.drama",
    link: "",
    channelCode: "DISEO1000000",
  },
  android: {
    // deeplink: "dramabox://open?bid=41000101854&cid=564421029&chid=DASEO1000000&media=fb",
    pname: "com.storymatrix.drama",
    link: "",
    channelCode: "DASEO1000000",
  },
  logDataType: "dramabox",
  netHiveLink: "https://log.dramaboxdb.com/h5_stand_final_log.php"
}


const DramaBoxConfig = {
  // app-310390558121791
  // 用来使用Facebook 成效分析，必须将应用编号添加到您的公共主页中。您可以通过成效分析查看 Facebook 到您网站的流量分析。在应用面板中查看应用编号
  // Facebook 分析现已停用 ?? https://www.facebook.com/business/help/966883707418907
  fbAppId: "310390558121791",
  name: "VexterMovies",
  companyName: "InfinityLabs Inc.",
  productName: "db",
  googleCode: "G-G7PYC5QDGJ",
  email: "ronaksenior@inbox.lv", // "dramaboxapp@gmail.com",
  ios: {
    // deeplink: "dramabox://open?bid=41000101854&cid=564421029&chid=DASEO1000000&media=fb",
    universalLink: "https://app.dramaboxdb.com/ios/open?c=",
    pname: "com.storymatrix.drama",
    link: "",
    channelCode: "XDISEO1000000",
  },
  android: {
    // deeplink: "dramabox://open?bid=41000101854&cid=564421029&chid=DASEO1000000&media=fb",
    pname: "com.storymatrix.drama",
    link: "",
    channelCode: "XDASEO1000000",
  },
  logDataType: "dramabox_new",
  netHiveLink: "https://log.dramaboxdb.com/h5_stand_final_log.php"
}

const ClientConfig = process.env.Platform === 'dramabox' ? DramaBoxConfig : DramaBoxAppConfig;

export default ClientConfig;

export const LanguageDefaultBookId = {
  [ELanguage.ZhHans]: '41000100369', // 简体：41000100369 爱你心动为止
  [ELanguage.Zh]: '41000100354', // 繁体：41000100354 離婚後冷爺他知錯了
  [ELanguage.English]: '41000102347', // 英语：41000102347 The Divorced Heiress' Fightback
  [ELanguage.Korean]: '41000100396', // 韩语：41000100396 내 와이프는 쾌걸 의사
  [ELanguage.Spanish]: '41000102447', // 西语：41000102447
}
