<template>
    <div class="verify" :class="[{backgroundClass: resultFlag}]" >
        <null-verify-password :resultFlag='resultFlag' v-show="isLoadFinshed"> 
            <template slot="title">
                Registration <br>
                Success
            </template>
            <template slot="tip">
                You have successfully registered, Please log in with your account and password.
            </template>
        </null-verify-password>
    </div>
</template>
<script>
import NullVerifyPassword from '@/components/Common/NullVerifyPassword.vue'
export default{
    components: {
        NullVerifyPassword
    },
    data () {
        return {
            resultFlag: true, // 验证是否成功，true成功，false失败
            isLoadFinshed: false, // 是否接口请求完成
        }
    },
    mounted(){
        this.getPageInit()
    },
    methods: {
        async getPageInit(){
            let query = this.$route.query
            let res = await this.$axios.post('/webfic/user/email/verify',{
                token: query.token
            })
            if(res.data.status == 0){
                this.resultFlag = true
            }else{
                this.resultFlag = false
            }
            this.isLoadFinshed = true
        },
        handleLogin(){
            this.$store.dispatch('moduleHome/changeLoginShow', {isShow:true})
        }
    }
}
</script>
<style lang='scss' scoped>
.verify{
    min-height: 800px;
    box-sizing: border-box;
    background: #fff;
    &.backgroundClass{
        background: #F4F6F8;
    }
    .success{
        width: 460px;
        height: 660px;
        margin: 60px auto 0;
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
}
</style>
