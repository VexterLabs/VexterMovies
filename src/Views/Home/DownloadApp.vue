<!--
 * @Description:
 * @FilePath: \webfic_pc_ssr\src\Views\Home\DownloadApp.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2019-12-31 12:03:26
 * @LastEditors: CuiGang
 * @LastEditTime: 2021-01-05 11:54:54
 -->
<template>
  <div class="special-page">
    <div class="top-title">Download App</div>
    <div class="content">
      <div class="box">
        <div class="title">Google Play</div>
        <img
          src="../../assets/images/we_code/googleplay_code.png"
          alt="down load goodnovel app"
        />
        <h2>
          复制URL链接到 <br> <strong>安卓手机</strong> <br> 浏览器进行下载
        </h2>
        <span @click="handleCopyLink('and')">点击复制URL链接<i class="line"></i></span>
      </div>

      <div class="box">
        <div class="title">App Store</div>
        <img
          src="../../assets/images/we_code/ios_code.png"
          alt="down load goodnovel app"
        />
        <h2>
          复制URL链接到<br> <strong>苹果手机</strong> <br> 浏览器“Safari”进行下载
        </h2>
        <span @click="handleCopyLink('ios')">点击复制URL链接<i class="line"></i></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleCopyLink(type) {
      let message = "https://play.google.com/store/apps/details?id=com.dz.xsdq";
      if(type == 'ios'){
        message = "https://apps.apple.com/tw/app/id1478104721"
      }

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
  },
};
</script>
<style lang='scss' scoped>
.special-page {
  width: 856px;
  margin: 0 auto 60px;
  .top-title {
    font-size: 32px;
    font-family: SourceHanSansCN-Bold, SourceHanSansCN;
    font-weight: bold;
    color: rgba(87, 103, 127, 1);
    padding: 20px 0;
    margin: 30px;
  }
  .top-title:first-child {
    margin-top: 0;
  }
  .content {
    width: 100%;
    text-align: center;
    min-height: 800px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
    padding: 40px 50px;
    .box {
      float: left;
      margin-top: 60px;
      width: 50%;
      h2 {
        font-size: 22px;
        font-weight: 500;
        strong {
          font-size: 22px;
          line-height: 32px;
        }
      }
      span{
        display: block;
        width: 220px;
        height: 40px;
        background:rgb(255 ,126 ,66);
        margin: 32px auto;
        text-align: center;
        line-height: 40px;
        font-size: 24px;
        font-weight: 500;
        border-radius: 9px;
        cursor: pointer;
        box-shadow: rgb(39, 41, 43);
        position: relative;

        i.line{
          display: block;
          width: 90%;
          height: 0;
          border-top:2px solid #000;
          position: absolute;
          bottom: 4px;
          left:50%;
          transform: translateX(-50%);
        }
      }
    }
    // .box:first-child {
    //   margin-left: 12px;
    //   margin-right: 120px;
    // }
    .title {
      font-size: 32px;
      font-family: SourceHanSansCN-Bold, SourceHanSansCN;
      font-weight: bold;
      color: rgba(67, 83, 102, 1);
      line-height: 40px;
      margin-bottom: 30px;
    }
    img {
      width: 300px;
      height: 300px;
      border-radius: 10px;
      margin-bottom: 40px;
    }
    .item-tip {
      padding: 16px 0;
      font-size: 18px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: rgba(58, 74, 90, 1);
      line-height: 32px;
      .special-span {
        color: #ee3799;
        font-size: 18px;
      }
    }
  }
}
</style>
