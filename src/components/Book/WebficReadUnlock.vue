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
      <div class="client" @click="go_down_load">
          <img class="and" src="../../assets/images/icons/and.png" alt="" />
          <img src="../../assets/images/icons/ios.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:['bgColor'],
  data() {
    return {};
  },
  methods:{
    go_down_load(){
      this.$router.push("/download_apps")
    }
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
    height: 276px;
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

</style>