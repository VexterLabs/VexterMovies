<template>
<!--  -->
  <div class="history">
    <div class="book-cover" @click="handleGoBookInfo">
      <img v-lazy="bookInfo.cover" :alt="bookInfo.bookName" />
    </div>
    <div class="book-info">
      <h3 class="book-title" @click="handleGoBookInfo">{{bookInfo.bookName}}</h3>
      <div>
        <v-star :ratings="bookInfo.ratings" ></v-star>
        <!-- :count="bookInfo.commentCount" -->
      </div>
      <div class="book-desc">{{bookInfo.introduction}}</div>
      <div class="progress">Progress {{bookInfo.recentlyProgress}}</div>
    </div>
    <div class="book-handle">
      <div class="book-delete" @click="handleDeleteHistoryBook"></div>
      <div class="book-continue">
        <read-or-continue :bookInfo="bookInfo"></read-or-continue>
      </div>
      <div class="book-add-box">
        <add-or-inlibrary :bookInfo="bookInfo"></add-or-inlibrary>
      </div>
    </div>
  </div>
</template>
<script>
import VStar from "@/components/Common/Star.vue";
import AddOrInlibrary from "@/components/Common/AddOrInlibrary.vue";
import ReadOrContinue from "@/components/Common/ReadOrContinue.vue";
import { formatSpace } from "@/core/js/common.js";

export default {
  components: {
    VStar,
    AddOrInlibrary,
    ReadOrContinue,
  },
  props: ["bookInfo"],
  data() {
    return {};
  },
  methods: {
    async handleDeleteHistoryBook() {
      this.$emit("removeHistoryItem", this.bookInfo);
    },
    handleGoBookInfo() {
      this.$router.push(
        `/book/${this.bookInfo.bookId}`
      );
      // this.$router.push(
      //   `/book_info/${this.bookInfo.bookId}/${formatSpace(
      //     (this.bookInfo.typeTwoNames && this.bookInfo.typeTwoNames[0]) ||
      //       "null"
      //   )}/${formatSpace(this.bookInfo.bookName)}`
      // );
    },
  },
};
</script>
<style lang='scss' scoped>
.history {
  margin-bottom: 40px;
  overflow: hidden;
  .book-cover {
    width: 150px;
    height: 200px;
    float: left;
    background: rgba(58, 74, 90, 0.05);
    border: 1px solid rgba(58, 74, 90, 0.1);
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }
  }
  .book-info {
    width: 728px;
    float: left;
    height: 200px;
    margin-left: 20px;
    .book-title {
      font-weight: bold;
      color: rgba(58, 74, 90, 1);
      line-height: 28px;
      font-size: 20px;
      cursor: pointer;
    }
    .book-star {
      font-size: 0;
      margin-top: 10px;
      .book-star-item {
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url("../../assets/images/classify/start_active.png")
          no-repeat center center/100% 100%;
        margin-right: 8px;
        &.active {
          background-image: url("../../assets/images/classify/star_unactive.png");
        }
      }
      span {
        color: rgba(58, 74, 90, 1);
        font-size: 14px;
        position: relative;
        top: -2px;
      }
    }
    .book-desc {
      /* autoprefixer: ignore next */
      -webkit-box-orient: vertical;
      width: 100%;
      margin-top: 10px;
      box-sizing: border-box;
      padding-right: 10px;
      height: 84px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      color: rgba(58, 74, 90, 1);
      line-height: 28px;
      font-size: 16px;
    }
    .progress {
      color: rgba(58, 74, 90, 0.6);
      line-height: 22px;
      font-size: 14px;
      margin-top: 6px;
    }
  }

  .book-handle {
    width: 150px;
    height: 200px;
    float: right;
    .book-delete {
      width: 100%;
      height: 24px;
      text-align: right;
      background: url("../../assets/images/shelf/history_delete_unactive.png")
        no-repeat right center/24px 24px;
      cursor: pointer;
      &:hover {
        background-image: url("../../assets/images/shelf/history_delete_active.png");
      }
    }
    .book-continue {
      width: 150px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      background: #ee3799;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      font-size: 20px;
      margin-top: 60px;
    }
    .book-add-box {
      margin-top: 36px;
    }
  }
}
</style>
