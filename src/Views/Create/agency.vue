
<template>
  <div class="recharge">
    <div class="hide_bar">
      <div class="recharge-box">
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
            <label class="upload_btn" for="uploads">Upload</label>
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
            :class="['item_container fl' , allowTest? {'error':checkErr(persenInfo.email) || !checkEmail(persenInfo.email) } :'']"
          >
            <label for="email">
              <span class="required_span">*&nbsp;</span>Email address
            </label>
            <br />
            <input
              type="text"
              id="email"
              placeholder="Your Email address"
              v-model="persenInfo.email"
            />
            <div
              class="errinfo"
              v-if="allowTest? (checkErr(persenInfo.email) || !checkEmail(persenInfo.email)) : false"
            >
              <i class="tip_contain"></i>
              <span v-if="checkErr(persenInfo.email)">Required</span>
              <span
                v-if="!checkEmail(persenInfo.email) && !checkErr(persenInfo.email)"
              >Please input valid email!</span>
            </div>
          </div>

          <!-- 真名 -->
          <div
            :class="['item_container fl' ,allowTest?  {'error':checkErr(persenInfo.realName)} :'']"
          >
            <label for="name">
              <span class="required_span">*&nbsp;</span>Real Name
            </label>
            <br />
            <input type="text" id="name" placeholder="Your Real Name" v-model="persenInfo.realName" />
            <div class="errinfo" v-if="allowTest? checkErr(persenInfo.realName):false">
              <i class="tip_contain"></i>
              <span>Required</span>
            </div>
          </div>

          <!-- 笔名 -->
          <div
            :class="['item_container fl ' , allowTest? {'error':checkErr(persenInfo.pseudonym)}:'']"
          >
            <label for="pseudonym">
              <span class="required_span">*&nbsp;</span>Pseudonym
            </label>
            <br />
            <input
              type="text"
              :disabled="pseudonymDisabled"
              id="pseudonym"
              placeholder="Careful! You can only submit Pseudonym ONCE!"
              v-model="persenInfo.pseudonym"
            />
            <div class="errinfo" v-if=" allowTest? checkErr(persenInfo.pseudonym):false ">
              <i class="tip_contain"></i>
              <span>Required!</span>
            </div>
          </div>

          <!-- facebookName -->
          <div class="item_container fl">
            <label for="faceBookName">Facebook Homepage</label>
            <br />
            <input
              type="text"
              id="faceBookName"
              placeholder="Please put here your Facebook homepage link (the URL in your address line)"
              v-model="persenInfo.facebookUserName"
            />
          </div>

          <!-- IDcard -->
          <div :class="['item_container fl cc' , allowTest? {'error':checkErr(idCardUrl)}:'']">
            <!-- JSON.stringify(persenInfo.idCardFile) -->
            <label for="idCard">
              <span class="required_span">*&nbsp;</span>ID card
            </label>
            <br />
            <div class="img_contain">
              <img :src="idCardUrl" alt="id card" title="GoodNovel" />
            </div>
            <span @click="cutAvatar = true" class="add_cover">UPLOAD</span>
          </div>

          <!-- Country -->

          <div
            :class="['item_container fl cc' ,allowTest?  {'error':checkErr(persenInfo.country) || checkErr(persenInfo.permanentAddress)|| checkErr(persenInfo.city)|| checkErr(persenInfo.state)|| checkErr(persenInfo.zipCode)} :'']"
          >
            <label for="country">
              <!-- :class="allowTest? {error:checkErr(persenInfo.country)} : ''" -->
              <span class="required_span">*&nbsp;</span>Country of Residence
            </label>
            <br />
            <select class="w100" name="country" id="country" v-model="persenInfo.country">
              <option
                v-for="(item , index) in CountryData"
                :key="index"
                :value="item.en"
              >{{item.en}}</option>
            </select>
            <br />

            <label for="permanent">
              <span class="required_span">*&nbsp;</span>Permanent address
            </label>
            <br />
            <input class="w100" type="text" id="permanent" v-model="persenInfo.permanentAddress" />

            <div class="clr">
              <label class="w50" for="City">
                <span>
                  <span class="required_span">*&nbsp;</span>City
                </span>
                <br />
                <input type="text" id="City" v-model="persenInfo.city" />
              </label>

              <label class="w50" for="State">
                <span>
                  <span class="required_span">*&nbsp;</span>State
                </span>
                <br />
                <input type="text" id="State" v-model="persenInfo.state" />
              </label>

              <label class="w50" for="Postal">
                <span>
                  <span class="required_span">*&nbsp;</span>Postal or zip code
                </span>
                <br />
                <input type="text" id="Postal" v-model="persenInfo.zipCode" />
              </label>
            </div>
          </div>

          <!-- Age -->
          <div class="item_container fl ir_input">
            <div class="inp_con">
              <b class="required_span">*&nbsp;</b>Age
            </div>
            <br />
            <label>
              <input type="radio" name="age" :value="2" v-model="persenInfo.ageState" />
              <i></i>
              <span>I am above 18 years of age</span>
              <em></em>
            </label>
            <label>
              <input type="radio" name="age" :value="1" v-model="persenInfo.ageState" />
              <i></i>
              <span>I am under 18 years of age</span>
              <em></em>
            </label>
          </div>

          <!-- 下一步按钮 -->
          <div class="item_container fl ir_input">
            <a class="sign_btn next" href="javascript:;" @click="handleNext">
              <div>NEXT</div>
            </a>
          </div>
        </div>

        <!-- BookInfo -->
        <div class="info" v-show="showBook">
          <h2 class="title">Book Info</h2>

          <!-- book title -->
          <div class="item_container cc fl">
            <label for="bookTitle">
              <span class="required_span">*&nbsp;</span>Book Title
            </label>
            <br />
            <input type="text" name="bookTitle" disabled id="bookTitle" :value="bookInfo.bookName" />
          </div>

          <!-- book Contract -->
          <div class="item_container fl ir_input">
            <div class="inp_con">
              <b class="required_span">*&nbsp;</b>Intended Contract
            </div>
            <br />
            <label>
              <input
                type="radio"
                name="contract"
                :value="0"
                v-model="initIntendedContract"
              />
              <i></i>
              <span>Exclusive Contract</span>
              <em></em>
            </label>
            <label>
              <input
                type="radio"
                name="contract"
                :value="1"
                v-model="initIntendedContract"
              />
              <i></i>
              <span>Non-Exclusive Contract</span>
              <em></em>
            </label>
          </div>

          <!-- Synopsis * -->
          <div class="item_container fl cc">
            <label for="synopsis">
              <span class="required_span">*&nbsp;</span>Synopsis
            </label>
            <br />
            <textarea
              class="synopsis"
              type="text"
              name="synopsis"
              disabled
              id="synopsis"
              :value="bookInfo.introduction||''"
            />
          </div>

          <!-- Outline -->
          <div :class="['item_container fl cc' , {error:outlineWords > 80000}]">
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
          <div class="item_container fl cc">
            <label
              for="link"
            >Is this book on other writing platforms? If it is, please provide the link.</label>
            <br />
            <input
              type="text"
              name="bookLink"
              id="link"
              v-model="signBookInfo.otherPlatformLink"
              placeholder="Https://"
            />
          </div>

          <!--  Planned Length *-->
          <div class="item_container fl cc2">
            <label for="booklength">
              <span class="required_span">*&nbsp;</span>Planned Length
            </label>
            <select
              class="w100"
              name="country"
              id="country"
              v-model="signBookInfo.plannedLength"
              place="Select your Planned Length"
            >
              <option value="0">&lt;50k</option>
              <option value="1">50k-100k</option>
              <option value="2">100k-200k</option>
              <option value="3">200k-500k</option>
              <option value="4">&gt;500k</option>
            </select>
          </div>

          <!-- Avg. Chapter Words * -->
          <div class="item_container fl cc2">
            <label for="AvgChaperWords">
              <span class="required_span">*&nbsp;</span>Avg. Chapter Words
            </label>
            <select
              class="w100"
              name="AvgChaperWords"
              id="AvgChaperWords"
              v-model="signBookInfo.avgChapterWords"
              place="shelect Chapter Words"
            >
              <option value="0">&nbsp;500-1,499 words</option>
              <option value="1">1,500-2.999 words</option>
              <option value="2">3k-5k words</option>
              <option value="3">&gt;5k words</option>
            </select>
          </div>

          <!-- Update Rate *-->
          <div class="item_container fl cc2">
            <label for="UpdateRate">
              <span class="required_span">*&nbsp;</span>Update Rate
            </label>
            <select
              class="w100"
              name="UpdateRate"
              id="UpdateRate"
              v-model="signBookInfo.updateRate"
              place="shelect Chapter Words"
            >
              <option value="0">&nbsp;&nbsp;&lt;&nbsp;3&nbsp;&nbsp;chaps/week</option>
              <option value="1">3&nbsp;-&nbsp;7&nbsp;&nbsp;chaps/week</option>
              <option value="2">8-14&nbsp;&nbsp;chaps/week</option>
              <option value="3">15-21 chaps/week</option>
              <option value="4">&nbsp;&nbsp;&gt;&nbsp;21&nbsp;&nbsp;chaps/week</option>
            </select>
          </div>

          <div class="btns_container">
            <a class="sign_btn btn_back bookinfo" href="javascript:;" @click="handlePrev">
              <div>Back</div>
            </a>

            <a class="sign_btn next bookinfo" href="javascript:;" @click="handleSubmit">
              <div>Submit</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CountryData from "@/assets/country/country.json";
