<template>
  <footer class="footer">
    <!-- <img class="logo" src="../../assets/images/common/footer_logo.png" alt=""> -->
    <ul class="box">
      
      <li class="item">
        <router-link class="content-li" :to="{path: '/privacy'}">隱私政策</router-link>
      </li>
      <li class="item">
        <!-- <h4 class="title">About</h4> -->
        <router-link class="content-li" :to="{path: '/terms'}">用戶協議</router-link>
      </li>
      <!-- <li class="item">
        <router-link class="content-li" :to="{path: '/dmca'}">DMCA</router-link>
      </li> -->
      <li class="item itemCol">
        <router-link class="content-li" :to="{path: '/download'}">下载APP</router-link>
      </li>
    </ul>

    <div class="copy_r">
      <div class="copy_right">© 小說大全, All Right Reserved</div>
      <div class="copy_right">Dianzhong Technology Co., Ltd.</div>
    </div>
  </footer>
</template>
<script>
import {
  checkEmail,
  getUserIP,
  checkLength,
  judgeEmailLength
} from "@/core/js/common.js";
export default {
  data() {
    return {
      content: "",
      name: "",
      email: "",
      errorIndex: -1,
      ip: "",
       inhublist:false
    };
  },
  watch: {
      '$route'(to, from) {
       if(to.path.includes('hubinfo')){
          this.inhublist = true;
        }else{
          this.inhublist = false;
        }
      }
  },
  mounted() {
    getUserIP(ip => {
      this.ip = ip;
    });
    if(this.$route.path.includes('hubinfo')){
      this.inhublist = true;
    }else{
      this.inhublist = false;
    }
  },
  methods: {
    async handleSend() {
      if (!this.content) {
        this.$msg({ content: "Content cannot be empty!" });
        this.errorIndex = 1;
        return;
      }
      if (!checkLength(this.content, { min: 0, max: 2001 })) {
        this.$msg({ content: "The text is too long" });
        this.errorIndex = 1;
        return;
      }
      if (!checkLength(this.name, { min: 1, max: 31 })) {
        this.$msg({ content: "Username length limit to 2 - 30 char!" });
        this.errorIndex = 2;
        return false;
      }
      if (!checkEmail(this.email) || judgeEmailLength(this.email)) {
        this.$msg({ content: "Email format is incorrect!" });
        this.errorIndex = 3;
        return;
      }
      this.errorIndex = -1;
      let res = await this.$axios.post("/xsdq/home/feedBack", {
        content: this.content,
        userName: this.name,
        email: this.email
        // ip: this.ip
      });
      if (res.data.status == 0) {
        (this.content = ""), (this.name = ""), (this.email = "");
        this.$msg({ content: "Success!" });
      } else if (res.data.status == 16014) {
        this.$msg({ content: "You can only give feedback three times a day!" });
      } else {
        this.$msg({ content: "Fail!" });
      }
    },
    openUrl(url){
      window.location.href = url;
    }
  }
};
</script>
<style lang='scss' scoped>
.btm_wb{
  text-align: center;
  margin-bottom: 16px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.6);
  &:hover {
    color: #ee3499;
  }
}
.footer {
  width: 100%;
  background: #FFF  url("../../assets/images/common/footerBg.png") no-repeat left top/100% 2px;
  min-height: 200px;
  box-sizing: border-box;
  // position: absolute;
  min-width: 1360px;
  // bottom: 0;
  padding-top:44px;
  
  .logo{
    display: block;
    width: 30px;
    height: 30px;
    margin: 0 auto;
    margin-bottom: 27px;
  }

  .box {
    width: 350px;
    margin: 0 auto;
    font-size: 0;
    display: flex;
    justify-content: space-between;
    .item {
      text-align: center;
      font-size: 12px;
      color:#fff;
      font-weight: 400;
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      .title {
        font-size: 24px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        margin-bottom: 20px;
      }
      .content-li {
        display: block;
        cursor: pointer;
        color: #545862;
        font-size: 12px;
        line-height: 14px;
        &:hover {
          color: rgba(255, 126, 66, 1);
        }
        &.facebook {
          background: url("../../assets/images/icons/footer_faccbook.png")
            no-repeat left center/16px 16px;
          padding-left: 20px;
        }
        &.google {
          background: url("../../assets/images/icons/footer_google.png")
            no-repeat left center/16px 16px;
          padding-left: 20px;
        }
        &.twitter {
          background: url("../../assets/images/icons/footer_twitter.png")
            no-repeat left center/16px 16px;
          padding-left: 20px;
        }
      }
      .footer-textarea {
        width: 100%;
        height: 94px;
        background: rgba(255, 255, 255, 0.1);
        resize: none;
        box-sizing: border-box;
        padding: 10px 6px;
        color: rgba(255, 255, 255, 0.6);
        line-height: 28px;
        border: 1px solid transparent;
        &.active {
          border: 1px solid rgba(238, 55, 153, 1);
        }
        &::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }
    .itemCol{
      border-radius: 2px;
      border: 1px solid;
      border-image: linear-gradient(137deg, rgba(248, 201, 74, 1), rgba(248, 163, 62, 1)) 1 1;
      a{
      color: #FB571F !important;
      }
    }
  }

  
  .hublist{
    padding-top: 117px;
  }
  .hublist ,.hublist a {
    text-align: center;
    text-decoration: none;
    height: 126px;
    font-size: 24px;
    font-family: Helvetica;
    color: rgba(255, 255, 255, .7);
    line-height: 42px;

  }

  .copy_r{
    cursor: pointer;
    width: 1300px;
    // height: 100%;
    margin: 0 auto;
    font-size: 0;
    // background: rgba(15, 5, 0, 1);
    padding-top:82px;
    padding-bottom:20px;
    .copy_right{
      text-align: center;
      height: 14px;
      font-size: 12px;
      font-weight: 400;
      color: #545862;
      line-height: 14px;
      margin-bottom: 5px;

      &:hover{
        color: rgba(255, 126, 66, 1);
      }
      &.nm{
        margin-bottom: 0;
      }
    }
  }
}
</style>
