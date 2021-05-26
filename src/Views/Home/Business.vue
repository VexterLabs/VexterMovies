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
    <h4 class="top-title">Business</h4>
    <div class="content">
      <p class="item-tip">Dear user,</p>

      <p class="item-tip">Thank you for your interest in Webfic. We want to hear your voice.</p>

      <p class="item-tip">If you are looking for business opportunities, please send us email to <a style="color:rgba(255, 126, 66, 1);" href="mailto:CustomerService@Webfic.com">CustomerService@Webfic.com</a></p>

      <p class="item-tip">If you are interested in any work opportunities here with us Webfic Team, please contact us with:<a style="color:rgba(255, 126, 66, 1);" href="mailto:CustomerService@Webfic.com">CustomerService@Webfic.com</a></p>

      <p class="item-tip">If you have other questions or concerns, please send us email to <a style="color:rgba(255, 126, 66, 1);" href="mailto:CustomerService@Webfic.com">CustomerService@Webfic.com</a></p>

      <p class="item-tip">Thank you again.</p>

      <p class="item-tip">Best regards,</p>

      <p class="item-tip">Webfic</p>
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
  width: 856px;
  margin: 0 auto 60px;
  .top-title {
    font-size: 32px;
    font-family: SourceHanSansCN-Bold, SourceHanSansCN;
    font-weight: bold;
    color: rgba(87, 103, 127, 1);
    padding: 20px 0;
  }
  .content {
    width: 100%;
    min-height: 800px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
    padding: 40px 50px;
    .title {
      font-size: 32px;
      font-family: SourceHanSansCN-Bold, SourceHanSansCN;
      font-weight: bold;
      color: rgba(67, 83, 102, 1);
      line-height: 40px;
    }
    .item-tip {
      padding: 16px 0 32px;
      font-size: 18px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: rgba(58, 74, 90, 1);
      line-height: 32px;
      .special-span {
        color: #ee3799;
        font-size: 18px;
      }
    }
  }
}
</style>
