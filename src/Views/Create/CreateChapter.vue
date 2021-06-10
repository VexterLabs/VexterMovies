<template>
  <div class="chapter">
    <div class="box">
      <div id="test"></div>

      <div class="side-bar">
        <!-- 左1 -->
        <div class="top">
          <div class="side-bar-title" @click="handleAddChapter">New Chapter +</div>
          <!-- <div class="btn-collapse-toggle"></div> -->
        </div>
        <!-- 左2 -->
        <div class="scroll-view" ref="scrollView">
          <ul class="episode-list">
            <li
              v-for="(item,index) in chapterList"
              v-if="!(index == chapterList.length-1 && (isCompeleted || isUnsuport))"
              :key="index"
              :class="['episode-unit',
                      {'on': index == currentIndex},
                      {'active': item.active} ,
                      {'active1': item.active1} ,
                      {'in_review_li':item.checkInfo && (item.checkInfo.checkStatus == 'CHECKING' || item.checkInfo.checkStatus == 'UNCHECK')},
                      {'refuse_li': item.checkInfo && (item.checkInfo.checkStatus == 'REFUSE') }]"
              @click="changeSelectIndex(index)"
            >
              <div class="episode-info">
                <!-- 名称 -->
                <div
                  class="episode-name"
                  :class="{'no-chapter-name': !item.chapterName}"
                >{{item.chapterName || item.placholder}}</div>

                <!-- 状态:未发布, 已发布字数时间, 定时发布状态 -->
                <div class="icon" v-if="chapterList.length > 1">
                  <span class="status" v-if="!item.publishTime">Unpublished</span>
                  <span
                    class="status"
                    v-if="item.publishTime"
                  >{{item.wordNum}}words&nbsp;&nbsp;{{item.publishTime}}</span>
                  <span class="speed" v-if="item.status == 0 && item.publishTime">
                    <i></i>
                    <span class="speed_inner" :style="'width:'+handleWidthPercent(item)"></span>
                  </span>
                  <span class="icon-more" @click="showMoreBtn(index)">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </div>

                <!-- 审核状态 -->
                <div class="review">
                  <!-- 审核中 -->
                  <div class="review_item in_review"
                    v-if="item.checkInfo && (item.checkInfo.checkStatus == 'CHECKING' || item.checkInfo.checkStatus == 'UNCHECK')">
                    <span class="review_title">In Review : </span>Your last modification is still in review, and you will be able to update after. You may contact your editor for progress.
                  </div>
                  <!-- 已拒绝 -->
                  <div class="review_item refuse" v-if=" item.checkInfo && item.checkInfo.checkStatus == 'REFUSE'">
                    <span class="review_title">Refuse : </span>{{ item.checkInfo && item.checkInfo.rejectReason}}
                  </div>
                  <span class="refuse_resume"  v-if=" item.checkInfo && item.checkInfo.checkStatus == 'REFUSE' && item.checkInfo.restore" @click.self="handleResume(item)">resume</span>
                </div>
              </div>
              <div class="btn-del" @click.stop="handleRemoveChapter(index)">Delete</div>
              <div
                class="btn-del btn-pub"
                @click.stop="handleClickPublishBtn(index)"
                v-if="item.status!=1"
              >Publish</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="editor">
        <div class="title">
          <transition name="moveR">
            <div class="handle-pop" v-if="isShow">
              <div class="handle-pop-close" @click="isShow = false">
                <i></i>
                <i></i>
                <i></i>
              </div>
              <div class="group">
                <div class="edit-story item" @click.stop="openStory">Manage Story</div>
                <div class="delete-story item" @click.stop="openTrash">Trash</div>
              </div>
            </div>
          </transition>

          <div class="handle" @click="isShow = true">
            <i></i>
            <i></i>
            <i></i>
          </div>

          <input type="text" placeholder="Chapter Title" v-model="currentChapter.chapterName" />
        </div>
        <!-- UQuillEditor  ql-editor-->
        <!-- <quill-editor
          class="qetor"
          ref="chapterEditor"
          v-model="currentChapter.content"
          :options="editorOption"
          @change="onEditorChange($event)"
        ></quill-editor>-->

        <editor v-model="currentChapter.content" :init="editorInit"></editor>

        <!-- <ckeditor
          class="qetor"
          ref="chapterEditor"
          v-model="currentChapter.content"
          :config="ckEditorConfig"
        ></ckeditor>-->

        <div class="menu">
          <div class="menu-publish menu_save" @click="handleSave">Save</div>
          <div class="menu-publish menu_preview" @click="handlePreview">Preview</div>
          <div
            v-show="currentChapter.status != 1"
            class="menu-publish menu_pub"
            @click="handleClickPublishBtn(currentIndex)"
          >Publish</div>
          <div class="menu-count">{{wordCount}} words</div>
        </div>
      </div>
      <v-loadding v-if="throttleFlag || !canClick"></v-loadding>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import animate from "animate.css";
