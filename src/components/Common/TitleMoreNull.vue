<!--
 * @Description: 
 * @FilePath: \webfic_pc_ssr\src\components\Common\TitleMoreNull.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2020-12-23 19:14:36
 * @LastEditors: CuiGang
 * @LastEditTime: 2021-01-04 11:56:09
-->
<style scoped>
.common_tit{
  overflow: hidden;
  height: 104px;
}
.common_tit h2{
  overflow: hidden;
  margin: 42px 70px 0 0;
  line-height: 36px;
  position: relative;
  height: 40px;
  font-size: 32px;
  font-weight: bold;
  color: #333333;
  padding-left:22px;
}
 .left_bar{
    position: absolute;
    width: 6px;
    height: 22px;
    left:0;
    top:50%;
    transform: translateY(-50%);
    background:rgba(255, 126, 66, 1);
  }
</style>

<template>
  <div class="common_tit">
    <h2 class="fs_u"><i class="left_bar"></i> {{ commontitmorenull }}</h2>
  </div>
</template>

<script>
export default {
  name: 'common_tit',
  props: ['commontitmorenull']
}
</script>

