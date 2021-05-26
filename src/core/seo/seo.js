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
    context.title = 'Webfic｜Make Reading Fantastic';
    context.introduction = "Free online website novels & books for fiction lovers. Popular web novels with massive original English stories, types include urban, romance，fantasy，werewolf，classic and so on. For more high-quality content and experience, you can download the Webfic official app and enjoy the fun of reading together. Download it now and enjoy reading together.";
    context.keywords = "Webfic,Webfics,Webreads,webnovel,dreame,wattpad,book,story,novel,chapter,reading,books,fiction,romance story,fantasy,libros";
    // 网站分享设置
    context.ogurl = "https://www.webifc.com/";
    context.ogdescription = "Free online website novels & books for fiction lovers. Popular web novels with massive original English stories, types include urban, romance，fantasy，werewolf，classic and so on. For more high-quality content and experience, you can download the Webfic official app and enjoy the fun of reading together. Download it now and enjoy reading together.";;
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