let gobalCurrentChapter = { content: "", chapterName: "" };
import { getMiliSec } from "@/core/js/common.js";
import Loadding from "@/components/global/loadding/Loadding.vue";

// import tinymce from "tinymce/tinymce";
// import Editor from "@tinymce/tinymce-vue";
// import 'tinymce/themes/silver/theme'
import {removeEmoji} from "@/core/js/common.js";

export default {
  data() {
    return {
      chapterList: [
        // testSelf 是为了标识是本地加的数据，为了让id和服务器的做区别，是本地数据时保存时，id传空
        {
          id: new Date().getTime(),
          chapterName: "",
          active: false,
          content: "",
          testSelf: true,
          placholder: "Untitled Chapter"
        }
      ],
      currentIndex: 0,
      currentChapter: {
        chapterName: "",
        content: ""
      },
      bookId: "",
      editorInit: {
        toolbar: "bold italic",
        skin_url: "/static/tinymce/skins/lightgray",
        height: 504,
        branding: false,
        menubar: false,
        resize: false,
        elementpath: false
      },
      isShow: false,
      isload: false,
      wordCount: 0,
      canClick: true, // 切换章节的锁
      status: 0, // 书籍状态，0是草稿，1是正常发布，2是删除
      throttleFlag: false, // 提交时节流控制,
      isPublishFlag: true, // 是不是点击了发布章节按钮
      latestPublishTime: "2020-04-20", //章节最近发布时间
      isCompeleted:false, // 写作状态
      isUnsuport:false, // 是否下架
      publishTime: "", // 发布时间
      cover: false, // 書封
      serverTime: 0, // 服务器时间
      userInitTime: 0, // 接受list请求时客户端时间

      initContent: "" ,// 还原章节内容的参照文件
      resumeId:false ,// 还原章节的ID
    };
  },
  computed: {},
  created(){
   
  },
  mounted() {
    this.bookId = this.$route.params.id;
    this.getBookInfo();
    this.getChapterList();
    tinymce.init({});
  },
  methods: {
    async getBookInfo(){
      let res = await this.$axios.post('/xsdq/book/edit/detail' , {
        bookId:this.bookId
      });
      if(res.data.status == 0){
        this.bookInfo = res.data.data.book;
      }else if(res.data.status == 12000){
        this.$msg({
          content:"Book not exist , please try again later!"
        })
        this.$router.back();
      }else{
        this.$msg({
          content:"Network error , please try again later!"
        })
      }
    },

    onEditorChange(e) {
      // 输入内容
      let html = e.html;
      // let reg = /<a[^>]*>.*<\/a>/gi;// TODO
      let reg = new RegExp("<s*a[^>]*>(.*?)<s*/s*a>", "g");
      if (e.html.includes("</a>")) {
        this.$msg({
          content: "Hyperlinks are not supported"
        });
        let htmlFilter = e.html.replace(reg, "");
        e.html = htmlFilter;
        this.currentChapter.content = htmlFilter;
      }

      this.wordCount = this.dealWordCount(e.text);
    },
    // 计算内容字数
    dealWordCount(content) {
      if (!content) {
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
      return count.length == 0 ? 0 : count.length;
    },

    // 拿CDN文件资源
    async handleToggleList(index) {
      // 切换章节之后的获取章节信息
      if (!this.canClick) {
        return;
      }
      this.canClick = false;
      let tempChapter = this.chapterList[index];
      if (tempChapter.filePath) {
        if (!tempChapter.testSelf && !tempChapter.content) {
          let res = await this.$axios.get(tempChapter.reqUrl);
          tempChapter.content = res.data;
        }
      } else {
        tempChapter.content = "";
      }
      this.currentIndex = index;
      this.currentChapter = tempChapter;
      this.currentChapter.content = this.currentChapter.content
        ? this.currentChapter.content
        : "";
      this.currentChapter.chapterName = this.currentChapter.chapterName
        ? this.currentChapter.chapterName
        : "";
      gobalCurrentChapter = { ...this.currentChapter };

      if(gobalCurrentChapter.content){
        gobalCurrentChapter.content = gobalCurrentChapter.content+'';
      }

      // console.log(gobalCurrentChapter);

      this.canClick = true;
    },

    // 点击章节列表 currentChapter切换列表之前正在显示的章节内容
    async changeSelectIndex(index) {
      if (this.currentIndex == index) {
        return;
      }

      // 如果currentIndex章节是已签约书籍&&已发布章节&&审核中的章节,点击时不进行自动保存
      let currentChapter = this.chapterList[this.currentIndex];
      let cp2 = this.chapterList[index];
      if(cp2.status == 1 && cp2.checkInfo &&  cp2.checkInfo.checkStatus == 'CHECKING'&& (this.bookInfo.contractStatus == 'SIGNED'||this.bookInfo.contractStatus == 'ARCHIVED')  ){
        this.handleToggleList(index);
        return;
      }

      // this.isPublishFlag = false;
      // 切换章节，如果是从后台拿到的数据，需要先通过接口获取章节内容，存到本地数据，下次就不需要请求接口了
      let reg = /<[^>]+>/gim;

      if (
        gobalCurrentChapter.content.replace(/\s*/g, "").trim() ==
          this.currentChapter.content.replace(/\s*/g, "").trim() &&
        gobalCurrentChapter.chapterName.trim() ==
          this.currentChapter.chapterName.trim()
      ) {
        this.handleToggleList(index);
      } else {
        // 当前内容和原来的章节内容或者章节名称只要有不相同的就调用接口
        this.status = this.currentChapter.status == 1 ? 1 : 0;

        // 立即发布的 和 定时发布的: 提示用户未保存
        if (
          this.status == 1 ||
          (this.status == 0 && this.currentChapter.publishTime)
        ) {
          // 弹窗通知用户 停留在当前页还是离开?
          this.$msgBox({
            type: "autosave",
            content: "The content has been modified.Are you sure to leave?"
          }).then(val => {
            if (val) {
              // 还原为修改前章节内容
              this.chapterList[this.currentIndex].chapterName =
                gobalCurrentChapter.chapterName || "";
              this.chapterList[this.currentIndex].content =
                gobalCurrentChapter.content || "";
              this.handleToggleList(index);
            }
          });
        } else if (this.status == 0 && !this.currentChapter.publishTime) {
          // 草稿的做自动保存

          // this.publishTime = new Date(
          //   this.currentChapter.publishTime
          // ).getTime();
          this.handlePublishChapter(this.currentIndex);
          this.handleToggleList(index);
        }
      }
    },
    //划出删除章节按钮
    showMoreBtn(index, flag) {
      let cuItem = this.chapterList[index];
      this.chapterList.forEach((item, i) => {
        if (index != i) {
          item.active1 = false;
          item.active = false;
        } else {
          if (cuItem.status == 1) {
            this.chapterList[index].active1 = !this.chapterList[index].active1;
            this.chapterList[index].active = false;
          } else {
            this.chapterList[index].active = !this.chapterList[index].active;
            this.chapterList[index].active1 = false;
          }
        }
      });
    },
    async getChapterList() {
      let res = await this.$axios.post("/xsdq/chapter/edit/list", {
        bookId: this.bookId
      });
      if (res.data.status == 0) {
        const data = res.data.data;

        // 服务器时间 + 客户端从请求到发布的时间差 + 1800*1000ms  就是服务器允许发布的合法时间
        this.serverTime = data.currentTime - 0;
        this.userInitTime = new Date().getTime() - 0;

        this.lastChapterTime = res.data.data.book.lastChapterTime;
        // 已完成的书籍状态记录
        this.isCompeleted = res.data.data.book.writeStatus == "ONGOING" ? false : true;
        this.isUnsuport = res.data.data.book.status == "OFF_SHELF" ? true : false;
        
        // 已完成的书籍清空默认项数组
        this.cover = res.data.data.book.cover;
        if (data.volumes && data.volumes.length > 0) {
          let chapters = data.volumes[0].chapters || [];
          chapters.map(item => {
            item.active = false;
            item.active1 = false;
            item.content = "";
            item.reqUrl = item.filePath;
          });
          this.chapterList = chapters.concat(this.chapterList);
        } else {
        }

        // 完结状态默认最后一章id为当前激活id
        if(this.isCompeleted || this.isUnsuport){
          this.resumeId = this.chapterList[this.chapterList.length-2].id;
        }

        // 获取当前选中章节index和章节信息
        if(this.resumeId){ // 审核恢复,重新加载列表后, 默认选中 恢复项.
          let that = this;
          this.chapterList.forEach((item , index)=>{
            if(item.id == that.resumeId){
              that.currentIndex = index;
            }
          })
          this.currentChapter = this.chapterList[this.currentIndex];
          console.log(this.currentChapter)
          this.currentChapter.chapterName = this.currentChapter.chapterName;
          let res = await this.$axios.get(this.currentChapter.filePath);
          this.currentChapter.content = res.data;
          this.resumeId = false;
        }else{
          this.currentIndex = this.chapterList.length - 1;
          this.currentChapter = this.chapterList[this.currentIndex];
          this.currentChapter.content = this.currentChapter.content
            ? this.currentChapter.content
            : "";
          this.currentChapter.chapterName = this.currentChapter.chapterName
            ? this.currentChapter.chapterName
            : "";
          // 左侧章节栏滚动到底部
          this.$nextTick(() => {
            this.$refs.scrollView.scrollTop = 999999999;
          });
        }
        gobalCurrentChapter = { ...this.currentChapter };
      }
    },
    judgeChapterContent() {
      // 判断是否符合保存章节的条件
      if (!this.currentChapter.chapterName.trim()) {
        this.$msg({
          content: "Title cannot be empty"
        });
        return true;
      }
      if (!this.currentChapter.content.trim()) {
        this.$msg({
          content: "Content cannot be empty"
        });
        return true;
      }

      if (this.currentChapter.chapterName.trim().length > 200) {
        this.$msg({
          content: "Chapter name is limited to 200 characters"
        });
        return true;
      }
      if (this.wordCount < 100) {
        this.$msg({
          content: "Chapter content at least 100 words！"
        });
        return true;
      }
    },

    handleClickPublishBtn(index) {
      $logClick({
        module: "create_chapter", // 创建章节页面
        zone: "djfbzj", // 点击发布章节
        adid: "click_publish" // 点击发布
      });

      // 没有封皮发布前先自动保存
      if (!this.cover) {
        this.handleSave();
      }
      this.currentChapter = this.chapterList[index];
      this.targetIndex = index;
      if (this.judgeChapterContent()) return;
      // 点击发布按钮
      this.isPublishFlag = true;
      // if (this.throttleFlag) {
      //   return;
      // }

      // 设置合法时间    save有时间戳就要上传发布时间
      let allowTime = this.initTime(
        this.serverTime +
          (new Date().getTime() - this.userInitTime) +
          900 * 1000
      ); // 允许的合法时间

      // 弹窗
      this.$msgBox({
        type: "publish",
        title: "Upload your chapter automatically",
        tips: this.lastChapterTime
          ? [`Latest chapter: Publish on ${this.lastChapterTime}`]
          : [""],
        publishTime: allowTime
      }).then(async val => {
        // 定时发布-状态:草稿, 有publishtime
        if (val && !val.rightNow && val.publishTime) {
          $logEvent({
            event: "xzdsfb", //选择定时发布
            map: {
              module: "set_time_publish" // 设置定时发布
            }
          });

          this.publishTime = val.publishTime;
          this.throttleFlag = true;
          this.status = 0;
          this.handlePublishChapter(this.currentIndex, "time");

          // 立即发布  状态:非草稿, 无publishTime
        } else {
          $logEvent({
            event: "xzljfb", //选择立即发布
            map: {
              module: "set_publish_now" // 设置立即发布
            }
          });

          this.status = 1;
          this.publishTime = "";

          this.throttleFlag = true;
          this.handlePublishChapter(this.currentIndex);
        }
      });
    },

    initTime(timestamp) {
      var date = new Date(timestamp);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },

    async handlePublishChapter(targetIndex, time) {
      // 空书皮检测
      if (
        (this.status == 1 || (this.status == 0 && this.publishTime)) &&
        !this.cover
      ) {
        this.$msg({
          content: "Please Complete Your Story Information First"
        });
        this.$router.push("/create_book/?bookId=" + this.bookId);
        return;
      }

      // 发布点击打点
      if (this.status == 1 && this.isPublishFlag) {
        // 发布章节
        $logClick({
          module: this.$route.name,
          zone: "djfbzj",
          adid: "publish-chapter",
          map: {
            bookId: this.bookId || "",
            chapterId: this.currentChapter.testSelf
              ? ""
              : this.currentChapter.id
          }
        });
      }

      // 准备发送数据格式
      let tempStatus = this.status;
      let chapterVo = {
        chapterName: this.currentChapter.chapterName,
        content: this.currentChapter.content,
        id: this.currentChapter.testSelf ? "" : this.currentChapter.id,
        status: tempStatus
      };
      // 是否是定时发布: 加发布时间参数
      if (time) {
        chapterVo.publishTime = this.publishTime;
      } else {
        delete chapterVo.publishTime;
      }

      // 提交请求
      let res = await this.$axios.post("/xsdq/chapter/save", {
        bookId: this.bookId,
        chapterVo: chapterVo
      });

      // 加锁
      this.throttleFlag = false;

      if (tempStatus == 1) {
        // 立即发布的响应处理
        // if (this.isPublishFlag) {
        // 如果是点击发布章节的按钮的话，就做如下处理
        if (res.data.status == 0) {
          // 如果是发布的话刷新章节列表
          this.chapterList = [
            {
              id: new Date().getTime(),
              chapterName: "",
              active: false,
              content: "",
              testSelf: true
            }
          ];
          this.getChapterList();
          // 发布章节成功
          $logEvent({
            event: "fbzjcg",
            map: {
              bookId: this.bookId || "",
              chapterId: res.data.data.id,
              module: this.$route.name
            }
          });
          return;
        }
        if (res.data.status == 1) {
          this.$msg({
            content: "Chapter content at least 100 words！"
          });
          return;
        }
        if (res.data.status != 6) {
          this.$msg({
            content: "Network error please try again later"
          });
        }
        // }
      } else {
        // 定时发布或保存响应数据处理
        if (chapterVo.publishTime && res.data.status == 0) {
          // 定时发布
          $logEvent({
            event: "dsfbcg", //定时发布成功
            map: {
              module: "set_time_publish_suc", // 定时发布成功
              bookId: this.bookId || "",
              chapterId: res.data.data.id
            }
          });
        } else if (!chapterVo.publishTime && res.data.status == 0) {
          // 保存
          $logEvent({
            event: "bccg", //保存成功
            map: {
              module: "save_suc", // 保存成功
              bookId: this.bookId || "",
              chapterId: res.data.data.id
            }
          });
        }

        this.chapterList = [
          {
            id: new Date().getTime(),
            chapterName: "",
            active: false,
            content: "",
            testSelf: true
          }
        ];
        this.getChapterList();
        return;
      }
    },
    handleAddChapter() {
      if(this.isCompeleted || this.isUnsuport){
        this.$msg({
          content:"Completed already.if you wanna add new chapter,plz contact your editor"
        })
        return
      };
      // 新增一个章节
      this.chapterList.push({
        id: Date.now(),
        chapterName: "",
        active: false,
        content: "",
        testSelf: true,
        placholder: "Untitled Chapter"
      });
    },
    //删除当前选中章节  如果只有一个章节  不予以删除
    async handleRemoveChapter(index) {

      // 已签约书籍中已发布章节不允许删除
      if(this.chapterList[index].status == 1 && (this.bookInfo.contractStatus == 'SIGNED' || this.bookInfo.contractStatus == 'ARCHIVED')){
        this.$msg({
          content:"Oops, you are trying to delete a chapter of a contracted book. Is there a problem? You may contact your editor for the problem."
        })
        return ;
      }

      if (this.chapterList[index].testSelf) {
        this.chapterList.splice(index, 1);
        if (this.currentIndex >= index) {
          this.currentIndex =
            this.currentIndex == 0 ? 0 : this.currentIndex - 1;
          this.currentChapter = this.chapterList[this.currentIndex];
          gobalCurrentChapter = this.currentChapter;
        }
        return;
      }
      this.$msgBox({
        type: "delete",
        title: "Confirm Chapter Delete",
        tips: [
          "1. All the records , including reads and comments for this chapter will be deleted.",
          "2. This episode will no longer be on GoodNovel.",
          "3. You can recover the deleted chapter in the Trash."
        ]
      }).then(async val => {
        // 删除
        let currentChapter = this.chapterList[index];
        if (this.chapterList.length > 1) {
          let res = await this.$axios.post("/xsdq/chapter/delete", {
            bookId: currentChapter.bookId,
            chapterId: currentChapter.id,
            status: currentChapter.status // 增加刪除的章節狀態
          });
          if (res.data.status == 0) {
            this.chapterList.splice(index, 1);
            // 处理下currentChapter的内容
            if (this.currentIndex >= index) {
              this.currentIndex =
                this.currentIndex == 0 ? 0 : this.currentIndex - 1;
              this.handleToggleList(this.currentIndex);
              this.currentChapter = this.chapterList[this.currentIndex];
              gobalCurrentChapter = this.currentChapter;
            }
          } else {
            this.$msg({ content: "Delete failed" });
          }
        }
        if (this.chapterList.length <= 1) {
          this.chapterList[0].active = false;
        }
      });
    },
    // 展示发布弹窗
    showPublish() {
      this.showMoreBtn(this.currentIndex, true);
    },
    // 打开预览
    handlePreview() {
      $logClick({
        module: "create_chapter", // 创建章节页面
        zone: "djyl", // 点击预览
        adid: "click_preivew" // 点击预览
      });

      this.currentChapter = this.chapterList[this.currentIndex];
      if (this.judgeChapterContent()) return;
      window.localStorage.setItem(
        "tempChapter",
        JSON.stringify(this.currentChapter)
      );
      window.open("/book/0?preview=1");
    },
    handleSave() {
      $logClick({
        module: "create_chapter", // 创建章节页面
        zone: "djbczj", // 点击保存章节
        adid: "click_save" // 点击保存
      });

      // 已签约 && 已发布 && 审核中  不允许进行提交
      this.currentChapter = this.chapterList[this.currentIndex];

      if(this.currentChapter.status == 1 &&
          this.currentChapter.checkInfo &&
          this.currentChapter.checkInfo.checkStatus == 'CHECKING' &&
          (this.bookInfo.contractStatus == 'SIGNED' || this.bookInfo.contractStatus == 'ARCHIVED')  ){
          this.$msg({
            content:"Your book content is in review. You will be able to make changes after it's proceeded."
          })
          return;
      }

      this.$store.dispatch("moduleHome/changeLoadingStatus", true);
      if (this.judgeChapterContent()) return;
      if (this.throttleFlag) return;
      this.throttleFlag = true;
      this.status = this.currentChapter.status || 0;
      this.handlePublishChapter(this.currentIndex);
    },
    handleResume(chapterInfo){

      $logClick({
        module: this.$route.name,
        zone: "djzjhy", // 点击章节还原按钮
        adid: "click-chapter-resume",
        map: {
          chapterId: chapterInfo.id,
        },
      });

      let that = this;
      this.$msgBox({
        content:"You are restoring your previous content, any new changes will be deleted. Do you want to proceed?",
        type:"resume"
      }).then(async (flag)=>{

        if(!flag)return;

        // TODO:请求 还原数据接口
        let res = await this.$axios.post("/xsdq/chapter/edit/restore" , {
          bookId:that.bookId,
          chapterId:chapterInfo.id,
        })

        if(res.data.status == 0){
          $logEvent({
            event: "hyzjnrcg", //还原章节内容成功
            map: {
              module: chapterInfo.id,
            },
          });

          this.$msg({
            content:"Resume success!"
          })
          // TODO:响应成功加载列表
          this.chapterList = [];
          this.resumeId = chapterInfo.id;
          this.getChapterList();
        }else{
          $logEvent({
            event: "hyzjnrsb", //还原章节内容失败
            map: {
              module: chapterInfo.id,
            },
          });
          this.$msg({
            content:"Network error , please try again later! status:"+res.data.status
          })
        }
      })
    },
    // 打开个人书架
    openStory() {
      $logClick({
        module: "create_chapter", // 创建章节页面
        zone: "djstorys", // 点击storys
        adid: "click_storys" // 点击更多的storys
      });

      this.$router.push("/create_book/?bookId=" + this.bookId);
    },
    // 打开草稿页
    openTrash() {
      $logClick({
        module: "create_chapter", // 创建章节页面
        zone: "djcg", // 点击草稿
        adid: "click_Trash" // 点击草稿
      });

      this.$router.push("/trash?bookId=" + this.bookId);
    },
    // 时间条宽度
    handleWidthPercent(item) {
      let percent = new Date().getTime() - new Date(item.ctime).getTime();
      let total =
        new Date(item.publishTime).getTime() - new Date(item.ctime).getTime();
      if (total == 0) {
        return "100%";
      }
      return (percent / total).toFixed(2) * 100 + "%";
    },

  },
  components: {
    "v-loadding": Loadding,
    
  },
  watch: {
    currentChapter: {
      handler(v2, v1) {
        // TODO:把章节内容移除所有标签后计算字数
        if(v2){
          let contentStr = (v2.content+'')
            .replace(/<[^>]+>/gim, "")
            .replace(/&nbsp;/gim, "");
          this.wordCount = this.dealWordCount(contentStr);

          v2.chapterName = removeEmoji(v2.chapterName);
          v2.content = v2.content + '';
        }
      },
      deep: true
    }
  }
};
</script>



<style lang='scss' scoped>
strong {
  font-weight: bold !important;
  font-size: 14px;
}
em {
  font-style: italic !important;
  font-size: 14px;
}
.chapter {
  width: 100%;
  height: 900px;
  background: #f4f4f4;
  box-sizing: border-box;
  padding: 40px 0;
  .box {
    width: 1024px;
    margin: 0 auto;
    position: relative;
    .side-bar {
      width: 300px;
      min-height: 200px;
      background: #fff;
      box-sizing: border-box;
      float: left;
      overflow: hidden;
      .top {
        width: 100%;
        position: relative;
        padding: 14px;
        box-sizing: border-box;
        .side-bar-title {
          padding: 13px 32px;
          color: #fff;
          background-color: #ff53b0;
          border-radius: 4px;
          font-size: 14px;
          display: inline-block;
          cursor: pointer;
          width: 100%;
          box-sizing: border-box;
        }
        .btn-collapse-toggle {
          position: absolute;
          right: 0;
          border-right: 10px solid #50e3c2;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .scroll-view {
        position: relative;
        overflow-x: hidden;
        overflow-y: auto;
        height: 647px;
        width: 316px;

        .episode-list {
          position: relative;
          overflow-y: scroll;
          overflow-x: hidden;
          height: 100%;
          .episode-unit {
            position: relative;
            display: table;
            left: 15px;
            width: 360px;
            transition: 0.3s;
            overflow: hidden;
            &::after {
              content: "";
              display: block;
              position: absolute;
              bottom: 0;
              left: 10px;
              width: 280px;
              height: 1px;
              background-color: rgba(34, 34, 34, 0.1);
            }
            &.on {
              background-color: rgba(34, 34, 34, 0.03);
              .episode-info {
                &::after {
                  content: "";
                  position: absolute;
                  right: 0;
                  top: 0;
                  width: 4px;
                  height: 100%;
                  background-color: #e97020;
                }
              }
            }
            &.active {
              left: -120px !important;
            }
            &.active1 {
              left: -86px !important;
            }
            .episode-info {
              position: relative;
              padding: 12px 14px;
              width: 300px;
              height: 70px;
              display: table-cell;
              box-sizing: border-box;
              .episode-name {
                width: 260px;
                height: 24px;
                font-size: 16px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                &.no-chapter-name {
                  opacity: 0.6;
                }
              }
              .icon {
                width: 100%;
                .status {
                  font-size: 12px;
                  color: rgba(58, 74, 90, 0.6);
                }
                .speed {
                  display: block;
                  width: 150px;
                  height: 6px;
                  background: rgba(0, 0, 0, 0.05);
                  border-radius: 3px;
                  position: relative;
                  margin-top: 10px;
                  margin-left: 30px;
                  i {
                    display: inline-block;
                    position: absolute;
                    left: -20px;
                    top: -8px;
                    width: 20px;
                    height: 20px;
                    background: url(../../assets/images/icons/icon_clock.png)
                      no-repeat left center;
                    background-size: 60% 60%;
                  }
                  .speed_inner {
                    display: inline-block;
                    position: absolute;
                    width: 40px;
                    height: 6px;
                    background: rgba(238, 55, 153, 1);
                    border-radius: 3px;
                  }
                }
                .icon-more {
                  position: absolute;
                  // right: 14px;
                  left: 244px;
                  cursor: pointer;
                  bottom: 18px;
                  span {
                    display: inline-block;
                    // margin-right: 4px;
                    width: 4px;
                    height: 4px;
                    background-color: rgba(34, 34, 34, 0.6);
                    border-radius: 4px;
                  }
                }
              }

              .review{
                margin-top: 4px;
                width: 100%;
                .review_item{
                  font-size:12px;
                  font-family:SourceHanSansSC-Bold,SourceHanSansSC;
                  line-height:18px;
                  font-weight:400;
                  color:rgba(67,83,102,.6);
                  padding-bottom: 22px;
                  .review_title{
                    font-weight:bold;
                    font-size:12px;
                    font-family:SourceHanSansSC-Bold,SourceHanSansSC;
                    line-height:18px;
                    color:rgba(67,83,102,1);
                  }

                  &.refuse{
                    padding-bottom: 0px;
                    color:rgba(238,51,51,.6);
                    .review_title{
                      color:#EE3333;
                    }
                  }
                }
                .refuse_resume{
                  float: right;
                  width:64px;
                  height:22px;
                  line-height: 22px;
                  background:rgba(255,255,255,1);
                  border-radius:14px;
                  padding: 0 8px;
                  font-size:12px;
                  font-family:SourceHanSansSC-Regular,SourceHanSansSC;
                  font-weight:400;
                  color:rgba(58,74,90,0.6);
                  font-weight: bold;
                  text-align: center;
                  margin-right: 44px;
                  cursor: pointer;
                  // margin-bottom: -8px;
                }
              }
            }
            .btn-del {
              vertical-align: middle;
              width: 80px;
              color: #fff;
              background-color: rgba(238, 51, 51, 1);
              cursor: pointer;
              text-align: center;
              display: table-cell;
              padding: 0 10px;
            }
            .btn-pub {
              background: #ff53b0;
            }
          }
          .in_review_li{
            background:rgba(248,250,252,1)!important;
          }
          .refuse_li{
            background:rgba(252,230,230,1)!important;
          }
        }
      }
    }
    .editor {
      margin-left: 314px;
      min-height: 400px;
      background-color: #fff;
      box-shadow: 2px -4px 4px 0 rgba(34, 34, 34, 0.03);
      transition: 0.3s;
      .menu {
        padding: 10px 20px;
        height: 66px;
        background: #fff;
        box-sizing: border-box;
        position: relative;
        .menu-publish {
          background-color: #ab4af2;
          border-color: #ab4af2;
          height: 30px;
          line-height: 30px;
          border-radius: 4px;
          text-align: center;
          padding: 0 10px;
          cursor: pointer;
          color: #fff;
          float: left;
          margin-right: 10px;
        }
        .menu_save,
        .menu_preview,
        .menu_pub {
          width: 120px;
          height: 36px;
          line-height: 36px;
          border: 1px solid rgba(208, 211, 216, 1);
          background: #fff;
          color: rgba(58, 74, 90, 1);
        }
        .menu-count {
          float: right;
          height: 22px;
          font-size: 12px;
          font-weight: 400;
          color: rgba(58, 74, 90, 0.6);
          line-height: 22px;
          margin-top: 8px;
          margin-right: 20px;
        }
        .menu_pub {
          float: right;
          background: rgba(238, 55, 153, 1);
          color: #fff;
        }
        .more {
          position: relative;
          z-index: 9999;
        }
      }
      .title {
        font-size: 28px;
        font-weight: 600;
        color: #222;
        position: relative;
        input {
          width: 100%;
          height: 60px;
          font-size: 20px;
          font-weight: 600;
          letter-spacing: -0.48px;
          text-align: center;
          outline: none;
          border: none;
          vertical-align: middle;
        }
        .more {
          height: 30px;
          line-height: 30px;
          border-radius: 4px;
          text-align: center;
          padding: 0 10px;
          cursor: pointer;
          color: #fff;
          position: absolute;
          right: 0;
          top: 30px;
          z-index: 99999999999999;
          .icon-more {
            display: inline-block;
            height: 20px;
            width: 34px;
            // position: absolute;
            cursor: pointer;
            span {
              display: inline-block;
              // margin-right: 4px;
              width: 4px;
              height: 4px;
              background-color: rgba(34, 34, 34, 0.6);
              border-radius: 4px;
            }
          }

          .more_box {
            position: absolute;
            right: 48px;
            top: 63%;
            width: 198px;
            height: 94px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2);
            border-radius: 16px;
            &.dis {
              top: -160%;
              opacity: (0);
            }
            .more_box_inner {
              height: 44px;
              font-size: 16px;
              font-weight: 400;
              color: rgba(67, 83, 102, 1);
              line-height: 44px;
              border-radius: 4px;
              text-align: center;
              padding: 0 10px;
              &:nth-child(0) {
                border-bottom: 1px solid rgba(67, 83, 102, 1);
              }
            }
          }
        }
      }
      .editor-content {
        height: 600px;
        border: 1px solid #ccc;
        color: #333;
        border-left: none;
        border-right: none;
        .qetor {
          width: 100%;
          height: 100%;
          resize: none;
          box-sizing: border-box;
          padding: 0 10px;
          line-height: 24px;
          padding-bottom: 10px;
        }
      }

      .text-content {
        font-size: 12px;
        height: 54px;
        padding: 17px;
        box-sizing: border-box;
        color: rgb(184, 233, 134);
        .right {
          float: right;
          font-size: 12px;
        }
      }
    }
  }
}

.menu {
}
.handle {
  height: 24px;
  cursor: pointer;
  vertical-align: top;
  position: relative;
  float: right;
  font-size: 0;
  top: 44px;
  right: 16px;
  &:hover {
    i {
      background: #ee3799;
    }
  }
  i {
    float: left;
    background: #ccc;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-left: 3.2px;
  }
}
.handle-pop {
  width: 156px;
  box-sizing: border-box;
  height: 100px;
  border-radius: 16px;
  box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.2);
  padding: 12px;
  position: absolute;
  right: 8px;
  top: 28px;
  z-index: 99999999999999;
  background: #fff;
  overflow: hidden;
  .group {
    .item {
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: rgba(67, 83, 102, 1);
      font-size: 14px;
      height: 44px;
      line-height: 44px;
      cursor: pointer;
      &:hover {
        color: rgba(238, 51, 51, 1);
      }
    }
  }
  .handle-pop-close {
    position: absolute;
    right: 4px;
    top: 4px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.05);
    line-height: 32px;
    cursor: pointer;
    i {
      float: left;
      background: #ee3799;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-left: 3.2px;
      margin-top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
