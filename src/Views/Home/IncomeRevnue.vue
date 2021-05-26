<template>
    <div class="in-rev">
        <div class="box">
            <div class="top">
                <div
                :class="['item',{'active': currentHistory == 'topup'}]"
                @click="handleItem('topup')">Top-up history</div>
                <div :class="['item',{'active': currentHistory == 'history'}]"
                @click="handleItem('history')">Income history</div>
                <!-- <div :class="['item',{'active': currentHistory == 'workdata'}]"
                @click="handleItem('workdata')">Work data</div> -->
            </div>
            <div class="bottom">
                <v-revnue v-if='currentHistory == "topup"'></v-revnue>
                <v-income v-if='currentHistory == "history"'></v-income>
                <!-- <v-workdata v-if= 'currentHistory == "workdata"'></v-workdata> -->
            </div>
        </div>
        <income-list v-if='currentHistory == "history"'></income-list>
        <!-- <work-data v-if= 'currentHistory == "workdata"'></work-data> -->

    </div>
</template>
<script>
import VRevnue from '@/components/IncRenv/revnue.vue'
import VIncome from '@/components/IncRenv/income.vue'
import IncomeList from '@/components/IncRenv/incomeList.vue'
// import VWorkdata from "@/components/IncRenv/vworkdata.vue";
// import WorkData from "@/components/IncRenv/workdata.vue";
export default{
    components: {
        VRevnue,
        VIncome,
        IncomeList,
        // WorkData,
        // VWorkdata
    },
    data () {
        return {
            currentHistory: 'topup'
        }
    },
    mounted(){
        if(this.$route.query.pos){
            this.currentHistory = this.$route.query.pos
        }
        this.pageInit()
    },
    methods: {
        async pageInit(){

        },
        handleItem(target){
          $logClick({
            module: this.currentHistory ,
            zone: "djqhshzx", // 点击切换收入中心
            adid: "click-toggle-income-tab"+this.currentHistory
          });
            if(this.currentHistory != target){
                this.currentHistory = target
            }
        }
    },
    watch: {
        $route(to) {
            if(to.query.pos){
                this.currentHistory = this.$route.query.pos
            }
        }
    }
}
</script>
<style lang='scss' scoped>
.in-rev{
    width: 1080px;
    margin: 0px auto;
    padding: 40px 0;
    min-height: 800px;
    .box{
        padding: 18px 26px 0;
        box-shadow:0px 2px 4px 0px rgba(0,0,0,0.1);
        border-radius:8px;
        border:1px solid rgba(0,0,0,0.05);
        background: #fff;
        .top{
            font-size: 0;
            margin-bottom: 20px;
            .item{
                display: inline-block;
                font-family:SourceHanSansCN-Regular,SourceHanSansCN;
                font-weight:400;
                color:rgba(58,74,90,1);
                font-size: 20px;
                margin-right: 60px;
                cursor: pointer;
                position: relative;
                &.active{
                    font-weight:bold;
                    &::after{
                        position: absolute;
                        content: '';
                        width: 100%;
                        height: 4px;
                        border-radius: 2px;
                        background: #EE3799;
                        left: 0;
                        bottom: -6px;
                    }
                }
            }
        }
        .bottom{
          overflow: hidden;
        }
    }
}
</style>
