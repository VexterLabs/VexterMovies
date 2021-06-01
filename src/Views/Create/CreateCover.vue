<style lang='scss' scoped>
// 活动约稿样式限制
.participate {
  position: relative;
  .participate_tit {
    float: none !important;
  }
  .participate_container {
    display: block;
    .ir_input {
      float: none;
      label {
        padding: 0 4px 0 4px !important;
        i {
          margin-right: 0px;
        }
      }
      span,
      a {
        display: inline-block;
        height: 28px;
        font-size: 14px;
        font-family: SourceHanSansSC-Regular, SourceHanSansSC;
        font-weight: 400;
        color: rgba(58, 74, 90, 1);
        line-height: 28px;
        &.learnmore {
          color: rgba(238, 55, 153, 1);
          cursor: pointer;
        }
      }
    }
  }

  .participate_pop {
    position: absolute;
    top: -100%;
    left: 20%;
  }
}

.create_cover {
  overflow: hidden;
  padding: 40px 0 60px;
  margin: 0 auto;
  background-color: #f4f6f8;
  min-width: 900px;
}
.cc_box {
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  padding: 40px 64px;
  width: 857px;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  .skip {
    position: absolute;
    right: 50px;
    top: 50px;
    height: 28px;
    font-size: 20px;
    font-weight: 400;
    color: rgba(238, 55, 153, 1);
    line-height: 28px;
    background: url(../../assets/images/icons/icon_back.png) no-repeat right
      center;
    background-size: 16px 16px;
    padding-right: 30px;
    cursor: pointer;
    z-index: 888;
  }
}
.cc_main {
  overflow: hidden;
  position: relative;
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
    width: 270px;
    height: 360px;
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
      margin-left: 34px;
    }
    .ctr_cropper_bg_btn {
      height: auto;
      font-weight: bold;
    }
  }
}
.ccm_tit {
  overflow: hidden;
  margin-bottom: 20px;
  height: 56px;
  font-size: 48px;
  color: #3a4a5a;
  font-weight: bold;
  text-transform: uppercase;
  line-height: 56px;
}
.ccm_cover_box {
  overflow: hidden;
  margin-bottom: 20px;
  height: 256px;
  margin-top: 10px;
}
.ccmc_img {
  overflow: hidden;
  float: left;
  height: 256px;
  width: 192px;
  background-color: #f4f6f8;
  border-radius: 2px;
  box-sizing: border-box;
  border: 1px solid transparent;
  &.active {
    border: 1px solid #ee3799;
  }
}
.ccmc_img img {
  display: block;
  height: 256px;
  width: 192px;
  border-radius: 2px;
}
.ccmc_info {
  overflow: hidden;
  margin-left: 222px;
  .start {
    display: inline;
    color: #f84545;
  }
  .active {
    color: #f84545;
  }
}
.ccmc_info strong {
  display: block;
  margin: 156px 0 0 0;
  height: 28px;
  font-weight: bold;
  font-size: 16px;
  color: #3a4a5a;
  line-height: 28px;
}
.ccmc_info span {
  display: block;
  margin-bottom: 10px;
  height: 28px;
  font-size: 16px;
  color: rgba(58, 74, 90, 0.3);
  line-height: 28px;
}
.ccmc_info label {
  position: relative;
  left: 0;
  top: 0;
  display: block;
  padding: 0 20px 0 42px;
  height: 32px;
  width: 130px;
  background: url("../../assets/images/book/1.png") no-repeat 0 center;
  font-size: 20px;
  text-transform: uppercase;
  color: #ee3799;
  line-height: 32px;
}
.ccmc_info label input {
  display: none;
}
.i_tit {
  display: block;
  // overflow: hidden;
  margin-bottom: 24px;
}
.it_tit {
  margin-bottom: 4px;
  // overflow: hidden;
  min-width: 28px;
  line-height: 28px;
}
.it_tit span {
  margin-right: 3px;
  overflow: hidden;
  float: left;
  height: 28px;
  color: #f84545;
  font-weight: bold;
  line-height: 32px;
}
.it_tit strong {
  // display: block;
  height: 28px;
  font-weight: bold;
  font-size: 16px;
  color: #3a4a5a;
  line-height: 28px;
  &.active {
    color: #f84545;
  }
}
.it_txt {
  padding-left: 10px;
  box-sizing: border-box;
}
.it_txt,
.it_select {
  overflow: hidden;
  height: 44px;
  // width: 511px;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.it_txt input,
.it_select input {
  display: block;
  height: 44px;
  width: 470px;
  font-size: 16px;
  font-weight: 400;
  color: #3a4a5a;
}
.it_select {
  position: relative;
  left: 0;
  right: 0;
  background: url("../../assets/images/icons/arrow_down.png") no-repeat right;
  background-size: 20px 20px;
}
.it_select select {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
}
.i_radio {
  // overflow: hidden;
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
  &.active {
    color: #f84545;
  }
}

.ir_tit .wblock {
  box-sizing: border-box;
  float: left;
  position: relative;
  height: 30px;
  line-height: 30px;
  padding: 0 15px;
  width: 70px;
  margin-top: 2px;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.05);
  font-weight: 400;
  color: rgba(58, 74, 90, 1);
  line-height: 30px;
  text-align: right;
  margin-left: 19px;
  cursor: pointer;

  .squre {
    box-sizing: border-box;
    position: absolute;
    top: 5px;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border: 2px solid #ccc;
    border-radius: 50%;
    &.on {
      right: 6px;
    }
    &.off {
      left: 6px;
    }
  }

  &.on {
    background: #ee3799;
    text-align: left;
    color: #fff;
  }
}

.ir_input {
  float: left;
  overflow: hidden;
}

.ir_input {
  &.novel_ir {
    display: inline-block;
    width: 360px;
    box-sizing: border-box;
  }
  &.novel_ir2 {
    width: 100%;
    min-height: 45px;
    // overflow: hidden;
    .ir_opt {
      display: inline-block;
      width: 20%;
      line-height: 44px;
      height: 44px;
      vertical-align: top;
      padding-right: 30px;
      box-sizing: border-box;
      input {
        width: 100%;
      }
    }
    .book-title {
      vertical-align: top;
      width: 79%;
      position: relative;
      display: inline-block;
      box-sizing: border-box;

      .cls_search,
      .book_add {
        position: absolute;
        width: 30px;
        height: 20px;
        line-height: 20px;
        border-radius: 0 10px 10px 0;
        background: #ee3799;
        color: #fff;
        text-align: center;
        cursor: pointer;
        right: 0px;
        top: 15px;
      }
      .book_add {
        border-radius: 10px 0 0 10px;
        right: 32px;
        font-weight: bold;
      }
    }
  }
  .ir_opt {
    width: 100%;
    .opt_li {
      float: left;
      position: relative;
      // display: block;
      // width: 360px;
      height: 36px;
      margin-top: 10px;
    }
  }
  .book-title {
    padding-left: 14px;
  }
  .book-title-options {
    width: 100%;
    position: relative;
    overflow: hidden;
    z-index: 9999;
    border: 1px solid #ccc;
    background: #fff;
    .search_li {
      position: relative;
      display: block;
      // width: 360px;
      height: 42px;
      line-height: 22px;
      padding-left: 10px;
      padding-top: 10px;
      border-bottom: 1px dashed #f1f1f1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      box-sizing: border-box;
    }
  }
  .book-title-selected {
    width: 100%;
    .select_li {
      // float: left;
      /* width: 100%; */
      word-wrap: break-word;
      word-break: break-all;
      box-sizing: border-box;
      // display: inline-block;
      padding: 4px 12px;
      // background-color: #f1f1f1;
      // border-radius: 8px;
      margin-right: 6px;
      margin-top: 8px;
      padding-right: 32px;
      position: relative;
      font-weight: bold;
      font-size: 12px;
      border-bottom: 1px solid #b9b7b7;
      .del_sct {
        position: absolute;
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 50%;
        background: #ee3799;
        color: #fff;
        text-align: center;
        cursor: pointer;
        right: 5px;
        top: 50%;
        margin-top: -10px;
      }
    }
  }
}
.ir_input .inp {
  margin-top: 10px;
  width: 88%;
  height: 30px;
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
.it_textarea {
  overflow: hidden;
  display: block;
  // width: 511px;
  width: 100%;
}
.it_textarea textarea {
  display: block;
  padding: 4px 12px;
  width: 100%;
  height: 94px;
  background-color: rgba(0, 0, 0, 0.05);
  outline: none;
  font-size: 16px;
  color: #3a4a5a;
  resize: none;
  box-sizing: border-box;
}
.it_textarea span {
  display: block;
  height: 20px;
  font-size: 12px;
  color: #3a4a5a;
  text-align: right;
  line-height: 20px;
}
.ccm_but_box {
  overflow: hidden;
  margin: 20px 0;
}
.ccm_but_box a {
  float: right;
  height: 44px;
  font-size: 20px;
  text-transform: uppercase;
  text-align: center;
  line-height: 44px;
  border-radius: 4px;
}
.ccmb_1 {
  margin-right: 11px;
  width: 200px;
  color: #ee3799;
}
.ccmb_2 {
  width: 300px;
  color: #ffffff;
  font-weight: bold;
  background-color: #ee3799;
}
.it_tags {
  overflow: hidden;
}
.itt_li {
  position: relative;
  left: 0;
  top: 0;
  float: left;
  overflow: hidden;
  padding: 0 8px;
  margin: 8px;
  height: 24px;
  border: 1px solid #ee3799;
  border-radius: 3px;
}
.itt_li strong {
  display: block;
  margin-right: 16px;
  height: 24px;
  font-size: 14px;
  color: #ee3799;
  line-height: 24px;
}
.itt_li span {
  position: absolute;
  right: 4px;
  top: 4px;
  height: 16px;
  width: 16px;
  background: url("../../assets/images/icons/close_icon_1.png") no-repeat center
    center;
  background-size: 16px 16px;
  cursor: pointer;
}
#buttonId {
  cursor: pointer;
}

