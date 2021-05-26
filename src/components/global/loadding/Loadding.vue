<!--
 * @Description:
 * @FilePath: \haiwai_pc\src\components\global\loadding\Loadding.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2020-04-25 15:37:58
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-04-25 16:03:55
 -->

<template>
  <div class="loading-tip">
    <div class="loading-next loading-tip-item">Loading...</div>
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
.loading-tip {
  position: absolute;
  width: 110%;
  height: 110%;
  line-height: 100%;
  text-align: center;
  top: -5%;
  left: -5%;
  margin: 0 auto;
  background: rgba(161, 169, 177, 0.2);;
  z-index: 999999999999;
  .loading-tip-item {
    position: absolute;
    top: 50%;
    margin-top: -10px;
    left: 50%;
    margin-left: -30px;
    height: 20px;
    line-height: 100%;
    text-align: center;
    color: #ff53b0;
    font-size: 20px;
    font-weight: bold;
  }
}
</style>

