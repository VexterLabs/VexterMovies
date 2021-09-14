<!--
 * @Description:
 * @FilePath: \haiwai_pc\src\Views\Home\AboutUs.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2019-12-31 12:03:26
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-06-02 14:40:10
 -->
<template>
  <div class="special-page">
    <div class="top">
      <div class="bg">
        <h1>Love all，Believe a few</h1>
        <div class="line"></div>
        <p>GoodNovel is an online story platform and community dedicated to create a new generation of classic novels and a free zone of imagination powered by technology.</p>
      </div>

      <div class="our">
        <h2>Our Values</h2>
        <ul>
          <li>
            <img src="../../assets/images/aboutus/icon1_share.png" alt title="Classicality " />
            <p>Classicality</p>
          </li>
          <li>
            <img src="../../assets/images/aboutus/icon1_circle.png" alt title="Sharability " />
            <p>Sharability</p>
          </li>
          <li>
            <img src="../../assets/images/aboutus/icon1_pen.png" alt title="Creativity " />
            <p>Creativity</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="bcon">
      <div class="bottom">
        <h2>Find us on</h2>
        <ul>
          <li @click="openUrl('https://forum.goodnovel.com/')">
            <img src="../../assets/images/aboutus/icon2_msg.png" alt title="Our Forum " />
            <p>Our Forum</p>
          </li>
          <li @click="openUrl('https://www.facebook.com/GoodNovels')">
            <img src="../../assets/images/aboutus/icon2_facebook.png" alt title="Facebook page" />
            <p>Facebook page</p>
          </li>
          <li @click="openUrl('https://www.facebook.com/groups/GoodNovels/')">
            <img src="../../assets/images/aboutus/icon2_group.png" alt title="Facebook Group" />
            <p>Facebook Group</p>
          </li>
          <li @click="$router.push('/download')">
            <img src="../../assets/images/aboutus/icon2_appstore.png" alt title="iOS APP" />
            <p>iOS APP</p>
          </li>
          <li @click="$router.push('/download')">
            <img src="../../assets/images/aboutus/icon2_xbox.png" alt title="Android APP" />
            <p>Android APP</p>
          </li>
        </ul>
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
    openUrl(url) {
      window.location.href = url;
    }
  }
};
</script>
<style lang='scss' scoped>
.special-page {
  width: 100%;
  background-color: #fff;
  .top {
    width: 1300px;
    margin: 0 auto;

    .bg {
      width: 1188px;
      height: 582px;
      margin: 0 auto;
      background: url(../../assets/images/aboutus/about_us_bg.png) no-repeat
        center center;
      background-size: 100% 100%;
      overflow: hidden;

      h1 {
        margin-left: 54px;
        margin-top: 130px;
        height: 89px;
        font-size: 60px;
        font-family: SourceHanSansSC-Heavy, SourceHanSansSC;
        font-weight: 800;
        color: rgba(59, 44, 195, 1);
        line-height: 89px;
        margin-bottom: 62px;
      }
      .line {
        width: 122px;
        height: 4px;
        background: linear-gradient(
          270deg,
          rgba(255, 255, 255, 1) 0%,
          rgba(255, 130, 249, 1) 100%
        );
        margin-bottom: 21px;
        margin-left: 54px;
      }
      p {
        margin-left: 54px;
        width: 399px;
        // height:177px;
        font-size: 20px;
        font-family: SourceHanSansSC-Regular, SourceHanSansSC;
        font-weight: 400;
        color: rgba(58, 74, 90, 1);
        line-height: 32px;
      }
    }

    .our {
      width: 1188px;
      height: 380px;
      margin: 0 auto;
      background: url(../../assets/images/aboutus/bg.png) no-repeat center
        center;
      background-size: 100% 100%;
      overflow: hidden;
      h2 {
        margin: 32px 0 30px 65px;
        font-size: 32px;
        font-family: SourceHanSansSC-Heavy, SourceHanSansSC;
        font-weight: 800;
        color: rgba(58, 74, 90, 1);
        line-height: 47px;
      }
      ul {
        overflow: hidden;
        padding: 0 30px;
        box-sizing: border-box;
        li {
          float: left;
          width: 33.333%;
          text-align: center;
          img {
            width: 108px;
            height: 108px;
            margin-bottom: 14px;
          }
          p {
            height: 40px;
            font-size: 20px;
            font-family: SourceHanSansSC-Bold, SourceHanSansSC;
            font-weight: bold;
            color: rgba(58, 74, 90, 1);
            line-height: 29px;
            text-align: center;
          }
        }
      }
    }
  }
  .bcon {
    width: 100%;
    background-color: rgba(244, 246, 248, 1);
    .bottom {
      width: 1300px;
      margin: 0 auto;
      background-color: rgba(244, 246, 248, 1);
      overflow: hidden;
      h2 {
        width: 1188px;
        margin: 0 auto;
        height: 47px;
        font-size: 32px;
        font-family: SourceHanSansSC-Heavy, SourceHanSansSC;
        font-weight: 800;
        color: rgba(58, 74, 90, 1);
        line-height: 47px;
        padding-left: 136px;
        margin-top: 34px;
        margin-bottom: 24px;
      }
      ul {
        width: 1054px;
        overflow: hidden;
        margin: 0 auto;
        height: 280px;
        li {
          cursor: pointer;
          float: left;
          width: 20%;
          text-align: center;
          img {
            width: 108px;
            height: 108px;
            margin-bottom: 16px;
          }
          p {
            height: 40px;
            font-size: 20px;
            font-family: SourceHanSansSC-Regular, SourceHanSansSC;
            font-weight: 400;
            color: rgba(58, 74, 90, 1);
            line-height: 29px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
