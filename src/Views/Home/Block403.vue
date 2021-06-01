<!--
 * @Description: 
 * @FilePath: \webfic_pc_ssr\src\Views\Home\Block403.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2020-12-23 19:14:36
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-12-31 17:55:22
-->
<template>
    <div class="block-region">
        <!-- <div class="top">
            <div class="top-box">
                <div class="logo" @click="$router.push('/')"></div>
            </div>
        </div> -->
        <div class="middle">
            <null-page>
                <template slot="tip">
                    對不起，我們的服務在您的國家不可使用
                </template>
            </null-page>
        </div>
        <!-- <div class="bottom">
            <div class="bottom-box">
                <div class="bottom-box">
                    © Webfic | <span
                    @click="$router.push('/terms')">Terms of Use</span>  | <span
                    @click="$router.push('/privacy')">Privacy Policy</span>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
import NullPage from '@/components/Common/NullPage.vue'
export default{
    components: {
        NullPage
    },
    data () {
        return {

        }
    }
}
</script>
<style lang='scss' scoped>
.block-region{
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-height: 700px;
    .top{
        width: 100%;
        height: 60px;
        line-height: 60px;
        width: 100%;
        margin: 0 auto;
        background: #FAFAFA;
        .top-box{
            max-width: 1300px;
            height: 100%;
            margin: 0 auto;
            .logo{
                font-size:32px;
                font-weight: bold;
                width: 180px;
                height: 48px;
                background: url('../../assets/images/common/logo.png') no-repeat center center/100% 100%;
                position: relative;
                top: 6px;
                cursor: pointer;
            }
        }
    }
    .middle{
        margin-top: 150px;
        margin-bottom: 300px;
    }
    .bottom{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        color: #343255;
        padding: 36px 0;
        background: #343255;
        .bottom-box{
            max-width: 1300px;
            font-size: 14px;
            margin: 0 auto;
            color: #fff;
            span{
                &:hover{
                    border-bottom: 1px solid #fff;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
