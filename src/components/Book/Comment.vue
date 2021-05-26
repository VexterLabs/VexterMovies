<template>
  <div class="comment">
    <div class="left">
      <img v-if="commentInfo.userAvatar" :src="commentInfo.userAvatar" :alt="commentInfo.userAvatar" />
      <img v-else src="../../assets/images/center/user_center_avatar_default.png" alt />
    </div>
    <div class="right">
      <div class="user-name">
        {{commentInfo.userNickname || "visitor"}}
        <!-- <span class="user-level">LV.12</span> -->
        <ul class="stars">
          <li
            v-for="(item, index) in 10"
            :key="index"
            :class=" { 'star-empty':true , 'star-fill': index <= chosenIndex-1 }"
          ></li>
        </ul>
      </div>
      <div class="comment-content">{{commentInfo.content}}</div>
      <div class="hanlde-box">
        <span class="comment-time">{{commentInfo.ctime}}</span>
        <!-- <span class="reply-num">12 replies</span> -->
        <div class="right">
          <div class="handle-item star active" v-if="commentInfo.praise">{{commentInfo.likeNum}}</div>
          <div class="handle-item star" @click="handleStar" v-else>{{commentInfo.likeNum}}</div>
          <div class="handle-item reply" @click="handleReplyItem">{{commentInfo.replyNum}}</div>
          <div class="handle-item more" @click="handleMoreReply"></div>
        </div>
      </div>
    </div>
    <div class="bottom" v-if="isShowInput">
      <!-- <input type="text" placeholder="Write a reply" autofocus v-model="inputComment" /> -->
      <div class="textarea">
        <textarea v-model="inputComment" placeholder="Write a reply" autofocus></textarea>
      </div>
      <div class="send" @click="handleReply">SEND</div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { checkLength } from "@/core/js/common";
