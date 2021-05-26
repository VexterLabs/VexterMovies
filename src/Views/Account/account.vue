<!--
 * @Description:
 * @FilePath: \haiwai_pc\src\Views\Account\account.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2020-06-08 13:54:29
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-06-08 14:07:29
-->
<template>
  <div class="account_contain">
    <div class="contain">
      <div class="account_top"></div>
      <div class="account_form"></div>
      <div class="account_btns"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "Account"
    };
  }
};
</script>
<style lang="scss">
.account_contain {
  overflow: hidden;
  padding: 40px 0 60px;
  margin: 0 auto;
  background-color: rgb(244, 246, 248);
  min-width: 900px;
  .contain {
    overflow: hidden;
    margin: 0 auto;
    padding: 40px 64px;
    width: 857px;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgba(0, 0, 0, 0.05);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
}
</style>
