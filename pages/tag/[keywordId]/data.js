let data = {
    "keyword": "romance novels for teens",
    "keyStatus": 1,
    "relationKeywords":  [
        { "name": "romance novel best sellers", "id": 41035, "new": false },
        { "name": "romance novel books", "id": 41031, "new": false },
        { "name": "romance novel series", "id": 41034, "new": false },
        { "name": "romance novels for men", "id": 41033, "new": false },
        { "name": "romance novels for women", "id": 41032, "new": false }
    ],
    "pages": 10, 
    "currentPage": 1,
    "books": []
};

const booksInfo = {
    "bookId": "21000203922",
    "bookName": "Twisted Marriage: Secret Loves",
    "pseudonym": "",
    "cover": "https://nres.webfic.com/books/922/21000203922/a9ae678c5db4b9011c51f04d4fbddfbca09d3fb7de80cc2c46371beac3f01555.jpg@p=2",
    "ratings": 8.5,
    "authorId": 0,
    "translator": "",
    "editor": "",
    "introduction": "Gale Warm, what the Warm family owes me is for you to pay! Shawn Wood threw Gale Warm into a mental hospital, tortured and humiliated. Two years later, he married her. Don't be delusional, you are just here to atone for your family sins. He hated her, and only wanted to bully her.Gale Warm endured it while searching for the truth, and proved her family's innocence. Later, Gale Warm threw the evidence on Shawn Wood's face. Shawn Wood, how dare you threaten me! How dare I? You wouldn’t want our children to have no father, would you?",
    "commentCount": 84,
    "followCount": 0,
    "chapterCount": 1429,
    "totalWords": 828999,
    "lastChapterId": 994930,
    "lastChapterTime": "2023-10-26 09:02:02",
    "lastChapterName": "Chapter 1429",
    "writeStatus": "ONGOING",
    "typeOneIds": [ 2 ],
    "typeTwoIds": [ 0 ],
    "typeOneNames": [],
    "typeTwoNames": [ "all" ],
    "grade": "PLUS12",
    "period": "CONTEMPORARY",
    "status": "PUBLISHED",
    "novelType": "TRANSLATION",
    "targetAudience": "ADULT",
    "mature": 0,
    "fanfictionBookIds": [],
    "language": "ENGLISH",
    "firstChapterId": 681790,
    "free": 2,
    "contractStatus": "SIGNED",
    "unit": "CHAPTER",
    "author": "Webfic",
    "replacedBookName": "Twisted-Marriage-Secret-Loves",
    "typeTwoName": "all",
    "simpleLanguage": "en",
    "isHot": 0,
    "read": false,
    "inLibrary": false,
    "viewCountDisplay": "1.1M",
    "lastUpdateTimeDisplay": "Updated just now"
};

let books = [];

for(let i = 0; i < 80; i++) {
    books.push(booksInfo);
}

data.books = books;

export default data;