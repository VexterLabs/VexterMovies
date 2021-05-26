<template>
  <div class="pwa" @click="handleAdd" v-if="!isAdded">
    <!--ic_closed_pwa.png-->
    <img src="../../assets/images/common/icon_pwa.png" alt="" class="icon" />
    <div class="right">
      <div class="top">
        <i></i>
        <h3>Add to Home Screen</h3>
      </div>
      <div class="botm">
        <span>
          + Add
        </span>
      </div>
    </div>
    <img
      src="../../assets/images/common/ic_closed_pwa.png"
      alt=""
      class="cls"
      @click.self.stop="handleClose"
    />
  </div>
</template>
<script>
export default {
  name: "PWA",
  data() {
    return {
      isAdded: true
    };
  },
  methods: {
    handleAdd(e) {
      $logClick({
        module: this.$route.name,
        zone: "djtjzzp", // 点击添加至主屏幕
        adid: "click_pwa"
      });

      let that = this;
      if (window.deferredPrompt) {
        this.isAdded = true;
        window.deferredPrompt.prompt();
        window.deferredPrompt.userChoice.then(choiceResult => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the A2HS prompt");

            $logEvent({
              event: "tjzzpcg", //添加至主屏幕成功
              map: {
                from:that.$route.name,
                module: "add_pwa_suc"
              }
            });

            window.sessionStorage.setItem('PWAADDED' , 'true');

          } else {
            console.log("User dismissed the A2HS prompt");
            that.isAdded = false;

            $logEvent({
              event: "tjzzpsb", //添加至主屏幕失败, 用户没通过权限
              map: {
                module: "add_pwa_failed"
              }
            });

            window.sessionStorage.removeItem('PWAADDED');
          }
        });
      } else {
        this.isAdded = true;

        $logEvent({
          event: "tjzzpsb", //添加至主屏幕失败, 用户浏览器不支持或已添加过桌面
          map: {
            module: "add_pwa_failed"
          }
        });
      }
    },
    handleClose(){
      this.isAdded = true;
      $logClick({
        module: this.$route.name,
        zone: "djgbtjzzp", // 点击关闭添加至主屏幕
        adid: "click_pwa_close_btn"
      });

    },
  },
  mounted(){
    let count = 0;
    let that = this;
    // 如果已经加入过桌面, 就不再添加
    if(window.sessionStorage.getItem('PWAADDED'))return;
    let itv = window.setInterval(()=>{
      count += 1;

      if(window.deferredPrompt){
          that.isAdded = false;
          window.clearInterval(itv);
      }

      if(count == 100){
          window.clearInterval(itv);
      }

    } , 500)
  }
};
</script>
<style lang="scss" scoped>
.pwa {
  position: fixed;
  cursor: pointer;
  z-index: 999;
  width: 290px;
  height: 122px;
  background: #ffffff;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  left: 40px;
  bottom: 20px;
  box-sizing: border-box;

  img.icon {
    float: left;
    width: 68px;
    height: 68px;

    margin-left: 20px;
    margin-top: 27px;
    margin-right: 12px;
  }

  .right {
    float: left;
    margin-top: 27px;
    .top {
      margin-bottom: 8px;
      i {
        display: inline-block;
        width: 8px;
        height: 8px;
        background: rgba(249, 67, 165, 1);
        vertical-align: middle;
        border-radius: 50%;
      }
      h3 {
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        font-family: Roboto-Bold, Roboto;
        font-weight: bold;
        color: #2b2b2b;
        line-height: 19px;
      }
    }
    .botm {
      width: 162px;
      height: 36px;
      background: #f943a5;
      border-radius: 8px;
      font-size: 16px;
      font-family: Roboto-Medium, Roboto;
      font-weight: 500;
      color: #ffffff;
      line-height: 36px;
      text-align: center;
    }
  }

  .cls {
    position: absolute;
    width: 24px;
    height: 24px;
    top: -12px;
    right: -12px;
    cursor: pointer;
  }
}
</style>
