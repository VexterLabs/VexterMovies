<template>
  <div class="post-comment">
    <div class="comment-box">
      <div class="close" @click="closePopPage"></div>
      <div class="title">Write a review</div>
      <div class="stars">
        <span>Rate this book</span>
        <br />
        <ul @mouseleave="hoverIndex = chosenIndex">
          <li
            v-for="(item, index) in 10"
            :key="index"
            :class=" { 'star-empty':true , 'star-fill': index <= hoverIndex }"
            @mouseenter="handleEnter(index)"
            @click="handleClick(index)"
          ></li>
        </ul>
        <!-- [{'icon-star-empty1': index > hoverIndex , 'icon-star-full': index <= hoverIndex } , 'active']" -->
      </div>
      <div class="text">
        <textarea
          class="comment"
          placeholder="Please type your review here.(The length of the comment is 10-300 characters)"
          v-model="commentContent"
        ></textarea>
      </div>
      <div class="post" @click="postComment">POST</div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { checkLength } from "@/core/js/common";
export default {
  props: ["bookInfo"],
  data() {
    return {
      commentContent: "",
      throttleFlag: false,
      hoverIndex: -1, // 默认鼠标进入索引
      chosenIndex: -1 // 默认选中索引
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.moduleHome.userInfo
    })
  },
  methods: {
    closePopPage() {
      this.$emit("handleWriteReview");
    },
    handleEnter(index) {
      this.hoverIndex = index;
    },
    handleClick(index) {
      this.chosenIndex = index;
    },
    async postComment() {
      if (this.chosenIndex < 0) {
        this.$msg({
          content: "Please Rate Star"
        });
        return;
      }
      if (!checkLength(this.commentContent, { min: 9, max: 301 })) {
        this.$msg({
          content: "The length of the comment is 10-300 characters"
        });
        return;
      }
      if (this.throttleFlag) {
        return;
      }
      this.throttleFlag = true;
      // 点击发表评论的打点
      $logClick({
        module: this.$route.name,
        zone: "djfbpl",
        adid: "post-review"
      });
      let res = await this.$axios.post("/xsdq/comment/add", {
        bookCover: this.bookInfo.cover,
        bookId: this.bookInfo.bookId,
        bookName: this.bookInfo.bookName,
        chapterId: "",
        chapterName: "",
        chapterName: "",
        content: this.commentContent,
        refer2Id: "",
        referId: "",
        referUserId: "",
        referUserName: "",
        type: 1, // 书籍评论1，章节评论2，点赞3
        userAvatar: this.userInfo.avatar,
        userId: this.userInfo.id,
        userNickname: this.userInfo.nickname,
        rate: this.chosenIndex + 1
      });
      this.throttleFlag = false;
      if (res.data.status == 0) {
        this.$emit("handleReviewSubmit");
        // 发表评论成功
        $logEvent({
          event: "fbcg",
          map: {
            module: this.$route.name
          }
        });
      }else if(res.data.status == 12021){
        this.$msg({
          content:"Comment content cannot contain sensitive words"
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
.post-comment {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  .comment-box {
    width: 600px;
    height: 478px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-left: 4px solid rgba(238, 55, 153, 1);
    box-sizing: border-box;
    padding: 30px 50px 30px 30px;
    .close {
      width: 16px;
      height: 16px;
      position: absolute;
      background: url("../../assets/images/icons/recharge_close_icon.png")
        no-repeat center center/100% 100%;
      right: 12px;
      top: 12px;
      cursor: pointer;
    }
    .title {
      font-weight: bold;
      color: rgba(67, 83, 102, 1);
      font-size: 32px;
    }
    .text {
      width: 100%;
      height: 160px;
      margin-top: 15px;
      .comment {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        resize: none;
        color: rgba(58, 74, 90, 1);
        font-size: 16px;
      }
    }
    .post {
      width: 450px;
      height: 56px;
      line-height: 56px;
      text-align: center;
      background: rgba(238, 55, 153, 1);
      border-radius: 4px;
      font-weight: bold;
      font-size: 20px;
      color: #fff;
      margin: 20px auto;
      cursor: pointer;
    }
    .stars {
      overflow: hidden;
      margin-top: 15px;
      span {
        font-size: 20px;
        font-family: SourceHanSansCN-Bold, SourceHanSansCN;
        font-weight: bold;
        color: rgba(58, 74, 90, 1);
        line-height: 28px;
        margin-top: 32px;
      }
      ul {
        margin: 20px 0 ;
        overflow: hidden;
        li {
          float: left;
          width: 22px;
          height: 44px;
          line-height: 44px;
          font-size: 44px;
          text-align: center;
          color: #ee3799;
          font-weight: 400;
          cursor: pointer;
          &:nth-child(2n){
            margin-right: 30px;
            background-position:-22px 0;
          }
        }
      }
    }
  }
}
</style>
