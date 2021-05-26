<template>
    <div class="null-page">
        
        <div class="null-img"></div>
        <div class="h-tip">
            <slot name='tip'></slot>
        </div>
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

    }
}
</script>
<style lang='scss' scoped>
.null-page{
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
    .h-tip{
        font-weight:bold;
        color:rgba(58,74,90,0.6);
        font-size: 20px;
        span{
            color:#EE3799;
            font-weight:bold;
            font-size: 20px;
        }
    }
}
</style>
