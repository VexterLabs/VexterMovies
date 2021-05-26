
<template>
  <div class="recharge">
    <div class="hide_bar" ref="mask">
      <div class="recharge-box" ref="mask2">
        <div class="close" @click="handleClosePage"></div>

        <!-- 切图图层 -->
        <div class="cropper_container" v-show="cutAvatar">
          <!-- 裁切组件 -->
          <vue-cropper
            class="cropper"
            ref="cropper"
            :img="option.img"
            :output-size="option.size"
            :output-type="option.outputType"
            :info="true"
            :full="option.full"
            :fixed="fixed"
            :fixed-number="fixedNumber"
            :can-move="option.canMove"
            :can-move-box="option.canMoveBox"
            :fixed-box="option.fixedBox"
            :original="option.original"
            :auto-crop="option.autoCrop"
            :auto-crop-width="option.autoCropWidth"
            :auto-crop-height="option.autoCropHeight"
            :center-box="option.centerBox"
            :high="option.high"
            @img-load="imgLoad"
            mode="cover"
            :enlarge="option.enlarge"
            :maxImgSize="option.max"
          ></vue-cropper>

          <div class="ctr_cropper">
            <!-- 上传图片 -->
            <label class="upload_btn" for="uploads">Change</label>
            <input
              type="file"
              id="uploads"
              style="position:absolute; clip:rect(0 0 0 0);"
              accept="image/png, image/jpeg, image/gif, image/jpg"
              @change="uploadImg2($event, 1)"
            />

            <!-- 底图缩放 -->
            <button @click="changeScale(1)" class="upload_btn ctr_cropper_bg_btn">+</button>
            <button @click="changeScale(-1)" class="upload_btn ctr_cropper_bg_btn">-</button>

            <!-- 下载图片 -->
            <button @click="down('blob')" class="upload_btn" style="height:34px;">Ok</button>

            <!-- 关闭弹层 -->
            <button @click.self="cutAvatar = false" class="upload_btn ctr_cropper_bg_btn">Cancel</button>
          </div>
        </div>

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

        <!-- Personal Info -->
        <div class="info" v-show="showPerson">
          <h2 class="title">Personal Info</h2>

          <!-- 邮箱 -->
          <div
            :class="['item_container' , allowTest? {'error':persenInfo.email.length== 0 || !checkEmail(persenInfo.email) } :'']"
          >
            <label for="email">Email address *</label>
            <br />
            <input
              type="text"
              id="email"
              placeholder="Your Email address"
              v-model="persenInfo.email"
            />
            <div
              class="errinfo"
              v-if="allowTest? (persenInfo.email.length == 0 || !checkEmail(persenInfo.email)) : false"
            >
              <i class="tip_contain"></i>
              <span v-if="persenInfo.email.length == 0">Required</span>
              <span v-if="!checkEmail(persenInfo.email) && persenInfo.email.length != 0">Illigle</span>
            </div>
          </div>

          <!-- 真名 -->
          <div
            :class="['item_container' ,allowTest?  {'error':persenInfo.name.trim().length== 0} :'']"
          >
            <label for="name">Real Name *</label>
            <br />
            <input type="text" id="name" placeholder="Your Real Name" v-model="persenInfo.name" />
            <div class="errinfo" v-if="allowTest? (persenInfo.name.trim().length == 0):false ">
              <i class="tip_contain"></i>
              <span>Required</span>
            </div>
          </div>

          <!-- 笔名 -->
          <div :class="['item_container' , allowTest? {'error':persenInfo.pseudonym.trim().length== 0}:'']">
            <label for="pseudonym">Pseudonym *</label>
            <br />
            <input
              type="text"
              :disabled="pseudonymDisabled"
              id="pseudonym"
              placeholder="Your Pseudonym"
              v-model="persenInfo.pseudonym"
            />
            <div class="errinfo" v-if="allowTest? (persenInfo.pseudonym.trim().length == 0):false">
              <i class="tip_contain"></i>
              <span>Required!</span>
              <br />
              <p class="pseudonym_rule">
                <i class="tip_contain"></i>You can only submit Pseudonym ONCE, please be careful.
              </p>
            </div>
          </div>

          <!-- facebookName -->
          <div class="item_container">
            <label for="faceBookName">Facebook username</label>
            <br />
            <input
              type="text"
              id="faceBookName"
              placeholder="Your Facebook username"
              v-model="persenInfo.faceBookName"
            />
          </div>

          <!-- IDcard -->
          <div :class="['item_container' , allowTest? {'error':persenInfo.idCard.length== 0}:'']">
            <label for="idCard">ID card *</label>
            <br />
            <div class="img_contain">
              <img :src="idCardUrl" v-show="idCardUrl.length>0" alt="id card" title="GoodNovel" />
            </div>
            <span @click="cutAvatar = true" class="add_cover">+ Upload</span>
          </div>

          <!-- Country -->

          <div
            :class="['item_container' ,allowTest?  {'error':!persenInfo.country || !persenInfo.permanent|| !persenInfo.city|| !persenInfo.state|| !persenInfo.postal} :'']"
          >
            <label
              for="country"
              :class="allowTest? {error:!persenInfo.country} : ''"
            >Country of Residence *</label>
            <br />
            <select class="w100" name="country" id="country" v-model="persenInfo.country">
              <option
                v-for="(item , index) in CountryData"
                :key="index"
                :value="item.en"
              >{{item.en}}</option>
            </select>
            <br />

            <label
              for="permanent"
              :class="allowTest?{error:!persenInfo.permanent}:''"
            >Permanent address *</label>
            <br />
            <input class="w100" type="text" id="permanent" v-model="persenInfo.permanent" />

            <div class="clr">
              <label class="w50" for="City">
                <span :class="allowTest?{error:!persenInfo.city}:''">City *</span>
                <br />
                <input type="text" id="City" v-model="persenInfo.city" />
              </label>

              <label class="w50" for="State">
                <span :class="allowTest?{error:!persenInfo.state}:''">State *</span>
                <br />
                <input type="text" id="State" v-model="persenInfo.state" />
              </label>

              <label class="w50" for="Postal">
                <span :class="allowTest?{error:!persenInfo.postal}:''">Postal or zip code *</span>
                <br />
                <input type="text" id="Postal" v-model="persenInfo.postal" />
              </label>
            </div>
          </div>

          <!-- Age -->
          <div class="item_container">
            <label for="age">Age *</label>
            <br />
            <input type="radio" name="age" id="age" value="1" v-model="persenInfo.age" />I am above 18 years of age
            <br />
            <input type="radio" name="age" id="age" value="0" v-model="persenInfo.age" />I am under 18 years of age
          </div>

          <!-- 下一步按钮 -->
          <a class="sign_btn next" href="javascript:;" @click="handleNext">NEXT</a>
        </div>

        <!-- BookInfo -->
        <div class="info" v-show="showBook">
          <h2 class="title">Book Info</h2>

          <!-- book title -->
          <div class="item_container">
            <label for="bookTitle">Book Title *</label>
            <br />
            <input type="text" name="bookTitle" disabled id="bookTitle" :value="bookInfo.bookName" />
          </div>

          <!-- book Contract -->
          <div class="item_container">
            <label for="contract">Intended Contract *</label>
            <br />
            <input type="radio" name="contract" v-model="signBookInfo.contract" value="0" />Exclusive Contract
            <br />
            <input type="radio" name="contract" v-model="signBookInfo.contract" value="1" />Non-Exclusive Contract
          </div>

          <!-- Synopsis * -->
          <div class="item_container">
            <label for="synopsis">Synopsis *</label>
            <br />
            <textarea
              class="synopsis"
              type="text"
              name="synopsis"
              disabled
              id="synopsis"
              :value="bookInfo.introduction"
            />
          </div>

          <!-- Outline -->
          <div :class="['item_container' , {error:outlineWords >= 80000}]">
            <label for="outline">Outline</label>
            <br />
            <textarea
              class="outline"
              name="outline"
              id="outline"
              v-model="signBookInfo.outline"
              placeholder="An outline helps our editors to evaluate how successful this story will be."
            />
            <span style="float:right;">{{ wordCount(signBookInfo.outline)+'/80000' }}</span>
          </div>

          <!-- link -->
          <div class="item_container">
            <label
              for="link"
            >Is this book on other writing platforms? If it is, please provide the link.</label>
            <br />
            <input
              type="text"
              name="bookLink"
              id="link"
              :value="signBookInfo.link"
              placeholder="your answer"
            />
          </div>

          <!--  Planned Length *-->
          <div class="item_container">
            <label for="booklength">Planned Length *</label>
            <br />
            <input type="radio" name="booklength" v-model="signBookInfo.planLength" value="0" />&nbsp;&lt;50k
            <br />
            <input type="radio" name="booklength" v-model="signBookInfo.planLength" value="1" />&nbsp;50k-100k
            <br />
            <input type="radio" name="booklength" v-model="signBookInfo.planLength" value="2" />&nbsp;100k-200k
            <br />
            <input type="radio" name="booklength" v-model="signBookInfo.planLength" value="3" />&nbsp;200k-500k
            <br />
            <input type="radio" name="booklength" v-model="signBookInfo.planLength" value="4" />&nbsp;&gt;500k
          </div>

          <!-- Avg. Chapter Words * -->
          <div class="item_container">
            <label for="AvgChaperWords">Avg. Chapter Words *</label>
            <br />
            <input
              type="radio"
              name="AvgChaperWords"
              v-model="signBookInfo.AvgChaperWords"
              value="0"
            />&nbsp;500-1,499 words
            <br />
            <input
              type="radio"
              name="AvgChaperWords"
              v-model="signBookInfo.AvgChaperWords"
              value="1"
            />&nbsp;1,500-2.999 words
            <br />
            <input
              type="radio"
              name="AvgChaperWords"
              v-model="signBookInfo.AvgChaperWords"
              value="2"
            />&nbsp;3k-5k words
            <br />
            <input
              type="radio"
              name="AvgChaperWords"
              v-model="signBookInfo.AvgChaperWords"
              value="3"
            />&nbsp;&gt;5k words
          </div>

          <!-- Update Rate *-->
          <div class="item_container">
            <label for="UpdateRate">Update Rate *</label>
            <br />
            <input type="radio" name="UpdateRate" v-model="signBookInfo.UpdateRate" value="0" />&nbsp;&lt;3 chaps/week
            <br />
            <input type="radio" name="UpdateRate" v-model="signBookInfo.UpdateRate" value="1" />&nbsp;3-7 chaps/week
            <br />
            <input type="radio" name="UpdateRate" v-model="signBookInfo.UpdateRate" value="2" />&nbsp;8-14 chaps/week
            <br />
            <input type="radio" name="UpdateRate" v-model="signBookInfo.UpdateRate" value="3" />&nbsp;15-21 chaps/week
            <br />
            <input type="radio" name="UpdateRate" v-model="signBookInfo.UpdateRate" value="4" />&nbsp;&gt;21 chaps/week
          </div>

          <div class="btns_container">
            <a class="sign_btn bookinfo" href="javascript:;" @click="handlePrev">Back</a>
            <a class="sign_btn bookinfo" href="javascript:;" @click="handleSubmit">Submit</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CountryData from "@/assets/country/country.json";
