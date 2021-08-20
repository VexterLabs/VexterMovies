<!--
 * @Description: 
 * @FilePath: \webfic_pc_ssr\src\components\Book\WebficReadUnlock.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2020-12-30 14:26:09
 * @LastEditors: CuiGang
 * @LastEditTime: 2021-01-07 11:49:15
-->
<template>
  <div class="down">
    <div class="top"></div>
    <div class="WebficReadUnlock">
      <img class="un" src="../../assets/images/icons/unlock_icon.png" alt="" />
      <p class="p1">未解鎖章節</p>
      <p class="p2">想要觀看更多精彩內容</p>
      <p class="c">下載APP解鎖更多精彩章節</p>
      <!-- <div class="client" @click="go_down_load">
          <img class="and" src="../../assets/images/icons/and.png" alt="" />
          <img src="../../assets/images/icons/ios.png" alt="" />
      </div> -->
      <div class="baseUrl">
        <div class="box">
          <p class="baseImg">
            <img :src="chapterInfo.qrcodeAndroidBase64" alt=""> 
          </p>
          <div class="shop">
            <img src="../../assets/images/icons/Android.png" alt="">
            <span>Google Play</span>
          </div>
          <p class="text">复制链接到安卓手机浏览器</p>
          <p class="text">进行下载</p>
          <p class="copy" @click="handleCopyLink('and')">点击复制链接</p>
        </div>
        <div class="box floatR">
          <p class="baseImg">
            <img :src="chapterInfo.qrcodeIosBase64" alt=""> 
          </p>
          <div class="shop">
            <img src="../../assets/images/icons/iOS-icon.png" alt="">
            <span>APP Store</span>
          </div>
          <p class="text">复制链接到苹果手机浏览器</p>
          <p class="text">“Safari”进行下载</p>
          <p class="copy" @click="handleCopyLink('ios')">点击复制链接</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:['bgColor','chapterInfo','bookInfo'],
  data() {
    return {};
  },
  methods:{
    go_down_load(){
      this.$router.push("/download_apps")
    },
    handleCopyLink(type) {
      let title = 1
      let message = this.chapterInfo.androidUrl
      if(type == 'ios'){
        message = this.chapterInfo.iosUrl
        title = 0
      }
      $logEvent({uid:this.$root.$options.fackUid,type:'Click',event:'readerpage_item_click',data:{'book_id':this.bookInfo.bookId || '','Chapter_id':this.chapterInfo.id || '','title':title}})

      this.$copyText(message).then(
        (e) => {

          this.$msg({
            content: "你拿到連結了！",
          });
        },

        (e) => {

          this.$msg({
            content: "哎呀！有問題，請稍後再試。",
          });
        }
      );
    },
  }
};
</script>
<style lang="scss" scoped>
.down {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  .top {
    height: 150px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      #ffffff 100%
    );
  }
  .WebficReadUnlock {
    height: 375px;
    text-align: center;
    background: rgba(255, 255, 255, 1);
    .un {
      display: block;
      margin: 0 auto;
      width: 24px;
      height: 24px;
      margin-bottom: 8px;
    }
    p {
      height: 18px;
      font-size: 16px;
      font-weight: 400;
      color: #333333;
      line-height: 18px;
      &.p1 {
        margin-bottom: 16px;
      }
      &.p2 {
        margin-bottom: 8px;
      }
      &.c {
        color: rgba(255, 126, 66, 1);
        margin-bottom: 24px;
      }
    }
    .client {
      text-align: center;
      img {
        cursor: pointer;
        width: 60px;
        height: 70px;
        &.and {
          margin-right: 24px;
        }
      }
    }
  }
}

.bgColor1{
  background: rgb(245 ,231, 215);
  .top {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgb(245 ,231, 215) 100%
    );
  }
  .WebficReadUnlock {
    background: rgb(245 ,231, 215);
  }
}
.bgColor2{
  background: rgb(17, 17, 17);
  
  .top {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgb(17, 17, 17) 100%
    );
  }
  .WebficReadUnlock {
    background: rgb(17, 17, 17);
    p {
      color:#fff;
    }
  }
}
.baseUrl{
  width:378px;
  height:210px;
  margin: 32px auto;
  margin-bottom: 0;
  position: relative;
  .box{
    width: 144px;
    float: left;
    .baseImg{
      width: 144px;
      height: 100px;
      text-align: center;
      img{
        width: 100%;
        // height: 100px;
        border: 1px solid #DBDBDB;
        transform: scale(0.7);
        margin-top: -15%;
      }
    }
    .shop{
      height: 28px;
      margin: 11px 0 7px 0px;
      line-height: 28px;
      text-align: center;
      img{
        width: 28px;
        height: 28px;
        vertical-align: middle;
        margin-top: -3px;
      }
      span{
        display: inline-block;
        height: 28px;
        font-size: 16px;
        font-family: PingFangTC-Medium, PingFangTC;
        font-weight: 500;
        color: #333333;
        line-height: 28px;
        margin-left: 5px;
      }
    }
    .text{
      font-size: 12px;
      font-family: PingFangTC-Regular, PingFangTC;
      font-weight: 600;
      color: rgba(51, 51, 51, 0.8);
      line-height: 18px;
    }
    .copy{
      font-size: 12px;
      font-family: PingFangTC-Regular, PingFangTC;
      font-weight: 600;
      color: rgba(255, 95, 39, 1);
      line-height: 18px;
      text-decoration: underline;
      margin-top: 8px;
      cursor: pointer;

    }
  }
  .floatR{
    float: right;
  }
}

</style>