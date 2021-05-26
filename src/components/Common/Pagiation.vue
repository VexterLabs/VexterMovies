<!--
 * @Description: 
 * @FilePath: \webfic_pc_ssr\src\components\Common\Pagiation.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2020-12-23 19:14:36
 * @LastEditors: CuiGang
 * @LastEditTime: 2021-01-07 10:35:57
-->
<template>
    <div class="pagiation" v-if="totals > 1">
        <el-pagination
        :small="false"
        layout="prev, pager, next"
        prev-text='Prev'
        next-text='Next'
        :current-page='pageNo'
        :page-count='totals'
        @current-change='handlePageNumItem'
        @prev-click='handleClickPrev'
        @next-click='handleClickNext'>
        </el-pagination>
    </div>
</template>
<script>
export default{
    props: [
        'totals',
        'pageNo',
        'color'
    ],
    data () {
        return {

        }
    },
    methods: {
        handleClickPrev(){
            if(this.pageNo != 1){
                this.$emit('handleClickPrev')
            }
            if(window){
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }
        },
        handleClickNext(){
            if(this.pageNo != this.totals){
                this.$emit('handleClickNext')
            }
            if(window){
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }
        },
        handlePageNumItem(target){
            if(this.pageNo != target){
                this.$emit('handlePageNumItem',target)
            }
            if(window){
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }
        }
    }
}
</script>
<style lang='scss' scoped>
.pagiation{
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    text-align: center;
    padding-bottom: 20px;
    font-size: 16px;
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
            margin-right: 10px;
            &.white{
                color: rgba(255,255,255,0.5);
            }
            &.active{
                color:rgba(67,83,102,1);
                cursor: pointer;
                &.white{
                    color: rgba(255,255,255,1);
                }
            }
        }
        .pagiation-item{
            display: inline-block;
            height: 32px;
            line-height: 32px;
            padding: 0 8px;
            cursor: pointer;
            border-radius: 2px;
            margin-right: 10px;
            &:last-of-type{
                margin-right: 0;
            }
            &.active{
                background: rgba(255, 126, 66, 1);
                color: #fff;
            }
            &:hover{
                background: rgba(255, 126, 66, 1);
                color: #fff;
            }
        }
    }
}
</style>
