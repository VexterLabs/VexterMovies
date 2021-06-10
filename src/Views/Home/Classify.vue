<template>
    <div class="classify">
        <div class="classify-title">
            <div class="box">
                <div class="title-name">NOVEL GENRE</div>
                <div class="classify-list">
                    <!-- 左侧统一内容展示 -->
                    <div class="left-total-title"></div>

                    <div v-for="(item , index0) in bookTypes" :key="index0" class="classify-item">
                        <div class="classify-item-title"></div>

                        <div class="classify-item-content">
                            <div v-for="(itemInner , index) in item.subTypes"
                            :key='index'
                            :class="['classify-item-content-item',{'active': currentIndex == (itemInner.oneTypeId + '-' + itemInner.id)}]"
                            @click="handleChangeType(itemInner.oneTypeId , itemInner.id)">{{itemInner.name}}</div>
                        </div>
                    </div>
                </div>
                <!-- 暂时不用 -->
                <!-- <div class="classify-select" v-show="false">
                    <div
                    @mouseover="handlemouseover(index)"
                    @mouseout="handlemouseout(index)"
                    v-for="(item,index) in selectOption" :key="index"
                    :class="['classify-select-item',{'active':item.active}]">
                        <div class="classify-select-bg">all</div>
                        <div class="classify-select-option-box"
                        v-show="item.active">
                            <div class="select-option-item">aaa</div>
                            <div class="select-option-item">aaa</div>
                            <div class="select-option-item">aaa</div>
                            <div class="select-option-item">aaa</div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
        <div class="container">
            <book-item v-for="item in books"
            :key="item.bookId"
            :bookInfo='item'></book-item>
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
import BookItem from '@/components/Common/SearchBookItem.vue'
import VPagiation from '@/components/Common/Pagiation.vue'
import { mapState, mapMutations } from "vuex";
export default{
    async asyncData({store, route}){
        await store.dispatch('HomeCategoryModule/getCategoryData', {
            "facet": true,
            "pageNo": 1,
            "pageSize": 10,
            "typeOneId": 0,
            "typeTwoId": 0
        })
    },
    
    components: {
        BookItem,
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
            facet: true,
            pageNo: 1,
            pageSize: 10,
            typeOneId: 0,
            typeTwoId: 0,
            // 顶部类型数据
            // bookTypes: [],
            // totals: 1,
            // books: [],
            currentIndex: ''
        }
    },
    computed:{
        ...mapState('HomeCategoryModule', [
            'bookTypes','totals', 'books'
        ])
    },
    mounted () {
        // this.getPageInit()
    },
    methods: {
        async getPageInit(){
            await this.$store.dispatch('HomeCategoryModule/getCategoryData', {
                "facet": this.facet,
                "pageNo": this.pageNo,
                "pageSize": this.pageSize,
                "typeOneId": this.typeOneId,
                "typeTwoId": this.typeTwoId
            })
            // let res = await this.$axios.post('/xsdq/book/browse',{
            //     "facet": this.facet,
            //     "pageNo": this.pageNo,
            //     "pageSize": this.pageSize,
            //     "typeOneId": this.typeOneId,
            //     "typeTwoId": this.typeTwoId
            // })
            // let result = res.data
            // this.$store.dispatch('moduleHome/changeLoadingStatus', true)
            // if(res.data.status == 0){
            //     if(result.data.bookTypes && result.data.bookTypes.length>0){
            //         res.data.data.bookTypes.map(item => {
            //             item.subTypes.map(innerItem => {
            //                 innerItem.active = false
            //             })
            //             this.bookTypes.push({
            //                 name: item.name,
            //                 id: item.id,
            //                 subTypes: [{oneTypeId: item.id,id: 0,name: 'All',active:false},...item.subTypes]
            //             })
            //             // this.currentIndex = item.id + '-' + '0'
            //         })
            //     }
            //     this.totals = result.data.page.pages
            //     this.books = result.data.page.records
            //     await this.$nextTick()
            // }
            window.scroll(0,0)

        },

        handleChangeType(typeOneId , typeTwoId){
            if(this.currentIndex == (typeOneId + '-' + typeTwoId)){
                return
            }
            this.currentIndex = (typeOneId + '-' + typeTwoId)

            this.typeOneId = typeOneId
            this.typeTwoId = typeTwoId
            this.pageNo = 1
            this.facet = false
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
        async getBookList(){

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
.classify{
    width: 100%;
    background: #fff;
    padding-bottom: 40px;
    .classify-title{
        width: 100%;
        min-height: 200px;
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
            .classify-list{
              position: relative;
              .left-total-title{
                position: absolute;
                left:0;
                top:0;
                font-weight:bold;
                color:rgba(58,74,90,1);
                font-size: 20px;
                width: 130px;
                display: inline-block;
              }

                .classify-item{
                    font-size: 0;
                    .classify-item-title{
                        font-weight:bold;
                        color:rgba(58,74,90,1);
                        font-size: 20px;
                        width: 130px;
                        display: inline-block;
                        // float: left;
                    }
                    .classify-item-content{
                        display: inline-block;
                        width: 1100px;
                        white-space: pre-wrap;
                        .classify-item-content-item{
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
            .classify-select{
                margin-top: 25px;
                .classify-select-item{
                    float: left;
                    width: 220px;
                    height: 44px;
                    margin-right: 32px;
                    position: relative;
                    cursor: pointer;
                    &.active{
                        .classify-select-bg{
                            background-image: url('../../assets/images/classify/classify_select_active.png');
                        }
                    }
                    .classify-select-bg{
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
                    .classify-select-option-box{
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
        font-size: 0;
        padding: 40px 0;
        overflow: hidden;
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
