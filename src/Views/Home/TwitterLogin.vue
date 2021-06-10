<!--
 * @Description:
 * @FilePath: \haiwai_pc\src\Views\Home\TwitterLogin.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2019-12-30 16:50:48
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-08-28 11:19:13
-->
<template>
  <div class="check-token"></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.handleCheckToken();
  },
  methods: {
    // TODO: 在請求登錄接口之前 判斷session中是否有shareCode, 如果沒有shareCode則不添加,有則添加

    judgeShare() {
      let shareCode = window.localStorage.getItem("shareCode");
      if (shareCode) {
        return shareCode;
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
    judgePackCode(){
      let packcode = window.localStorage.getItem("packcode");
      if (packcode) {
        return packcode;
      } else {
        return false;
      }
    },
    judgeShareFn(key) {
      let shareCode = window.localStorage.getItem(key);
      if (shareCode) {
        return shareCode;
      } else {
        return false;
      }
    },
    // 绑定狼人pack
    async bindPack(){

      this.packcode = this.judgePackCode();

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

    },
    async handleCheckToken() {
      let query = this.$route.query;

      let param = {
        accessToken: query.oauth_token,
        oauthVerifier: query.oauth_verifier,
        loginType: "twitter",
      };
      let sc = this.judgeShare();
      if (sc) {
        param.shareCode = sc;
      }

      // 约稿活动, 被邀请者登录时上传邀请者的userId
      let shareCodeWriting = this.judgeInvite();
      if (shareCodeWriting) {
        param.shareCodeWriting = shareCodeWriting;
      }

      // 万圣节
      let halloweenShare = this.judgeShareFn('halloweenShare');
      if (halloweenShare) {
        param.halloweenShare = halloweenShare;
      }

      let res = await this.$axios.post("/xsdq/user/login", param);
      if (res.data.status == 0) {
        if (shareCodeWriting) {
          $logEvent({
            event: "fqglfxmcg", // 关联分享码成功
          });
        }

        this.bindPack();

        window.opener.sele(res);
        window.close();
      } else {
        if (shareCodeWriting) {
          $logEvent({
            event: "fqglfxmsb", // 关联分享码失败
          });
        }
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.check-token {
  .btn {
    padding: 10px 20px;
    background: #ccc;
    display: inline-block;
    cursor: pointer;
    color: #333;
    margin: 20px 100px;
  }
}
</style>
