<template>
  <div class="user-edit">
    <div class="title">EDIT PROFILE</div>
    <div class="user-box">
      <div class="left">
        <div class="img">
          <img :src="imageUrl" alt="edit user avatar" />
        </div>
        <div class="tip">Update Avatar</div>
        <label>
          Upload
          <input
            type="file"
            id="my_cover"
            name="avatarFile "
            @change="uploadImg"
            accept=".jpg, .png"
          />
          <br />
        </label>
      </div>
      <div class="right">
        <div class="i_tit">
          <div class="it_tit">
            <span>*</span>
            <strong>Username</strong>
          </div>
          <div class="it_txt">
            <input
              type="text"
              @keyup.self="ckNickname"
              v-model="formMessage.nickname"
              placeholder="The nickname has a limit of 3 - 18 characters"
            />
            <div v-if="showNickNameIllegal" class="nickname-illegal">{{ nicknameIllegal }}</div>
          </div>
        </div>
        <div class="i_tit">
          <div class="it_tit">
            <strong>Pseudonym</strong>
          </div>
          <div class="it_txt">
            <input
              type="text"
              @keyup.self="ckPseudonym"
              v-model="formMessage.pseudonym"
              :disabled="hasPseudonym"
              placeholder="You can only submit Pseudonym ONCE, please be careful."
            />
            <div v-if="showPseudonym" class="nickname-illegal">{{ pseudonymCheck }}</div>
          </div>
        </div>

        <div class="i_radio">
          <div class="gender_container">
            <div class="ir_tit">
              <span>*</span>
              <strong>Gender</strong>
            </div>
            <div class="ir_input">
              <label v-for="(item, index) in males" :key="index" @click="setGenderList(index)">
                <input type="radio" name="Gender" :value="item.id" v-model="formMessage.gender" />
                <i></i>
                <span>{{ item.name }}</span>
                <em></em>
              </label>
            </div>
          </div>
          <div v-if="showGenderIllegal" class="nickname-illegal gender-illegal">{{ genderIllegal }}</div>
        </div>

        <div class="i_tit">
          <div class="it_tit">
            <span>*</span>
            <strong>Email Address</strong>
          </div>
          <div class="it_txt">
            <input
              type="text"
              @keyup.self="ckEmail"
              v-model="formMessage.email"
              placeholder="Enter Email"
            />
            <div v-if="showNickEmailIllegal" class="nickname-illegal">{{ emailIllegal }}</div>
          </div>
        </div>

        <div class="i_tit">
          <div class="it_tit">
            <span>*</span>
            <strong>About You</strong>
          </div>
          <div class="it_textarea">
            <textarea
              name
              @keyup.self="ckAboutU"
              placeholder="Please write a description for your story with 1 to 200 character."
              v-model="formMessage.about"
            ></textarea>
            <span>{{ wordCount }} {{ character }}</span>
            <div v-if="showAboutUIllegal" class="nickname-illegal">{{ aboutUIllegal }}</div>
          </div>
        </div>
      </div>

      <div class="handle">
        <div class="cancel" @click="$router.go(-1)">CANCEL</div>
        <div class="save" @click="beforeSave">SAVE</div>
      </div>
    </div>
  </div>
</template>
<script>
import { checkEmail, checkLength } from "@/core/js/common";

