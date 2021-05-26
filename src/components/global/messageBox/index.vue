<template>
  <div class="message" v-if="visible">
    <div class="message-box">
      <div class="close" @click="handleClosePage"></div>
      <div :class="['title' , {'pub': type=='publish'}]">{{title}}</div>


      <div class="tip">
        <template v-if="tips.length>0">
          <!-- 提示内容 -->
          <ul :class="{'center':type=='publish'}">
            <li v-for="(item, index) in tips" :key="index">{{ item }}</li>
          </ul>

          <!-- 发布章节控制 -->
          <div class="publish_time" v-if="type=='publish'">
            <div class="ir_input">
              <div class="pub_tip">Publish Schedule</div>

              <label @click="datePiker=false">
                <input type="radio" checked name="Protagonist Gender" />
                <i></i>
                <span>Now</span>
                <em></em>
              </label>
              <label @click="handleLater">
                <input type="radio" name="Protagonist Gender" />
                <i></i>
                <span v-if="!datePiker">Later</span>
                <em></em>
              </label>

              <!-- :value="publishTime" -->
              <datetime
                v-if="datePiker"
                type="datetime"
                v-model="publishTime"
                format="yyyy-MM-dd HH:mm:ss"
                :phrases="{ok: 'Confirm', cancel: 'Cancel'}"
              ></datetime>
            </div>
          </div>
        </template>

        <template v-else>{{content}}</template>
      </div>


      <div class="btn-box" v-if="hideBtn == false">
        <template v-if="type == 'delete'">
          <div class="confirm" @click="handleConfirm">Delete</div>
          <div class="cancel" @click="handleCancel">Cancel</div>
        </template>

        <template v-else-if="type == 'publish'">
          <div class="confirm" @click="handlePublishNow">Confirm</div>
          <div class="cancel" @click="handleCancel">Cancel</div>
        </template>

        <template v-else-if="type == 'del'">
          <div class="confirm" @click="del">Confirm</div>
          <div class="cancel" @click="notdel">Cancel</div>
        </template>

        <template v-else-if="type == 'autosave'">
          <div class="confirm" @click="del">Still leave</div>
          <div class="cancel" @click="notdel">Cancel</div>
        </template>

        <template v-else-if="type == 'resume'">
          <div class="confirm" @click="del">Resume</div>
          <div class="cancel" @click="notdel">Cancel</div>
        </template>

        <template v-else-if="type == 'alpha'">
          <div class="confirm" @click="del">YES!</div>
          <div class="cancel" @click="notdel">NO, thanks.</div>
        </template>

        <template v-else-if="type == 'alpha_suc'">
          <div class="cancel cancel2" @click="del">Confirm.</div>
        </template>

        <template v-else-if="type == 'alpha_mask'">
          <div class="cancel cancel2" @click="del">{{tiptext}}</div>
        </template>

      </div>
    </div>
  </div>
</template>
<script>
// 日期选择器1
// import Calendar from "vue2-slot-calendar";
//2
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";

