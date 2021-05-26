<template>
  <div class="history">
    <div class="index">{{index}}</div>
    <div class="book-cover" @click="handleGoBookInfo">
      <img v-lazy="bookInfo.cover" src="../../assets/images/book/book_err.gif" :alt="bookInfo.bookName" />
    </div>
    <div class="book-info">
      <div class="book-title" @click="handleGoBookInfo">{{bookInfo.bookName}}</div>
      <div class="star_con">
        <ul class="stars">
          <li
            v-for="(item, index) in 10"
            :key="index"
            :class=" { 'star-empty':true , 'star-fill': (bookInfo.commentCount && bookInfo.commentCount>19 && index <= Math.round(bookInfo.ratings)-1) }"
          ></li>
        </ul>
        <span class="stars_num">
          {{ (bookInfo.commentCount && bookInfo.commentCount>19) ? dealRatings(bookInfo.ratings) : '0.0'}}
        </span>
      </div>
      <div class="author">By: {{bookInfo.pseudonym}} &nbsp;&nbsp;</div>
      <div class="update">{{bookInfo.lastUpdateTimeDisplay}}</div>
      <div class="book-desc">{{bookInfo.introduction}}</div>
    </div>
    <div class="book-handle">
      <div class="book-continue">
        <read-or-continue :bookInfo="bookInfo"></read-or-continue>
      </div>
    </div>
  </div>
</template>
<script>
import VStar from "@/components/Common/Star.vue";
// import AddOrInlibrary from "@/components/Common/AddOrInlibrary.vue";
import ReadOrContinue from "@/components/Common/ReadOrContinue.vue";
import { formatSpace } from "@/core/js/common.js";
export default {
  props: ["bookInfo", "index"],
  components: {
    VStar,
    // AddOrInlibrary,
    ReadOrContinue
  },
  data() {
    return {};
  },
  methods: {
    handleGoBookInfo() {
      this.$router.push(`/book_info/${this.bookInfo.bookId}/${formatSpace(this.bookInfo.typeTwoNames && this.bookInfo.typeTwoNames[0] || 'null')}/${formatSpace(this.bookInfo.bookName)}`);
    },
    dealRatings(ratings) {
      if ((ratings + "").length > 3) {
        var start = (ratings + "").slice(0, 3);
        var last = (ratings + "").slice(4, 5);
        ratings = start - 0 + (Math.round("0." + last) - 0);
      }

      if ((ratings + "").indexOf(".") > -1) {
        return ratings;
      } else {
        return ratings + ".0";
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.history {
  margin: 25px 0 50px;
  overflow: hidden;
  .index {
    width: 80px;
    height: 200px;
    line-height: 200px;
    text-align: center;
    float: left;
    font-weight: bold;
    color: rgba(58, 74, 90, 1);
    font-size: 40px;
    font-style: italic;
  }
  .book-cover {
    width: 150px;
    height: 200px;
    float: left;
    cursor: pointer;
    background: rgba(58, 74, 90, 0.05);
    border: 1px solid rgba(58, 74, 90, 0.1);
    img {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.1);
    }
  }
  .book-info {
    width: 800px;
    float: left;
    height: 200px;
    margin-left: 20px;
    position: relative;
    .book-title {
      font-weight: bold;
      color:rgba(51, 51, 51, 1);
      line-height: 24px;
      font-size: 20px;
      cursor: pointer;
      margin-bottom: 12px;
    }
    .stars {
      overflow: hidden;
      display: inline-block;
      margin-bottom: 12px;
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
    .stars_num{
      position: relative;
      top:-14px;
      font-size: 14px;
      font-weight: 400;
      color: #3A4A5A;
      line-height: 16px;
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
    .author{
      height: 20px;
      font-size: 14px;
      font-weight: normal;
      color: #545862;
      line-height: 20px;
      font-style: italic;
      margin-bottom: 6px;
    }
    .update{
      height: 16px;
      font-size: 14px;
      font-weight: 400;
      color: #545862;
      line-height: 16px;
      margin-bottom: 26px;
    }
    .book-desc {
      width: 100%;
      box-sizing: border-box;
      padding-right: 10px;
      display: -webkit-box;
      height: 66px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;/* autoprefixer: ignore next */
      -webkit-box-orient: vertical;
      color: #545862;
      line-height: 22px;
      font-size: 16px;
      font-weight: 400;
    }
    .progress {
      color: rgba(58, 74, 90, 0.6);
      line-height: 22px;
      font-size: 14px;
      margin-top: 16px;
      position: absolute;
      bottom: 6px;
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
      background: rgba(255, 126, 66, 1);
      border-radius: 4px;
      cursor: pointer;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      font-size: 20px;
    }
    .add-box {
      margin-top: 36px;
    }
    .book-add {
      color: rgba(238, 55, 153, 1);
      font-size: 20px;
      margin-top: 36px;
      cursor: pointer;
      background: url("../../assets/images/book/1.png") no-repeat left
        center/20px 20px;
      padding-left: 20px;
      white-space: nowrap;
    }
  }
}
</style>