export default {
  data() {
    return {
      formMessage: {
        avatarFile: "",
        nickname: "",
        gender: "",
        email: "",
        about: "",
        id: "",
        pseudonym: "",
        character: "character",
      },
      hasPseudonym: false, // 是否有笔名
      imageUrl: require("../../assets/images/center/user_center_avatar_default.png"),
      males: [
        {
          id: "MALE",
          name: "Male",
        },
        {
          id: "FEMALE",
          name: "Female",
        },
        {
          id: "UNKNOWN",
          name: "Rather not say",
        },
      ],
      nicknameIllegal: "",
      showNickNameIllegal: false,
      emailIllegal: "",
      showNickEmailIllegal: false,
      aboutUIllegal: "",
      showAboutUIllegal: false,
      showPseudonym: false,
      pseudonymCheck: "The pseudonym cannot be longer than 50 characters",
      showGenderIllegal: false,
      genderIllegal: "",
    };
  },
  computed: {
    wordCount() {
      let content = this.formMessage.about;
      if (!content) {
        this.character = "character";
        return 0;
      } else if (content.length > 1) {
        this.character = "characters";
        return content.length;
      } else {
        this.character = "character";
        return content.length;
      }
      // let setCount = new Set(count)
      // return setCount.size;
    },
  },
  mounted() {
    this.pageInit();
  },
  methods: {
    async pageInit() {
      let query = this.$route.query;
      this.imageUrl = query.avatar ? query.avatar : this.imageUrl;
      this.formMessage.nickname = query.nickname ? query.nickname : "";
      this.formMessage.gender = query.gender ? query.gender : "";
      this.formMessage.email = query.email ? query.email : "";
      this.formMessage.about = query.about ? query.about : "";
      this.formMessage.id = query.id ? query.id : "";
      this.formMessage.pseudonym = query.pseudonym ? query.pseudonym : "";
      this.hasPseudonym = query.pseudonym ? true : false;

      this.$store.dispatch("moduleHome/changeLoadingStatus", true);
    },
    setGenderList(index) {
      this.formMessage.gender = this.males[index].id;
    },
    ckPseudonym() {
      if (this.formMessage.pseudonym.trim().length > 50) {
        this.showPseudonym = true;
        return false;
      } else {
        this.showPseudonym = false;
        return true;
      }
    },
    beforeSave() {
      if (
        !this.ckPseudonym() ||
        !this.ckNickname() ||
        !this.ckGender() ||
        !this.ckEmail() ||
        !this.ckAboutU()
      )
        return false;
      this.saveUserSet();
    },
    async saveUserSet() {
      let formData = new FormData();
      if (this.formMessage.avatarFile) {
        formData.append("avatarFile", this.formMessage.avatarFile);
      }
      formData.append("nickname", this.formMessage.nickname);
      formData.append("gender", this.formMessage.gender);
      formData.append("email", this.formMessage.email);
      formData.append("about", this.formMessage.about.trim());
      formData.append("pseudonym", this.formMessage.pseudonym.trim());

      // 更新用户笔名
      let storageInfo = JSON.parse(window.localStorage.getItem("userInfo"));
      if (!storageInfo.pseudonym) {
        storageInfo.pseudonym = this.formMessage.pseudonym.trim();
        window.localStorage.setItem("userInfo", JSON.stringify(storageInfo));
      }

      // formData.append('id', this.formMessage.id)
      let res = await this.$axios.post("/webfic/profile/user/edit", formData);
      if (res.data.status == 0) {
        localStorage.setItem("userInfo", JSON.stringify(res.data.data));
        this.$store.dispatch("moduleHome/changeUserInfo", res.data.data);
        this.$router.go(-1);
        return;
      }
      if (data.data.status != 6) {
        this.$msg({
          content: "Network error please try again later",
        });
      }
    },
    uploadImg(e) {
      let that = this;
      let file = e.target.files[0];

      // that.formMessage.avatarFile  = file
      if (file && !/image\/jpeg|image\/jpg|image\/png/.test(file.type)) {
        that.imageUrl = "";
        console.log("您上传的图片格式不正确");
        return false;
      }
      // 图片大小限制
      if (file && file.size > 200 * 1024) {
        that.imageUrl = "";
        that.$msg({
          content: "File size limit: 200k",
        });
        return false;
      }

      let url = "";
      let reader = new FileReader();
      reader.onload = function (event) {
        let data = event.target.result;
        let oimg = new Image();
        oimg.onload = function () {
          let w = oimg.naturalWidth || oimg.width;
          let h = oimg.naturalHeight || oimg.height;
          // url = data.substring(data.indexOf(',')+1)
          // that.imageUrl = 'data:image/png;base64,' + url
          that.cutImg({
            el: oimg,
            width: w,
            height: h,
          });
        };
        oimg.src = data;
      };
      reader.readAsDataURL(file);
    },
    /**
     * @desc: 裁剪图片
     * @param {object} 图片对象 el: 图片元素  width: 图片width height: 图片高
     * @return: void
     */
    cutImg(imgConfig) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");

      let { el, width, height } = imgConfig;
      let offsetX = 0,
        offsetY = 0;
      if (width > height) {
        offsetX = (width - height) / 2;
        canvas.width = height;
        canvas.height = height;
      } else {
        offsetY = (height - width) / 2;
        canvas.width = width;
        canvas.height = width;
      }

      ctx.drawImage(el, offsetX, offsetY, width, height, 0, 0, width, height);
      let blob = canvas.toDataURL("image/jpeg", 0.7);

      this.imageUrl = blob;
      this.formMessage.avatarFile = this.covertFile(blob);
    },
    /**
     * @desc: base64转file
     * @param {string} dataurl: 图片的base64编码
     * @return: {Blob}
     */
    covertFile(dataurl) {
      let arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    ckNickname() {
      let nickname = this.formMessage.nickname.trim();
      if (!nickname) {
        this.showNickNameIllegal = true;
        this.nicknameIllegal = "nickname can not be empty!";
        return false;
      } else if (!checkLength(nickname, { min: 2, max: 19 })) {
        this.showNickNameIllegal = true;
        this.nicknameIllegal = "length limit to 3 - 18 characters!";
        return false;
      } else {
        this.showNickNameIllegal = false;
        return true;
      }
    },
    ckEmail() {
      let email = this.formMessage.email;
      if (!email) {
        this.showNickEmailIllegal = true;
        this.emailIllegal = "email can not be empty!";
        return false;
      } else if (!checkEmail(email)) {
        this.showNickEmailIllegal = true;
        this.emailIllegal = "please input valid adress!";
        return false;
      } else {
        this.showNickEmailIllegal = false;
        return true;
      }
    },
    ckGender() {
      let gender = this.formMessage.gender;
      if (!gender) {
        this.showGenderIllegal = true;
        this.genderIllegal = "gender can not be empty!";
        return false;
      } else {
        this.showGenderIllegal = false;
        return true;
      }
    },
    ckAboutU() {
      let about = this.formMessage.about.trim();
      if (!about || about.length == 0) {
        this.showAboutUIllegal = true;
        this.aboutUIllegal = "description can not be empty!";
        return false;
      } else if (!checkLength(about, { min: 0, max: 1001 })) {
        //   长度校验解开即可
        this.showAboutUIllegal = true;
        this.aboutUIllegal =
          "ops, content is too long! please input less than 1000 characters";
        return false;
      } else {
        this.showAboutUIllegal = false;
        return true;
      }
    },
  },
  destroyed() {
    this.$store.dispatch("moduleHome/changeLoadingStatus", false);
  },
};
</script>
<style lang="scss" scoped>
.user-edit {
  width: 1080px;
  height: 768px;
  background: #fff;
  margin: 0 auto 80px;
  position: relative;
  top: 40px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding: 40px 60px;
  box-sizing: border-box;
  .title {
    font-weight: bold;
    color: rgba(58, 74, 90, 1);
    font-size: 48px;
  }
  .user-box {
    margin-top: 30px;
    .left {
      float: left;
      width: 192px;
      min-height: 200px;
      .img {
        width: 192px;
        height: 192px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .tip {
        font-weight: bold;
        color: rgba(58, 74, 90, 1);
        font-size: 16px;
        text-align: center;
        margin: 20px 0;
      }
      label {
        position: relative;
        left: 0;
        top: 0;
        display: block;
        padding: 0 20px 0 42px;
        text-align: center;
        height: 32px;
        width: 130px;
        background: url("../../assets/images/book/1.png") no-repeat 26px center;
        font-size: 20px;
        text-transform: uppercase;
        color: #ee3799;
        line-height: 32px;
        cursor: pointer;
        left: 10px;
        input {
          display: none;
        }
      }
    }
    .right {
      float: left;
      width: 510px;
      min-height: 200px;
      margin-left: 90px;
      .i_tit {
        display: block;
        overflow: hidden;
        margin-bottom: 24px;
        .it_tit {
          margin-bottom: 4px;
          overflow: hidden;
          min-width: 28px;
          line-height: 28px;
          span {
            margin-right: 3px;
            overflow: hidden;
            float: left;
            height: 28px;
            color: #f84545;
            font-weight: bold;
            line-height: 32px;
          }
          strong {
            display: block;
            height: 28px;
            font-weight: bold;
            font-size: 16px;
            color: #3a4a5a;
            line-height: 28px;
          }
        }
        .it_txt {
          input {
            display: block;
            height: 44px;
            width: 470px;
            font-size: 16px;
            font-weight: 400;
            color: #3a4a5a;
            border-bottom: 2px solid rgba(0, 0, 0, 0.1);
          }
        }
        .it_textarea {
          overflow: hidden;
          display: block;
          width: 510px;
          textarea {
            display: block;
            padding: 4px 12px;
            width: 100%;
            height: 94px;
            background-color: rgba(0, 0, 0, 0.05);
            outline: none;
            font-size: 16px;
            color: #3a4a5a;
            box-sizing: border-box;
            resize: none;
          }
          span {
            display: block;
            height: 20px;
            font-size: 12px;
            color: rgba(58, 74, 90, 1);
            text-align: right;
            line-height: 20px;
            opacity: 0.3;
          }
        }
      }
    }
    .handle {
      width: 450px;
      margin: 60px auto;
      .cancel {
        color: rgba(238, 55, 153, 1);
        font-size: 20px;
        margin-right: 60px;
        display: inline-block;
        cursor: pointer;
      }
      .save {
        width: 300px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        background: rgba(238, 55, 153, 1);
        border-radius: 4px;
        font-weight: bold;
        font-size: 20px;
        color: #fff;
        display: inline-block;
        cursor: pointer;
      }
    }
  }
}
.i_radio {
  overflow: hidden;
  margin-bottom: 24px;
}
.ir_tit {
  float: left;
  height: 30px;
  margin-right: 22px;
}
.ir_tit span {
  margin-right: 3px;
  overflow: hidden;
  float: left;
  height: 30px;
  color: #f84545;
  font-weight: bold;
  line-height: 34px;
}
.ir_tit strong {
  float: left;
  display: block;
  height: 30px;
  font-weight: bold;
  font-size: 16px;
  color: #3a4a5a;
  white-space: nowrap;
  line-height: 30px;
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
  background: url("../../assets/images/common/select_icon.png") no-repeat center
    center;
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

.nickname-illegal {
  color: #f84545;
}
.gender_container {
  overflow: hidden;
}
</style>
