<template>
  <div class="all-comment">
    <div class="container">
      <div class="title">View all replies （{{allCounts}}）</div>
      <div class="content" ref="content">
        <div class="all-reply">
          <two-comment
            v-for="item in allReplyComment"
            :key="item.id"
            :commentInfo="item"
            @handleReplyTwo="handleReplyTwo"
            :isShowReplyNum="false"
          ></two-comment>
          <v-pagiation
            v-if="totals>1"
            :totals="totals"
            :pageNo="pageNo"
            @handleClickPrev="handleClickPrev"
            @handleClickNext="handleClickNext"
            @handlePageNumItem="handlePageNumItem"
            color="white"
          ></v-pagiation>
        </div>
      </div>
      <div class="input">
        <!-- <input type="text"
                placeholder="Write a replay"
        v-model="inputComment">-->
        <div class="textarea">
          <textarea placeholder="Write a replay" v-model="inputComment"></textarea>
        </div>
        <div class="send" @click="sendReply">SEND</div>
      </div>
    </div>
  </div>
</template>
<script>
import TwoComment from "@/components/Read/TwoComment.vue";
import VPagiation from "@/components/Common/Pagiation.vue";
import { mapState } from "vuex";
import { checkLength } from "@/core/js/common";
export default {
  props: ["bookInfo"],
  components: {
    TwoComment,
    VPagiation
  },
  data() {
    return {
      inputComment: "",
      allReplyComment: [], // 所有的二级评论
      totals: 1,
      level: 3,
      pageNo: 1,
      pageSize: 10,
      replyRefCommentInfo: {},
      type: 2,
      allCounts: 0,
      throttleFlag: false
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.moduleHome.userInfo,
      chapterCurrentIndex: state => state.moduleRead.currentChapterId
    })
  },
  mounted() {
    this.getReplyComment();
  },
  methods: {
    async sendReply() {
      let lastContent = this.inputComment;
      const reg = /^\@.*\:$/i;
      if (lastContent && lastContent.indexOf(":") > -1) {
        let needReg = lastContent.substring(0, lastContent.indexOf(":") + 1);
        if ((needReg, reg.test(needReg))) {
          lastContent = lastContent.substring(lastContent.indexOf(":") + 1);
        }
      }
      this.type = 2;
      if (!checkLength(lastContent, { min: 9, max: 301 })) {
        this.$msg({
          content: "The length of the comment is 10-300 characters"
        });
        return;
      }
      if (this.throttleFlag) {
        return;
      }
      this.throttleFlag = true;
      let res = await this.$axios.post("/webfic/comment/add", {
        bookCover: this.bookInfo.cover,
        bookId: this.bookInfo.bookId,
        bookName: this.bookInfo.bookName,
        chapterId: this.chapterCurrentIndex,
        chapterName: "",
        content: lastContent,
        refer2Id: "",
        referId: this.replyRefCommentInfo.id,
        referUserId: this.replyRefCommentInfo.userId,
        referUserName: this.replyRefCommentInfo.userNickname,
        type: this.type, // 书籍评论1，章节评论2，点赞3
        userAvatar: this.userInfo ? this.userInfo.avatar : "",
        userId: this.userInfo ? this.userInfo.id : "",
        userNickname: this.userInfo ? this.userInfo.nickname : ""
      });
      this.throttleFlag = false;
      if (res.data.status == 0) {
        this.$emit("handleGetReloadComment", {});
        this.pageNo = 1;
        this.inputComment = "";
        this.getReplyComment();
      }else if(res.data.status == 12021){
        this.$msg({
          content:"Comment content cannot contain sensitive words"
        })
      }else{
        this.$msg({
          content:"Network Error"
        })
      }
    },
    async starAjax() {
      let res = await this.$axios.post("/webfic/comment/praise", {
        bookId: this.bookInfo.bookId,
        chapterId: this.chapterCurrentIndex,
        refer2Id: "",
        referId: this.replyRefCommentInfo.id,
        referUserId: this.replyRefCommentInfo.userId
      });
      if (res.data.status == 0) {

        // TODO 富富ES20秒
        this.$emit("handleGetReloadComment", {});
        this.getReplyComment();
      }
    },
    async getReplyComment() {
      let res = await this.$axios.post("/webfic/comment/book/comments", {
        bookId: this.bookInfo.bookId,
        bookName: this.bookInfo.bookName,
        bookCover: this.bookInfo.cover,
        chapterId: this.chapterCurrentIndex,
        order: "",
        referId: "",
        level: this.level,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        sort: "",
        userId: this.userInfo.id || 0
      });
      if (res.data.status == 0 && res.data.data.webBookComments) {
        this.totals = res.data.data.webBookComments.pages;
        this.allReplyComment = res.data.data.webBookComments.records;
        this.allCounts = res.data.data.webBookComments.total;
        await this.$nextTick();
        this.$refs.content.scrollTop = 0;
        this.replyRefCommentInfo = {};
      } else {
        this.allReplyComment = [];
        this.allCounts = 0;
      }
    },
    handleReplyTwo({ target, type }) {
      this.replyRefCommentInfo = target;
      this.type = type;
      if (type == 3) {
        this.inputComment = "";
        // 这里是点赞
        this.starAjax();
        return;
      }
        let name = "";
      if(!target.userNickname){
        let s = (target.id+'').split('');
        name = s[0] + "****"+ s[s.length-1]
      }else{
        name = target.userNickname;
      }
      this.inputComment = "@" + name + ":";
    },
    closePop() {
      this.$emit("handleShowAllComment", {});
    },
    handleClickPrev() {
      this.pageNo -= 1;
      this.getReplyComment();
    },
    handleClickNext() {
      this.pageNo += 1;
      this.getReplyComment();
    },
    handlePageNumItem(target) {
      this.pageNo = target;
      this.getReplyComment();
    }
  },
  watch: {
    chapterCurrentIndex() {
      this.getReplyComment();
    }
  }
};
</script>
<style lang='scss' scoped>
.all-comment {
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    .close {
      width: 16px;
      height: 16px;
      position: absolute;
      right: 12px;
      top: 12px;
      background: url("../../assets/images/icons/recharge_close_icon.png")
        no-repeat center center/100% 100%;
      cursor: pointer;
    }
    .title {
      padding: 30px 0;
      font-weight: bold;
      color: #ffffff;
      font-size: 20px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      margin: 0 30px;
    }
    .content {
      box-sizing: border-box;
      padding: 12px 0 0px;
      position: absolute;
      width: 100%;
      top: 88px;
      bottom: 60px;
      overflow-y: auto;
      .all-reply {
        padding: 20px 30px;
        box-sizing: border-box;
        min-height: 900px;
      }
    }
    .input {
      width: 100%;
      height: 60px;
      box-sizing: border-box;
      position: absolute;
      left: 0;
      bottom: 0px;
      background: transparent;
      padding: 0 30px;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      background: #3a4a5a;
      input {
        width: 265px;
        height: 100%;
        resize: none;
        background: transparent;
        color: rgba(255, 255, 255, 0.5);
        &::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
      }
      .textarea {
        display: inline-block;
        width: 265px;
        height: 100%;
        overflow: hidden;
        textarea {
          width: 270px;
          height: 100%;
          resize: none;
          background: transparent;
          color: rgba(255, 255, 255, 0.5);
          &::placeholder {
            color: rgba(255, 255, 255, 0.5);
          }
        }
      }
      .send {
        box-sizing: border-box;
        width: 84px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background: rgba(238, 55, 153, 1);
        border-radius: 4px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        font-size: 16px;
        position: absolute;
        right: 24px;
        top: 14px;
        cursor: pointer;
      }
    }
  }
}
</style>
