<template>
  <div class="login">
    <div class="login_popup_box">
      <div class="lpb_main">
        <div class="lpb_info" v-if="site==1">
          <div class="lpb_other">
            <div class="lpbo_img_box">
              <div class="lpbo_img">
                <a href="javascript:;" class="lpbo_close" @click.stop="closelogin"></a>
              </div>
            </div>
            <div class="lpbo_main">
              <div class="lpbo_tit">{{ $t('login_tit') }}</div>
              <div class="lpbo_but_box">
                <a
                  href="javascript:;"
                  class="lpbo_f bottom_hover"
                  @click.stop="facebookhello"
                >Facebook</a>
                <a href="javascript:;" class="lpbo_g bottom_hover" @click.stop="googlehello">Google</a>
                <a
                  href="javascript:;"
                  class="lpbo_t bottom_hover"
                  @click.stop="twitterhello"
                >Twitter</a>
                <!-- TODO: 注释邮箱登录 -->
                <div class="lpbo_e">
                  <strong>{{ $t('continue') }}</strong>
                  <a
                    href="javascript:;"
                    class="lpbo_e_a fs_u"
                    @click.stop="site=2"
                  >{{ $t('email_address') }}</a>
                </div>
              </div>
              <div class="lpbo_footer_box">
                <div class="lpbof_other">
                  <strong>{{ $t('no_account') }}</strong>
                  <a
                    href="javascript:;"
                    class="lpbofo_a fs_u"
                    @click.stop="site=3"
                  >{{ $t('register') }}</a>
                </div>
                <p class="lpbof_p">{{ $t('if_continue') }}</p>
                <p class="lpbof_p">
                  <a
                    href="javascript:;"
                    @click.stop="closelogin();$router.push('/terms')"
                  >{{ $t('terms_of_s') }}</a>
                  {{ $t('and') }}
                  <a
                    href="javascript:;"
                    @click.stop="closelogin();$router.push('/privacy')"
                  >{{ $t('privacy_policy') }}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- lpb_info -->
        <div class="lpb_info" v-if="site==2">
          <div class="lpb_other">
            <div class="lpbo_img_box">
              <div class="lpbo_img">
                <a href="javascript:;" class="lpbo_close" @click.stop="closelogin"></a>
              </div>
            </div>
            <div class="lpbo_main">
              <div class="lpbo_input_box" :class="['title-box',{'error': !judgeEmailFlag}]">
                <div class="lpboi_txt">
                  <div class="lpboi_tit">
                    <span class="title-name">{{ $t('email_address_tit') }}</span>
                    <strong>{{ $t('email_address_err') }}</strong>
                  </div>
                  <div class="lpboi_text input-container">
                    <div class="lpboit_input">
                      <input
                        type="text"
                        v-model="registerEmail"
                        :placeholder=" $t('enter_email_input') "
                        @keyup.enter="handleLoginEmail"
                      />
                    </div>
                  </div>
                </div>
                <!-- <div class="lpboi_pwd lpboi_tit_error"> -->
                <div class="lpboi_pwd" :class="['title-box',{'error': !judgePasswordFlag}]">
                  <div class="lpboi_tit">
                    <span class="title-name">{{ $t('pwd_tit') }}</span>
                    <strong>{{ $t('pwd_tit') }}</strong>
                  </div>
                  <div class="lpbop_text input-container lpbop_type_show">
                    <a
                      href="javascript:;"
                      :class="['lpbop_type',{'can-see': passwordType == 'text'}]"
                      @click.stop="togglePasswordType"
                    ></a>
                    <div class="lpboip_input">
                      <input
                        :type="passwordType"
                        v-model="registerPassword"
                        :placeholder=" $t('pwd_tit_plac') "
                        @keyup.enter="handleLoginEmail"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                :class="['error-tip',{active: !judgePasswordFlag || !judgeEmailFlag}]"
              >{{errorTip}}</div>
              <div class="lpbo_login_but">
                <a
                  href="javascript:;"
                  class="fs_u bottom_hover"
                  @click.stop="handleLoginEmail"
                >{{ $t('login') }}</a>
                <div class="lpbolb_other">
                  <a
                    href="javascript:;"
                    class="fs_u"
                    @click.stop="site=3"
                  >{{ $t('create_account') }}</a>
                  &nbsp; | &nbsp;
                  <a
                    href="javascript:;"
                    @click.stop="site=6"
                    class="fs_u"
                  >{{ $t('forget_password') }}</a>
                </div>
              </div>
              <div class="lpbo_return_box">
                <a href="javascript:;" @click.stop="site=1">{{ $t('other_login') }}</a>
              </div>
            </div>
          </div>
        </div>
        <!-- lpb_info -->
        <div class="lpb_info" v-if="site==3">
          <div class="lpb_other">
            <div class="lpbo_mail_header">
              <div class="lpbomh_nav">
                <a href="javascript:;" class="lpbomhn_return" @click.stop="site=1"></a>
                <a href="javascript:;" class="lpbomhn_close" @click.stop="closelogin"></a>
              </div>
              <div class="lpbomh_info">
                <h1 class="fs_u">{{ $t('create_account_h') }}</h1>
              </div>
            </div>
            <div class="lpbo_main">
              <div class="lpbo_input_box" :class="['title-box',{'error': !judgeEmailFlag}]">
                <div class="lpboi_txt">
                  <div class="lpboi_tit">
                    <span class="title-name">{{ $t('email_address_tit') }}</span>
                    <strong>{{ $t('email_address_err') }}</strong>
                  </div>
                  <div class="lpboi_text input-container">
                    <div class="lpboit_input">
                      <input
                        type="text"
                        v-model="registerEmail"
                        :placeholder=" $t('enter_email_input') "
                      />
                    </div>
                  </div>
                </div>
                <div class="lpboi_pwd" :class="['title-box',{'error': !judgePasswordFlag}]">
                  <div class="lpboi_tit">
                    <span class="title-name">{{ $t('pwd_tit') }}</span>
                  </div>
                  <div class="lpbop_text input-container lpbop_type_show">
                    <a
                      href="javascript:;"
                      :class="['lpbop_type',{'can-see': passwordType == 'text'}]"
                      @click.stop="togglePasswordType"
                    ></a>
                    <div class="lpboip_input">
                      <input
                        :type="passwordType"
                        v-model="registerPassword"
                        :placeholder=" $t('pwd_tit_plac') "
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                :class="['error-tip',{active: !judgePasswordFlag || !judgeEmailFlag}]"
              >{{errorTip}}</div>
              <div class="lpbo_login_but">
                <a
                  href="javascript:;"
                  class="fs_u bottom_hover"
                  @click.stop="handleEmailRegister"
                >{{ $t('create_account') }}</a>
                <div class="go-login" @click.stop="site = 2">OR LOGIN WITH EXTSING ACCOUNT</div>
              </div>
              <!-- <div class="lpbo_return_box">
                <a href="javascript:;" @click.stop="site=1">{{ $t('other_login') }}</a>
              </div>-->
            </div>
          </div>
        </div>
        <!-- 邮箱注册成功回调的提示信息 -->
        <div class="lpb_info" v-if="site==4">
          <div class="lpb_other">
            <div class="lpbo_mail_header">
              <div class="lpbomh_nav">
                <a href="javascript:;" class="lpbomhn_return" @click.stop="site=1"></a>
                <a href="javascript:;" class="lpbomhn_close" @click.stop="closelogin"></a>
              </div>
              <div class="lpbomh_info">
                <h1 class="fs_u">VERIFY TIPS</h1>
              </div>
            </div>
            <div class="lpbo_main">
              <div class="lpbo_input_box">
                <div class="register-success">
                  Verification mail has been sent to
                  <div class="reister-email">{{registerEmail}}</div>Please check your email to reset your password.
                </div>
              </div>
              <div class="lpbo_login_but">
                <a
                  href="javascript:;"
                  class="fs_u bottom_hover"
                  @click.stop="site=1"
                >{{ $t('login') }}</a>
                <div class="tips" v-if="emailRegisterSuccess">
                  <div
                    class="count-time"
                    v-if="isShowCountTime"
                  >Did't recetive the email? ({{countTime}}s)</div>
                  <div class="resend" v-else @click.stop="handleResendEmail">RESEND EMAIL</div>
                </div>
              </div>
              <div class="lpbo_return_box">
                <a href="javascript:;" @click.stop="site=1">{{ $t('other_login') }}</a>
              </div>
            </div>
          </div>
        </div>
        <!-- 邮箱注册失败的回调提示信息 -->
        <div class="lpb_info" v-if="site==5">
          <div class="lpb_other">
            <div class="lpbo_mail_header">
              <div class="lpbomh_nav">
                <a href="javascript:;" class="lpbomhn_return" @click.stop="site=1"></a>
                <a href="javascript:;" class="lpbomhn_close" @click.stop="closelogin"></a>
              </div>
              <div class="lpbomh_info">
                <h1 class="fs_u">REGISTER ERROR</h1>
              </div>
            </div>
            <div class="lpbo_main">
              <div class="lpbo_input_box">
                <div
                  class="register-success"
                >there is a problem with network connection, please check your network and try again later</div>
              </div>
              <div class="lpbo_login_but">
                <a
                  href="javascript:;"
                  class="fs_u bottom_hover"
                  @click.stop="handleResendEmail"
                >RESEND EMAIL</a>
              </div>
              <div class="lpbo_return_box">
                <a href="javascript:;" @click.stop="site=1">{{ $t('other_login') }}</a>
              </div>
            </div>
          </div>
        </div>

        <!-- 忘记密码 -->
        <div class="lpb_info" v-if="site==6">
          <div class="lpb_other">
            <div class="lpbo_mail_header">
              <div class="lpbomh_nav">
                <a href="javascript:;" class="lpbomhn_return" @click.stop="site=1"></a>
                <a href="javascript:;" class="lpbomhn_close" @click.stop="closelogin"></a>
              </div>
              <div class="lpbomh_info" style="min-height:50px;">
                <h1 class="fs_u">RESET PASSWORD</h1>
              </div>
            </div>
            <div class="lpbo_main" style="minHeight:474px">
              <div class="lpbo_input_box" :class="['title-box',{'error': !judgeForgetEmailFlag}]">
                <div
                  class="register-success"
                  style="margin-bottom:30px;"
                >Please enter your email address, we need to find your account.</div>
                <div class="lpboi_txt">
                  <div class="lpboi_tit">
                    <span class="title-name">{{ $t('email_address_tit') }}</span>
                    <strong>{{ $t('email_address_err') }}</strong>
                  </div>
                  <div class="lpboi_text input-container">
                    <form class="lpboit_input">
                      <input
                        type="text"
                        v-model="forgetPasswordEmail"
                        autocomplete="on"
                        :placeholder=" $t('enter_email_input') "
                      />
                      <input type="hidden" />
                    </form>
                  </div>
                </div>
              </div>
              <div :class="['error-tip',{active: !judgeForgetEmailFlag}]">{{errorTip}}</div>
              <div class="lpbo_login_but" style="marginTop:68px;">
                <a
                  href="javascript:;"
                  class="fs_u bottom_hover"
                  @click.stop="handleForgetPassword"
                >SEND EMAIL</a>
                <div class="go-login" @click.stop="site = 2">OR LOGIN WITH EXTSING ACCOUNT</div>
              </div>
              <!-- <div class="lpbo_return_box">
                <a href="javascript:;" @click.stop="site=1">{{ $t('other_login') }}</a>
              </div>-->
            </div>
          </div>
        </div>

        <!-- 忘记密码的提示 -->
        <div class="lpb_info" v-if="site==7">
          <div class="lpb_other">
            <div class="lpbo_mail_header">
              <div class="lpbomh_nav">
                <a href="javascript:;" class="lpbomhn_return" @click.stop="site=1"></a>
                <a href="javascript:;" class="lpbomhn_close" @click.stop="closelogin"></a>
              </div>
              <div class="lpbomh_info">
                <h1 class="fs_u">RESET PASSWORD</h1>
              </div>
            </div>
            <div class="lpbo_main">
              <div class="lpbo_input_box">
                <div class="register-success">
                  Verification mail has been sent to
                  <div class="reister-email">{{forgetPasswordEmail}}</div>Please check your email to reset your password.
                </div>
              </div>
              <div class="lpbo_login_but">
                <!-- TODO: -->
                <a
                  href="javascript:;"
                  class="fs_u bottom_hover"
                  @click.stop="site=1"
                >{{ $t('login') }}</a>
                <div class="tips">
                  <div
                    class="count-time"
                    v-if="isShowCountTime"
                  >Did't recetive the email? ({{countTime}}s)</div>
                  <div class="resend" v-else @click.stop="handleResendForgetEmail">RESEND EMAIL</div>
                </div>
              </div>
              <div class="lpbo_return_box">
                <a href="javascript:;" @click.stop="site=1">{{ $t('other_login') }}</a>
              </div>
            </div>
          </div>
        </div>
        <!-- lpb_info -->
      </div>
      <div class="lob_jgb"></div>
    </div>
  </div>
