
<template>
  <div class="recharge">
    <div class="hide_bar">
      <div class="recharge-box">
        <div class="close" @click="handleClosePage"></div>
        <!-- 提示内容 -->
        <div class="tip">
          <h3>GoodNovel Contract Application</h3>
          <p>
            We collect the information you submit in this form for contract use only. We will
            not share your information with third parties. We need your personal information
            to verify the legal validity of our contract. By submitting this form, you certify the
            provided information is real and correct to the best of your knowledge.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * 拉起弹窗初始化请求 用户账户信息接口, 如果有账户信息, 1展示入结构中 2按钮Confirm不可用
 *                                    无账户信息, 收集用户数据, Confirm提交
 * */
import { checkEmail, judgeEmailLength } from "@/core/js/common.js";
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    handleClosePage() {
      this.$emit("closePageAccount");
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
    height: 764px; // max-
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
      font-size: 12px;
      line-height: 20px;
      border: 1px solid rgba(67, 83, 102, 1);
      border-radius: 10px;
      padding: 10px;
      p {
        text-align: justify;
        margin: 6px;
      }
      .red {
        color: red;
      }
    }

    .account_btns {
      width: 100%;
      height: 56px;
      text-align: center;
      position: absolute;
      bottom: 0px;
      left: 0;
      overflow: hidden;
      background-color: #fff;
      padding: 10px 0;
      .btn {
        display: inline-block;
        width: 30%;
        height: 36px;
        text-align: center;
        line-height: 36px;
        background: rgba(238, 55, 153, 1);
        border-radius: 4px;
        margin: 0 30px;
        color: #fff;
        font-weight: bold;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
