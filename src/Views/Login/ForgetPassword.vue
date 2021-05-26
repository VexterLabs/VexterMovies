<template>
    <div class="forget-password">

        <div class="lpb_main" v-if="isShowPasswordPage">
          <form autocomplete="off">
            <div class="lpb_info">
                <div class="lpb_other">
                    <div class="lpbo_mail_header">
                        <div class="lpbomh_nav">
                        </div>
                        <div class="lpbomh_info">
                            <h1 class="fs_u">{{ $t('create_account_h') }}</h1>
                        </div>
                    </div>
                    <div class="lpbo_main">
                    <div class="forget-tip">Please enter your email address, we need to find your account.</div>
                    <div class="lpbo_input_box" :class="['title-box',{'error': !judgePasswordFlag}]">
                        <div class="lpboi_pwd">
                        <div class="lpboi_tit">
                            <span class="title-name">{{ $t('pwd_tit') }}</span>
                        </div>
                        <div class="lpbop_text input-container lpbop_type_show">
                            <a href="javascript:;" :class="['lpbop_type',{'can-see': passwordType == 'text'}]"
                            @click="togglePasswordType"></a>
                            <div class="lpboip_input"><input :type="passwordType" autocomplete="new-password"
                            v-model="registerPassword" :placeholder=" $t('pwd_tit_plac') " /></div>
                        </div>
                        </div>

                    </div>
                    <div class="lpbo_input_box" :class="['title-box',{'error': !judgePasswordConfirmFlag}]">
                      <div class="lpboi_pwd">
                        <div class="lpboi_tit">
                            <span class="title-name">{{ $t('pwd_tit') }} confirm</span>
                        </div>
                        <div class="lpbop_text input-container lpbop_type_show">
                            <a href="javascript:;" :class="['lpbop_type',{'can-see': passwordTypeConfirm == 'text'}]"
                            @click="togglePasswordTypeConfirm"></a>
                            <div class="lpboip_input"><input :type="passwordTypeConfirm" autocomplete="new-password"
                            v-model="registerPasswordConfirm" :placeholder=" $t('pwd_tit_plac') " /></div>
                        </div>
                      </div>
                    </div>
                    <div :class="['error-tip',{active: !judgePasswordFlag || !judgePasswordConfirmFlag}]">{{errorTip}}</div>
                    <div class="lpbo_login_but">
                        <a href="javascript:;" class="fs_u bottom_hover" @click="handleEmailRegister">SUBMIT</a>
                    </div>
                    </div>
                </div>
            </div>
          </form>
        </div>

        <div class="next-page" v-else>
            <div class="go-home">
                <null-verify-password :resultFlag='resultFlag'>
                  <template slot="title">
                    RESET PASSWORD<br>
                    SUCCESS
                  </template>
                  <template slot="tip">
                    You have successfully changed your password, <br>
                    Please login with your new password in GoodNovel.
                  </template>
                </null-verify-password>
            </div>
        </div>
    </div>
</template>
<script>
import { judgePassword } from '@/core/js/common.js'
import NullVerifyPassword from '@/components/Common/NullVerifyPassword.vue'
export default{
    components: {
        NullVerifyPassword
    },
    data () {
        return {
            judgePasswordFlag: true,
            judgePasswordConfirmFlag: true,
            registerPassword: '',
            registerPasswordConfirm: '',
            passwordTypeConfirm: 'password',
            passwordType: 'password',
            isShowPasswordPage: true,
            errorTip: '',
            resultFlag: false
        }
    },
    mounted(){
        this.getPageInit()
    },
    methods: {
        async getPageInit(){
            this.$store.dispatch('moduleHome/changeLoadingStatus', true)
        },
        togglePasswordTypeConfirm(){
            this.passwordTypeConfirm = this.passwordTypeConfirm == 'password'?'text':'password'
        },
        togglePasswordType(){
            // 邮箱注册的密码显示和隐藏
            this.passwordType = this.passwordType == 'password'?'text':'password'
        },
        async handleEmailRegister(){
            this.judgePasswordFlag = judgePassword(this.registerPassword)
            this.judgePasswordConfirmFlag = judgePassword(this.registerPasswordConfirm)
            if(this.registerPasswordConfirm != this.registerPassword){
                this.judgePasswordFlag = false
                this.judgePasswordConfirmFlag = false
                this.errorTip = 'Two passwords are different'
                return
            }
            if(!this.judgePasswordFlag || !this.judgePasswordConfirmFlag){
                this.errorTip = '6 to 18 digits and letters'
                return
            }

            let res = await this.$axios.post('/webfic/user/password/reset',{
                password: this.registerPasswordConfirm,
                token: this.$route.query.token || ''
            })
            if(res.data.status == 0){
              this.resultFlag = true
            }else{
              this.resultFlag = false
            }

            this.isShowPasswordPage = false

        }
    }
}
</script>
<style lang='scss' scoped>
.title-box{
  &.error{
    .title-name{
      color: #F84545;
    }
    .input-container{
      border-color: #F84545;
    }
  }
}
.error-tip{
  text-align: center;
  padding-bottom: 10px;
  font-size: 14px;
  line-height: 18px;
  &.active{
    color: #F84545;
  }
  color: #fff;
}
.forget-password{
    text-align: center;
    min-height: 800px;
    background: #fff;
    .lpb_main{
        margin: 20px auto;
    }
}
.forget-tip{
    padding: 0 50px;
    box-sizing: border-box;
    color: rgba(67,83,102,0.6);
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 20px;
}

