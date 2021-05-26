<!--
 * @Description:
 * @FilePath: \haiwai_pc\src\components\Book\ReadUnlock.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2019-12-30 16:50:48
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-07-21 11:20:38
-->
<template>
  <div class="read-unclock">
    <div v-if="chapterInfo.unit == 'BOOK'">
      <div class="title">
        <span>Locked Book</span>
      </div>
      <div class="tip">$ {{chapterInfo.bookPrice}} to unlock this book ({{chapterInfo.coins}} coins) </div>
      <div class="review" @click="payMoneyBook">UNLOCK BOOK</div>
    </div>

    <div v-else>
      <div class="title">
        <span>Locked Chapter</span>
      </div>
      <div class="tip">{{chapterInfo.price}} coins to unlock this chapter</div>
      <div class="review" @click="payMoneyChapter">UNLOCK CHAPTER</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["chapterInfo"],
  data() {
    return {};
  },
  methods: {
    payMoneyChapter() {
      this.$emit("payMoneyChapter" , this.chapterInfo.id);
    },
    payMoneyBook() {
      this.$emit("payMoneyBook", this.chapterInfo);
    }
  }
};
</script>
<style lang='scss' scoped>
.read-unclock {
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 80px 0 40px;
  text-align: center;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  position: relative;
  top: -100px;
  .title {
    span {
      color: rgba(58, 74, 90, 1);
      font-size: 20px;
      font-weight: bold;
      padding-left: 30px;
      background: url("../../assets/images/book/chapter_lock_icon.png")
        no-repeat left center/24px 24px;
    }
  }
  .tip {
    color: rgba(238, 55, 153, 1);
    font-size: 20px;
    margin-top: 10px;
  }
  .review {
    width: 300px;
    height: 56px;
    text-align: center;
    line-height: 56px;
    border-radius: 4px;
    margin: 30px auto 0;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    background: #ee3799;
    cursor: pointer;
    position: relative;
    z-index: 22;
  }
}
</style>
