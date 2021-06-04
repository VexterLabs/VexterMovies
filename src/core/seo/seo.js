/*
 * @Description: 
 * @FilePath: \webfic_pc_ssr\src\core\seo\seo.js
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2020-12-23 19:14:36
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-12-31 17:14:04
 */


export const handleSEO = function (context) {
    // 默认值
    context.title = '小說大全-全新海量火熱小说';
    context.introduction = "小說大全是一款免費多、顏值高、更新快的電子書閱讀神器，頁面設計精美大方，給你超級舒適的視覺體驗；隨時隨地，連載秒更。百家電子文庫，私人訂制推薦，都市辣文、玄幻修真、盜墓摸金、懸疑、鐵血軍事豪門總裁、校園純愛、古言仙俠、穿越宮鬥、幻想言情、影視原著應有盡有。網文：《鬼手神醫：王妃請上比特《龍王殿》《封少的掌上嬌妻》《幸得相愛，陸少深深寵》《都市無敵醫聖》《至尊女婿》《騙婚總裁：獨寵小嬌妻》《閃婚老公太凶猛》等暢銷書：《你好，舊時光》《你的孤獨，雖敗猶榮》《靈魂有香氣的女子》《微微一笑很傾城》等，趕走生活中無聊的每1秒。小說大全，千萬用戶正在使用的小說閱讀APP！打發無聊時間的絕佳利器！百萬部經典小說樣樣俱全，小說更新實时提醒，從此追書也是件幸福事。";
    context.keywords = "小說大全，全本小說，小說閱讀，傳奇小說，暢讀書城，掌雲書城，看點小說，QQ閱讀，故事，小說，書籍，熱門小說，章節，閱讀，浪漫故事，武俠小說，都市言情，科幻，圖書館，精品小說，仙俠，靈異，書單，書城，書架。";
    // 网站分享设置
    context.ogurl = "https://www.xsdqnovel.com/";
    context.ogdescription = "小說大全是一款免費多、顏值高、更新快的電子書閱讀神器，頁面設計精美大方，給你超級舒適的視覺體驗；隨時隨地，連載秒更。百家電子文庫，私人訂制推薦，都市辣文、玄幻修真、盜墓摸金、懸疑、鐵血軍事豪門總裁、校園純愛、古言仙俠、穿越宮鬥、幻想言情、影視原著應有盡有。網文：《鬼手神醫：王妃請上比特《龍王殿》《封少的掌上嬌妻》《幸得相愛，陸少深深寵》《都市無敵醫聖》《至尊女婿》《騙婚總裁：獨寵小嬌妻》《閃婚老公太凶猛》等暢銷書：《你好，舊時光》《你的孤獨，雖敗猶榮》《靈魂有香氣的女子》《微微一笑很傾城》等，趕走生活中無聊的每1秒。小說大全，千萬用戶正在使用的小說閱讀APP！打發無聊時間的絕佳利器！百萬部經典小說樣樣俱全，小說更新實时提醒，從此追書也是件幸福事。";
    context.ogimage = "";

    // 指定meta 
    if (context.url.includes('book_info')) { // 书籍详情TDK
        let bookInfo = context.state.HomeDataModule.bookInfo;
        context.title = bookInfo.bookName;
        context.introduction = bookInfo.introduction;
        context.keywords = bookInfo.bookName + "," + bookInfo.pseudonym + "," + context.keywords; // 拼接书名作者名

    }

    return context
}