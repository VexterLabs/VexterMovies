<template>
    <div class="revnue" v-show="isLoadingFlag">
        <div class="revnue-box" v-if="rechargeList && rechargeList.length > 0">
            <div v-for="item in rechargeList"
            class="item"
            :key="item.id">
                <div class="img">
                    <img src="../../assets/images/center/user_center_wallet.png" alt="goodnovel wallet">
                </div>
                <div class="content">
                    <div class="money">{{item.watchPointDisplay}}</div>
                    <div class="time">{{item.utime}}</div>
                </div>
                <div class="right">
                    {{item.discountPriceDisplay}}
                </div>
            </div>
            <div class="bottom">
                <v-pagiation
                :totals='total'
                :pageNo='pageNo'
                @handleClickPrev='handleClickCommentPrev'
                @handleClickNext='handleClickCommentNext'
                @handlePageNumItem='handleCommentPageNumItem'></v-pagiation>
            </div>
        </div>
        <null-wallet :content="content" v-else></null-wallet>

    </div>
</template>
<script>
import VPagiation from '@/components/Common/Pagiation.vue'
import NullWallet from '@/components/Common/NullWalet.vue'
import { mapState } from 'vuex'
export default{
    components: {
        VPagiation,
        NullWallet
    },
    computed: {
        ...mapState({
            userInfo: state => state.moduleHome.userInfo,
        })
    },
    data () {
        return {
            content:"You have not purchased any money yet.",
            total: 1,
            pageNo: 1,
            pageSize: 10,
            rechargeList: [],
            isLoadingFlag: false
        }
    },
    mounted(){
        this.getPageInit()
    },
    methods: {
        async getPageInit(){
            let res = await this.$axios.post('/webfic/profile/recharges',{
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                userId: this.userInfo.id,
            })
            if(res.data.status == 0){
                this.rechargeList = res.data.data.records || []
                this.total = res.data.data.pages
            }
            this.isLoadingFlag = true
            this.$store.dispatch('moduleHome/changeLoadingStatus', true)
            await this.$nextTick()
            document.body.scrollTop = 0
        },
        handleClickCommentPrev(){
            this.pageNo -= 1
            this.getPageInit()
        },
        handleClickCommentNext(){
            this.pageNo += 1
            this.getPageInit()
        },
        handleCommentPageNumItem(target){
            this.pageNo = target
            this.getPageInit()
        }
    },
    destroyed(){
        this.$store.dispatch('moduleHome/changeLoadingStatus', false)
    }
}
</script>
<style lang='scss' scoped>
.revnue{
    min-height: 500px;
    .revnue-box{
        .item{
            padding: 20px 10px;
            box-sizing: border-box;
            border-bottom: 1px solid rgba(0,0,0,0.1);
            font-size: 0;
            overflow: hidden;
            .img{
                width: 64px;
                height: 64px;
                float: left;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 8px;
                }
            }
            .content{
                float: left;
                max-width: 300px;
                margin-left: 24px;
                .money{
                    font-family:SourceHanSansCN-Bold,SourceHanSansCN;
                    font-weight:bold;
                    color:rgba(238,55,153,1);
                    font-size: 20px;
                    margin-top: 12px;
                    margin-bottom: 4px;
                }
                .time{
                    font-weight:400;
                    color:rgba(58,74,90,0.6);
                    font-size: 14px;
                }
            }
            .right{
                float: right;
                font-family:SourceHanSansCN-Bold,SourceHanSansCN;
                font-weight:bold;
                color:rgba(67,83,102,1);
                font-size: 32px;
                height: 64px;
                line-height: 64px;
            }
        }
        .bottom{
            margin-top: 40px;
        }
    }

}
</style>
