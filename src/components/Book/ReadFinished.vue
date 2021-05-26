<!--
 * @Description:
 * @FilePath: \haiwai_pc\src\components\Book\ReadFinished.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2019-12-30 16:50:48
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-04-30 13:49:55
 -->
<template>
    <div class="read-finished" :class="'bgColor'+bgColor">

        <div class="text-title" v-if="writeStatus!='COMPLETE'">—— To be Continued... ——</div>


        <div class="text-title" v-if="writeStatus=='COMPLETE'">—— The End ——</div>
        <div class="text-tip" v-if="writeStatus=='COMPLETE'">You have finished reading this book</div>
        <!-- <div class="review">WRITE A REVIEW</div> -->
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default{
    computed: {
        ...mapState({
            bgColor: state => state.moduleRead.bgColor,
        })
    },
    data () {
        return {

        }
    },
    props:['writeStatus']
}
</script>
<style lang='scss' scoped>
.read-finished{
    text-align: center;
    padding: 80px 0;
    &.bgColor2{
        .text-title{
            color: rgba(255,255,255,0.9);
        }
        .text-tip{
            color: rgba(255,255,255,0.9);
        }
    }
    .text-title{
        color:rgba(58,74,90,1);
        font-size: 32px;
        font-weight: bold;
    }
    .text-tip{
        margin-top: 20px;
        color:rgba(58,74,90,1);
        font-size: 20px;
        font-weight: bold;
    }
    .review{
        width: 300px;
        height: 56px;
        text-align: center;
        line-height: 56px;
        border-radius: 4px;
        margin: 40px auto 0;
        font-size: 20px;
        font-weight: bold;
        color: #fff;
        background: #EE3799;
        cursor: pointer;
    }
}
</style>
