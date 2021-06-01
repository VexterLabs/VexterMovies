<template>
  <div class="history">
    <div class="book-cover" @click="handleGoBookInfo">
      <img v-lazy="bookInfo.cover" alt="bookInfo.bookName" />
    </div>
    <div class="book-info">
      <div class="book-title" @click="handleGoBookInfo">{{bookInfo.bookName}}</div>
      <div class="book-star">
        <v-star :ratings="bookInfo.ratings" :count="bookInfo.commentCount">
        </v-star>
      </div>
      <div class="author">{{bookInfo.author}} 著</div>
      <div class="progress">{{bookInfo.lastUpdateTimeDisplay}}</div>
      <div class="book-desc">{{bookInfo.introduction}}</div>
    </div>
    <div class="book-handle">
      <div class="book-continue">
        <read-or-continue :bookInfo="bookInfo"></read-or-continue>
      </div>
      <!-- <div class="add-shelf">
        <add-or-inlibrary :bookInfo="bookInfo"></add-or-inlibrary>
      </div> -->
    </div>
  </div>
</template>
<script>
import VStar from "@/components/Common/Star.vue";
// import AddOrInlibrary from "@/components/Common/AddOrInlibrary.vue";
import ReadOrContinue from "@/components/Common/ReadOrContinue.vue";
import { formatSpace } from "@/core/js/common.js";
export default {
  props: ["bookInfo"],
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
    }
  }
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
    cursor: pointer;
    background: rgba(58, 74, 90, 0.05);
    border: 1px solid rgba(58, 74, 90, 0.1);
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
    position: relative;
    .book-title {
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
      font-size: 20px;
      cursor: pointer;
    }
    .book-star {
      font-size: 0;
      margin: 12px 0;
      .author {
        font-size: 14px;
        font-weight: 400;
        color: rgba(58, 74, 90, 0.6);
        line-height: 22px;
      }
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
      font-style: normal;
      margin-bottom: 6px;
    }
    .book-desc {
      width: 100%;
      margin-top: 10px;
      box-sizing: border-box;
      padding-right: 10px;
      display: -webkit-box;
      height: 66px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;/* autoprefixer: ignore next */
      -webkit-box-orient: vertical;
      color: rgba(58, 74, 90, 1);
      font-size: 16px;
      font-weight: 400;
      color: #545862;
      line-height: 20px;
    }
    .progress {
      height: 16px;
      font-size: 14px;
      font-weight: 400;
      color: #545862;
      line-height: 16px;
      margin-bottom: 26px;
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
      // background: #ee3799;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      font-size: 20px;
      margin-top: 80px;
    }
    .add-shelf {
      margin-top: 36px;
    }
  }
}
</style>