.tags_r {
  min-height: 30px;
  width: 100%;
  .tag_title {
    overflow: hidden;
    .tag_title_item {
      overflow: hidden;
      float: left;
      label {
        border-radius: 4px;
        span {
          margin: 0;
        }
      }
    }
  }
  .tag_item_container {
    overflow: hidden;
    padding: 10px 9px;
    background: #cdbed1;
    border-radius: 10px;
    margin-top: 10px;
    min-width: 300px;
    h3 {
      position: relative;
      .toggle_tags_blog {
        position: absolute;
        width: 39px;
        height: 19px;
        cursor: pointer;
        font-size: 12px;
        line-height: 19px;
        right: 10px;
        top: 0;
        border: 1px solid #f1f1f1;
        text-align: center;
      }
    }
    .tag_item {
      margin-right: 6px;
      margin-top: 6px;
      box-sizing: border-box;
      display: inline-block;
      padding: 4px 6px;
      background-color: #f1f1f1;
      border-radius: 8px;
      position: relative;
      border: 1px solid #ee3799;
      cursor: pointer;
    }
    .del_tag {
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 50%;
      background: #ee3799;
      color: #fff;
      text-align: center;
      cursor: pointer;
      right: 5px;
      top: 3px;
      font-style: normal;
      text-align: center;
      border-radius: 50%;
      line-height: 17px;
    }
  }

  .selected_tags_container {
    margin-top: 10px;
    padding: 10px 9px;
    background: #cdbed1;
    border-radius: 10px;
    .selected_tag {
      margin-right: 6px;
      margin-top: 6px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      display: inline-block;
      padding: 4px 6px;
      background-color: #f1f1f1;
      border-radius: 8px;
      position: relative;
      padding-right: 30px;
      border: 1px solid #ee3799;
      .del_tag {
        position: absolute;
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 50%;
        background: #ee3799;
        color: #fff;
        text-align: center;
        cursor: pointer;
        right: 5px;
        top: 3px;
        font-style: normal;
        border-radius: 50%;
        line-height: 17px;
      }
    }
  }
  .kg {
    padding-top: 10px;
    overflow: hidden;
    strong {
      float: left;
      display: inline-block;
      padding: 10px;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
    .wblock {
      box-sizing: border-box;
      float: left;
      position: relative;
      height: 30px;
      line-height: 30px;
      padding: 0 15px;
      width: 70px;
      margin-top: 10px;
      border-radius: 15px;
      background: rgba(0, 0, 0, 0.05);
      font-weight: 400;
      color: rgba(58, 74, 90, 1);
      line-height: 30px;
      text-align: right;
      margin-left: 19px;
      cursor: pointer;

      .squre {
        box-sizing: border-box;
        position: absolute;
        top: 5px;
        width: 20px;
        height: 20px;
        background-color: #fff;
        border: 2px solid #ccc;
        border-radius: 50%;
        &.on {
          right: 6px;
        }
        &.off {
          left: 6px;
        }
      }

      &.on {
        background: #ee3799;
        text-align: left;
        color: #fff;
      }
    }
  }
  .tip {
    p {
      padding-left: 14px;
      font-weight: 400;
      color: rgba(58, 74, 90, 1);
      line-height: 24px;
    }
  }
}
.tip_contain {
  display: inline-block;
  cursor: pointer;
  margin-top: 3px;
  margin-left: 10px;
  width: 21px;
  height: 21px;
  background: url("../../assets/images/common/tip_info.png") no-repeat center
    center;
  background-size: 21px 21px;
  font-style: normal;
  position: relative;
  z-index: 20;
  vertical-align: top;
  .tip_mask {
    position: absolute;
    bottom: 30px;
    z-index: 20;
  }
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: " ";
}
.clearfix:after {
  clear: both;
}
.clearfix {
  *zoom: 1;
}
</style>
<template>
  <div class="create_cover">
    <div class="cc_box">
      <!-- 切图图层 -->
      <div class="cropper_container" v-show="cutAvatar">
        <div class="cropper">
          <img :src="imageUrl" id="image" style="max-width: 100%" ref="img" />
        </div>

        <!-- 裁切组件 -->
        <!-- <vue-cropper
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
        ></vue-cropper>-->

        <div class="ctr_cropper">
          <!-- 上传图片 -->
          <label class="upload_btn" for="uploads">Upload</label>
          <input
            type="file"
            id="uploads"
            style="position:absolute; clip:rect(0 0 0 0);"
            accept="image/png, image/jpeg, image/gif, image/jpg"
            @change="change"
          />

          <!-- uploadImg2($event, 1) -->

          <!-- 底图缩放 -->
          <!-- <button @click="changeScale(1)" class="upload_btn ctr_cropper_bg_btn">+</button>
          <button @click="changeScale(-1)" class="upload_btn ctr_cropper_bg_btn">-</button>-->

          <!-- 下载图片 @click="down('blob')"-->
          <button @click="crop" class="upload_btn" style="height:34px;">Ok</button>

          <!-- 关闭弹层 -->
          <button @click.self="cutAvatar = false" class="upload_btn ctr_cropper_bg_btn">Cancel</button>
        </div>
      </div>

      <!-- 表单 -->
      <div class="skip" @click.stop="skipEdit">SKIP</div>
      <form action>
        <div class="cc_main">
          <h1 class="ccm_tit">novel information</h1>

          <!-- 图片 -->
          <div class="ccm_cover_box">
            <div :class="[{'active': isChecked&&!imageUrl},'ccmc_img']">
              <img :src="imageUrlBase" v-if="imageUrl" alt="goodnovel bookname cropper" />
            </div>
            <div class="ccmc_info">
              <strong :class="[{'active': isChecked&&!imageUrl}]">
                <span class="start">*</span>Book cover
              </strong>
              <span>Cover size: 600*800; File format: .jpg .png; File size limit: 200k</span>

              <label @click="cutAvatar = true">
                Upload
                <br />
              </label>
              <!-- <label id="buttonId">Upload<br /></label> -->
            </div>
          </div>

          <!-- 标题 -->
          <div class="i_tit clearfix" style="paddingTop: 20px;">
            <div class="it_tit clearfix">
              <span>*</span>
              <strong :class="[{'active': isChecked&&!formMessage.bookName}]">Book Title</strong>
              <i
                class="tip_contain"
                @mouseover="handleShowTipMask('BookTitle')"
                @mouseout="handleCloseTipMask"
              >
                <tip-mask
                  class="tip_mask"
                  v-if="showMaskFlag && currentTipMask == 'BookTitle'"
                  :title="'Book Title'"
                  :content="TipContent[4]"
                ></tip-mask>
                <!-- @handleClose="handleCloseTipMask" -->
              </i>
            </div>
            <div class="it_txt">
              <input
                type="text"
                v-model="formMessage.bookName"
                placeholder="The title has a limit of 60 characters."
              />
            </div>
          </div>

          <!-- 主角角色 -->
          <div class="i_radio clearfix">
            <div class="ir_tit">
              <span>*</span>
              <strong :class="[{'active': isChecked&&!formMessage.protagonistGender}]">Main Role</strong>
            </div>
            <div class="ir_input">
              <!--   @click="setGenderList(index)"  主角性别字段修改
              -->
              <label v-for="(item,index) in ocreate.protagonistGender" :key="index">
                <input
                  type="radio"
                  name="Protagonist Gender"
                  :value="item.value"
                  v-model="formMessage.protagonistGender"
                />
                <i></i>
                <span>{{item.value}}</span>
                <em></em>
              </label>
            </div>
          </div>

          <!-- NovelType -->
          <div class="i_radio clearfix">
            <div class="ir_tit novel_ir">
              <span>*</span>
              <strong :class="[{'active': isChecked&&!formMessage.novelType}]">Novel Type</strong>

              <i
                class="tip_contain"
                @mouseover="handleShowTipMask('NovelType')"
                @mouseout="handleCloseTipMask"
              >
                <tip-mask
                  class="tip_mask"
                  v-if="showMaskFlag && currentTipMask == 'NovelType'"
                  :title="'Novel Type'"
                  :content="TipContent[0]"
                ></tip-mask>
                <!-- @handleClose="handleCloseTipMask" -->
              </i>
            </div>
            <div class="ir_input novel_ir2">
              <!-- 左侧下拉 -->
              <div class="ir_opt it_select">
                <input
                  type="text"
                  placeholder="novel type"
                  autocomplete="off"
                  :value="formMessage.novelType == 'Alternate'? 'FanFiction' : formMessage.novelType"
                />
                <select v-model="formMessage.novelType">
                  <option
                    v-for="(items , index) in ocreate.novelTypes"
                    :key="index"
                    :value="items.value"
                  >{{ items.value == 'Alternate'? 'FanFiction' : items.value }}</option>
                </select>
              </div>

              <!-- 抽取组件 -->
              <div
                class="book-title"
                v-if="(formMessage.novelType != 'Original')&&(formMessage.novelType!='')"
              >
                <span class="book_add" @click="bookAdd" title="Or Press 'Enter' Key">+</span>
                <span data-v-7239c97c class="cls_search" @click="cls_search">×</span>
                <!-- 搜索框 -->
                <input
                  v-if="formMessage.novelType !='Original'"
                  class="inp"
                  type="text"
                  v-model="fellowBookName"
                  placeholder="Please write the canon source"
                  @input="searchFellowBook($event)"
                  @keyup.enter="addFellowBook($event)"
                  ref="search_inp"
                />
                <!-- 结果展示框 -->
                <ul class="book-title-options">
                  <li
                    class="search_li"
                    v-for="(item , index) in searchFellowBookList"
                    :key="index"
                    @click="selectBookTitle(item)"
                  >{{item.originalBookName}}</li>
                </ul>
                <!-- 用户选中内容 -->
                <ul class="book-title-selected">
                  <li
                    class="select_li"
                    v-for="(item , index) in formMessage.novelBookTitles"
                    :key="index"
                  >
                    {{item.originalBookName}}
                    <span class="del_sct" @click="delSelected(index)">×</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Genre -->
          <div class="i_tit" v-show="genderList.length > 0">
            <div class="it_tit">
              <span>*</span>
              <strong :class="[{'active': isChecked&&!formMessage.bookTypeTwo}]">Genre</strong>
            </div>
            <div class="it_select">
              <input
                type="text"
                placeholder="Please select the genre"
                autocomplete="off"
                :value="genderTxt"
              />
              <select v-model="formMessage.bookTypeTwo" @change="bookTypeTwotxt">
                <option
                  v-for="(items , index) in genderList"
                  :key="items.id"
                  :value="items.id"
                >{{ items.name }}</option>
              </select>
            </div>
          </div>

          <!-- 约稿活动 -->
          <div
            class="i_radio participate clearfix"
            v-if="ocreate.activities && ocreate.activities.length > 0"
          >
            <!-- 标题 -->
            <div class="participate_tit ir_tit">
              <span>&nbsp;&nbsp;</span>
              <strong>Participate</strong>
            </div>
            <!-- 选项 -->
            <div class="participate_container">
              <div class="ir_input" v-for="(item,index) in ocreate.activities" :key="index">
                <label @click="judgeJoinAble(item)">
                  <input
                    type="checkbox"
                    name="Participate"
                    :value="item.activityId"
                    :disabled="(!canBeAlpha && item.type == 'ALPHA') || item.count == 0 || IsSelected(item) "
                    v-model="checkedWebActivityVo"
                  />
                  <i></i>
                  <em></em>
                </label>
                <span>{{item.name}}</span>
                <a
                  :href="item.url+'#point'"
                  target="_blank"
                  class="learnmore"
                  @click.stop="handleLearnMore(item)"
                >Learn More</a>
              </div>
            </div>
            <!-- 弹窗 -->
            <div class="participate_pop" v-if="showActivityDisable">
              <tip-mask
                class="tip_mask"
                :title="'Warm Reminder'"
                :content="activityDisableContent"
                :showClose="true"
                :noArrow="true"
                @handleClose="showActivityDisable = false"
              ></tip-mask>
            </div>
          </div>

          <!-- new Tags -->
          <div class="i_radio clearfix">
            <div class="ir_tit">
              <span>*</span>
              <strong :class="[{'active': isChecked&&chosenTags.length==0}]">Tags</strong>

              <i
                class="tip_contain"
                @mouseover="handleShowTipMask('Tags')"
                @mouseout="handleCloseTipMask"
              >
                <tip-mask
                  class="tip_mask"
                  v-if="showMaskFlag && currentTipMask == 'Tags'"
                  :title="'Tags'"
                  :content="TipContent[2]"
                ></tip-mask>
                <!-- @handleClose="handleCloseTipMask" -->
              </i>
            </div>
            <div class="ir_input tags_r">
              <input type="hidden" name="Tag" :value="JSON.stringify(chosenTags)" />

              <!-- 标题列表 创建-->
              <!-- v-if="!eidtFlag" -->
              <ul class="tag_title">
                <li
                  class="tag_title_item"
                  v-for="(val , key , index) in ocreate.labels"
                  :key="index"
                >
                  <label>
                    <input
                      type="radio"
                      name="tagTemp"
                      :value="key"
                      @click.self="selectTagTitle(key)"
                    />
                    <span>{{key}}</span>
                    <em></em>
                  </label>
                </li>
              </ul>
              <!-- 标题子选项 创建 -->
              <div class="tag_item_container">
                <!-- v-if="!eidtFlag" -->
                <h3>
                  Options :
                  <!-- <strong
                    class="toggle_tags_blog"
                    v-if="showTagsBlog"
                    @click="showTagsBlog = !showTagsBlog"
                  >hide</strong>-->
                  <strong
                    class="toggle_tags_blog"
                    v-if="!showTagsBlog"
                    @click="showTagsBlog = !showTagsBlog"
                  >show</strong>
                </h3>
                <div v-if="showTagsBlog">
                  <span
                    class="tag_item"
                    v-for="(item, index) in tempTagsArr"
                    :key="index"
                    @click.self="collectTags(item )"
                  >
                    {{item.name}}
                    <i class="del_tag" v-if="item.selected" @click="delTag(item)">×</i>
                  </span>
                </div>
              </div>
              <!-- 已选展示 创建 -->
              <div class="selected_tags_container">
                <!-- v-if="!eidtFlag" -->
                <h3>Choosen :</h3>
                <span class="selected_tag" v-for="(item, index) in chosenTags" :key="index">
                  {{item.name}}
                  <i class="del_tag" v-if="item.selected" @click="delTag(item)">×</i>
                </span>
              </div>

              <!-- 已选展示 编辑状态 -->
              <!-- <div class="selected_tags_container" v-if="eidtFlag" >
                <span v-for="(item, index) in chosenTags" :key="index">{{item.name}}</span>
              </div>-->
            </div>
          </div>

          <!-- Target Audience -->
          <div class="i_tit">
            <div class="it_tit">
              <span>*</span>
              <strong :class="[{'active': isChecked&&!formMessage.audience}]">Target Audience:</strong>

              <i
                class="tip_contain"
                @mouseover="handleShowTipMask('TargetAudience')"
                @mouseout="handleCloseTipMask"
              >
                <tip-mask
                  class="tip_mask"
                  v-if="showMaskFlag && currentTipMask == 'TargetAudience'"
                  :title="'Target Audience'"
                  :content="TipContent[1]"
                ></tip-mask>
                <!-- @handleClose="handleCloseTipMask" -->
              </i>
            </div>
            <div class="it_select">
              <input
                type="text"
                placeholder="Who is your primary audience?"
                autocomplete="off"
                :value="formMessage.audience"
              />
              <select v-model="formMessage.audience">
                <option
                  v-for="(item,index) in ocreate.targetAudiences"
                  :key="index"
                  :value="item.value"
                >{{item.value}}</option>
              </select>
            </div>
          </div>

          <!-- Email -->
          <div class="i_tit clearfix" style="paddingTop: 20px;" v-if="showEmail">
            <div class="it_tit clearfix">
              <span>*</span>
              <strong :class="[{'active': isChecked&&!checkEmail(userEmail)}]">Email</strong>
            </div>
            <div class="it_txt">
              <input type="text" v-model="userEmail" placeholder="Please enter your email" />
            </div>
          </div>

          <!-- Language -->
          <div class="i_tit">
            <div class="it_tit">
              <span>*</span>
              <strong :class="[{'active': isChecked&&!formMessage.language}]">Language:</strong>
            </div>
            <div class="it_select">
              <input
                type="text"
                placeholder="Please select the language"
                autocomplete="off"
                :value="formMessage.language | optionTxt(ocreate.languages,'key','value')"
              />
              <select v-model="formMessage.language">
                <option
                  v-for="(item,index) in ocreate.languages"
                  :key="index"
                  :value="item.key"
                >{{item.value}}</option>
              </select>
            </div>
          </div>

          <!-- 成人 -->
          <div class="i_tit clearfix">
            <div class="ir_tit">
              <span>*</span>
              <strong>Mature</strong>
              <div
                :class="{ 'wblock':true , 'on': formMessage.matrueFlag }"
                @click=" formMessage.matrueFlag=!formMessage.matrueFlag "
              >
                {{ formMessage.matrueFlag?'ON':'OFF' }}
                <span
                  :class="{'squre':true , 'on': formMessage.matrueFlag , 'off': !formMessage.matrueFlag}"
                ></span>
              </div>
            </div>
            <div class="ir_input tags_r">
              <div class="tip">
                <p
                  v-if="formMessage.matrueFlag"
                >Your story contains graphic depictions of violence, sexuality, strong language, and/or other mature themes.</p>
                <p
                  v-if="!formMessage.matrueFlag"
                >Your story is appropriate for all audiences. However, The GoodNovel community has the ability to rate your story Mature.</p>
              </div>
            </div>
          </div>

          <div class="i_tit">
            <div class="it_tit">
              <span>*</span>
              <strong :class="[{'active': isChecked&&!formMessage.introduction}]">Synopsis</strong>
              <i
                class="tip_contain"
                @mouseover="handleShowTipMask('Synopsis')"
                @mouseout="handleCloseTipMask"
              >
                <tip-mask
                  class="tip_mask"
                  v-if="showMaskFlag && currentTipMask == 'Synopsis'"
                  :title="'Synopsis'"
                  :content="TipContent[3]"
                ></tip-mask>
                <!-- @handleClose="handleCloseTipMask" -->
              </i>
            </div>
            <div class="it_textarea">
              <textarea
                name
                placeholder="Please write a description for your story with 20 to 300 words."
                v-model="formMessage.introduction"
                @keyup="onEditorChange($event)"
              ></textarea>
              <span>{{wordCount}} words</span>
            </div>
          </div>

          <div class="ccm_but_box">
            <a href="javascript:;" class="ccmb_2" @click="formSubmit">
              <template v-if="$route.query.bookId">UPDATE</template>
              <template v-else>CREATE</template>
            </a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { checkLength, checkEmail, removeEmoji } from "@/core/js/common";

import TipMask from "@/components/Common/TipMask.vue";
import { mapState } from "vuex";


import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";

export default {
  data() {
    return {
      hasBookId: false, // 编辑时已将书籍ID添加至表单中  true已添加
      showActivityDisable: false, // 没有参与活动资格弹窗控制
      activityDisableContent: "", // 无法参与活动提示
      canBeAlpha: true, // 编辑书籍时可否参加狼人活动, true可以参加, flase不能参加, 默认true
      checkEmail: null,
      showEmail: false,
      isUpload: false,
      genderTxt: "",
      genderList: [],
      userEmail: "",
      ocreate: {},
      wordCount: 0,
      formMessage: {
        protagonistGender: "", // 主角角色字段
        cover: "",
        bookName: "",
        bookTypeOne: "",
        bookTypeTwo: "",
        contentRating: "",
        introduction: "",
        language: "",
        period: "",
        writeStatus: "",
        tags: [],
        novelType: "", // 选中的同人类型
        novelBookTitles: [], // 同人书籍名称
        audience: "", // 阅读群体
        matrueFlag: false, // 成年选择
      },
      checkedWebActivityVo: [], // 用户选中的活动ID数组
      EditSelectedWebActivityVo: [], // 编辑书封下放的 参与活动的ID
      isChecked: false,
      tagContent: "",
      throttleFlag: false, // 提交时进行节流控制
      throttleFellowFlag: true, // 书名查询节流
      fellowBookName: "", // 从章节同人创作进入时,原著书籍信息
      searchFellowBookList: [], // 同人书名搜索结果数组
      fellowLength: 0, // 监听formMessage.novelBookTitles长度变化
      tempTagsArr: [], //标签展示容器
      chosenTags: [], // 用户选择的标签集合
      showTagsBlog: true, // 标签选项控制按钮
      selectedTagIdList: [], //编辑状态存放的id数组
      eidtFlag: false, // 编辑状态:  标签不许修改
      chapterId: "null", // 创建同人携带章节id
      // 提示弹窗
      showMaskFlag: false, // 标题的提示mask
      TipContent: [
        'We want to separate stories from originals and fan fic, etc. An example of a crossover would be Sherlock Holmes goes to Mordor! <br><br> Please use [+] or "Enter" key to add the canon source so that the readers can find your work easier. For crossover works, you need to add at least 2 canon sources.',
        "This is important because then we know what age demographic suits your book better.",
        'By using tags, it can reach a larger audience during the search process! I might find a "hidden gem".',
        "1: Explain the plot briefly but in detail and leave it at a cliffhanger (no major spoilers). As Truman Capote mentioned in his book, Music for Chameleons,  “But I'm not a saint yet. I`m an alcoholic. I`m a drug addict. I`m homosexual. I`m a genius.”<br><br>2: Explain the relationships and dynamics involved.",
        "1: We suggest you to make a simple title, which can easily explain the plot and attract audiences who are interested in this genre. For example, “The Postman Always Rings Twice” is better than “The Postman”.<br><br>2: Or create titles with multiple meanings and interpretations. For example, Fifty Shades of Grey suggests the protagonist has a lot of facets of his personality.<br><br>3: Or create a title which perks up the reader’s curiosity. For example, Jesus`Son: Stories Leaves a huge illusion space for readers",
      ],
      // 图片裁切配置项
      cutAvatar: false, // 切头像控制

      imageUrl: require("@/assets/images/common/default_book_bg.png"),
      imageUrlBase: require("@/assets/images/common/default_book_bg.png"),
      cropper: "", // 实例
      coverBlob: "", // 上传用blob

      option: {
        img: require("@/assets/images/common/default_book_bg.png"),
        size: 0.5,
        full: true,
        outputType: "png",
        canMove: true,
        fixedBox: true,
        original: true,
        canMoveBox: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 220,
        centerBox: true,
        high: false,
        enlarge: 1,
        max: 9999,
      },
      show: true,
      fixed: true,
      fixedNumber: [3, 4],
      model: false,
      modelSrc: "",
      crap: false,
      previews: {},
    };
  },
  filters: {
    optionTxt(value, obj, id, val) {
      let newObj = {};
      if (value && obj) {
        for (var i = 0; i < obj.length; i++) {
          newObj[obj[i][id]] = obj[i][val];
        }
        return newObj[value];
      }
      return "";
    },
  },
  methods: {
    // 是否可以参与活动
    judgeJoinAble(activityInfo) {
      // 活动类型点击打点
      $logClick({
        module: "create_cover", // 创建书籍页面
        zone: "djhdlb", // 点击活动列表项
        adid: "click-activity-item", // 点击活动列表项
        map: {
          activityInfo: JSON.stringify(activityInfo), //选择活动的数据
          activityId:activityInfo.activityId
        },
      });

      this.showActivityDisable = false;
      if (activityInfo.count == 0 || !this.canBeAlpha ) {
        // 约稿活动 没资格参与提示语
        this.showActivityDisable = true;
        // ${activityInfo.bookcount}
        if(activityInfo.type == 'INVITATION'){
          this.activityDisableContent = `Oops! You can submit only one entry to the contest. Have more than one great story to tell? <a style="color: rgb(238 55 153);cursor: pointer;" target="_blank" href="${activityInfo.url}#point">Learn More</a>`;
        }else if(activityInfo.type = 'ALPHA'){
          this.activityDisableContent = `Sorry, we do not accept signed stories in this event, you can now create a new one:) <a style="color: rgb(238 55 153);cursor: pointer;" target="_blank" href="${activityInfo.url}#point">Learn More</a>`;
        }else {
          this.showActivityDisable = false;
        }

      }
    },

    // 点击活动"更多"按钮
    handleLearnMore(item) {
      // 活动类型点击打点
      $logClick({
        module: "create_cover", // 创建书籍页面
        zone: "dkhdjsy", // 打开活动介绍页面
        adid: "click-activity-page", // 点击活动列表项
        map: {
          activityInfo: item.url, //选择活动的数据
          activityId:item.activityId ,// 活动id
        },
      });

      // if (url == "default") {
      //   this.$router.push("/facebook_share");
      // } else {
      //   window.location.href = url;
      // }
    },

    // vue-cropper 裁图图片加载回调函数
    imgLoad(msg) {},

    // !uploadImg2  新的图片裁切上传书封
    uploadImg2(e, num) {
      //上传图片
      console.log('??????');
      var file = e.target.files[0];
      console.log(file);
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        this.$msg({
          content: "Please Choose Image",
        });
        return false;
      }
      var reader = new FileReader();
      reader.onload = (e) => {
        let data;
        // if (typeof e.target.result === "object") {
        //   // 把Array Buffer转化为blob 如果是base64不需要
        //   let blob = new Blob([e.target.result]);
        //   data = window.URL.createObjectURL(blob);
        // } else {
        //   data = e.target.result;
        // }
        data = e.target.result;
        if (num === 1) {
          this.option.img = data;
        } else if (num === 2) {
          this.example2.img = data;
        }
      };
      // 转化为base64
      reader.readAsDataURL(file);
      // 转化为blob
      // reader.readAsArrayBuffer(file);
    },

    // !修改缩放
    changeScale(num) {
      num = num || 0.1;
      this.cropper.zoom(num);

      // num = num || 1;
      // this.$refs.cropper.changeScale(num);
    },

    // !下载图片
    down(type) {
      let that = this;
      let cp = this.$refs.cropper;
      cp.getCropBlob((data) => {
        let blob = data;
        // console.log(data.size);
        if (data.size >= 200000) {
          that.$msg({
            content: "File size limit: 200k",
          });
        } else {
          cp.getCropData((data) => {
            that.formMessage.cover = blob;
            this.imageUrl = data;
            this.cutAvatar = false;
          });
        }
      });
    },

    // !---------------------------------------------------

    // 跳過註冊封面
    async skipEdit() {
      $logClick({
        module: "create_book", // 创建书籍
        zone: "tgcj", // 跳过创建
        adid: "skip_create_book_information", // 打开同人推荐
      });

      if (this.$route.query.bookId) {
        $logEvent({
          event: "tgsjbj", //跳过书籍编辑, 由编辑书籍信息进入时点击skip
          map: {
            module: "create_cover_skip",
          },
        });
        this.$router.push("/create_chapter/" + this.$route.query.bookId);
        return;
      }

      let res = await this.$axios.post("/webfic/book/create/skip", {});
      if (res.data.status == 0) {
        // 创建书籍成功
        $logEvent({
          event: "tgcjsjcg", //跳过创建书籍成功
          map: {
            module: "create_cover_skip",
          },
        });
        this.$router.push("/create_chapter/" + res.data.data.bookId);
      } else {
        this.$msg({
          content: "Network Error , Please Try Again Later",
        });
      }
    },

    // 输入内容
    onEditorChange(e) {
      let html = e.target.value;
      // let reg = /<a[^>]*>.*<\/a>/gi;// TODO
      let reg = new RegExp("<s*a[^>]*>(.*?)<s*/s*a>", "g");
      if (html.includes("</a>")) {
        this.$msg({
          content: "Hyperlinks are not supported",
        });
        let htmlFilter = html.replace(reg, "");
        html = htmlFilter;
      }

      this.wordCount = this.dealWordCount(html);
    },

    dealWordCount(content) {
      if (!content) {
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
      return count.length == 0 ? 0 : count.length;
    },

    //提交表单
    async formSubmit() {
      let that = this;
      let url = "/webfic/book/create";

      this.formMessage.period = this.formMessage.period || "CONTEMPORARY"; // 给出默认值
      this.formMessage.writeStatus = this.formMessage.writeStatus || "ONGOING"; // 给出默认值

      // 同人书名校验
      if (
        this.formMessage.novelType == "Alternate" &&
        this.formMessage.novelBookTitles.length == 0
      ) {
        this.$msg({
          content: "Please input the canon source",
        });
        return;
      } else if (
        this.formMessage.novelType == "Crossover" &&
        this.formMessage.novelBookTitles.length <= 1
      ) {
        this.$msg({
          content: "Please input the canon source",
        });
        return;
      } else if (this.formMessage.novelType == "Original") {
        this.formMessage.novelBookTitles = [];
      }

      let tempObj = Object.assign({}, this.formMessage);

      // tags校验
      if (this.chosenTags.length < 0) {
        this.$msg({
          content: " You can only select a maximum of 7 tags",
        });
        return;
      }
      let temparr = [];
      this.chosenTags.forEach(function (item) {
        temparr.push(item.id);
      });
      // tempObj.tags = JSON.stringify(temparr)
      tempObj.tagIds = temparr.join(",");

      // novelType
      this.ocreate.novelTypes.forEach((item) => {
        if (item.value == this.formMessage.novelType) {
          tempObj.novelType = item.key;
        }
      });

      // targetAudience
      this.ocreate.targetAudiences.forEach((item) => {
        if (item.value == this.formMessage.audience) {
          tempObj.targetAudience = item.key;
        }
      });
      // tempObj.targetAudience = this.formMessage.audience;

      // fanfictions
      tempObj.fanfictions = JSON.stringify(this.formMessage.novelBookTitles);

      // 封面校验
      console.log(tempObj.cover);
      if (this.imageUrl && !tempObj.cover) {
        delete tempObj.cover;
      }

      // 同人章节id
      tempObj.chapterId = this.chapterId;

      // mature
      tempObj.mature = this.formMessage.matrueFlag ? "1" : "0";

      tempObj.bookTypeOne = this.ocreate.bookType[0].id;
      this.ocreate.protagonistGender.forEach((item) => {
        if (item.value == tempObj.protagonistGender) {
          tempObj.protagonistGender = item.key;
        }
      });

      // 移除上传的多余属性
      delete tempObj.novelBookTitles;
      delete tempObj.matrueFlag;
      delete tempObj.contentRating;
      delete tempObj.tags;

      // 字符串内容检测
      console.log(tempObj);
      let CheckMessage = Object.values(tempObj);
      this.isChecked = CheckMessage.some(function (item) {
        if (typeof item == "string") {
          return item ? item.trim().length == 0 : true;
        } else if (item != 0) {
          return item ? item.length == 0 : true;
        }
      });
      console.log(CheckMessage);
      if (this.isChecked) {
        this.$msg({
          content: "You have forgot to fill in a required section",
        });
        return;
      }

      // 选中活动ID字符串
      tempObj.activityIds = this.checkedWebActivityVo.join(",");

      // 书籍名称的长度
      if (!checkLength(this.formMessage.bookName.trim(), { min: 0, max: 61 })) {
        this.$msg({
          content: "The length of the book title is 0-60 characters",
        });
        return;
      }

      // 简介长度
      if (
        this.wordCount < 20 ||
        this.wordCount > 300
        // !checkLength(this.formMessage.introduction.trim(), {
        //   min: 19,
        //   max: 301
        // })
      ) {
        // 书籍介绍文字限制
        this.$msg({
          content: "The length of the synopsis is 20-300 words",
        });
        return;
      }

      // 书封信息提交前更新用户邮箱, 更新失败时阻止后续提交
      if (that.showEmail) {
        // 需要用户添加邮箱
        let emailUpdateSuc = false;

        if (that.checkEmail(that.userEmail)) {
          // 邮箱校验合法时 更新

          emailUpdateSuc = await that.updateUserEmail();
        } else {
          // 邮箱校验不合法 提示并阻止后续操作
          that.isChecked = true;
          that.$msg({
            content: "Please input valid email adress !",
          });
          return;
        }
        if (!emailUpdateSuc) return;
      }

      let formData = new FormData();
      for (let key in tempObj) {
        formData.append(key, tempObj[key]);
      }
      if (this.$route.query.bookId) {
        formData.append("bookId", this.$route.query.bookId);
        url = "/webfic/book/update";
      }
      if (this.throttleFlag) {
        return;
      }
      this.throttleFlag = true;

      if (this.$route.query.bookId) {
        // 更新书籍信息
        $logClick({
          module: this.$route.name,
          zone: "djgxsj",
          adid: "update-book",
          map: {
            bookId: this.$route.query.bookId || "",
          },
        });
      } else {
        // 创建新书籍
        $logClick({
          module: this.$route.name,
          zone: "djcjsj",
          adid: "create-book",
        });
      }

      that
        .$axios({
          method: "post",
          url: url,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
          data: formData,
        })
        .then((data) => {
          this.throttleFlag = false;
          if (data.data.status == 0) {
            if (this.$route.query.bookId) {
              // 更新书籍成功
              $logEvent({
                event: "gxsjcg",
                map: {
                  bookId: this.$route.query.bookId || "",
                  module: this.$route.name,
                },
              });
            } else {
              // 创建书籍成功
              $logEvent({
                event: "cjsjcg",
                map: {
                  module: this.$route.name,
                },
              });
            }
            that.ocreate = data.data.data;
            if (this.$route.query.bookId) {
              this.$router.replace("/user_center");
            } else {
              this.$router.replace(`/create_chapter/${that.ocreate.bookId}`);
            }

            return;
          } else if (data.data.status == 12040 ||data.data.status == 12041 || data.data.status == 12042) { // 审核中
            this.$msg({
              content:
                "Your book info is in review. You will be able to make changes after it's proceeded.",
            });
          } else if (data.data.status != 6) {
            this.$msg({
              content: "Network error please try again later",
            });
          }
        })
        .catch((error) => {
          console.info(error);
        });
    },

    bookTypeTwotxt() {
      let that = this;
      for (var i in that.genderList) {
        if (that.genderList[i].id == that.formMessage.bookTypeTwo) {
          that.genderTxt = that.genderList[i].name;
        }
      }
    },

    //genderList
    setGenderList(num) {
      let that = this;
      that.genderTxt = "";
      that.formMessage.bookTypeTwo = "";
      that.genderList = that.ocreate.bookType[num].subTypes;
    },

    uploadImgInit() {
      // 初始化上传图片，可自动裁剪
      var that = this;
      const zxImageProcess = new ZxImageProcess({
        // 默认为空，图片和视频文件，前提是浏览器支持input[accept=]
        accept: "image/*",
        // 自动裁剪
        auto: true,
        // 触发文件选择的元素
        selector: "#buttonId",
        // 限制宽度等比缩放，则只需设置width值
        // 限制高度等比缩放，则只需设置height值
        // 同时设置了width、height值，则会对图片按尺寸裁剪
        // width: 600,
        // height: 800,
        // 裁剪按钮名称
        submitText: "确 定",
        // 裁剪容器按钮样式
        submitStyle: "",
        cancelStyle: "color: red",
        // 旋转按钮名称
        // rotateText: '旋转90度',
        // 文件大小限制:200K
        maxSize: 0.2,
        conversion() {},
        success: function (result) {
          if (result.raw.size && result.raw.size <= 200000) {
            // 返回数据
            that.imageUrl = result.url;
            that.formMessage.cover = result.blob;
          } else {
            that.$msg({
              content: "File size limit: 200k",
            });
          }
        },
        error: function (err) {
          console.error(err);
        },
      });
    },
    uploadImg(e) {
      // 最初开始的原生js上传图片
      let that = this;

      if (!document.getElementById("my_cover").value) return false;

      let file = e.target.files[0];
      that.formMessage.cover = file;

      if (!/image\/jpeg|image\/jpg|image\/png/.test(file.type)) {
        document.getElementById("my_cover").value = "";
        that.imageUrl = "";
        that.formMessage.cover = "";
        console.log("您上传的图片格式正确");
        return false;
      }

      let url = "";
      let reader = new FileReader();
      reader.onload = function (event) {
        let data = event.target.result;
        let oimg = new Image();
        oimg.onload = function () {
          let w = oimg.width;
          let h = oimg.height;
          if (w != 600 || h != 800) {
            document.getElementById("my_cover").value = "";
            that.imageUrl = "";
            console.log("您上传的图片宽高不匹配");
            that.formMessage.cover = "";
            that.$msg({
              content:
                "The width and height of the picture you uploaded do not match",
            });
            return false;
          }
          url = data.substring(data.indexOf(",") + 1);
          that.imageUrl = "data:image/png;base64," + url;
        };
        oimg.src = data;
      };
      reader.readAsDataURL(file);
    },
    async getAttributes() {
      let res = await this.$axios.post("/webfic/book/attributes", {});
      if (res.data.status == 0) {
        this.ocreate = res.data.data;
        this.genderList = this.ocreate.bookType[0].subTypes;
        this.$store.dispatch("moduleHome/changeLoadingStatus", true);
      }
    },
    async getBookInfo() {
      let res = await this.$axios.post("/webfic/book/edit/detail", {
        bookId: this.$route.query.bookId,
      });
      if (res.data.status == 0) {
        let temp = res.data.data.book;
        this.chapterId = temp.chapterId || "null";
        if(temp.cover){
          this.imageUrlBase = temp.cover; // 预览用
          this.imageUrl = temp.cover; // 上传用
        }
        // this.option.img = temp.cover; // 切头像默认链接

        if (temp.introduction && temp.introduction.length > 0) {
          this.wordCount = this.dealWordCount(temp.introduction);
        }
        // console.log(res.data.data.canBeAlpha == 0);
        this.canBeAlpha =  res.data.data.canBeAlpha == 0 ? false : true ;
        this.formMessage.bookName = temp.bookName;
        this.formMessage.bookTypeOne = temp.typeOneIds ? temp.typeOneIds[0] : "";
        this.formMessage.bookTypeTwo = temp.typeTwoIds ? temp.typeTwoIds[0] : "";
        this.genderList = this.ocreate.bookType ? this.ocreate.bookType[0].subTypes : {}; // 性别列表修改默认第一条
        // .filter(item => {
        //   return this.formMessage.bookTypeOne == item.id;
        // })[0].subTypes || {};

        this.bookTypeTwotxt();

        this.formMessage.writeStatus = temp.writeStatus;
        this.formMessage.introduction = temp.introduction;
        // this.formMessage.tags = temp.labels || [];
        this.formMessage.period = temp.period;
        this.formMessage.language = temp.language;
        this.formMessage.contentRating = temp.grade;
        this.ocreate.targetAudiences.forEach((item) => {
          if (item.key == temp.targetAudience) {
            this.formMessage.audience = item.value;
          }
        });
        // this.formMessage.audience = temp.targetAudience;
        this.formMessage.matrueFlag = temp.mature == 1 ? true : false;

        // 主角
        this.ocreate.protagonistGender.forEach((item) => {
          if (item.key == temp.protagonistGender) {
            this.formMessage.protagonistGender = item.value;
          }
        });
        // 已选Tagid数组
        this.eidtFlag = true;
        this.selectedTagIdList = [];
        this.chosenTags = [];
        let tempArr = [];
        let that = this;
        for (let key in this.ocreate.labels) {
          tempArr = tempArr.concat(this.ocreate.labels[key]);
        }
        if (temp.tagIds && temp.tagIds.split) {
          temp.tagIds.split(",").forEach(function (income) {
            tempArr.forEach(function (item) {
              if (income == item.id) {
                // 修改为id
                that.selectedTagIdList.push(item);
                item.selected = true;
                that.chosenTags.push(item);
              }
            });
          });
        }

        // NovelType
        this.ocreate.novelTypes.forEach((item) => {
          if (item.key == temp.novelType)
            this.formMessage.novelType = item.value;
        });
        this.formMessage.novelBookTitles =
          (temp.fanfictions && JSON.parse(temp.fanfictions)) || [];
        this.fellowLength = this.formMessage.novelBookTitles.length;

        // 活动
        if (res.data.data.activityIds) {
          this.EditSelectedWebActivityVo = res.data.data.activityIds;
          this.checkedWebActivityVo = this.checkedWebActivityVo.concat(
            this.EditSelectedWebActivityVo
          );
        }
        // TODO假数据
        // this.EditSelectedWebActivityVo = ["1"];
        // this.checkedWebActivityVo = this.checkedWebActivityVo.concat(
        //   this.EditSelectedWebActivityVo
        // );
      }
    },

    async getFellowBookName(bookId) {
      let res = await this.$axios.post("/webfic/book/reader.do", {
        bookId: bookId,
      });
      if (res.data.status == 0) {
        // 阅读进入默认是同人
        this.formMessage.novelType = "Alternate";
        this.fellowBookName = "";
        this.formMessage.novelBookTitles.push({
          originalBookName: res.data.data.bookName,
          originalBookId: bookId,
          chapterId: "null",
        });
        this.$forceUpdate();
      }
    },

    // 联想请求search接口,
    searchFellowBook(e) {
      if (!this.throttleFellowFlag) return;

      let val = e.target.value;
      // this.fellowBookName = val;
      if (val.trim().length <= 0) {
        this.searchFellowBookList = [];
        return;
      }

      this.throttleFellowFlag = false;
      this.$axios({
        method: "post",
        url: "/webfic/book/suggest",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: {
          keyword: val,
          pageNo: 1,
          type: "DEFAULT",
          rid: "string",
          pageSize: 10,
        },
      })
        .then((res) => {
          if (res.data.status == 0) {
            this.searchFellowBookList = res.data.data;
          } else {
            this.$msg({
              content: "Network error please try again later",
            });
          }
          this.throttleFellowFlag = true;
        })
        .catch((err) => {
          this.throttleFellowFlag = true;
          console.log(err);
        });
    },

    // 联想列表点击
    selectBookTitle(bookInfo) {
      // 長度檢測
      if (
        this.formMessage.novelType == "Crossover" &&
        this.formMessage.novelBookTitles.length == 5
      ) {
        this.$msg({
          content: "You must have at most 5 different canon source",
        });
        this.fellowBookName = "";
        this.searchFellowBookList = [];
        return;
      }

      let flag = true;
      this.formMessage.novelBookTitles.forEach((item, index) => {
        if (
          bookInfo.originalBookId == item.originalBookId ||
          bookInfo.originalBookName == item.originalBookName
        ) {
          flag = false;
        }
      });
      if (flag) this.formMessage.novelBookTitles.push(bookInfo);
      this.fellowLength = this.formMessage.novelBookTitles.length;
      this.fellowBookName = "";
      this.searchFellowBookList = [];
    },

    // 回车录入
    bookAdd() {
      this.addFellowBook({
        target: this.$refs.search_inp,
      });
    },
    addFellowBook(e) {
      let val = e.target.value.trim();
      if (val.length <= 0) return;
      let tempItem = {
        originalBookName: val,
        originalBookId: "",
        chapterId: "null",
      };

      // 去重
      let flag = true;
      this.formMessage.novelBookTitles.forEach((item, index) => {
        if (val == item.originalBookName) {
          flag = false;
        }
      });
      // 長度檢測
      if (
        this.formMessage.novelType == "Crossover" &&
        this.formMessage.novelBookTitles.length == 5
      ) {
        this.$msg({
          content: "You must have at most 5 different canon source",
        });
        this.fellowBookName = "";
        this.searchFellowBookList = [];
        return;
      }

      // 搜索結果中是否存在當前書籍,找id
      let slist = this.searchFellowBookList;
      if (slist.length > 0) {
        let searchResult = slist.filter((item) => {
          return item.originalBookName == val;
        })[0];
        if (searchResult) tempItem.originalBookId = searchResult.originalBookId;
      }

      // 添加到選擇結果中
      if (flag) {
        this.formMessage.novelBookTitles.push(tempItem);
      }
      this.fellowLength = this.formMessage.novelBookTitles.length;
      this.fellowBookName = "";
      this.searchFellowBookList = [];
    },

    // 删除选择项
    delSelected(index) {
      this.formMessage.novelBookTitles.splice(index, 1);
      this.fellowLength = this.formMessage.novelBookTitles.length;
    },

    // 标签标题选择
    selectTagTitle(key) {
      this.tempTagsArr = this.ocreate.labels[key];
    },

    // 标签内容选择
    collectTags(item) {
      if (this.chosenTags.length >= 7) {
        this.$msg({
          content: " You can only select a maximum of 7 tags",
        });
        this.chosenTags = this.chosenTags.splice(0, 7);
        return;
      }
      let flag = this.chosenTags.every(function (old) {
        return old.id != item.id;
      });
      if (flag) {
        this.chosenTags.push(item);
        for (const key in this.ocreate.labels) {
          if (this.ocreate.labels.hasOwnProperty(key)) {
            const element = this.ocreate.labels[key];
            if (element instanceof Array) {
              element.forEach((old) => {
                if (old.id == item.id) {
                  old.selected = true;
                }
              });
            }
          }
        }
        // this.ocreate.labels[item.labelGroup].forEach(old => {
        //   if (old.id == item.id) {
        //     old.selected = true;
        //   }
        // });
      }
      this.$forceUpdate();
    },

    // 标签删除
    delTag(tag) {
      this.chosenTags.forEach((item, index) => {
        if (item.id == tag.id) {
          this.chosenTags.splice(index, 1);

          for (const key in this.ocreate.labels) {
            if (this.ocreate.labels.hasOwnProperty(key)) {
              const element = this.ocreate.labels[key];
              if (element instanceof Array) {
                element.forEach((old) => {
                  if (old.id == tag.id) {
                    delete old.selected;
                  }
                });
              }
            }
          }
        }
      });
      this.$forceUpdate();
    },

    // 清空搜索框
    cls_search() {
      this.fellowBookName = "";
      this.searchFellowBookList = [];
    },
    // 展示tipMask
    handleShowTipMask(currentTipMask) {
      this.handleCloseTipMask(false);
      this.currentTipMask = currentTipMask;
      this.showMaskFlag = true;
    },
    // 关闭弹窗
    handleCloseTipMask(flag) {
      this.showMaskFlag = flag;
      this.currentTipMask = "";
    },

    // 查询用户是否有邮箱
    async getUserInfo() {
      let res = await this.$axios.post("/webfic/profile/user/info", {
        id: this.userInfo.id,
      });
      if (res.data.status == 0 && res.data.data) {
        this.userEmail = res.data.data.email;
        // this.userEmail = undefined;
        if (this.userEmail) {
          this.showEmail = false;
        } else {
          this.showEmail = true;
        }
      }
    },

    // 提交用户邮箱
    async updateUserEmail() {
      let that = this;
      let formData = new FormData();
      formData.append("nickname", that.userInfo.nickname);
      formData.append("email", that.userEmail);
      let res = await that.$axios.post("/webfic/profile/user/edit", formData);

      if (res.data.status == 0) {
        // 更新成功返回true, 继续提交表单
        return true;
      } else {
        // 更新失败返回false阻止 表单提交
        this.$msg({
          content: "Network Error: " + res.data.data.status,
        });
        return false;
      }

      console.log(res);
      return false;
    },

    // 初始cropper
    initCropper() {
      var self = this;
      var image = document.getElementById("image");
      this.cropper = new Cropper(image, {
        aspectRatio: 3 / 4,
        viewMode: 3,
        background: false,
        zoomable: false,
        minContainerWidth: 270,
        minContainerHeight: 360,
        ready: function () {
          self.croppable = true;
        },
      });
    },
    change(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.panel = true;
      this.picValue = files[0];
      // console.log(files[0]);
      if (this.picValue.size >= 200 * 1024) {
        this.$msg({
          content: "File size limit: 200k",
        });
        return;
      }
      let imageUrl = this.getObjectURL(this.picValue);
      //每次替换图片要重新得到新的url
      if (this.cropper) {
        this.cropper.replace(imageUrl);
      }
    },
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    crop() {
      var croppedCanvas;
      var roundedCanvas;
      // Crop
      croppedCanvas = this.cropper
        .getCroppedCanvas({
          // maxWidth:600,
          // maxHeight:800,
          maxWidth: 4096,
          maxHeight: 4096,
          imageSmoothingQuality: "low",
        })
        .toBlob(async (blob) => {
          // console.log(blob);
          // 上传使用blob
          this.coverBlob = blob;
          this.formMessage.cover = blob;

          // 预览转base64
          let reader = new FileReader();
          reader.onload = (e) => {
            this.imageUrlBase = e.target.result;
            this.cutAvatar = false;
          };
          reader.readAsDataURL(blob);
        }, "image/jpeg"); // 图片要小

      // 预览使用base64
    },
    // 校验活动ID是否是已选的
    IsSelected(item) {
      if (this.EditSelectedWebActivityVo.length == 0) {
        return false;
      }
      let isSelectedFlag = false;
      this.EditSelectedWebActivityVo.forEach((selectedItemId, index) => {
        if (selectedItemId == item.activityId) {
          isSelectedFlag = true;
        }
      });
      // console.log("isSelectedFlag" + isSelectedFlag);
      return isSelectedFlag;
    },
  },
  async mounted() {
    this.initCropper();

    this.checkEmail = checkEmail;

    // 查询用户信息
    this.getUserInfo();

    // 如果创作同人
    if (this.$route.query.fellowBookId) {
      let _this = this;
      let bookId = _this.$route.query.fellowBookId;
      this.chapterId = this.$route.query.chapterId || "null"; // 同人创作的章节id
      this.getFellowBookName(bookId);
    }

    await this.getAttributes();

    // 狼人活动进入的创建书封页事件打点
    if(this.$route.query.alphaId){
      $logEvent({
        event: "from_alpha_join",
          map: {
            module: "create_cover",
          },
      })
    }

    if(this.$route.query.clientAlphaId){
      $logEvent({
        event: "from_client_alpha_join",
          map: {
            module: "create_cover",
          },
      })
    }

    if (
      (this.$route.query.fromActivityId || this.$route.query.alphaId || this.$route.query.clientAlphaId) &&
      this.ocreate &&
      this.ocreate.activities &&
      this.ocreate.activities.length > 0
    ) {
      this.fromActivityId = this.$route.query.fromActivityId || this.$route.query.alphaId;
      this.ocreate.activities.forEach((item) => {
        if (item.activityId == this.fromActivityId && item.count != 0) {
          this.checkedWebActivityVo.push(item.activityId);
        }
      });
    }

    if (this.$route.query.bookId) {
      this.getBookInfo();
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.moduleHome.userInfo,
    }),
  },
  watch: {
    // 同人数量限制
    fellowLength: function (v2, v1) {
      if (this.formMessage.novelType == "Alternate" && v2 >= 2) {
        this.$msg({
          content: "You must have 1 canon source",
        });
        this.formMessage.novelBookTitles = this.formMessage.novelBookTitles.splice(
          0,
          1
        );
        this.fellowLength = 1;
      }

      if (this.formMessage.novelType == "Crossover" && v2 < 2) {
        this.$msg({
          content: "You must have at least 2 different canon source",
        });
      }
      if (this.formMessage.novelType == "Crossover" && v2 > 5) {
        this.$msg({
          content: "You must have at most 5 different canon source",
        });
        this.formMessage.novelBookTitles = this.formMessage.novelBookTitles.splice(
          0,
          6
        );
        this.fellowLength = 5;
      }
    },
    // 同人选中状态
    formMessage: {
      handler(v2, v1) {
        if (v2.novelType == "Alternate" && this.fellowLength > 1) {
          this.formMessage.novelBookTitles = this.formMessage.novelBookTitles.splice(
            0,
            1
          );
          this.fellowLength = 1;
        };
        // emoji书名过滤
        // console.log("???");
        this.formMessage.bookName =  removeEmoji(v2.bookName || '');
      },
      deep: true,
    },
  },
  beforeRouteUpdate() {
    // console.log(this.$route.fullPath);
  },
  destroyed() {
    this.$store.dispatch("moduleHome/changeLoadingStatus", false);
  },
  components: {
    TipMask
  },
};
</script>
