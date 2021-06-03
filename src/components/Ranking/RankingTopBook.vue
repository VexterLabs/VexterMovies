<template>
  <div class="ranking-top">
    <img class="wf_top wf_top1" v-if="index == 1" src='../../assets/images/common/top1.png' alt="">
    <img class="wf_top" v-if="index == 2" src='../../assets/images/common/top2.png' alt="">
    <img class="wf_top" v-if="index == 3" src='../../assets/images/common/top3.png' alt="">
    <img class="wf_top" v-if="index == 4" src='../../assets/images/common/top4.png' alt="">
    <div class="wf_top_contain">
      <div class="img" @click="handleGoBookInfo">
        <img v-lazy="bookInfo.cover" src="../../assets/images/book/book_err.gif" :alt="bookInfo.bookName" />
      </div>
      <div class="book-name" @click="handleGoBookInfo">{{bookInfo.bookName}}</div>
      <div class="book-author">{{bookInfo.author}} 著</div>
      <div class="ranking-star">
        <ul class="stars">
          <li
            v-for="(item, index) in 10"
            :key="index"
            :class=" { 'star-empty':true , 'star-fill': true &&index <= Math.round(bookInfo.ratings)-1 }"
          ></li>
        </ul>
        {{dealRatings(bookInfo.ratings)}}
      </div>
      <div class="ranking-read">
        <read-or-continue :bookInfo="bookInfo"></read-or-continue>
      </div>
    </div>
    <!-- <div class="add-shelf">
      <add-or-inlibrary :bookInfo="bookInfo"></add-or-inlibrary>
    </div> -->
  </div>
</template>
<script>
import VStar from "@/components/Common/Star.vue";
// import AddOrInlibrary from "@/components/Common/AddOrInlibrary.vue";
import ReadOrContinue from "@/components/Common/ReadOrContinue.vue";
import { formatSpace } from "@/core/js/common.js"
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
      if((ratings+'').length>3){
        var start=  (ratings+'').slice(0,3)
        var last = (ratings+'').slice(4,5)
        ratings = (start-0) + (Math.round('0.'+last) - 0)
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
.ranking-top {
  width: 302px;
  display: inline-block;
  margin-right: 30px;
  border-radius: 4px;
  position: relative;
  &:nth-of-type(4n + 4) {
    margin-right: 0;
  }
  .wf_top{
    width: 160px;
    height: 34px;
    display: block;
    margin:40px auto;
    margin-bottom: 8px;
  }
  .wf_top1{
    height: 41px;
    margin-top: 34px;
  }
  .wf_top_contain{
    box-sizing: border-box;
    width: 302px;
    height: 422px;
    border-radius: 4px;
    border: 2px solid #FFFFFF;
    background:rgba(255,255,255,0.3);
  }
  .img {
    width: 150px;
    height: 200px;
    text-align: center;
    margin: 30px auto 0;
    position: relative;
    z-index: 1;
    cursor: pointer;
    margin-bottom: 16px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.1);
    }
  }
  .book-name {
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    font-size: 18px;
    line-height: 20px;
    text-align: center;
    padding: 0 20px;
    margin-bottom: 12px;
    cursor: pointer;
  }
  .book-author {
    width: 100%;
    box-sizing: border-box;
    padding: 0px 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: rgba(58, 74, 90, 0.6);
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    text-align: center;
    margin-bottom: 16px;
  }
  .ranking-star {
    text-align: center;
    margin-top: 10px;
    .stars {
      overflow: hidden;
      display: inline-block;
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
  }
  .ranking-read {
    width: 150px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    // background: rgba(238, 55, 153, 1);
    border-radius: 4px;
    margin: 15px auto;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    font-size: 20px;
    cursor: pointer;
  }
  .add-shelf {
    text-align: center;
    cursor: pointer;
    span {
      color: rgba(238, 55, 153, 1);
      font-size: 14px;
      font-weight: bold;
      background: url("../../assets/images/book/1.png") no-repeat 0 center/20px
        20px;
      padding-left: 26px;
      cursor: pointer;
    }
  }
}
</style>