export default {
  props: ["bookInfo", "pseudonym"],
  data() {
    return {
      showPerson: true, // 展示人信息
      showBook: false, // 展示书籍信息
      allowTest: false, // 开启检测
      persenInfo: {
        email: "",
        name: "",
        pseudonym: "",
        faceBookName: "",
        idCard: "",
        country: "",
        permanent: "",
        city: "",
        postal: "",
        age: 1 // 0 , 1
      },
      signBookInfo: {
        contract: 0, // 0 签约, 1未签约
        outline: "", // 大纲
        link: "", // 链接
        planLength: 0, // 计划长度 0 1 2 3 4
        AvgChaperWords: 0, //
        UpdateRate: 0
      },
      CountryData: [],
      idCardUrl: "", // 预览
      pseudonymDisabled: false, // 笔名禁止
      // 图片裁切配置项------------START
      cutAvatar: false, // 切头像控制
      option: {
        img: require("@/assets/images/common/default_book_bg.png"),
        size: 1,
        full: false,
        outputType: "png",
        canMove: true,
        fixedBox: false,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 480,
        centerBox: true,
        high: true,
        enlarge: 1,
        max: 9999
      },
      show: true,
      fixed: true,
      fixedNumber: [5, 3],
      model: false,
      modelSrc: "",
      crap: false,
      previews: {},
      // 图片裁切-----END
      outlineWords: 0
    };
  },
  created() {
    // console.log(this.bookInfo);
    this.CountryData = CountryData;
    this.pseudonymDisabled = !!this.pseudonym;
    this.persenInfo.pseudonym = this.pseudonym;
  },
  mounted() {

    let clientHeight =
      document.body.clientHeight || document.documentElement.clientHeight;

    this.$refs.mask.style.height = (clientHeight * 0.9) +"px";
    this.$refs.mask2.style.height = (clientHeight * 0.9) +"px";
  },
  watch: {
    outlineWords(v2, v1) {
      if (v2 > 80000) {
        this.$msg({
          content: "Words submitted has a maximum length of 80,000."
        });
      }
    }
  },
  methods: {
    // 求字数
    wordCount(content) {
      if (!content) {
        this.outlineWords = 0;
        return 0;
      }
      if (typeof content != "string") {
        content = new String(content);
      }
      content = content.replace(/[^a-zA-Z\s+]/g, "");

      let count = content.split(/\s+/g);
      count = count.filter(item => {
        return item;
      });
      this.outlineWords = count.length == 0 ? 0 : count.length;
      return this.outlineWords;
    },

    // !vue-cropper 裁图图片加载回调函数----------------- START
    imgLoad(msg) {},

    // !删除图片
    delCard(index) {
      this.idCardUrl.splice(index, 1);
      this.persenInfo.idCard.splice(index, 1);
      this.$forceUpdate();
    },

    // !uploadImg2  新的图片裁切上传书封
    uploadImg2(e, num) {
      //上传图片
      var file = e.target.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        this.$msg({
          content: "Please Choose Image"
        });
        return false;
      }
      var reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          this.option.img = data;
        } else if (num === 2) {
          this.example2.img = data;
        }
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },

    // !修改缩放
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },

    // !下载图片
    down(type) {
      let that = this;
      let cp = this.$refs.cropper;
      cp.getCropBlob(data => {
        let blob = data;
        // if (data.size >= 200000) {
        //   that.$msg({
        //     content: "File size limit: 200k"
        //   });
        // } else {
        cp.getCropData(data => {
          that.persenInfo.idCard = blob;
          this.idCardUrl = data;
          this.cutAvatar = false;
        });
        // }
      });
    },

    // !-------------------------------------------------- END

    // !下一步
    handleNext() {
      this.allowTest = true; // 开启检测

      // TODO:流程测试代码
      // this.showPerson = false;
      // this.showBook = true;
      // return;

      // 检测用户数据
      this.persenInfo.pseudonym = this.pseudonym;
      let info = this.persenInfo;
      if (
        !info.email ||
        !this.checkEmail(info.email) ||
        !info.name ||
        !info.pseudonym ||
        !info.idCard ||
        !info.country ||
        !info.permanent ||
        !info.city ||
        !info.postal
      ) {
        this.$msg({
          content: "Missing Items"
        });
        return;
      } else {
        this.showPerson = false;
        this.showBook = true;
      }
    },

    // !上一步
    handlePrev() {
      this.showPerson = true;
      this.showBook = false;
    },
    // !提交
    handleSubmit() {
      // console.log("Submit");
      // console.log(this.persenInfo, this.bookInfo, this.signBookInfo);
    },
    handleClosePage() {
      this.$emit("closePageAccount");
    },
    checkEmail(value) {
      const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,16})$/g;
      if (reg.test(value)) {
        return this.judgeEmailLength(value) ? false : true;
      } else {
        return false;
      }
    },
    judgeEmailLength(str) {
      let index = str.indexOf("@");
      return index > 120;
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

    .info {
      margin-top: 50px;
      h2 {
        width: 50%;
        margin: 0;
        padding: 10px;
        color: #fff;
        background: rgba(67, 83, 102, 1);
      }

      .item_container {
        box-sizing: border-box;
        width: 100%;
        border: 1px solid rgba(67, 83, 102, 1);
        border-radius: 10px;
        padding: 20px 10px;
        margin-bottom: 20px;
        &.error {
          border: 1px solid red;
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

        textarea.synopsis,
        textarea.outline {
          margin-top: 20px;
          width: 100%;
          resize: none;
          height: 100px;
          overflow: auto;
        }
        textarea.outline {
          border: 1px solid rgba(67, 83, 102, 0.3);
          height: 200px;
        }

        .errinfo {
          margin-top: 10px;
          color: red;
          overflow: hidden;
          .tip_contain {
            float: left;
            width: 16px;
            height: 16px;
            background: url("../../assets/images/common/info_err.png") no-repeat
              center center;
            background-size: 16px 16px;
            font-style: normal;
            font-size: 0;
            margin-right: 4px;
          }
          .pseudonym_rule {
            margin-top: 10px;
          }
          span {
            float: left;
          }
        }
        .img_contain {
          width: 80%;
          margin: 0 auto;
          text-align: center;
          margin: 10px 0;
          background: #f1f1f1;
          img {
            margin: 10px;
            width: 60%;
          }
        }
        .add_cover {
          display: inline-block;
          width: 70px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border: 1px solid rgba(67, 83, 102, 1);
          border-radius: 3px;
        }
        .w100 {
          width: 95%;
          margin-bottom: 20px;
        }
        select.w100 {
          height: 30px;
          border: 1px solid rgba(67, 83, 102, 1);
          border-radius: 4px;
        }
        .clr {
          overflow: hidden;
          .w50 {
            float: left;
            width: 50%;
            margin-bottom: 20px;
            input {
              width: 90%;
            }
          }
        }
        label.error {
          color: red;
        }
        span.error {
          color: red;
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
        cursor: pointer;
      }
    }

    .sign_btn {
      display: inline-block;
      color: rgba(67, 83, 102, 1);
      border: 1px solid rgba(67, 83, 102, 1);
      border-radius: 4px;
      display: inline-block;
      text-decoration: none;
      width: 180px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      font-weight: bold;
      font-size: 20px;
      &.next {
        display: block;
        margin: 0 auto;
        margin-top: 60px;
      }
    }
    .btns_container {
      text-align: center;
      .sign_btn {
        display: inline-block;
      }
    }
  }
}
.cropper_container {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 99999;
  background-color: rgba(255, 255, 255, 0.8);
  padding-top: 30px;
  .cropper {
    width: 500px;
    height: 320px;
    margin: 100px auto;
    margin-bottom: 20px;
    border-radius: 12px;
    border: 4px solid rgb(238, 55, 153);
    overflow: hidden;
    .cropper-modal {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .ctr_cropper {
    text-align: center;
    margin: 0 auto;
    width: 334px;
    padding-top: 6px;
    overflow: hidden;
    .upload_btn {
      display: inline-block;
      float: left;
      width: 66px;
      color: rgb(255, 255, 255);
      font-weight: bold;
      background-color: rgb(238, 55, 153);
      height: 30px;
      line-height: 30px;
      border: 2px solid #fff;
      border-radius: 10px;
      // margin-right: 6px;
    }
    .ctr_cropper_bg_btn {
      height: auto;
      font-weight: bold;
    }
  }
}
</style>