</template>

<script>
import {
  checkEmail,
  checkLength,
  judgePassword,
  judgeEmailLength,
} from "@/core/js/common.js";
import { mapState } from "vuex";
// import { Base64 } from "js-base64";
export default {
  name: "login",
  computed: {
    ...mapState({
      currentBookInfo: (state) => state.moduleHome.addCurrentBookInfo,
    }),
  },
  data() {
    return {
      site: 1,
      registerEmail: "",
      registerPassword: "",
      passwordType: "password",
      initOptions: {
        facebookId: "2534254466852997",
        googleId:
          "643593627009-ek6kcghauap9gee8bc370qa7vc2poceh.apps.googleusercontent.com",
        twitterKey: "TEA7Wqqt7ygwbsgVgATmH2E6v",
        redirectUrl: "https://dev.dzhaiwai.com",
      },
      emailRegisterSuccess: true,
      countTime: 60,
      isShowCountTime: true,
      timer: null,
      judgeEmailFlag: true,
      judgePasswordFlag: true,
      forgetPasswordEmail: "",
      judgeForgetEmailFlag: true,
      errorTip: "11",
      throttleFlag: false,
      php_client: 0,
      backUrl: "", // 地址参数上返回论坛地址
      needUrl: "", // 兼容登录的跳转回调
      share: false, // 邀請碼
      inviteId: false, //活动分享者ID
      packcode:false,
      halloweenShare:false,
    };
  },
  mounted() {
    let that = this;

    this.share = this.judgeShare();
    this.packcode = this.judgePackCode();
    this.halloweenShare = this.judgeShareFn('halloweenShare');

    this.inviteId = this.judgeInvite();
    // console.log(this.inviteId);

    this.getHellloInfo();
    window.sele = this.twitterClose;
    if (this.$route.query.isEmail == 1) {
      this.site = 2;
    }
    // 这个是处理社区项目的登录，共用的是这个登录页面，用的iframe
    this.php_client = this.$route.query.php_client;
    if (this.php_client == 1) {
      // 修改跳转到指定bbs 从哪来回哪去
      let that = this;
      let flag = false;
      window.document.cookie.split(";").forEach((item, index) => {
        if (item.indexOf("bbsurl=") != -1) {
          that.backUrl = item.replace("bbsurl=", "");
          flag = true;
        }
      });

      if (flag) return;

      let location = window.location.href;
      if (location.includes("goodnovel")) {
        this.backUrl = "https://forum.goodnovel.com";
      } else if (location.includes("haiwaidz")) {
        this.backUrl = "https://forum.haiwaidz.com";
      } else if (location.includes("dzhaiwai")) {
        this.backUrl = "http://forum.dzhaiwai.com";
      } else {
        this.backUrl = "https://forum.goodnovel.com";
      }
    }
  },
  methods: {
     judgeShareFn(key) {
      let shareCode = window.localStorage.getItem(key);
      if (shareCode) {
        return shareCode;
      } else {
        return false;
      }
    },
    handleCountTime() {
      this.timer = setInterval(() => {
        this.countTime -= 1;
        if (this.countTime == 0) {
          clearInterval(this.timer);
          this.timer = null;
          this.isShowCountTime = false;
          this.countTime = 60;
        }
      }, 1000);
    },
    handleResendEmail() {
      // 下面是重新发送邮箱验证接口
      this.handleEmailRegister();
    },
    async getHellloInfo() {
      let res = await this.$axios.post("/xsdq/user/third/login/attrs", {});
      if (res.data.status == 0) {
        this.initOptions = res.data.data;
      }
      this.needUrl = this.initOptions.redirectUrl;
      console.log(this.initOptions)
      console.log(this.needUrl);
      //三方登录初始化
      this.$hello.init(
        {
          facebook: this.initOptions.facebookId,
          google: this.initOptions.googleId,
          twitter: this.initOptions.twitterKey,
        },
        {
          redirect_uri: this.needUrl,
          google_redirect_uri: this.needUrl,
        }
      );
    },
    togglePasswordType() {
      // 邮箱注册的密码显示和隐藏
      this.passwordType = this.passwordType == "password" ? "text" : "password";
    },
    async handleEmailRegister() {
      let that = this;
      this.judgeEmailFlag =
        checkEmail(this.registerEmail) && !judgeEmailLength(this.registerEmail);
      this.judgePasswordFlag = judgePassword(this.registerPassword);

      if (!this.judgeEmailFlag) {
        this.errorTip = "Incorrect mailbox format";
        return;
      }
      if (!this.judgePasswordFlag) {
        this.errorTip = "6 to 18 digits and letters";
        return;
      }
      if (this.throttleFlag) {
        return;
      }
      this.throttleFlag = true;

      let p = {
        email: this.registerEmail,
        password: this.registerPassword,
      };
      if (this.share) {
        p.shareCode = this.share;
      }

      if(this.halloweenShare){
        p.halloweenShare =  this.halloweenShare
      }

      // 约稿活动, 被邀请者登录时上传邀请者的userId
      if (this.inviteId) {
        p.shareCodeWriting = this.inviteId;
      }

      let res = await this.$axios.post("/xsdq/user/email/register", p);
      this.throttleFlag = false;
      if (res.data.status == 0) {

        that.bindPack();

        this.site = 4;
        this.isShowCountTime = true;
        this.handleCountTime();

        if (this.inviteId) {
          $logEvent({
            event: "fqglfxmcg", // 关联分享码成功
          });
        }
      } else if (res.data.status == 1010) {
        this.$msg({ content: "Mailbox registered" });
        if (this.inviteId) {
          $logEvent({
            event: "fqglfxmsb", // 关联分享码失败
          });
        }
      } else if (res.data.status == 1012) {
        this.$msg({ content: "Email sent too often" });
        if (this.inviteId) {
          $logEvent({
            event: "fqglfxmsb", // 关联分享码失败
          });
        }
      } else if (res.data.status == 1) {
        this.$msg({ content: "Incorrect mailbox format" });
        if (this.inviteId) {
          $logEvent({
            event: "fqglfxmsb", // 关联分享码失败
          });
        }
      } else {
        if (this.site == 5) {
          this.$msg({
            content: "Send too often, please try again later",
          });
        } else {
          this.site = 5;
        }
      }
    },

    // TODO: 在請求登錄接口之前 判斷session中是否有shareCode, 如果沒有shareCode則不添加,有則添加
    judgeShare() {
      let shareCode = window.localStorage.getItem("shareCode");
      if (shareCode) {
        return shareCode;
      } else {
        return false;
      }
    },

    judgePackCode(){
      let packcode = window.localStorage.getItem("packcode");
      if (packcode) {
        return packcode;
      } else {
        return false;
      }
    },

    // TODO: 约稿活动, 分享者ID获取
    judgeInvite() {
      let inviteId = window.localStorage.getItem("inviteid");
      if (inviteId) {
        return inviteId;
      } else {
        return false;
      }
    },

    async handleLoginEmail() {
      this.judgeEmailFlag =
        checkEmail(this.registerEmail) && !judgeEmailLength(this.registerEmail);
      this.judgePasswordFlag = judgePassword(this.registerPassword);
      if (!this.judgeEmailFlag) {
        this.errorTip = "Incorrect mailbox format";
        return;
      }
      if (!this.judgePasswordFlag) {
        this.errorTip = "6 to 18 digits and letters";
        return;
      }
      if (this.throttleFlag) {
        return;
      }
      this.throttleFlag = true;

      let p = {
        accessToken: this.registerEmail,
        loginType: "email",
        oauthVerifier: "",
        password: this.registerPassword,
      };

      if (this.share) {
        p.shareCode = this.share;
      }

      if(this.halloweenShare){
        p.halloweenShare =  this.halloweenShare
      }

      // 约稿活动, 被邀请者登录时上传邀请者的userId
      if (this.inviteId) {
        p.shareCodeWriting = this.inviteId;
      }

      let res = await this.$axios.post("/xsdq/user/login", p);

      this.throttleFlag = false;
      if (res.data.status == 0) {

        this.bindPack();

        this.loginedData(res.data.data);
        this.$msg({ content: "Login Successful!" });
      } else {
        this.$msg({
          content: "Incorrect user name and password",
        });
      }
    },
    // 忘记密码发送邮件
    async handleForgetPassword() {
      this.judgeForgetEmailFlag = checkEmail(this.forgetPasswordEmail);
      if (!this.judgeForgetEmailFlag) {
        this.errorTip = "Incorrect mailbox format";
        this.forgetPasswordEmail = "";

        return;
      }
      if (this.throttleFlag) {
        this.forgetPasswordEmail = "";

        return;
      }
      this.throttleFlag = true;
      let res = await this.$axios.post("/xsdq/user/email/password/reset", {
        email: this.forgetPasswordEmail,
      });
      this.throttleFlag = false;
      if (res.data.status == 0) {
        this.site = 7;
        this.isShowCountTime = true;
        this.handleCountTime();
      } else if (res.data.status == 1012) {
        this.$msg({ content: "Email sent too often" });
      } else if (res.data.status == 110000) {
        this.$msg({ content: "User does not exist" });
      } else {
        this.$msg({
          content: "Network error please try again later",
        });
      }
      // this.forgetPasswordEmail = "";
    },
    // 忘记密码重新发送
    async handleResendForgetEmail() {
      let res = await this.$axios.post("/xsdq/user/email/password/reset", {
        email: this.forgetPasswordEmail,
      });
      if (res.data.status == 0) {
        this.isShowCountTime = true;
        this.handleCountTime();
      } else {
        this.$msg({
          content: "Network error please try again later",
        });
      }
    },
    twitterClose(target) {
      this.loginedData(target.data.data);
    },
    loginedData(target) {
      this.$store.dispatch("moduleHome/changeUserInfo", target);
      localStorage.setItem("userInfo", JSON.stringify(target));
      if (this.$route.path == "/login") {
        if (this.php_client == 1) {
          // window.location.href = window.location.origin + '/vanilla/'
          window.location.href = this.backUrl;
          return;
        }
        this.$router.replace("/");
      } else {
        this.closelogin();
        // this.$store.dispatch("moduleHome/changeLoginShow", { isShow: false });
        if (this.$route.path == "/user_center") {
          window.location.reload();
        } else if (this.$route.name == "forget_password") {
          this.$router.replace("/");
        } else if (
          this.$route.name == "书籍阅读器" ||
          this.$route.name == "书籍信息" ||
          this.$route.path == "/search" ||
          this.$route.path == "/rankings"
        ) {
          // 登录之后自动加入书架
          addLibaryEleReadNavFun &&
            addLibaryEleReadNavFun(this.currentBookInfo);
        }
      }
    },
    //关闭登录框
    closelogin() {
      let that = this;
      if (this.php_client == 1) {
        // window.location.href = this.needUrl
        window.location.href = this.backUrl;
        return;
      }
      if (
        this.$route.path == "/login" ||
        this.$route.path == "/verify" ||
        this.$route.path == "/reset_password"
      ) {
        this.$store.dispatch("moduleHome/changeLoginShow", { isShow: false });
        this.$router.replace("/");
      }else if (
        this.$route.path == "/alpha"
      ){
        window.location.reload();
      } else {
        that.$emit("closeloginparent", false);
      }
    },
    facebookhello() {
      // this.$msg({
      //   content: 'This login is currently not available.'
      // })
      // return
      let that = this;
      that
        .$hello("facebook")
        .login({ display: "popup", scope: "email publish" })
        .then(
          function (data) {
            let p = {
              accessToken: data.authResponse.access_token,
              loginType: data.network,
            };

            if (that.share) {
              p.shareCode = that.share;
            }

            if(that.halloweenShare){
              p.halloweenShare = that.halloweenShare;
            }

            // 约稿活动, 被邀请者登录时上传邀请者的userId
            if (that.inviteId) {
              p.shareCodeWriting = that.inviteId;
            }

            that.$axios
              .post("/xsdq/user/login", p)
              .then((data) => {
                if (data.data.status == 0) {

                  that.bindPack();

                  if (that.inviteId) {
                    $logEvent({
                      event: "fqglfxmcg", // 关联分享码成功
                    });
                  }
                  that.twitterClose(data);
                }
              })
              .catch((error) => {
                if (that.inviteId) {
                  $logEvent({
                    event: "fqglfxmsb", // 关联分享码失败
                  });
                }
                console.info(error, "222");
              });
          },
          function (e) {
            console.info(e, "111");
          }
        );
    },

    googlehello() {
      let that = this;

      that
        .$hello("google")
        .login({
          display: "popup",
          response_type: "token id_token",
          scope: "openid email",
        })
        .then(
          function (data) {
            console.info(data);

            // TODO: 在請求登錄接口之前 判斷session中是否有shareCode, 如果沒有shareCode則不添加,有則添加

            let p = {
              accessToken: data.authResponse.access_token,
              loginType: data.network,
            };

            if (that.share) {
              p.shareCode = that.share;
            }

            if(that.halloweenShare){
              p.halloweenShare = that.halloweenShare;
            }

            // 约稿活动, 被邀请者登录时上传邀请者的userId
            if (that.inviteId) {
              p.shareCodeWriting = that.inviteId;
            }
            that.$axios
              .post("/xsdq/user/login", p)
              .then((data) => {
                if (data.data.status == 0) {

                  that.bindPack();

                  if (that.inviteId) {
                    $logEvent({
                      event: "fqglfxmcg", // 关联分享码成功
                    });
                  }
                  that.twitterClose(data);
                }
              })
              .catch((error) => {
                if (that.inviteId) {
                  $logEvent({
                    event: "fqglfxmsb", // 关联分享码失败
                  });
                }
                console.info(error);
              });
          },
          function (e) {
            console.info(e);
          }
        );
    },
    async twitterhello() {
      // this.$msg({
      //   content: 'This login is currently not available.'
      // })
      // return
      let res = await this.$axios.post("/xsdq/user/twitter/get/authurl");
      if (res.data.status == 0) {
        var height = 900;
        var width = 700;
        var iTop = (window.screen.availHeight - 30 - height) / 2;
        var iLeft = (window.screen.availWidth - 10 - width) / 2;
        var innerHeight = window.innerHeight;
        var outHeight = window.outerHeight;
        var clientHeight = outHeight - innerHeight + 20;
        window.open(
          res.data.data.authUrl,
          "login",
          "height=" + height + ",width=" + width + ",left=" + iLeft + ",top=120"
        );
      }
    },

    //三方登录
    loginall(name) {
      let that = this;
      //google
      let oparams = {
        display: "popup",
        response_type: "token id_token",
        scope: "openid email",
      };

      that
        .$hello(name)
        .login({ display: "popup", scope: "" })
        .then(
          function (data) {
            console.info(data);
          },
          function (e) {
            console.info(e);
          }
        );
    },

    // 绑定狼人pack
    async bindPack(){
      if(this.packcode){

        $logEvent({
          event: "fqglfxmqq", // 发起关联分享码请求
        });

        let res = await this.$axios.post("/xsdq/activity/alpha/user/binding" , {shareCode : this.packcode});

        if(res.data.status == 0){
          $logEvent({
            event: "fqglfxmcg_alpha", // 发起关联分享码成功
          });
          this.$msg({
            content:"Congratulations! Now you're one of our pack members!"
          })
        }

        window.localStorage.removeItem('packcode');
      }

    }
  },
  watch: {
    site(val) {
      this.throttleFlag = false;
      if (val == 4 || val == 5 || val == 7) {
        // 这种情况下，可能会重新请求接口，因此数据不能清空
      } else {
        this.passwordType = "password";
        this.registerEmail = "";
        this.registerPassword = "";
        clearInterval(this.timer);
        this.timer = null;
        this.countTime = 60;
      }
      this.judgePasswordFlag = true;
      this.judgeEmailFlag = true;
      this.judgeForgetEmailFlag = true;
    },
  },
};
</script>

