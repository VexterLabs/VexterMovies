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
            <p>小說大全-全新海量火熱小說</p>
            <p>【免費多顏值高、更新快的電子書閱讀神器】</p>
            <p>頁面设计精美大方，給你超級舒適的視覺體驗；隨時隨地，連載秒更。</p>
            <p>【百家電子文庫，私人訂製推薦】</p>
            <p>都市辣文、玄幻修真、盜墓摸金、懸疑、鐵血軍事豪門總裁、校園純愛、古言仙俠、穿越宮鬥、幻想言情、影視原著。</p>
            <p>【不可錯過的暢銷經典紅文】</p>
            <p>網文：《鬼手神医：王妃请上位 》《龍王殿》《封少的掌上娇妻》《幸得相爱，陆少深深宠》《都市無敵醫聖》《至尊女婿》《騙婚總裁：獨寵小嬌妻》《閃婚老公太兇猛》等暢銷書：《你好，舊時光》《你的孤獨，雖敗猶榮》《靈魂有香氣的女子》《微微一笑很傾城》等，趕走生活中無聊的每1秒。</p>
            <p>小說大全，千萬用戶正在使用的小說閱讀神器！打發無聊時間的裝備！百萬部經典小說樣樣俱全任你閱讀，小說更新實時提醒，從此追書也是件幸福事。</p>
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
  margin: 80px auto;
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
  height: 704px;
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
    height: 704px;
  }
}
.inter{
  width: 700px;
  height: 434px;
  background: rgba(255,255,255,0.7);
  position: absolute;
  left: 0px;
  right: 0px;
  margin:84px auto;
  padding: 50px;
  text-align: center;
  border-radius: 4px;
  font-weight: 400;
  p:nth-child(1){
    font-size: 24px;
    font-weight: bold;
    line-height: 28px;
    margin-bottom: 24px;
    position: relative;
    text-align: center;
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
      display: none;
    }
  }
  p:last-child{
    margin-top: 45px;
  }
  p{
    font-size: 16px;
    line-height: 28px;
    color: #545862;
    text-align: left;
    font-weight: 400;
  }

}
</style>