export default {
  data() {
    return {
      bookInfo: {},
      showPerson: true, // 展示人信息
      showBook: false, // 展示书籍信息
      allowTest: false, // 开启检测
      persenInfo: {
        email: "",
        realName: "",
        pseudonym: "",
        facebookUserName: "",
        idCardFile: {},
        country: "",
        permanentAddress: "",
        city: "",
        state: "",
        zipCode: "",
        ageState: 2, // 2 , 1
      },
      signBookInfo: {
        intendedContract: 0, // 0 签约, 1未签约
        outline: "", // 大纲
        otherPlatformLink: "", // 链接
        plannedLength: 0, // 计划长度 0 1 2 3 4
        avgChapterWords: 0,
        updateRate: 0,
      },
      initIntendedContract: 0,
      CountryData: [],
      idCardUrl: "", // 预览
      pseudonymDisabled: false, // 笔名禁止
      // 图片裁切配置项------------START
      cutAvatar: false, // 切头像控制
      option: {
        img: require("@/assets/images/common/default_book_bg.png"),
        size: 1,
        full: false,
        outputType: "jpeg",
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
        max: 9999,
      },
      show: true,
      fixed: true,
      fixedNumber: [5, 3],
      model: false,
      modelSrc: "",
      crap: false,
      previews: {},
      // 图片裁切-----END
      outlineWords: 0,
      wordCountFlag: true,
    };
  },
  created() {
    this.CountryData = CountryData;
    let bookInfo = window.localStorage.getItem("bookInfo") || "{}";
    bookInfo= JSON.parse(bookInfo);
    // this.signBookInfo = Object.assign( this.signBookInfo , bookInfo );
    this.handleReshow(bookInfo);
  },
  watch: {
    outlineWords(v2, v1) {
      if (v2 > 80000) {
        this.$msg({
          content: "Words submitted has a maximum length of 80,000.",
        });
        this.wordCountFlag = false;
      } else {
        this.wordCountFlag = true;
      }
    },
  },
  methods: {
    handleReshow(bookInfo) {
      this.bookInfo = bookInfo;
      if (bookInfo.email) {
        this.persenInfo.email = bookInfo.email;
      }
      if (bookInfo.realName) {
        this.persenInfo.realName = bookInfo.realName;
      }
      if (bookInfo.facebookUserName) {
        this.persenInfo.facebookUserName = bookInfo.facebookUserName;
      }
      if (bookInfo.pseudonym) {
        this.persenInfo.pseudonym = bookInfo.pseudonym;
        this.pseudonymDisabled = !this.checkErr(bookInfo.pseudonym) || false;
      }
      if (bookInfo.ageState) {
        this.persenInfo.ageState = bookInfo.ageState;
      }else{
        this.persenInfo.ageState = 2 ;
      }
      // ID图
      if (bookInfo.cover) {
        this.idCardUrl = bookInfo.idCard;
        this.persenInfo.idCardFile = bookInfo.idCard;
      }
      if (bookInfo.country) {
        this.persenInfo.country = bookInfo.country;
        // this.CountryData.forEach((item) => {
        //   if (item.cn == bookInfo.country) {
        //     this.persenInfo.country = item.en;
        //   }
        // });
      }
      // 地址:
      if (bookInfo.permanentAddress) {
        this.persenInfo.permanentAddress = bookInfo.permanentAddress;
      }
      if (bookInfo.state) {
        this.persenInfo.state = bookInfo.state;
      }
      if (bookInfo.city) {
        this.persenInfo.city = bookInfo.city;
      }
      if (bookInfo.zipCode) {
        this.persenInfo.zipCode = bookInfo.zipCode;
      }
      // 书信息
       if (bookInfo.contractType) {
        // this.signBookInfo.intendedContract = bookInfo.contractType == "EXCLUSIVE" ? '0' : '1';
         this.initIntendedContract =  bookInfo.contractType == "EXCLUSIVE" ? 0 : 1;
      }else{
         this.initIntendedContract = 0;
      }

      if (bookInfo.bookName) {
        this.signBookInfo.bookName = bookInfo.bookName;
      }
      if (bookInfo.outline) {
        this.signBookInfo.outline = bookInfo.outline;
      }
      if (bookInfo.otherPlatformLink) {
        this.signBookInfo.otherPlatformLink = bookInfo.otherPlatformLink;
      }
      if (bookInfo.plannedLength) {
        this.signBookInfo.plannedLength = bookInfo.plannedLength || '0';
      }
      if (bookInfo.updateRate) {
        this.signBookInfo.updateRate = bookInfo.updateRate || '0';
      }
      if (bookInfo.avgChapterWords) {
        this.signBookInfo.avgChapterWords = bookInfo.avgChapterWords || '0';
      }
      if (bookInfo.introduction) {
        this.signBookInfo.introduction = bookInfo.introduction || '';
      }
      if (bookInfo.otherPlatformLink) {
        this.signBookInfo.otherPlatformLink = bookInfo.otherPlatformLink || '';
      }

    },
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
      count = count.filter((item) => {
        return item;
      });
      this.outlineWords = count.length == 0 ? 0 : count.length;
      return this.outlineWords;
    },

    // !vue-cropper 裁图图片加载回调函数----------------- START
    imgLoad(msg) {},

    // !uploadImg2  新的图片裁切上传书封
    uploadImg2(e, num) {
      //上传图片
      var file = e.target.files[0];
      console.log(file);
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        this.$msg({
          content: "Please Choose Image",
        });
        return false;
      }

      // TODO: 测试后解开
      if (file.size > 200 * 1024) {
        this.$msg({
          content: "File size limit: 200k",
        });
        return false;
      }

      var reader = new FileReader();
      reader.onload = (e) => {
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
      cp.getCropBlob((data) => {
        let blob = data;
        console.log(blob);
        that.persenInfo.idCardFile = blob;
        cp.getCropData((data) => {
          // that.formMessage.cover = blob;
          // this.imageUrl = data;
          // this.cutAvatar = false;
          // that.persenInfo.idCardFile = blob; // file
          that.idCardUrl = data; // base64
          that.cutAvatar = false;
        });
        // }
      });
    },
    dataURLtoFile(dataurl, filename) {
      //将base64转换为文件
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    // !-------------------------------------------------- END

    // !下一步
    handleNext() {
      $logClick({
        module: this.$route.name,
        zone: "djxsqyxyb", // 点击线上签约下一步
        adid: "click-signonline-next",
      });

      this.allowTest = true; // 开启检测

      // 检测用户数据
      let info = this.persenInfo;

      if (
        !info.email ||
        !this.checkEmail(info.email) ||
        !info.realName ||
        !info.pseudonym ||
        !info.idCardFile ||
        !this.idCardUrl ||
        !info.country ||
        !info.permanentAddress ||
        !info.city ||
        !info.zipCode
      ) {
        this.$msg({
          content: "Missing Items",
        });
        return;
      }

      // console.log(info);

      // !检测字符长度
      if (info.email.length > 250) {
        this.$msg({
          content: "please input valid email adress! length 0 - 250",
        });
        return;
      }
      if (info.realName.length > 490) {
        this.$msg({
          content: "please input valid RealName! length: 0 - 490",
        });
        return;
      }
      if (info.pseudonym.length > 250) {
        this.$msg({
          content: "please input valid Pseudonym! length: 0 - 250",
        });
        return;
      }
      if (info.facebookUserName.length > 250) {
        this.$msg({
          content: "please input valid FacebookUserName! length: less than 250",
        });
        return;
      }
      if (info.permanentAddress.length > 250) {
        this.$msg({
          content: "please input valid PermanentAddress! length: 0 - 250",
        });
        return;
      }
      if (info.city.length > 250) {
        this.$msg({
          content: "please input valid City! length: 0 - 250",
        });
        return;
      }
      if (info.state.length > 250) {
        this.$msg({
          content: "please input valid State! length: 0 - 250",
        });
        return;
      }
      if (info.zipCode.length > 20) {
        this.$msg({
          content: "please input valid postal or zip code! length: 0 - 20",
        });
        return;
      }
      this.showPerson = false;
      this.showBook = true;
    },

    // !上一步
    handlePrev() {
      $logClick({
        module: this.$route.name,
        zone: "djxsqysyb", // 点击线上签约上一步
        adid: "click-signonline-back",
      });

      this.showPerson = true;
      this.showBook = false;
    },
    // !提交
    async handleSubmit() {
      let userInfo;
      try {
        userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
        $logClick({
          module: this.$route.name,
          zone: "djxsqytj", // 点击线上签约提交
          adid: "click-signonline-submit",
          map: {
            userId: userInfo && userInfo.id,
            bookId: this.bookInfo.bookId,
          },
        });
      } catch (e) {
        $logClick({
          module: this.$route.name,
          zone: "djxsqytj", // 点击线上签约提交
          adid: "click-signonline-submit",
          map: {
            userId: "",
            bookId: "",
            errorMsg: "JSON parse error",
          },
        });
      }

      if (!this.wordCountFlag) {
        this.$msg({
          content: "Words submitted has a maximum length of 80,000.",
        });
        return;
      }

      if (this.signBookInfo.otherPlatformLink && this.signBookInfo.otherPlatformLink.length > 250) {
        this.$msg({
          content:
            "please input valid other platform link! length: less than 250",
        });
        return;
      }

      let formData = new FormData();

      try {
        // 更新用户笔名
        window.localStorage.removeItem("reshow");
        window.localStorage.removeItem("contractInfo");
        let storageInfo = JSON.parse(window.localStorage.getItem("userInfo"));
        if (!storageInfo.pseudonym) {
          storageInfo.pseudonym = this.persenInfo.pseudonym.trim();
          window.localStorage.setItem("userInfo", JSON.stringify(storageInfo));
        }

        if (this.bookInfo.contractId) {
          formData.append("id", this.bookInfo.contractId);
        }
        formData.append("ageState", this.persenInfo.ageState);
        if(!this.signBookInfo.avgChapterWords){
          this.signBookInfo.avgChapterWords = 0;
        }
        formData.append("avgChapterWords", this.signBookInfo.avgChapterWords);
        formData.append("bookId", this.bookInfo.bookId);
        formData.append("bookName", this.bookInfo.bookName);
        formData.append("city", this.persenInfo.city);
        formData.append("contractStatus", this.bookInfo.contractStatus);
        formData.append(
          "contractType",
          this.initIntendedContract == 0
            ? "EXCLUSIVE"
            : "NON_EXCLUSIVE"
        );
        formData.append("country", this.persenInfo.country);
        formData.append("email", this.persenInfo.email);
        formData.append("facebookUserName", this.persenInfo.facebookUserName);
        if( typeof(this.persenInfo.idCardFile) == 'string'){
          formData.append("idCardStr", this.persenInfo.idCardFile);
        }else{
          formData.append("idCard", this.persenInfo.idCardFile);
        }
        formData.append(
          "intendedContract",
         this.initIntendedContract == 0
            ? "EXCLUSIVE"
            : "NON_EXCLUSIVE"
        );
        formData.append("introduction", this.bookInfo.introduction);

        if(!this.signBookInfo.otherPlatformLink){
          this.signBookInfo.otherPlatformLink = '';
        }
        formData.append(
          "otherPlatformLink",
          this.signBookInfo.otherPlatformLink
        );
        if(!this.signBookInfo.outline){
          this.signBookInfo.outline = '';
        }
        formData.append("outline", this.signBookInfo.outline);

        formData.append("permanentAddress", this.persenInfo.permanentAddress);

        if(!this.signBookInfo.plannedLength){
          this.signBookInfo.plannedLength = 0;
        }
        formData.append("plannedLength", this.signBookInfo.plannedLength);

        formData.append("pseudonym", this.persenInfo.pseudonym);
        formData.append("realName", this.persenInfo.realName);
        formData.append("state", this.persenInfo.state);
        if(!this.signBookInfo.updateRate){
          this.signBookInfo.updateRate = 0;
        }
        formData.append("updateRate", this.signBookInfo.updateRate);
        formData.append("zipCode", this.persenInfo.zipCode);

        $logClick({
          module: this.$route.name,
          zone: "djxsqytj", // 点击线上签约提交
          adid: "click-signonline-submit-form-append-succ",
          map: {
            userId: userInfo && userInfo.id,
            bookId: this.bookInfo.bookId,
            msg: "formdata append succ",
          },
        });
      } catch (error) {
        $logClick({
          module: this.$route.name,
          zone: "djxsqytj", // 点击线上签约提交
          adid: "click-signonline-submit-form-append-fail",
          map: {
            userId: userInfo && userInfo.id,
            bookId: this.bookInfo.bookId,
            msg: "formdata append fail" + JSON.stringify(error),
          },
        });
      }

      try {
        let res = await this.$axios.post("/webfic/contract/submit", formData);
        if (res.data.status == 0) {
          $logEvent({
            event: "xsqycg", // 线上签约成功
            map: {
              module: this.bookInfo.bookId,
            },
          });

          this.$msg({
            content: "Submit Success!",
          });

          this.$router.replace("/user_center");
        } else {
          $logEvent({
            event: "xsqysb", // 线上签约失败
            map: {
              module: this.bookInfo.bookId,
              status: res.data.status,
            },
          });

          this.$msg({
            content: "Error Status: " + res.data.status,
          });
        }
      } catch (error) {
        $logClick({
          module: this.$route.name,
          zone: "xsqysb_api", // 点击线上签约提交
          adid: "click-signonline-submit",
          map: {
            url: "/webfic/contract/submit",
            reason: "api error",
          },
        });
      }
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
    checkErr(str) {
      if (str && str.trim && str.trim().length && str.trim().length > 0) {
        return false;
      } else {
        return true;
      }
    },
    judgeEmailLength(str) {
      let index = str.indexOf("@");
      return index > 250;
    },
  },
};
</script>
<style lang='scss' scoped>
.fl {
  float: left;
}
.recharge {
  padding: 40px 0 60px 0;
  background: rgba(244, 246, 248, 1);
  min-width: 900px;
  .hide_bar {
    margin: 0 auto;
    width: 868px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
    padding: 48px 70px;
  }
  .recharge-box {
    box-sizing: border-box;
    width: 100%;

    .tip {
      margin-bottom: 40px;
      h3 {
        height: 47px;
        font-size: 32px;
        font-weight: bold;
        color: rgba(58, 74, 90, 1);
        line-height: 47px;
        margin-bottom: 12px;
      }
      p {
        font-size: 16px;
        font-weight: 400;
        color: rgba(58, 74, 90, 0.6);
        line-height: 24px;
        text-align: justify;
      }
    }

    .info {
      margin-top: 50px;
      overflow: hidden;
      h2 {
        height: 28px;
        font-size: 20px;
        font-weight: bold;
        color: rgba(58, 74, 90, 1);
        line-height: 28px;
        margin-bottom: 66px;
      }
      .item_container {
        box-sizing: border-box;
        width: 354px;
        border-radius: 10px;
        padding: 0px 10px;
        min-height: 100px;
        margin-bottom: 40px;

        option,
        select {
          font-size: 16px;
          font-weight: 400;
          color: rgba(58, 74, 90, 1);
          line-height: 28px;
        }
        label {
          font-size: 16px;
          font-weight: bold;
          color: rgba(58, 74, 90, 1);
          line-height: 28px;
        }

        .required_span {
          color: rgb(238, 55, 153);
        }

        &.error {
          border: 1px dashed rgb(238, 55, 153);
        }

        input {
          box-sizing: border-box;
          margin-top: 10px;
          padding: 5px;
          width: 100%;
          border: none;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
          height: 84px;
          overflow: auto;
          font-weight: 400;
          font-size: 16px;
          color: rgba(67, 83, 102, 1);
          line-height: 28px;
        }
        textarea.outline {
          height: 200px;
          background: rgba(0, 0, 0, 0.02);
          border-radius: 5px;
        }

        .errinfo {
          margin-top: 10px;
          color: rgb(238, 55, 153);
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
          width: 50%;
          min-height: 150px;
          margin: 0 auto;
          text-align: center;
          margin: 10px 0;
          background: rgb(244, 246, 248);
          border-radius: 4px;
          img {
            margin: 10px;
            width: 80%;
          }
        }
        .add_cover {
          display: inline-block;
          width: 70px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: #ee3799;
          border-radius: 3px;
          background: url(../../assets/images/book/1.png) no-repeat left center;
          background-size: 20px 20px;
          padding-left: 24px;
        }
        &.cc {
          width: 100%;
          overflow: hidden;
        }
        &.cc2 {
          width: 33%;
          overflow: hidden;
          select {
            margin-top: 20px;
          }
        }
        .w100 {
          width: 95%;
          margin-bottom: 20px;
        }
        select.w100 {
          height: 30px;
          border: none;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          margin-bottom: 50px;
          color: #435366;
          font-size: 16px;
          font-weight: 400;
          line-height: 28px;
        }
        .clr {
          overflow: hidden;
          .w50 {
            float: left;
            width: 33%;
            margin-bottom: 20px;
            input {
              width: 90%;
            }
          }
        }
        label.error {
          color: rgb(238, 55, 153);
        }
        span.error {
          color: rgb(238, 55, 153);
        }
      }
    }

    input[disabled],
    textarea[disabled] {
      cursor: not-allowed;
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
      color: #ee3799;
      border-radius: 4px;
      display: inline-block;
      text-decoration: none;
      width: 284px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      font-size: 20px;
      &.next {
        display: block;
        margin: 0 auto;
        border: none;
        padding: 30px 0;
        background: #fff;
        div {
          background: #ee3799;
          color: #fff;
          height: 44px;
          line-height: 44px;
          text-align: center;
          font-size: 20px;
          border-radius: 4px;
        }
      }
      &.btn_back div {
        font-size: 20px;
        line-height: 44px;
        text-align: center;
      }
    }
    .btns_container {
      text-align: center;
      margin-bottom: 40px;
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
.ir_input {
  width: 100% !important;
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
</style>
