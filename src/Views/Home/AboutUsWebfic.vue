<!--
 * @Description:
 * @FilePath: \webfic_pc_ssr\src\Views\Home\AboutUsWebfic.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2019-12-31 12:03:26
 * @LastEditors: CuiGang
 * @LastEditTime: 2021-01-07 10:42:38
 -->
<template>
  <div class="aboutCon">
    <div class="navTop">
      <div class="auto_contain">
        <div class="autoLeft"></div>
        <div class="autoRight"></div>
      </div>

      <div class="contentImg">
          <img src="../../assets/images/aboutus/wbg.png" alt title="Classicality " />
          <div class="inter">
            <p>Webfic | Make Reading Fantastic</p>
            <p>Free online website novels & books for fiction loves.</p>
            <p>Popular web novels with massive original English stories, types include urban, romance, </p>
            <p>fantasy, werewolf, classic and so on.</p>
            <p>For more high-quality content and experience, you can download the Webfic official app</p>
            <p>and enjoy the fun of reading together.</p>
            <p>Download it now and enjoy reading together.</p>
          </div>
      </div>
    </div>
    <div class="appStope">
      <img src="../../assets/images/aboutus/iOSAPP.png" @click="downApp" />
      <img src="../../assets/images/aboutus/Android APP.png" @click="downApp" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    openUrl(url) {
      window.location.href = url;
    },
    downApp(){
      this.$router.push('/download_apps')
    }
  }
};
</script>
<style lang='scss' scoped>
.appStope{
  width: 800px;
  height: 130px;
  margin: 74px auto;
  margin-bottom: 240px;
}
.appStope img{
  width: 360px;
  height: 130px;
  &:nth-child(1){
    margin-right: 80px;
  }
  &:hover{
    cursor: pointer;
  }
}
.navTop{
  position: relative;
  height: 540px;
  .auto_contain{
    position: absolute;
    width: 100%;
    height: 100%;
    .autoLeft , .autoRight{
      width: 50%;
      height: 100%;
      background:#FEDF87;
      float: left;
    }
    .autoRight{
      background:#FF7DC0;
    }
  }
}
.contentImg{
  width: 1600px;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: 0 auto;
  img{
    position: absolute;
    width: 1600px;
    height: 540px;
  }
}
.inter{
  width: 700px;
  height: 300px;
  background: rgba(255,255,255,0.7);
  position: absolute;
  left: 0px;
  right: 0px;
  margin:70px auto;
  padding: 50px;
  text-align: center;
  border-radius: 4px;
  p:nth-child(1){
    font-size: 24px;
    font-weight: bold;
    line-height: 28px;
    margin-bottom: 70px;
    position: relative;
    &::after{
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -20px;
      width: 50px;
      height: 2px;
      margin: auto;
      background-color: #e97020;
    }
  }
  p{
    font-size: 17px;
    line-height: 28px;
    color: rgba(51,51,51,0.8);
  }
}
</style>
