<!--
 * @Description:
 * @FilePath: \webfic_pc_ssr\src\Views\Home\Business.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2019-12-31 12:03:26
 * @LastEditors: CuiGang
 * @LastEditTime: 2021-01-05 14:27:58
 -->
<template>
  <div class="special-page">
    <img src="../../assets/images/aboutus/businessbg.png" alt="">
    <div class="content">
      <p class="item-tip">亲爱的读者，</p>
      <p class="item-tip">感谢您关注和喜爱小说大全，</p>
      <p class="item-tip">我们期望听到您的意见和建议。</p>
      <p class="item-tip">如果您在寻找商业合作，</p>
      <p class="item-tip">请把您的信息发送到我们的邮箱：</p>
      <p class="item-tip"><a style="color:rgba(255, 95, 39, 1);" href="mailto:CustomerService@Webfic.com">CustomerService@xiaoshuodaquan.com</a></p>
      <p class="item-tip">如果您正在寻找任何工作机会并且想和我们一起合作，</p>
      <p class="item-tip">请联系我们：</p>
      <p class="item-tip"><a style="color:rgba(255, 95, 39, 1);" href="mailto:CustomerService@Webfic.com">CustomerService@xiaoshuodaquan.com</a></p>
      <p class="item-tip">如果您有其他问题和建议，请发送邮件至我们的邮箱：</p>
      <p class="item-tip"><a style="color:rgba(255, 95, 39, 1);" href="mailto:CustomerService@Webfic.com">CustomerService@xiaoshuodaquan.com</a></p>
      <p class="item-tip">再次感谢您关注小说大全。</p>
      <p class="item-tip">诚挚的祝福，</p>
      <p class="item-tip">小说大全</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang='scss' scoped>
.item-tip a{
  font-size: 18px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    line-height: 32px;
}
.special-page {
  width: 800px;
  margin: 0 auto -10px;
  padding: 84px 0;
  img{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 808px;
  }
  .content {
    width: 100%;
    min-height: 640px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
    padding: 40px 50px;
    position: relative;

    .title {
      font-size: 32px;
      font-family: SourceHanSansCN-Bold, SourceHanSansCN;
      font-weight: bold;
      color: rgba(67, 83, 102, 1);
      line-height: 40px;
    }
    .item-tip {
      font-size: 18px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #545862;
      line-height: 40px;
      width: 440px;
      margin: auto;
      .special-span {
        color: #ee3799;
        font-size: 18px;
      }
    }
  }
}
</style>
