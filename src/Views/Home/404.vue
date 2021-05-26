<template>
    <div class="error">
        <nav-box></nav-box>
        <div class="error-page">
            <div class="left">
                <div class="title">WHOOPS!</div>
                <div class="tips">
                    Can not found this page Try again or
                    <span @click="$router.replace('/')">Back to home</span>
                </div>
            </div>
            <div class="right">
                <img src="../../assets/images/common/404_bg.png" alt="404 not found">
            </div>
        </div>
        <footer-nav></footer-nav>
    </div>
</template>
<script>
import NavBox from '@/components/Home/NavBox'
import FooterNav from '@/components/Common/FooterNav.vue'
export default{
    components: {
        NavBox,
        FooterNav
    },
    data () {
        return {

        }
    }
}
</script>
<style lang='scss' scoped>
.error{
    .error-page{
        width: 1080px;
        min-height: 800px;
        padding: 40px 0;
        box-sizing: border-box;
        overflow: hidden;
        margin: 0 auto;
        .left{
            width: 410px;
            float: left;
            .title{
                padding-top: 162px;
                font-family:SourceHanSansCN-Heavy,SourceHanSansCN;
                font-weight:800;
                color:rgba(66,66,66,1);
                font-size: 72px;
            }
            .tips{
                font-family:SourceHanSansCN-Normal,SourceHanSansCN;
                font-weight:400;
                color:rgba(76,76,76,1);
                font-size: 32px;
                span{
                    font-size: 32px;
                    color: #5698E9;
                    cursor: pointer;
                }
            }
        }
        .right{
            width: 640px;
            height: 590px;
            float: right;
            font-size: 0;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
