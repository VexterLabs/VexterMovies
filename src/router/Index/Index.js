import Index from '@/Views/Index'
import Home from '@/Views/Home/Home'
import BookInfo from '@/Views/Book/BookInfo.vue'

export default [{
    path: '/',
    name: 'index',
    component: Index,
    children: [{
        path: '/',
        name: 'home',
        component: Home
    },
    // 草稿
    /* {
        name: "trash",
        path: '/trash',
        meta: { requireAuth: true },
        component: resolve => require(['@/Views/Trash/Trash.vue'], resolve)
    }, */
    {
        path: '/book_info/:id/:category/:bookName',
        name: 'book_info',
        component: BookInfo
    },
    /* {
        path: '/category',
        name: 'genre',
        component: resolve => require(['@/Views/Home/Classify.vue'], resolve)
    },
    {
        // path: '/shelf',
        path: "/library",
        name: 'shelf',
        // meta: { requireAuth: true },
        component: resolve => require(['@/Views/Home/Shelf.vue'], resolve)
    }, */
    {
        path: '/more/rankings',
        name: 'rankings',
        component: resolve => require(['@/Views/Home/Ranking.vue'], resolve)
    },
    {
        path: "/search",
        name: 'searchbook',
        component: resolve => require(['@/Views/Home/SearchBook.vue'], resolve)
    },

    {
        path: "/more/:id/:catename",
        name: 'morebook',
        component: resolve => require(['@/Views/Home/MoreBook.vue'], resolve)
    },
    /* {
        path: '/user_center',
        name: 'user_center',
        meta: { requireAuth: true },
        component: resolve => require(['@/Views/Home/UserCenter.vue'], resolve)
    },
    {
        path: '/profile',
        name: 'user_edit',
        meta: { requireAuth: true },
        component: resolve => require(['@/Views/Home/UserEdit.vue'], resolve)
    },
    {
        path: '/income',
        name: 'inc_rev',
        meta: { requireAuth: true },
        component: resolve => require(['@/Views/Home/IncomeRevnue.vue'], resolve)
    },
    {
        path: '/reset_password',
        name: 'forget_password',
        component: resolve => require(['@/Views/Login/ForgetPassword.vue'], resolve)
    }, */
    {
        path: '/support',
        name: 'faq',
        component: resolve => require(['@/Views/Home/FAQ.vue'], resolve)
    },
    {
        path: '/privacy',
        name: 'privacy_policy',
        component: resolve => require(['@/Views/Home/PrivacyPolicy.vue'], resolve)
    },
    {
        path: '/download_apps',
        name: 'download_apps',
        component: resolve => require(['@/Views/Home/DownloadApp.vue'], resolve)
    },
    {
        path: '/business',
        name: 'business',
        component: resolve => require(['@/Views/Home/Business.vue'], resolve)
    },
    {
        path: '/about_us',
        name: 'about_us',
        // component: resolve => require(['@/Views/Home/AboutUs.vue'], resolve)
        component: resolve => require(['@/Views/Home/AboutUsWebfic.vue'], resolve)
    },
    {
        path: '/hub/articles/is-goodnovel-legit',
        name: 'legit',
        component: resolve => require(['@/Views/Home/Legit.vue'], resolve)
    },
    // {
    //     path: '/webmap',
    //     name: 'webmap',
    //     component: resolve => require(['@/Views/Home/webmap.vue'], resolve)
    // },
    {
        path: '/contact',
        name: 'contact_us',
        component: resolve => require(['@/Views/Home/ContactUs.vue'], resolve)
    },
    {
        path: '/terms',
        name: 'terms_of_use',
        component: resolve => require(['@/Views/Home/TermsUse.vue'], resolve)
    },
    {
        path: '/dmca',
        name: 'dmca',
        // component: resolve => require(['@/Views/Home/DMCA.vue'], resolve)
        component: resolve => require(['@/Views/Home/DMCAW.vue'], resolve)
    },
    // {
    //     path: '/writer_benefit',
    //     name: 'writer_benefits',
    //     component: resolve => require(['@/Views/Home/WriterBenefits.vue'], resolve)
    // },
    // {
    //     path: '/upload',
    //     name: 'upload',
    //     component: resolve => require(['@/Views/Home/Upload.vue'], resolve)
    // },
    {
        path: '/verify',
        name: 'verify',
        component: resolve => require(['@/Views/Login/EmailVerify.vue'], resolve)
    },
    {
        path: '/block',
        name: '403',
        component: resolve => require(['@/Views/Home/Block403.vue'], resolve)
    },
        /* {
            path: '/lgbt',
            name: 'lgbt',
            component: resolve => require(['@/Views/LGBT/index.vue'], resolve)
        },
        {
            path: '/facebook_share',
            name: 'writershare',
            component: resolve => require(['@/Views/Feed/inviteWriterActivity.vue'], resolve)
        },
        {
            path: '/contest',
            name: 'contest',
            component: resolve => require(['@/Views/Feed/inviteWriterActivity.vue'], resolve)
        },
        {
          path: '/halloween',
          name: 'halloween',
          component: resolve => require(['@/Views/Feed/halloween.vue'], resolve)
        },
        {
            path: '/alpha',
            name: 'alpha',
            component: resolve => require(['@/Views/Feed/inviteWriterActivityAlpha.vue'], resolve)
        },
        {
            path: '/hublist',
            name: 'Hublist',
            component: resolve => require(['@/Views/Home/Hub.vue'], resolve)
        },
        {
            path: '/hubinfo/:urlSuffix', // /:bookid/:type/:booktitle
            name: 'hubinfo',
            component: resolve => require(['@/Views/Home/Hubinfo.vue'], resolve)
        },
        {
            path: '/account',
            name: 'account',
            component: resolve => require(['@/Views/Account/account.vue'], resolve)
        } */

    ]
},
{
    path: '/book/:id',
    name: 'book_read',
    component: resolve => require(['@/Views/Book/BookRead.vue'], resolve)
},
{
    path: '*',
    name: 'error_page',
    component: resolve => require(['@/Views/Home/404.vue'], resolve)
},
{
    path: '/recharge_other',
    name: 'recharge_other',
    component: resolve => require(['@/Views/Home/RechargingPage.vue'], resolve)
},
{
    path: '/judge_link',
    name: 'judge_link',
    component: resolve => require(['@/Views/Home/JudgeLink.vue'], resolve)
},

]