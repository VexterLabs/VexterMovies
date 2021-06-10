
<template>
  <div class="recharge">
    <div class="hide_bar" ref="mask">
      <div class="recharge-box" ref="mask2">
        <div class="con2">
          <div class="close" @click="handleClosePage"></div>
          <div class="tip-title">Account information</div>

          <!-- 提示内容 -->
          <div class="tip" v-if="this.accountType != 1">
            <p
              class="note_tip"
            >1、The transaction fee shall be borne by the Author, and the specific amount of the transaction fee depends on different payment methods.</p>

            <p class="note_tip">
              2、We strongly recommend that you provide us with your
              Paypal account to receive payment, as this will reduce commissions and increase efficiency. However, if PayPal is not available in your country, please select the other options listed below to receive payment.
            </p>

            <p
              class="note_tip"
            >3、The commission fee charged by PayPal or Payoneer may vary based on the country you are in. For a specific country, please contact Paypal's or Payoneer's website.</p>

            <p
              class="note_tip"
            >4、When you receive payment from GoodNovel, your bank may also charge you a fee. The fee will vary according to your bank policy. For details, please contact the bank.</p>

            <p class="note_tip">5、If you have any questions or queries, please contact your editor.</p>
          </div>

          <div class="tip tip_bank" v-if="this.accountType == 1">
            <p
              class="note_tip"
            >1、The transaction fee shall be borne by the Author, and the specific amount depends on different payment methods.</p>

            <p class="note_tip">
              2、<strong>Paypal is the preferred, cheapest and fastest method with us. </strong>If PayPal is not available in your country, you may select other options.
            </p>

            <p
              class="note_tip"
            >3、The commission fee charged by PayPal or Payoneer may vary based on the country you are in. For a specific country, please contact Paypal's or Payoneer's website.</p>

            <p class="note_tip">
              4、If any income if available to you, the payment will be made on 10th every month.
              <strong>However, please note that it takes 10 work days for the payment to be processed. </strong>If you have any other questions or queries, please contact your editor.
            </p>
          </div>

          <!-- <div class="recharge-title">Payment Method</div> -->

          <!-- 选择账号类型 -->
          <div class="account_choose ir_input">
            <label  :class="{disabledInp:!editable}">
              <input type="radio" name="age" :value="0" v-model="accountType" :disabled="!editable" />
              <i></i>
              <img src="../../assets/images/center/paypal.png" alt="accounttype1" />
              <em></em>
            </label>

            <label  :class="{disabledInp:!editable}">
              <input type="radio" name="age" :value="2" v-model="accountType" :disabled="!editable" />
              <i></i>
              <img src="../../assets/images/center/paypal2.png" alt="accounttype2" />
              <em></em>
            </label>

            <label  :class="{disabledInp:!editable}">
              <input type="radio" name="age" :value="1" v-model="accountType" :disabled="!editable" />
              <i></i>
              <img src="../../assets/images/center/paypal3.png" alt="accounttype3" />
              <em></em>
            </label>
          </div>

          <!-- Bank警告 -->
          <div class="bank_waring" v-if="this.accountType == 1">
            <p>
              <span class="mi">*</span>
              Please note that wire transfer through banks takes up to half of the transaction amount and more work days to process.
            </p>
            <p>
              <span class="mi">*</span>
              There may be extra cost occured for bank transfer, you may require the bank's policy from your bank before you choose this method.
            </p>
          </div>

          <!-- 表单 -->
          <div class="account_detail_container">
            <!-- PayPal -->
            <div class="account_item" v-if="accountType == 0">
              <h4
                :class=" startCheck ? {'error': judgeEmail(PaypalAccount.accountNumber)} :''"
              >* Email address linked to this account</h4>
              <input :disabled="!editable" type="email" v-model="PaypalAccount.accountNumber" />

              <h4
                :class=" startCheck ? {'error': judgeText(PaypalAccount.paymentName)} :''"
              >* Receiver's Name</h4>
              <input :disabled="!editable" type="text" v-model="PaypalAccount.paymentName" />
            </div>

            <!-- Bank -->
            <div class="account_item" v-if="accountType == 1">
              <h4
                :class="startCheck ? {'error':judgeText(BankAccount.bankName)}:''"
              >* Beneficiary Bank:</h4>
              <input :disabled="!editable" type="text" v-model="BankAccount.bankName" />

              <h4
                :class="startCheck ? {'error': judgeText(BankAccount.paymentName)}:''"
              >* Account Name:</h4>
              <input :disabled="!editable" type="text" v-model="BankAccount.paymentName" />

              <h4
                :class="startCheck ? {'error':!judgeNum(BankAccount.accountNumber)}:''"
              >* Account Number:</h4>
              <input :disabled="!editable" type="text" v-model="BankAccount.accountNumber" />

              <h4
                :class="startCheck ? {'error':judgeText(BankAccount.bankAddress)}:''"
              >* Bank Address:</h4>
              <input :disabled="!editable" type="text" v-model="BankAccount.bankAddress" />

              <h4
                :class="startCheck ? {'error':judgeText(BankAccount.swiftRouting)}:''"
              >* Swift code:</h4>
              <input :disabled="!editable" type="text" v-model="BankAccount.swiftRouting" />
            </div>

            <!-- Payoneer -->
            <div class="account_item" v-if="accountType == 2">
              <h4
                :class="startCheck ? {'error': judgeEmail(PayoneerAccount.accountNumber)}:''"
              >* Email address linked to this account</h4>
              <input :disabled="!editable" type="email" v-model="PayoneerAccount.accountNumber" />

              <h4
                :class="startCheck ? {'error': judgeText(PayoneerAccount.paymentName)}:''"
              >* Receiver's Name</h4>
              <input :disabled="!editable" type="text" v-model="PayoneerAccount.paymentName" />
            </div>
          </div>

          <!-- 底部按钮 -->
          <div class="account_btns">
            <div class="btn cancle" @click="handleClosePage">CANCEL</div>
            <div class="btn" v-if="editable" @click="setAccountInfo">CONFIRM</div>
          </div>
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
    return {
      editable: true, // false 控制编辑还是预览
      acountInfo: {}, // 初始化获取到的账户数据
      accountType: 0,
      PaypalAccount: {
        accountNumber: "",
        paymentName: "",
      },
      PayoneerAccount: {
        accountNumber: "",
        paymentName: "",
      },
      BankAccount: {
        accountNumber: "",
        bankAddress: "",
        bankName: "",
        paymentMethod: "",
        paymentName: "",
        swiftRouting: "",
      },
      receivingAccount: {}, // 提交账户的参数对象
      updatable: false, // 是否可以提交或更新账号信息
      startCheck: false, // 开启检测
    };
  },
  mounted() {
    this.url = window.location.href;
    window.closeRecharge = this.handleClosePage;
    let clientHeight =
      document.body.clientHeight || document.documentElement.clientHeight;

    this.$refs.mask.style.height = clientHeight * 0.9 + "px";
    this.$refs.mask2.style.height = clientHeight * 0.9 + "px";

    this.getAccountInfo();
  },
  methods: {
    async getAccountInfo() {
      // !有值处于查看状态, 无值处于可编辑可添加状态
      // ! 有值
      let res = await this.$axios.post("/xsdq/user/receiving/account");

      if (res.data && res.data.status == 0) {
        if (res.data.data.paymentMethod == "PAYPAL") {
          this.accountType = 0;
          this.PaypalAccount = res.data.data;
          this.editable = false;
        } else if (res.data.data.paymentMethod == "BANK") {
          this.accountType = 1;
          this.BankAccount = res.data.data;
          this.editable = false;
        } else if (res.data.data.paymentMethod == "PAYONEER") {
          this.accountType = 2;
          this.PayoneerAccount = res.data.data;
          this.editable = false;
        } else {
          this.editable = true;
          this.accountType = 0;
          this.PaypalAccount = {
            accountNumber: "",
            paymentName: "",
          };
        }
        // console.log(this.accountType);
      } else {
        this.$msg({
          content: "Network Error , Try Again Later!",
        });
      }
    },

    async setAccountInfo() {
      let userId = "";
      try {
        let userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
        userId = userInfo.id;
      } catch (error) {}
      $logClick({
        module: this.$route.name,
        zone: "djtjzhxx", // 点击提交账户信息
        adid: "click-submit-account",
        map: {
          userId: userId,
          chooseTab: this.accountType,
        },
      });

      this.startCheck = true;
      let flag = true;
      // 确定支付账户数据
      if (this.accountType == 0) {
        this.receivingAccount = this.PaypalAccount;
        this.receivingAccount.paymentMethod = "PAYPAL";

        if (
          this.judgeEmail(this.PaypalAccount.accountNumber) ||
          this.judgeText(this.PaypalAccount.paymentName)
        ) {
          this.$msg({
            content: "Missing Item",
          });
          flag = false;
        }
      } else if (this.accountType == 1) {
        this.receivingAccount = this.BankAccount;
        this.receivingAccount.paymentMethod = "BANK";

        if (
          this.judgeText(this.BankAccount.bankName) ||
          this.judgeText(this.BankAccount.paymentName) ||
          this.judgeText(this.BankAccount.accountNumber) ||
          this.judgeText(this.BankAccount.bankAddress) ||
          // this.judgeSwift(this.BankAccount.swiftRouting)
          this.judgeText(this.BankAccount.swiftRouting)
        ) {
          this.$msg({
            content: "Missing Item",
          });
          flag = false;
        }
      } else {
        this.receivingAccount = this.PayoneerAccount;
        this.receivingAccount.paymentMethod = "PAYONEER";
        // console.log(this.receivingAccount);
        if (
          this.judgeEmail(this.PayoneerAccount.accountNumber) ||
          this.judgeText(this.PayoneerAccount.paymentName)
        ) {
          this.$msg({
            content: "Missing Item",
          });
          flag = false;
        }
      }

      if (!flag) {
        $logClick({
          module: this.$route.name,
          zone: "djtjzhxx", // 点击提交账户信息
          adid: "click-submit-account-fail",
          map: {
            userId: userId,
            chooseTab: this.accountType,
            reason: "check not pass",
          },
        });
        return;
      }

      //  检测内容长度
      let receivingAccount = this.receivingAccount;
      if (
        receivingAccount.accountNumber &&
        receivingAccount.accountNumber.length > 250
      ) {
        this.$msg({
          content:
            "please input valid account email or account number! length: less than 250",
        });
        return;
      }
      if (
        receivingAccount.paymentName &&
        receivingAccount.paymentName.length > 250
      ) {
        this.$msg({
          content:
            "please input valid receiver's name or account name! length: less than 250",
        });
        return;
      }
      if (
        receivingAccount.bankAddress &&
        receivingAccount.bankAddress.length > 490
      ) {
        this.$msg({
          content: "please input valid bank address! length: less than 490",
        });
        return;
      }
      if (receivingAccount.bankName && receivingAccount.bankName.length > 250) {
        this.$msg({
          content: "please input valid bank name! length: less than 250",
        });
        return;
      }

      if (
        receivingAccount.swiftRouting &&
        receivingAccount.swiftRouting.length > 250
      ) {
        this.$msg({
          content: "please input valid swift code! length: less than 250",
        });
        return;
      }

      $logClick({
        module: this.$route.name,
        zone: "djtjzhxx", // 点击提交账户信息
        adid: "click-submit-account-request-pre",
        map: {
          userId: userId,
          chooseTab: this.accountType,
          reason: "pre ajax",
        },
      });
      let res = await this.$axios.post("/xsdq/user/receiving/account/update", {
        receivingAccount: this.receivingAccount,
        rid: "",
      });

      if (res.data.status == 0) {
        this.$msg({
          content: "Add Success!",
        });
        this.$emit("closePageAccount");
        $logEvent({
          event: "tjzhcg", //添加账户成功
          map: {
            module: JSON.stringify(this.receivingAccount),
          },
        });
      } else {
        this.$msg({
          content: "Error Status: " + res.data.status,
        });
        $logEvent({
          event: "tjzhsb", //添加账户失败
          map: {
            module: JSON.stringify(this.receivingAccount),
          },
        });
      }
    },

    handleClosePage() {
      $logClick({
        module: this.$route.name,
        zone: "djgbzhtc", // 点击关闭账户弹窗
        adid: "click-close-account-mask",
      });
      this.$emit("closePageAccount");
    },

    // 检测文字内容是否合法
    judgeText(str) {
      if (!str) return true;
      str = str.trim();
      return !str || str.length == 0;
    },

    judgeEmail(str) {
      if (!str) return true;
      str = str.trim();
      return this.judgeText(str) || !checkEmail(str);
    },

    judgeSwift(str) {
      if (!str) return true;
      str = str.trim();
      return (
        this.judgeText(str) ||
        (str.length != 8 && str.length != 11 && str.length != 9)
      );
    },

    judgeNum(str) {
      // console.log(!!Number(str));

      return !!Number(str);
    },

    judgeBranchCode(str) {
      if (!str) return true;
      str = str.trim();
      return this.judgeText(str) || str.length != 4;
    },
  },
};
</script>
<style lang='scss' scoped>
input[disabled] {
  cursor: not-allowed;
}
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
    border-left: 5px solid #ee3799;
  }
  .recharge-box {
    box-sizing: border-box;
    width: 600px;
    // min-height: 600px;
    // max-height: 910px;
    // height: 764px; // max-
    overflow-y: scroll;
    padding: 30px 40px;
    padding-bottom: 100px;
    overflow: auto;

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
      color: #3a4a5a;
      font-size: 14px;
      line-height: 20px;
      padding-top: 16px;
      margin-bottom: 24px;
      p {
        text-align: justify;
        margin-bottom: 6px;
        strong {
          color: #3a4a5a;
          font-size: 14px;
          line-height: 20px;
          font-family: Roboto-Regular, Roboto;
        }
      }
      .red {
        color: red;
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
    .account_choose {
      margin-bottom: 24px;
      color: rgba(67, 83, 102, 1);
      font-size: 16px;
      line-height: 28px;
      position: relative;
      z-index: 9999999;
      background: #fff;
      .lab {
        display: inline-block;
        width: 90%;
        cursor: pointer;
      }
      .disabledInp{
        cursor: not-allowed;
      }
    }

    .bank_waring {
      box-sizing: border-box;
      width: 100%;
      background: rgba(255, 243, 243, 1);
      border-radius: 8px;
      padding: 18px 16px;
      margin-bottom: 30px;
      p {
        position: relative;
        width: 100%;
        font-size: 16px;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: rgba(248, 69, 69, 1);
        line-height: 22px;
        padding-left: 10px;
        margin-bottom: 10px;
        &:nth-child(2) {
          margin-bottom: 0;
        }
        .mi {
          position: absolute;
          top: 0;
          left: 0px;
        }
      }
    }

    .account_detail_container {
      color: rgb(67, 83, 102);
      font-size: 16px;
      line-height: 28px;
      .account_item {
        h4 {
          margin-bottom: 4px;
          &.error {
            color: rgb(227, 26, 26);
          }
        }
        input {
          margin-bottom: 12px;
          margin-top: 0;
          border: none;
          width: 100%;
          height: 30px;
          line-height: 30px;
          padding-left: 6px;
          background: #fff;
          border-bottom: 2px solid rgba(0, 0, 0, 0.1);
        }
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
        font-weight: 400;
        font-family: SourceHanSansSC-Regular, SourceHanSansSC;
        cursor: pointer;
      }
      .cancle {
        border: 1px solid rgb(238, 55, 153);
        background: #fff;
        color: rgb(238, 55, 153);
      }
    }
  }

  input {
    box-sizing: border-box;
    margin-top: 10px;
    padding: 5px;
    width: 50%;
    border: none;
    border-bottom: 1px solid rgba(67, 83, 102, 1);
    &[type="radio"] {
      width: 30px;
      height: 10px;
      margin-top: 20px;
      cursor: pointer;
    }
  }

  .ir_input {
    width: 100% !important;
    overflow: hidden;
  }
  .ir_input {
    .inp_con {
      font-size: 16px;
      font-weight: bold;
      color: rgb(58, 74, 90);
      line-height: 28px;
    }
  }
  .ir_input label {
    box-sizing: border-box;
    position: relative;
    left: 0;
    top: 0;
    float: left;
    margin: 3px 6px;
    padding: 0 10px 0 4px;
    height: 48px;
    background: #fff;
    border: 1px solid rgba(238, 55, 153, 1);
    border-radius: 24px;
    cursor: pointer;
    overflow: hidden;
  }
  .ir_input label input {
    display: none;
  }
  .ir_input label i {
    float: left;
    position: relative;
    left: 0;
    top: 0;
    z-index: 10;
    margin: 6px 4px 0 0;
    height: 32px;
    width: 32px;
    background-color: #fff;
    border-radius: 16px;
    border: 1px solid rgb(238, 55, 153);
  }
  .ir_input label input + i:before {
    content: "";
    width: 16px;
    height: 16px;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 100%;
    margin: -8px;
    background: url("../../assets/images/common/select_icon.png") no-repeat
      center center;
    background-size: 100% 100%;
    visibility: hidden;
    opacity: 0;
    -webkit-transform: scale(0);
    -ms-transform: scale(0);
    transform: scale(0);
    -webkit-transition: 0.2s;
    transition: 0.2s;
  }
  .ir_input label input:checked + i:before {
    visibility: visible;
    opacity: 1;
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }
  .ir_input label span {
    position: relative;
    left: 0;
    top: 0;
    z-index: 10;
    margin-left: 20px;
    display: block;
    height: 24px;
    white-space: nowrap;
    font-size: 14px;
    color: #3a4a5a;
    font-weight: 400;
    line-height: 24px;
  }
  .ir_input label img {
    position: relative;
    z-index: 100;
    top: 8px;
  }
  .ir_input label em {
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 0;
    background-color: rgba(238, 55, 153, 0.1);
    border-radius: 12px;
    -webkit-transition: 0.2s;
    transition: 0.2s;
  }
  .ir_input label input:checked ~ em {
    width: 100%;
  }
  .ir_input label input:checked ~ span {
    color: #ffffff;
  }
}
</style>