const messageBox = {
  data() {
    return {
      visible: false,
      title: "Warning!",
      content: "Are you sure to delete",
      resolve: "",
      reject: "",
      type: "delete", // 默认删除
      tips: [], // 提示列表
      datePiker: false, // 日期选择器
      publishTime: "", // 日期
      minDatetime: "2020-04-25 18:51:01",
      minuteStep: 10,
      hideBtn:false,
      tiptext:'Confirm.',
    };
  },
  mounted() {
  },
  install(Vue) {
    Vue.prototype.$msgBox = config => {
      const MessgeConstructor = Vue.extend(messageBox);
      const instance = new MessgeConstructor({ data: config });

      window.localStorage.setItem(
        "allowTime",
        new Date(config.publishTime).getTime()
      );
      window.localStorage.setItem("allowTime2", config.publishTime);

      instance.vm = instance.$mount();
      document.body.appendChild(instance.vm.$el);
      instance.vm.visible = true;
      return instance.vm
        .isShow()
        .then(val => {
          return Promise.resolve(val);
        })
        .catch(err => {
          return Promise.reject(err);
        });
    };
  },
  methods: {
    isShow() {
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    del() {
      this.resolve(true);
      this.handleClosePage();
    },
    notdel() {
      this.resolve(false);
      this.handleClosePage();
    },
    handleLater() {
      this.datePiker = true;
      this.publishTime = window.localStorage
        .getItem("allowTime2")
        .split(" ")
        .join("T");
    },
    handleConfirm() {
      this.resolve("confirm");
      this.handleClosePage();
    },
    handleCancel() {
      this.reject("cancel");
      this.handleClosePage();
    },
    // 现在发布
    handlePublishNow() {
      let res = {};

      if (this.datePiker) {
        let t = new Date(this.publishTime).getTime();
        let allowt = window.localStorage.getItem("allowTime") - 0;
        if (t >= allowt) {
          res = {
            rightNow: false,
            publishTime: t
          };
          this.resolve(res);
          this.handleClosePage();
        } else {
          // 否则时间不合法不让继续操作
        }
      } else {
        res = { rightNow: true };
        this.resolve(res);
        this.handleClosePage();
      }
    },
    handleClosePage() {
      this.visible = false;
    },
    dayClick(data) {
    }
  },
  destroyed() {
    document.body.removeChild(this.$el);
    this.type = "";
  },
  components: {
    Datetime
  },
  watch: {
    value: function(v2, v1) {
    },
    datePiker: function(v2, v1) {
    },
    publishTime: function(v2, v1) {
      v2 = new Date(v2).getTime();
      let allowtime = window.localStorage.getItem("allowTime") - 0;
      let allowTime2 = window.localStorage.getItem("allowTime2");

      if (v2 > 0 && allowtime) {
        if (allowtime > v2) {
          this.$msg({
            content: "Publish Time Need Later Than " + allowTime2
          });
        }
      }
    }
  }
};
export default messageBox;
// 使用方法
// this.$msgBox({
//                 content: 'Delete this book or not'
//             }).then(val => {
//                 // 删除
//             }).catch(err => {
//                 // 取消删除
//                 console.log('取消删除', err);
//             })
</script>
<style lang='scss' scoped>
.center {
  li {
    margin-top: 10px;
    font-size: 16px;
    color: rgba(58, 74, 90, 0.6);
    line-height: 28px;
    background-color: rgba(238, 55, 153, 0.05);
  }
}

.publish_time,
.publish_time label {
  margin-top: 30px;
  height: 28px;
  font-size: 16px;
  font-weight: bold;
  color: rgba(58, 74, 90, 1);
  line-height: 28px;
  input {
    margin-left: 24px;
  }
}

.message {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  .message-box {
    width: 600px;
    min-height: 300px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.05);
    position: relative;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    box-sizing: border-box;
    padding: 40px;
    border-left: 4px solid #ee3799;
    .close {
      position: absolute;
      width: 16px;
      height: 16px;
      background: url("../../..//assets/images/icons/recharge_close_icon.png")
        no-repeat center center/100% 100%;
      right: 12px;
      top: 12px;
      cursor: pointer;
    }
    .title {
      font-size: 32px;
      font-family: SourceHanSansCN-Bold, SourceHanSansCN;
      font-weight: bold;
      color: rgba(67, 83, 102, 1);
      line-height: 40px;
      // text-align: center;
      margin-bottom: 20px;
    }
    .title.pub {
      font-size: 20px;
      font-weight: bold;
      color: rgba(58, 74, 90, 1);
      line-height: 29px;
      text-align: left;
    }
    .tip {
      font-size: 14px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: rgba(58, 74, 90, 1);
      line-height: 24px;
      margin-top: 10px;
      position: relative;
      li {
        font-size: 14px;
        font-weight: 400;
        color: rgba(58, 74, 90, 1);
        line-height: 22px;
      }
    }
    .publish_time {
      min-height: 40px;
      .datepicker {
        margin-top: 5px;
        float: right;
      }
      .vdatetime {
        display: inline-block;
        margin-top: -3px;
        margin-left: -15px;
        width: 30%;
        height: 22px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857;
        color: #555;
        background-image: none;
        border-radius: 17px;
        input {
          background-color: #ee3799 !important;
          color: #fff;
        }
      }
    }
    .btn-box {
      overflow: hidden;
      margin-top: 46px;
      .cancel {
        width: 40%;
        height: 56px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        border: 1px solid rgba(238, 55, 153, 1);
        font-size: 20px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: rgba(238, 55, 153, 1);
        line-height: 56px;
        text-align: center;
        float: left;
        cursor: pointer;
        box-sizing: border-box;
      }
      .cancel2{
        margin-left: 148px;
      }
      .confirm {
        width: 40%;
        height: 56px;
        text-align: center;
        line-height: 56px;
        background: rgba(238, 55, 153, 1);
        border-radius: 4px;
        color: #fff;
        font-weight: bold;
        font-size: 20px;
        cursor: pointer;
        float: right;
      }
    }
  }
}

.ir_input {
  float: left;
  overflow: hidden;
}
.ir_input label {
  position: relative;
  left: 0;
  top: 0;
  float: left;
  margin: 3px 8px;
  padding: 0 10px 0 4px;
  height: 24px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  cursor: pointer;
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
  margin: 4px 4px 0 0;
  height: 16px;
  width: 16px;
  background-color: #fff;
  border-radius: 16px;
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
  background: url("../../../assets/images/common/select_icon.png") no-repeat
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
.ir_input label em {
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 0;
  background-color: #ee3799;
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

.pub_tip {
  background-color: #fff;
  float: left;
  margin: 0px 0px;
  padding: 0 10px 0 0px;
  height: 24px;
  border-radius: 12px;
}
</style>
