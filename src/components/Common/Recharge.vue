<template>
  <div class="recharge">
    <div class="hide_bar" ref="mask">
      <div class="recharge-box" ref="mask2">
        <div class="close" @click="handleClosePage"></div>
        <div class="tip-title">Get More</div>
        <div class="tip">
          Coin can be used to unclock chapters.
          <!-- <span>Learn More</span> -->
        </div>
        <div class="recharge-title">Payment Method</div>
        <div
          v-for="(item,index) in payList"
          :key="index"
          :class="['recharge-item',{'active': currentIndex == index}]"
          @click="handleChangeIndex(index)"
        >
          <span class="recharge-count">{{item.watchPoint}} Coins</span>
          <span class="recharge-award">+{{item.awardAmount}} Bonus</span>
          <span class="recharge-money">$ {{item.amount}}</span>
        </div>
        <div class="recharge-btn" @click="handleCreateOrder">PAY NOW USD {{currentInfo.amount}}</div>
      </div>
    </div>

    <!-- <form :action="currentInfo.formAction" method="post" accept-charset="UTF-8">
            <input type="hidden" name="charset" value="utf-8">
            <input type="hidden" name="business" :value="currentInfo.business">
            <input type="hidden" name="cmd" :value="currentInfo.cmd">
            <input type="hidden" name="return" :value="url">
            <input type="hidden" name="rm" :value="currentInfo.rm">
            <input type="hidden" name="notify_url" :value="currentInfo.notifyUrl">
            <input type="hidden" name="custom" :value="orderId">
            <input type="hidden" name="item_name" :value="currentInfo.itemName">
            <input type="hidden" name="amount" :value="currentInfo.amount">
            <input type="hidden" name="currency_code" :value="currentInfo.currencyCode">


            <button ref='button' type="submit" style="cursor:pointer;"></button>
    </form>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      payList: [],
      currentIndex: 0,
      currentInfo: {},
      orderId: "",
      url: ""
    };
  },
  mounted() {
    this.getList();
    this.url = window.location.href;
    window.closeRecharge = this.closePageChild;

    let clientHeight =
      document.body.clientHeight || document.documentElement.clientHeight;

    this.$refs.mask.style.height = clientHeight * 0.9 + "px";
    this.$refs.mask2.style.height = clientHeight * 0.9 + "px";
  },
  methods: {
    async getList() {
      let res = await this.$axios.post("/xsdq/pay/list");
      if (res.data.status == 0) {
        this.payList = res.data.data.payPalList;
        this.currentInfo = res.data.data.payPalList[0];
      }
    },
    handleChangeIndex(index) {
      this.currentIndex = index;
      this.currentInfo = this.payList[index];
    },
    async handleCreateOrder() {
      $logClick({
        module: this.$route.name,
        zone: "djcjdd", // 点击创建订单
        adid: "click-create-order"
      });

      let res = await this.$axios.post("/xsdq/pay/create/order", {
        moneyId: this.currentInfo.moneyId,
        channelCode: "GNP",
      });
      if (res.data.status == 0) {

        $logEvent({
          event: "cjddcgfqzftz", //创建订单成功,发起支付跳转
          map: {
            module: res.data.data.orderId // 订单ID
          }
        });

        this.orderId = res.data.data.orderId;
        this.currentInfo.orderId = this.orderId;
        this.$forceUpdate();

        // this.$router.push('/recharge_other?rechargeInfo='+JSON.stringify(this.currentInfo))
        var height = 900;
        var width = 700;
        var iTop = (window.screen.availHeight - 30 - height) / 2;
        var iLeft = (window.screen.availWidth - 10 - width) / 2;
        var innerHeight = window.innerHeight;
        var outHeight = window.outerHeight;
        var clientHeight = outHeight - innerHeight + 20;

        window.open(
          window.location.origin +
            "/recharge_other?rechargeInfo=" +
            JSON.stringify(this.currentInfo),
          "recharge",
          "height=" + height + ",width=" + width + ",left=" + iLeft + ",top=120"
        );
        this.$nextTick().then(() => {
          // 获取到orderId之后再自动点击表单提交
          // this.$refs.button.click()
        });
      }
    },
    handleClosePage() {
      this.$emit("toggleRechargeShow");
    },
    closePageChild() {
      this.$emit("closePageChild");
    }
  }
};
</script>
<style lang='scss' scoped>
.recharge {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  .hide_bar {
    width: 587px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.05);
    position: relative;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    box-sizing: border-box;
    overflow: hidden;
  }
  .recharge-box {
    box-sizing: border-box;
    width: 600px;
    min-height: 600px;
    // max-height: 910px;
    max-height: 764px;
    overflow-y: scroll;
    padding: 30px 40px;
    padding-bottom: 100px;

    .close {
      position: absolute;
      width: 16px;
      height: 16px;
      background: url("../../assets/images/icons/recharge_close_icon.png")
        no-repeat center center/100% 100%;
      right: 12px;
      top: 12px;
      cursor: pointer;
    }
    .tip-title {
      color: rgba(67, 83, 102, 1);
      font-weight: bold;
      font-size: 32px;
    }
    .tip {
      color: rgba(67, 83, 102, 1);
      font-size: 16px;
      line-height: 28px;
      span {
        color: rgba(74, 144, 226, 1);
        background: url("../../assets/images/icons/recharge_more_icon.png")
          no-repeat 80px center/12px 10px;
        padding-right: 30px;
      }
    }
    .recharge-title {
      color: rgba(58, 74, 90, 1);
      font-size: 20px;
      font-weight: bold;
      margin-top: 20px;
      background: url("../../assets/images/icons/paypal_icon.png") no-repeat
        center center/100px 30px;
    }
    .recharge-item {
      width: 100%;
      height: 56px;
      line-height: 56px;
      border-radius: 56px;
      box-sizing: border-box;
      border: 1px solid rgba(0, 0, 0, 0.1);
      padding: 0 32px;
      margin-top: 24px;
      cursor: pointer;
      &.active {
        border: 1px solid rgba(238, 55, 153, 1);
        background: rgba(238, 55, 153, 0.05);
      }
      .recharge-count {
        color: rgba(58, 74, 90, 1);
        font-size: 20px;
        font-weight: bold;
      }
      .recharge-award {
        color: rgba(238, 55, 153, 1);
        font-size: 14px;
        font-weight: bold;
        border-bottom: 2px solid #ee3799;
        position: relative;
        top: -4px;
        margin-left: 8px;
      }
      .recharge-money {
        color: rgba(58, 74, 90, 1);
        font-size: 20px;
        font-weight: bold;
        float: right;
      }
    }
    .recharge-btn {
      width: 450px;
      height: 56px;
      text-align: center;
      line-height: 56px;
      background: rgba(238, 55, 153, 1);
      border-radius: 4px;
      margin: 24px auto 0;
      color: #fff;
      font-weight: bold;
      font-size: 20px;
      cursor: pointer;
      position: absolute;
      left: 50%;
      margin-left: -225px;
      bottom: 24px;
    }
  }
}
</style>
