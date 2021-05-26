<template>
    <div class="null-story">

        <template v-if="resultFlag">
            <div class="success">
                <div class="title">
                    <slot name="title"></slot>
                </div>
                <div class="tip">

                    <slot name="tip"></slot>
                </div>
                <div class="btn" @click="handleLogin">LOGIN</div>
            </div>
        </template>
        <template v-else>
            <div class="null-img"></div>
            <template v-if="isShowText">
                <div class="h-tip">The link you followed has expired. Please resend, thank you. <br>
                    If you have other questions, please contact us through <span>service@goodnovel.com</span>
                </div>
                <div class="go-home" @click="$router.replace('/')">Go Home page</div>
            </template>
            <div class="fk" v-else>No related books were found.</div>
            <div class="h-tip">
                <slot name='noBookTip'></slot>
            </div>
        </template>

    </div>
</template>
<script>
export default{
    props: {
        resultFlag: {
            default: true,
        },
        isShowText: {
            default: true,
        }
    },
    data () {
        return {

        }
    },
    methods: {
        handleLogin(){
            this.$router.push('/login?isEmail=1')
            // this.$store.dispatch('moduleHome/changeLoginShow')
        }
    }
}
</script>
<style lang='scss' scoped>
.null-story{
    width: 100%;
    height: 320px;
    text-align: center;
    padding: 20px 0;
    .null-img{
        width: 320px;
        height: 320px;
        background: url('../../assets/images/common/verify_forget_password.png') no-repeat center center/100% 100%;
        margin: 0 auto;
    }
    @media screen and (min-device-width: 1680px) {
        .null-img{
            background: url('../../assets/images/common/verify_forget_password2x.png') no-repeat center center/100% 100%;
        }
    }
    .tip{
        font-family:SourceHanSansCN-Bold,SourceHanSansCN;
        font-weight:bold;
        color:rgba(58,74,90,0.6);
        font-size: 18px;
        margin: 10px 0;
    }
    .h-tip{
        font-family:SourceHanSansCN-Bold,SourceHanSansCN;
        font-weight:bold;
        color:#3A4A5A;
        font-size: 20px;
        span{
            color:#EE3799;
            font-weight:bold;
            font-size: 20px;
        }
    }
    .go-home{
        font-family:SourceHanSansCN-Bold,SourceHanSansCN;
        font-weight:bold;
        color:#EE3799;
        font-size: 16px;
        cursor: pointer;
        margin-top: 20px;
    }
}
.fk{
    height: 18px;
    font-size: 16px;
    font-family: Ubuntu-Regular, Ubuntu;
    font-weight: 400;
    color: rgba(51, 51, 51, .5);
    line-height: 18px;
}
.success{
    width: 460px;
    height: 660px;
    margin: 60px auto;
    background: url('../../assets/images/icons/lgoin_banner.png') no-repeat top center/460px 254px;
    background-color:rgba(255,255,255,1);
    box-shadow:0px 20px 16px 0px rgba(0,0,0,0.1);
    border-radius:8px;
    .title{
        font-size:32px;
        font-family:SourceHanSansCN-Bold,SourceHanSansCN;
        font-weight:bold;
        color:rgba(67,83,102,1);
        text-align: center;
        padding-top: 262px;
    }
    .tip{
        box-sizing: border-box;
        width: 100%;
        padding: 0 80px;
        font-size:14px;
        font-family:SourceHanSansCN-Regular,SourceHanSansCN;
        font-weight:400;
        color:rgba(67,83,102,0.6);
        line-height:22px;
        text-align: center;
        margin-top: 10px;
    }
    .btn{
        width: 300px;
        height: 44px;
        margin: 40px auto 0;
        background: #EE3799;
        color: #fff;
        line-height: 44px;
        box-sizing: border-box;
        text-align: center;
        border-radius: 4px;
        font-size:20px;
        font-family:SourceHanSansCN-Medium,SourceHanSansCN;
        font-weight:500;
        cursor: pointer;
    }
}
</style>
