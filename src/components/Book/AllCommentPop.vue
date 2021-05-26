<template>
  <div class="all-comment">
    <div class="container">
      <div class="close" @click="closePop"></div>
      <div class="title">View all replies （{{allCounts}}）</div>
      <div class="content" ref="content">
        <div class="current-comment">
          <two-comment
            class="current-comment-one"
            :commentInfo="currentCommentInfo"
            @handleReplyTwo="handleReplyTwo"
          ></two-comment>
        </div>
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
import TwoComment from "@/components/Book/TwoComment.vue";
import VPagiation from "@/components/Common/Pagiation.vue";
import { mapState } from "vuex";
import { checkLength } from "@/core/js/common";
export default {
  props: ["currentCommentInfo", "bookInfo"],
  components: {
    TwoComment,
    VPagiation
  },
  data() {
    return {
      inputComment: "",
      allReplyComment: [], // 所有的二级评论
      totals: 1,
      level: 2,
      pageNo: 1,
      pageSize: 10,
      replyRefCommentInfo: {},
      type: 1,
      allCounts: 0,
      throttleFlag: false
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.moduleHome.userInfo
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
      this.type = 1;
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
        bookCover: this.currentCommentInfo.bookCover,
        bookId: this.currentCommentInfo.bookId,
        bookName: this.currentCommentInfo.bookName,
        chapterId: "",
        chapterName: "",
        content: lastContent,
        refer2Id: this.replyRefCommentInfo.id,
        referId: this.currentCommentInfo.id,
        referUserId:
          this.replyRefCommentInfo.userId || this.currentCommentInfo.userId,
        referUserName: this.replyRefCommentInfo.userNickname,
        type: this.type, // 书籍评论1，章节评论2，点赞3
        userAvatar: this.userInfo.avatar,
        userId: this.userInfo.id,
        userNickname: this.userInfo.nickname
      });
      this.throttleFlag = false;
      if (res.data.status == 0) {
        this.$emit("handleGetReloadComment", {});
        this.pageNo = 1;
        this.inputComment = "";
        this.getReplyComment();
      } else if (res.data.status == 12021) {
        this.$msg({
          content: "Comment content cannot contain sensitive words"
        });
      } else {
        this.$msg({
          content: "Network Error"
        });
      }
    },
    async starAjax() {
      let res = await this.$axios.post("/webfic/comment/praise", {
        bookId: this.currentCommentInfo.bookId,
        chapterId: "",
        refer2Id: "",
        referId: this.replyRefCommentInfo.id,
        referUserId: this.replyRefCommentInfo.userId
      });
      if (res.data.status == 0) {
        this.$emit("handleGetReloadComment", {});
        this.getReplyComment();
      }
    },
    async getReplyComment() {
      let res = await this.$axios.post("/webfic/comment/book/comments", {
        bookId: this.bookInfo.bookId,
        chapterId: 0,
        order: "",
        referId: this.currentCommentInfo.id,
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

      if (this.currentCommentInfo.id == target.id) {
        this.replyRefCommentInfo = {};
        this.inputComment = "";
      } else {
        let name = '';
        if(target.userNickname){
          name = target.userNickname;
        }else{
          let s = (target.id+'').split('')
          name = s[0] + "****" + s[s.length-1];
        }

        this.inputComment = "@" + name + ":";
      }
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
  }
};
</script>
<style lang='scss' scoped>
.all-comment {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99;
  overflow-y: auto;
  vertical-align: middle;
  text-align: center;
  .container {
    width: 600px;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    border-left: 4px solid #ee3799;
    position: relative;
    left: 50%;
    top: 15vh;
    transform: translate(-50%, 0%);
    overflow: hidden;
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
      color: rgba(58, 74, 90, 1);
      font-size: 20px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      margin: 0 30px;
    }
    .content {
      box-sizing: border-box;
      padding: 12px 0 0px;
      height: 600px;
      overflow-y: auto;
      margin-bottom: 60px;
      .current-comment {
        padding: 0 30px;
        .current-comment-one {
          margin-bottom: 0;
        }
      }
      .all-reply {
        padding: 20px 30px;
        box-sizing: border-box;
        background: rgba(244, 246, 248, 1);
        border: 1px solid rgba(0, 0, 0, 0.05);
        min-height: 450px;
      }
    }
    .input {
      width: 100%;
      height: 120px;
      box-sizing: border-box;
      position: absolute;
      left: 0;
      bottom: 0px;
      background: #fff;
      padding: 0 30px;
      text-align: left;
      input {
        width: 460px;
        height: 100%;
        box-sizing: border-box;
        padding: 0 10px;
      }
      .textarea {
        display: inline-block;
        width: 454px;
        height: 100%;
        box-sizing: border-box;
        overflow: hidden;
        padding: 10px 0;
        textarea {
          box-sizing: border-box;
          width: 476px;
          padding: 10px 10px;
          height: 100%;
          resize: none;
          background-color: rgba(246, 237, 237, 0.3);
          border-radius: 4px;
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
        top: 40px;
        cursor: pointer;
      }
    }
  }
}
</style>
