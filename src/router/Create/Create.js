/*
 * @Description:
 * @FilePath: \haiwai_pc\src\router\Create\Create.js
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2019-12-30 16:50:48
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-07-08 13:47:54
 */
import Vue from 'vue';
import Create from '@/Views/Create/Create'
import CreateCover from '@/Views/Create/CreateCover'

export default [{
    path: '/create_book',
    name: 'create',
    component: Create,
    redirect: '/',
    children: [{
            path: '',
            name: 'create_book',
            meta: { requireAuth: true }, //TODO:测试前解开
            component: CreateCover,
        },
        {
            path: '/create_chapter/:id',
            meta: { requireAuth: true },
            name: 'create_chapter',
            component: resolve => require(['@/Views/Create/CreateChapter'], resolve)
        },
        {
            path: '/agency',
            meta: { requireAuth: true },
            name: 'agency',
            component: resolve => require(['@/Views/Create/agency.vue'], resolve)
        }
    ]
}]