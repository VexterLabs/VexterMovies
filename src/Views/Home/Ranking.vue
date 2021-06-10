<template>
    <div class="ranking">
        <!-- <div class="ranking-title">
            <div class="box">
                <div class="title-name">BOOK RANKING</div>

                <div class="ranking-list">
                    <div class="ranking-item">
                        <div class="ranking-item-content">
                            <div v-for="(itemInner,innerIndex) in tabs"
                            :key='innerIndex'
                            :class="['ranking-item-content-item',{'active': currentIndex == innerIndex}]"
                            @click="handleChangeType(itemInner.columnId, innerIndex)">{{itemInner.name}}</div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>-->
        <div class=" bgc4 " v-if="pageNo == 1">
            <div class="container">
                <template v-for="(item, index) in books">
                        <ranking-top-book
                            :key="item.bookId"
                            v-if="item.mine_index < 5"
                            :bookInfo='item'
                            :index='item.mine_index'>
                        </ranking-top-book>
                    
                </template>
            </div>
            </div>
        <div class="container">
            <template v-for="(item, index) in books">
                <ranking-book
                    v-if="item.mine_index >= 5"
                    :key="item.bookId"
                    :bookInfo='item'
                    :index='item.mine_index'>
                </ranking-book>
            </template>
        </div>
        <v-pagiation
            :totals='totals'
            :pageNo='pageNo'
            @handleClickPrev='handleClickPrev'
            @handleClickNext='handleClickNext'
            @handlePageNumItem='handlePageNumItem'></v-pagiation>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import RankingTopBook from '@/components/Ranking/RankingTopBook.vue'