export default {
  props: ["commentInfo", "type"],
  computed: {
    ...mapState({
      userInfo: state => state.moduleHome.userInfo
    })
  },
  data() {
    return {
      isShowInput: false,
      inputComment: "",
      throttleFlag: false,
      chosenIndex: -1 // 星星数,commentInfo中的星星数属性替换
    };
  },
  mounted() {
    if (this.commentInfo.rate) {
      this.chosenIndex = this.commentInfo.rate;
    } else {
      this.chosenIndex = 10;
    }
  },
  methods: {
    handleMoreReply() {
      this.$emit("handleShowAllComment", {
        target: this.commentInfo
      });
    },
    handleReplyItem() {
      this.isShowInput = !this.isShowInput;
    },
    handleStar() {
      this.starAjax();
    },
    async starAjax() {
      let res = await this.$axios.post("/webfic/comment/praise", {
        bookId: this.commentInfo.bookId,
        chapterId: "",
        refer2Id: "",
        referId: this.commentInfo.id,
        referUserId: this.commentInfo.userId
      });
      if (res.data.status == 0) {
        this.inputComment = "";
        this.isShowInput = false;
        // 更新点赞状态,不重新请求 富富 ES20秒延迟
        this.commentInfo.praise = true;
        this.commentInfo.likeNum += 1;

        return;
        this.$emit("handleGetReloadComment", { level: 1 });
      }
    },
    handleReply() {
      if (this.type == "book") {
        this.replyStarAjax({ type: 1 });
      } else {
        this.replyStarAjax({ type: 2 });
      }
    },
    async replyStarAjax({ type }) {
      if (!checkLength(this.inputComment, { min: 9, max: 301 })) {
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
        bookCover: this.commentInfo.bookCover,
        bookId: this.commentInfo.bookId,
        bookName: this.commentInfo.bookName,
        chapterId: "",
        chapterName: "",
        content: this.inputComment,
        refer2Id: "",
        referId: this.commentInfo.id,
        referUserId: this.commentInfo.userId,
        referUserName: this.commentInfo.userNickname,
        type: type, // 书籍评论1，章节评论2，点赞3
        userAvatar: this.userInfo.avatar,
        userId: this.userInfo.id,
        userNickname: this.userInfo.nickname
      });
      this.throttleFlag = false;
      if (res.data.status == 0) {
        this.inputComment = "";
        this.isShowInput = false;
        this.$emit("handleGetReloadComment", { level: 1 });
      }else if(res.data.status == 12021){
        this.$msg({
          content:"Comment content cannot contain sensitive words"
        })
      }else if(res.data.status == 6){
        this.$msg({
          content:"Please Login first."
        })
      }else{
        this.$msg({
          content:"Network Error"
        })
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.comment {
  width: 100%;
  min-height: 100px;
  overflow: hidden;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  .left {
    float: left;
    width: 48px;
    height: 48px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .right {
    margin-left: 64px;
    width: cale(100% -64px);
    padding-bottom: 26px;
    .user-name {
      color: rgba(58, 74, 90, 1);
      overflow: hidden;
      font-size: 16px;
      font-weight: bold;
      margin: 12px 0;
      .user-level {
        box-sizing: border-box;
        padding: 0 10px;
        display: inline-block;
        background: linear-gradient(
          135deg,
          rgba(246, 131, 131, 1) 0%,
          rgba(220, 107, 219, 1) 100%
        );
        height: 22px;
        line-height: 22px;
        border-radius: 22px;
        text-align: center;
        font-size: 12px;
        color: #fff;
      }
    }
    .stars {
      overflow: hidden;
      display: inline-block;
      margin-left: 24px;
      margin-bottom: -2px;
      li {
        float: left;
        width: 8px;
        height: 16px;
        line-height: 16px;
        font-size: 16px;
        &:nth-child(2n) {
          margin-right: 8px;
          background-position: -8px 0;
        }
      }
    }
    .comment-content {
      color: rgba(67, 83, 102, 1);
      line-height: 28px;
      font-size: 16px;
    }
    .hanlde-box {
      margin-top: 10px;
      .comment-time {
        color: rgba(58, 74, 90, 0.6);
        font-size: 14px;
      }
      .reply-num {
        color: rgba(86, 152, 233, 1);
        font-size: 14px;
        margin-left: 10px;
      }
      .right {
        float: right;
        width: 160px;
        text-align: right;
        .handle-item {
          display: inline-block;
          width: 16px;
          height: 16px;
          color: rgba(58, 74, 90, 0.6);
          line-height: 18px;
          font-size: 14px;
          padding-left: 20px;
          background: url("../../assets/images/common/replay_comment_icon.png")
            no-repeat left center/16px 16px;
          cursor: pointer;
          white-space: nowrap;
          margin-left: 10px;
          &.star {
            background-image: url("../../assets/images/common/like_unactive.png");
            &.active {
              background-image: url("../../assets/images/common/like_active.png");
            }
          }
          &.more {
            background-image: url("../../assets/images/common/comment_more_icon.png");
            background-position: center 4px;
          }
        }
      }
    }
  }
  .bottom {
    width: 100%;
    border-bottom: 1px solid #ee3799;
    box-sizing: border-box;
    padding-left: 70px;
    input {
      width: 920px;
      height: 70px;
    }
    .textarea {
      display: inline-block;
      width: 915px;
      height: 120px;
      overflow: hidden;
      border: 1px solid #fafafa;
      border-radius: 4px;
      padding: 2px;
      background: rgba(246, 237, 237, 0.3);
      textarea {
        width: 933px;
        height: 120px;
        resize: none;
        background: rgba(246, 237, 237, 0.3);
      }
    }
    .send {
      width: 84px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background: rgba(238, 55, 153, 1);
      border-radius: 4px;
      float: right;
      box-sizing: border-box;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      font-size: 16px;
      margin-top: 39px;
      cursor: pointer;
    }
  }
}
</style>
