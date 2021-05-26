<!--
 * @Description:
 * @FilePath: \haiwai_pc\src\Views\Home\WriterBenefits.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2020-03-19 10:49:48
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-07-16 19:27:27
-->

<template>
    <div class="special-page">
        <div class="top item">
            <!-- <img  src="../../assets/images/write_benefits/write-benefits_01.png" alt=""> -->
            <img src="static/img/Write_benefits.png" alt="">
            <div class="btn" @click="handleGoWrite"></div>
        </div>
        <!-- <div class="middle item">
            <img style=" margin-top: -18px;margin-bottom:-3px;"  src="../../assets/images/write_benefits/Write-benefits2.png" alt="">
        </div>
        <div class="bottom item">
            <img  src="../../assets/images/write_benefits/write-benefits_03.png" alt="">
        </div> -->

    </div>
</template>
<script>
export default{
    data () {
        return {

        }
    },
    methods: {
        handleGoWrite(){
            $logClick({
                module: this.$route.name,
                zone: 'tzcjsjym',
                adid: 'start-writing-now',
            })
            this.$router.push('/create_book')
        }
    }
}
</script>
<style lang='scss' scoped>
.special-page{
    width: 100%;
    margin: 0 auto 60px;
    min-height: 900px;
    font-size: 0;
    background:linear-gradient(270deg,rgba(244,246,248,1) 0%,rgba(244,246,248,0) 100%);
    .item{
        // width: 100%;
        font-size: 0;
        width: 1600px;
        margin: 0 auto;
        &.top{
            position: relative;
            .btn{
                position: absolute;
                top: 37.21%;
                left: 41.875%;
                width: 13.75%;
                height: 6.417%;
                cursor: pointer;
            }
        }
        img{
            width: 100%;
            height: auto;
        }
    }
}
</style>