import RankingBook from '@/components/Ranking/RankingBook.vue'
import VPagiation from '@/components/Common/Pagiation.vue'
export default{
    async asyncData({store, route}){
        let currentColumnId = route.query.id || '';
        await store.dispatch('HomeDataModule/getRankingData',{
                "columnId": currentColumnId || '',
                "index": 0,
                "pageNo":  1,
                "pageSize": 10
            });
    },
    computed:{
        ...mapState('HomeDataModule', [
            'totals','books','tabs'
        ])
    },
    components: {
        RankingTopBook,
        RankingBook,
        VPagiation
    },
    data () {
        return {
            selectOption: [
                {
                    active: false,
                    id: 1,
                },
                {
                    active: false,
                    id: 2
                },
            ],
            // totals: 1,
            pageNo: 1,
            pageSize: 10,
            // tabs: [],
            // books: [],
            currentIndex: 0,
            currentColumnId: '',

        }
    },
    mounted () {
        
        if(this.$route.query.id){
            this.currentColumnId = this.$route.query.id
        }
        // await this.getPageInit()
        if(this.$route.query.id){
            this.tabs.map((item,index) => {
                if(item.columnId == this.currentColumnId){
                    this.currentIndex = index
                }
            })
            // this.pageNo = 1
            // this.getPageInit()
        }

    },
    methods: {
        ...mapMutations("HomeDataModule", ["INITRANKDATA"]),
        async getPageInit(){
            let res = await this.$axios.post('/xsdq/home/rank.do',{
                "columnId": this.currentColumnId,
                "index": 0,
                "pageNo":  this.pageNo,
                "pageSize": this.pageSize
            })

            this.$store.dispatch('moduleHome/changeLoadingStatus', true)
            if(res.data.status == 0){
                let result = res.data.data
                let tabs=[],books=[],totals=result.totalPage;
                if(result.tabs && result.tabs.length > 0){
                    tabs = result.tabs
                    tabs.map((item,index) => {
                        if(item.columnId == this.currentColumnId){
                            this.currentIndex = index
                        }
                    })
                }
                books = result.data
                books.map((item,index)=>{
                    item.mine_index = index + 1 + (this.pageNo - 1) * this.pageSize
                    return item
                })
                // result.itemPage.records.map((item,index) => {
                //     books.push({
                //         ...item,
                //         mine_index: index + 1 + (this.pageNo - 1) * this.pageSize
                //     })
                // })
                this.INITRANKDATA({tabs,books,totals})
            }
            await this.$nextTick()
            window.scroll(0,0)
        },

        handleChangeType(target, index){
            if(this.currentIndex == index){
                return
            }
            this.currentIndex = index
            this.currentColumnId = target

            this.pageNo = 1
            this.getPageInit()
        },

        handlePageNumItem(target){
            if(this.pageNo != target){
                this.facet = false
                this.pageNo = target
                this.getPageInit()
            }
        },
        handleClickPrev(){
            if(this.pageNo != 1){
                this.pageNo -= 1
                this.facet = false
                if(this.pageNo<0) this.pageNo = 1
                this.getPageInit()
            }
        },
        handleClickNext(){
            if(this.pageNo != this.totals){
                this.pageNo += 1
                this.facet = false
                this.getPageInit()
            }
        },

        handlemouseover(index){
            this.selectOption[index].active = true
        },
        handlemouseout(index){
            this.selectOption[index].active = false
        }
    },
    destroyed(){
        this.$store.dispatch('moduleHome/changeLoadingStatus', false)
    }
}
</script>
<style lang='scss' scoped>
.ranking{
    width: 100%;
    background: #fff;
    padding-bottom: 40px;
    .ranking-title{
        width: 100%;
        min-height: 100px;
        box-sizing: border-box;
        background:rgba(244,246,248,1);
        .box{
            width: 1300px;
            height: 100%;
            margin: 0 auto;
            .title-name{
                font-weight:bold;
                color:rgba(67,83,102,1);
                font-size: 32px;
                padding-top: 48px;
                margin-bottom: 40px;
            }
            .ranking-list{
                .ranking-item{
                    font-size: 0;
                    .ranking-item-title{
                        font-weight:bold;
                        color:rgba(58,74,90,1);
                        font-size: 20px;
                        width: 160px;
                        float: left;
                    }
                    .ranking-item-content{
                        display: inline-block;
                        width: 1100px;
                        white-space: pre-wrap;
                        .ranking-item-content-item{
                            display: inline-block;
                            color:rgba(58,74,90,1);
                            font-size: 14px;
                            height: 32px;
                            line-height: 32px;
                            text-align: center;
                            padding: 0 20px;
                            cursor: pointer;
                            box-sizing: border-box;
                            margin-bottom: 16px;
                            margin-right: 20px;
                            &:hover{
                                background: rgba(238,55,153,1);
                                border-radius: 32px;
                                color: #fff;
                            }
                            &.active{
                                background: rgba(238,55,153,1);
                                border-radius: 32px;
                                color: #fff;
                            }
                        }
                    }
                }
            }
            .ranking-select{
                margin-top: 25px;
                .ranking-select-item{
                    float: left;
                    width: 220px;
                    height: 44px;
                    margin-right: 32px;
                    position: relative;
                    cursor: pointer;
                    &.active{
                        .ranking-select-bg{
                            background-image: url('../../assets/images/classify/classify_select_active.png');
                        }
                    }
                    .ranking-select-bg{
                        width: 100%;
                        height: 100%;
                        border-radius: 44px;
                        line-height: 44px;
                        box-sizing: border-box;
                        font-size: 16px;
                        color: #435366;
                        padding: 0 12px;
                        background:rgba(0,0,0,0.05) url('../../assets/images/classify/classify_select_unactive.png') no-repeat 194px center/16px 16px;
                    }
                    .ranking-select-option-box{
                        position: absolute;
                        width: 220px;
                        min-height: 100px;
                        border-radius: 3px;
                        padding-top: 10px;
                        z-index: 99;
                        box-shadow: 2px 2px 2px #f4f6f8;
                        .select-option-item{
                            width: 100%;
                            box-sizing: border-box;
                            font-size: 14px;
                            padding: 5px 10px;
                            cursor: pointer;
                            background: #fff;
                        }
                    }
                }
            }
        }
    }

    .container{
        width: 1300px;
        margin: 0 auto;
        min-height: 800px;
    }
    .bgc4 {
        width: 100%;
        height: 552px;
        background: #F5F6FA;
        margin-bottom: 30px;
    }
    .bgc4 .container{
        min-height: none;
    }
    .pagiation{
        width: 1300px;
        margin: 0 auto;
        overflow: hidden;
        .pagiation-box{
            font-size: 0;
            margin: 0 0 60px;
            float: right;
            .pagiation-handle{
                display: inline-block;
                height: 32px;
                line-height: 32px;
                color:rgba(58,74,90,0.6);
                font-size: 16px;
                margin: 0 10px;
                &.active{
                    color:rgba(67,83,102,1);
                    cursor: pointer;
                }
            }
            .pagiation-item{
                display: inline-block;
                height: 32px;
                line-height: 32px;
                padding: 0 8px;
                cursor: pointer;
                border-radius: 2px;
                &.active{
                    background: #EE3799;
                    color: #fff;
                }
                &:hover{
                    background: #EE3799;
                    color: #fff;
                }
            }
        }
    }
}
</style>