<style lang='scss' scoped>
.register-success {
  text-align: left;
  font-family: SourceHanSansCN-Bold, SourceHanSansCN;
  font-weight: bold;
  color: rgba(67, 83, 102, 1);
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 80px;
  .reister-email {
    color: #ee3799;
    font-weight: bold;
    font-size: 20px;
  }
}
.tips {
  .count-time {
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: rgba(67, 83, 102, 0.6);
    text-align: center;
  }
  .resend {
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: rgba(239, 87, 176, 1);
    font-size: 16px;
    text-align: center;
    cursor: pointer;
  }
}
.go-login {
  font-family: SourceHanSansCN-Medium, SourceHanSansCN;
  font-weight: 500;
  color: rgba(239, 87, 176, 1);
  font-size: 16px;
  text-align: center;
  cursor: pointer;
}

.login_popup_box {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  padding: 20px;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  white-space: nowrap;
  font-size: 0;
  box-sizing: border-box;
}
.lpb_main,
.lob_jgb {
  white-space: normal;
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  text-align: left;
}
.lob_jgb {
  margin-left: -1px;
  height: 100%;
  width: 1px;
}
.lpb_main {
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0px 20px 16px 0px rgba(0, 0, 0, 0.1);
}
.lpb_info {
  background-color: #ee3799;
}
.lpb_other {
  overflow: hidden;
  width: 460px;
}
.lpbo_img_box {
  margin-left: 4px;
  background-color: #ffffff;
}
.lpbo_img {
  margin-left: -4px;
  width: 460px;
  height: 254px;
  background: url("../../assets/images/icons/lgoin_banner.png") no-repeat 0 0;
}
.lpbo_main {
  position: relative;
  left: 0;
  top: 0;
  overflow: hidden;
  padding-right: 4px;
  margin-left: 4px;
  background-color: #fff;
  min-height: 406px;
}
.lpbo_close {
  margin: 12px;
  float: right;
  height: 32px;
  width: 32px;
  background: url("../../assets/images/icons/close_icon_1.png") no-repeat 0 0;
  background-size: 32px 32px;
}
.lpbo_tit {
  margin-bottom: 20px;
  height: 18px;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
  color: #3a4a5a;
}
.lpbo_but_box {
  overflow: hidden;
  margin: 0 0 20px 0;
  background-color: #ffffff;
}
.lpbo_but_box > a {
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
.lpbo_f {
  background-image: url("../../assets/images/icons/facebook_icon.png");
  background-color: rgba(83, 123, 188, 1);
  color: #ffffff;
}
.lpbo_g {
  background-image: url("../../assets/images/icons/google_icon.png");
  background-color: rgba(255, 255, 255, 1);
  color: #3a4a5a;
  border: 1px solid rgba(208, 211, 216, 1);
}
.lpbo_t {
  background-image: url("../../assets/images/icons/twitter_icon.png");
  background-color: rgba(47, 176, 236, 1);
  color: #ffffff;
}
.lpbo_e {
  height: 24px;
  text-align: center;
  line-height: 24px;
  font-size: 0;
}
.lpbo_e strong {
  margin-right: 6px;
  display: inline-block;
  height: 24px;
  font-size: 16px;
  color: rgba(76, 93, 114, 1);
  font-weight: 500;
}
.lpbo_e_a {
  padding-left: 22px;
  display: inline-block;
  height: 24px;
  background: url("../../assets/images/icons/email_icon.png") no-repeat 0 center;
  background-size: 16px 16px;
  font-size: 16px;
  color: rgba(238, 55, 153, 1);
  line-height: 24px;
}
.lpbo_footer_box {
  overflow: hidden;
  margin: 40px 0 16px;
}
.lpbof_other {
  margin-bottom: 10px;
  overflow: hidden;
  height: 24px;
  font-size: 0;
  text-align: center;
  line-height: 24px;
  margin-top: 10px;
}
.lpbof_other strong {
  font-size: 16px;
  line-height: 24px;
  color: rgba(98, 114, 139, 1);
  font-weight: 500;
}
.lpbofo_a {
  margin-left: 6px;
  font-size: 16px;
  color: rgba(239, 87, 176, 1);
}
.lpbof_p {
  text-align: center;
  font-size: 14px;
  color: rgba(67, 83, 102, 0.6);
  line-height: 24px;
}
.lpbof_p a {
  display: inline;
  font-size: 14px;
  color: rgba(67, 83, 102, 0.6);
  line-height: 24px;
  text-decoration: underline;
}
.lpbo_input_box {
  margin: 0 auto;
  width: 360px;
}
.lpboi_txt,
.lpboi_pwd {
  margin-bottom: 20px;
  overflow: hidden;
}
.lpboi_tit {
  overflow: hidden;
  height: 24px;
}
.lpboi_tit span,
.lpboi_tit strong {
  display: block;
  height: 24px;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
}
.title-box {
  &.error {
    .title-name {
      color: #f84545;
    }
    .input-container {
      border-color: #f84545;
    }
  }
}
.error-tip {
  text-align: center;
  padding-bottom: 10px;
  font-size: 14px;
  line-height: 18px;
  opacity: 0;
  &.active {
    opacity: 1;
    color: #f84545;
  }
  color: #fff;
}
.lpboi_tit span {
  color: rgba(58, 74, 90, 1);
}
.lpboi_tit strong {
  display: none;
  color: rgba(247, 88, 74, 1);
}
.lpboi_tit_error strong {
  display: block;
}
.lpboi_tit_error span {
  display: none;
}
.lpboi_text,
.lpbop_text {
  overflow: hidden;
  height: 46px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.lpboit_input,
.lpboip_input {
  overflow: hidden;
  height: 46px;
}
.lpboip_input {
  margin-right: 50px;
}
form.lpboit_input input {
  box-sizing: border-box;
  border-bottom: 1px solid #d0d3d8;
}
.lpboit_input input,
.lpboip_input input {
  height: 46px;
  width: 100%;
  font-size: 16px;
  color: rgba(58, 74, 90, 1);
}
.lpbop_type {
  float: right;
  height: 46px;
  width: 38px;
  background: url("../../assets/images/icons/eye_1.png") no-repeat center center;
  background-size: 20px 20px;
  &.can-see {
    background-image: url("../../assets/images/icons/eye_2.png");
  }
}
.lpbo_login_but {
  overflow: hidden;
}
.lpbo_login_but > a {
  display: block;
  margin: 0 auto 20px;
  height: 44px;
  width: 300px;
  background-color: rgba(238, 55, 153, 1);
  font-size: 20px;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  line-height: 44px;
  border-radius: 4px;
}
.lpbolb_other {
  overflow: hidden;
  text-align: center;
  font-size: 16px;
  color: rgba(238, 71, 165, 1);
  height: 24px;
}
.lpbolb_other a {
  font-size: 16px;
  color: rgba(238, 71, 165, 1);
  vertical-align: middle;
}
.lpbo_return_box {
  position: absolute;
  left: 0;
  bottom: 40px;
  height: 24px;
}
.lpbo_return_box a {
  float: left;
  margin-left: 30px;
  padding-left: 17px;
  display: block;
  height: 24px;
  background: url("../../assets/images/icons/return_1.png") no-repeat 0 center;
  background-size: 12px 12px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(58, 74, 90, 1);
  line-height: 24px;
}
.lpbo_mail_header {
  overflow: hidden;
  display: block;
  padding-right: 4px;
  margin-left: 4px;
  background-color: #ffffff;
}
.lpbomh_nav {
  overflow: hidden;
  margin-bottom: 70px;
  height: 66px;
}
.lpbomhn_return {
  float: left;
  margin: 17px 0 0 28px;
  height: 32px;
  width: 32px;
  background: url("../../assets/images/icons/return_2.png") no-repeat 0 0;
}
.lpbomhn_close {
  float: right;
  margin: 17px 12px 0 0;
  height: 32px;
  width: 32px;
  background: url("../../assets/images/icons/close_icon_1.png") no-repeat 0 0;
}
.lpbomh_info {
  overflow: hidden;
  margin-left: 50px;
  min-height: 118px;
}
.lpbomh_info h1 {
  height: 40px;
  font-size: 32px;
  color: #435366;
  font-weight: bold;
  line-height: 40px;
}
</style>