.login_popup_box{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  padding: 20px;
  overflow: auto;
  background-color: rgba(0,0,0,.5);
  text-align: center;
  white-space: nowrap;
  font-size: 0;
  box-sizing: border-box;
}
.lpb_main,
.lob_jgb{
  white-space: normal;
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  text-align: left;
}
.lob_jgb{
  margin-left: -1px;
  height: 100%;;
  width: 1px;
}
.lpb_main{
  overflow: hidden;
  border-radius: 8px;
  box-shadow:0px 20px 16px 0px rgba(0,0,0,0.1);
}
.lpb_info{
  background-color: #EE3799;
}
.lpb_other{
  overflow: hidden;
  width: 460px;
}
.lpbo_img_box{
  margin-left: 4px;
  background-color: #ffffff;
}
.lpbo_img{
  margin-left: -4px;
  width: 460px;
  height: 254px;
  background: url('../../assets/images/icons/lgoin_banner.png') no-repeat 0 0;
}
.lpbo_main{
  position: relative;
  left: 0;
  top: 0;
  overflow: hidden;
  padding-right: 4px;
  margin-left: 4px;
  background-color: #fff;
  min-height: 406px;
}
.lpbo_close{
  margin: 12px;
  float: right;
  height: 32px;
  width: 32px;
  background: url('../../assets/images/icons/close_icon_1.png') no-repeat 0 0;
  background-size: 32px 32px;
}
.lpbo_tit{
  margin-bottom: 20px;
  height: 18px;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
}
.lpbo_but_box{
  overflow: hidden;
  margin: 0 0 20px 0;
  background-color: #ffffff;
}
.lpbo_but_box > a{
  display: block;
  margin: 0 auto 20px;
  overflow: hidden;
  height: 44px;
  width: 300px;
  background-position: 11px center;
  background-repeat: no-repeat;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  line-height: 44px;
  border-radius: 4px;
}
.lpbo_f{
  background-image: url('../../assets/images/icons/facebook_icon.png');
  background-color: rgba(83,123,188,1);
  color: #ffffff;
}
.lpbo_g{
  background-image: url('../../assets/images/icons/google_icon.png');
  background-color: rgba(255,255,255,1);
  color: #3A4A5A;
  border: 1px solid rgba(208,211,216,1);
}
.lpbo_t{
  background-image: url('../../assets/images/icons/twitter_icon.png');
  background-color: rgba(47,176,236,1);
  color: #ffffff;
}
.lpbo_e{
  height: 24px;
  text-align: center;
  line-height: 24px;
  font-size: 0;
}
.lpbo_e strong{
  margin-right: 6px;
  display: inline-block;
  height: 24px;
  font-size: 16px;
  color: rgba(76,93,114,1);
  font-weight: 500;
}
.lpbo_e_a{
  padding-left: 22px;
  display: inline-block;
  height: 24px;
  background: url('../../assets/images/icons/email_icon.png') no-repeat 0 center;
  background-size: 16px 16px;
  font-size: 16px;
  color: rgba(238,55,153,1);
  line-height: 24px;
}
.lpbo_footer_box{
  overflow: hidden;
  margin: 40px 0 16px;
}
.lpbof_other{
  margin-bottom: 10px;
  overflow: hidden;
  height: 24px;
  font-size: 0;
  text-align: center;
  line-height: 24px;
}
.lpbof_other strong{
  font-size: 16px;
  line-height: 24px;
  color: rgba(98,114,139,1);
  font-weight: 500;
}
.lpbofo_a{
  margin-left: 6px;
  font-size: 16px;
  color: rgba(239,87,176,1);
}
.lpbof_p{
  text-align: center;
  font-size: 14px;
  color: rgba(67,83,102,0.6);
  line-height: 24px;
}
.lpbof_p a{
  display: inline;
  font-size: 14px;
  color: rgba(67,83,102,0.6);
  line-height: 24px;
  text-decoration: underline;
}
.lpbo_input_box{
  margin: 0 auto;
  width: 360px;
}
.lpboi_txt,
.lpboi_pwd{
  margin-bottom: 20px;
  overflow: hidden;
}
.lpboi_tit{
  overflow: hidden;
  height: 24px;

}
.lpboi_tit span,
.lpboi_tit strong{
  display: block;
  height: 24px;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  &.error{
    color: #EE3799;
  }
}
.lpboi_tit span{
  color: rgba(58,74,90,1);
}
.lpboi_tit strong{
  display: none;
  color: rgba(247,88,74,1);
}
.lpboi_tit_error strong{
 display: block;
}
.lpboi_tit_error span{
 display: none;
}
.lpboi_text,
.lpbop_text{
  overflow: hidden;
  height: 46px;
  border-bottom: 1px solid rgba(0,0,0,.1);
}
.lpboit_input,
.lpboip_input{
  overflow: hidden;
  height: 46px;
}
.lpboip_input{
  margin-right: 50px;
}
.lpboit_input input,
.lpboip_input input{
  height: 46px;
  width: 100%;
  font-size: 16px;
  color: rgba(58,74,90,1);
}
.lpbop_type{
  float: right;
  height: 46px;
  width: 38px;
  background: url('../../assets/images/icons/eye_1.png') no-repeat center center;
  background-size: 20px 20px;
  &.can-see{
    background-image: url('../../assets/images/icons/eye_2.png');
  }
}
.lpbo_login_but{
  overflow: hidden;
}
.lpbo_login_but > a{
  display: block;
  margin: 0 auto 20px;
  height: 44px;
  width: 300px;
  background-color: rgba(238,55,153,1);
  font-size: 20px;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  line-height: 44px;
  border-radius: 4px;
}
.lpbolb_other{
  overflow: hidden;
  text-align: center;
  font-size: 16px;
  color: rgba(238,71,165,1);
  height: 24px;
}
.lpbolb_other a{
  font-size: 16px;
  color: rgba(238,71,165,1);
  vertical-align: middle;
}
.lpbo_return_box{
  position: absolute;
  left: 0;
  bottom: 40px;
  height: 24px;
}
.lpbo_return_box a{
  float: left;
  margin-left: 30px;
  padding-left: 17px;
  display: block;
  height: 24px;
  background: url('../../assets/images/icons/return_1.png') no-repeat 0 center;
  background-size: 12px 12px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(58,74,90,1);
  line-height: 24px;
}
.lpbo_mail_header{
  overflow: hidden;
  display: block;
  padding-right: 4px;
  margin-left: 4px;
  background-color: #ffffff;
}
.lpbomh_nav{
  overflow: hidden;
  margin-bottom: 70px;
  height: 66px;
}
.lpbomhn_return{
  float: left;
  margin: 17px 0 0 28px;
  height: 32px;
  width: 32px;
  background: url('../../assets/images/icons/return_2.png') no-repeat 0 0;
}
.lpbomhn_close{
  float: right;
  margin: 17px 12px 0 0;
  height: 32px;
  width: 32px;
  background: url('../../assets/images/icons/close_icon_1.png') no-repeat 0 0;
}
.lpbomh_info{
  overflow: hidden;
  margin-left: 50px;
  min-height: 60px;
}
.lpbomh_info h1{
  height: 40px;
  font-size: 32px;
  color: #435366;
  font-weight: bold;
  line-height: 40px;
}
</style>
