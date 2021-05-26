<template>
    <div class="search">
        <div class="search-title">
            <div class="box">
                <div class="title-name"> <i class="left_bar"></i> SEARCH ‘ <span class="color_web">{{keyword}}</span> ’ RESULT {{allBookCount}} BOOKS</div>
                <!-- <div class="search-tag">
                    <div class="search-tag-item" v-for="item in 5" :key="item">All</div>
                </div> -->
            </div>
        </div>
        <div class="container">
            <template v-if="books.length > 0">
                <search-book v-for="item in books" :key="item.bookId"
                :bookInfo='item'></search-book>
                <v-pagiation

                :totals='totals'
                :pageNo='pageNo'
                @handleClickPrev='handleClickPrev'
                @handleClickNext='handleClickNext'
                @handlePageNumItem='handlePageNumItem'></v-pagiation>
            </template>
            <null-verify-password v-else :resultFlag='false' :isShowText='false'>

            </null-verify-password>
        </div>
    </div>
</template>
<script>
import SearchBook from '@/components/Search/SearchBook.vue'
import VPagiation from '@/components/Common/Pagiation.vue'
import NullVerifyPassword from '@/components/Common/NullVerifyPassword.vue'
import { mapState } from 'vuex'
export default{
    // async asyncData({store, route,app}){
    //     let keyword = route.query.keyword || '';
    //     console.log('key',route.query)
    //     store.dispatch('moduleSearch/changeKeyWord', keyword)
    // },
    components: {
        SearchBook,
        VPagiation,
        NullVerifyPassword
    },
    data () {
        return {

        }
    },
    computed: {
        ...mapState({
            keyword: state => state.moduleSearch.keyword,
            pageSize: state => state.moduleSearch.pageSize,
            pageNo: state => state.moduleSearch.pageNo,
            totals: state => state.moduleSearch.totals,
            books: state => state.moduleSearch.books,
            allBookCount: state => state.moduleSearch.allBookCount,
            isNull: state => state.moduleSearch.isNull,
        })
    },
    mounted () {
        if(this.$route.query.other == 1){
            // 如果是从其他页面点击标签进入搜索的话直接调用搜索接口，如果是点击搜索按钮就不走这一步
            this.getPageInit()
        }
    },
    methods: {
        async getPageInit(){
            this.$store.dispatch('moduleSearch/changeSearchResult', {vm: this})
        },
        handleClickPrev(){
            this.$store.dispatch('moduleSearch/changeSearchResult', {
                pageNo: this.pageNo - 1,
                vm: this
            })
        },
        handleClickNext(){
            this.$store.dispatch('moduleSearch/changeSearchResult', {
                pageNo: this.pageNo + 1,
                vm: this
            })
        },
        handlePageNumItem(target){
            this.$store.dispatch('moduleSearch/changeSearchResult', {
                pageNo: target,
                vm: this
            })
        },
    },
    destroyed(){
        this.$store.dispatch('moduleHome/changeLoadingStatus', false)
        // this.$store.dispatch('moduleSearch/changeKeyWord', '')
        // this.$store.dispatch('moduleSearch/changeBooks', {books: [],allBookCount: 0})
    }

}
</script>
<style lang='scss' scoped>
.search{
    width: 100%;
    min-height: 800px;
    background: #fff;
    padding-bottom: 40px;
    .search-title{
        width: 100%;
        min-height: 120px;
        box-sizing: border-box;
        background:rgba(244,246,248,1);
        .box{
            width: 1080px;
            height: 100%;
            margin: 0 auto;
            .title-name{
                font-weight:bold;
                color:rgba(67,83,102,1);
                font-size: 32px;
                padding-top: 58px;
                margin-bottom: 40px;
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                position: relative;
                padding-left:22px;
                .left_bar{
                    position: absolute;
                    width: 6px;
                    height: 22px;
                    left:0;
                    top:66px;
                    background:rgba(255, 126, 66, 1);
                }
                .color_web{
                    font-weight:bold;
                color:rgba(67,83,102,1);
                font-size: 32px;
                    color:rgb(255 ,126 ,66);
                }
            }
            .search-tag{
                font-size: 0;
                .search-tag-item{
                    display: inline-block;
                    margin-bottom: 40px;
                    height: 44px;
                    line-height: 44px;
                    border-radius: 44px;
                    min-width: 140px;
                    box-sizing: border-box;
                    padding: 0 10px;
                    text-align: center;
                    background:rgba(0,0,0,0.05);
                    color:rgba(76,93,114,1);
                    font-size: 16px;
                    cursor: pointer;
                    margin-right: 32px;
                    &:hover{
                        background:linear-gradient(142deg,rgba(255,123,186,1) 0%,rgba(246,34,148,1) 100%);
                        font-weight: bold;
                        color: #fff;
                    }
                }
            }
        }
    }
    .container{
        width: 1080px;
        margin: 0 auto;
        padding-top: 40px;
    }

}
</style>
