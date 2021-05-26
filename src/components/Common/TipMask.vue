<!--
 * @Description: createCover, click ! show tipmask
 * @FilePath: \haiwai_pc\src\components\Common\TipMask.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2020-05-25 10:42:16
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-08-14 14:30:00
-->
<template>
  <!-- vue实例外创建 -->
  <div class="tip_mask">
    <h3 class="popover-title">{{title}}</h3>
    <div class="popover-content">
      <div class="main-content" v-html="content"></div>
    </div>
    <div class="tooltip-footer" v-if="showClose || false">
      <a href="javascript:;" class="button" @click.stop.self="closeMask">OK</a>
    </div>
    <img v-if="!noArrow" class="arrow" src="../../assets/images/common/tip_arrow_down.png" alt="goodnovel go down arrow" />
    <!-- <span class="arrow"></span> -->
  </div>
</template>
<!-- 调用   <mycom></mycom> -->
<script>
export default {
  name: "tip_mask",
  props: ["isMaskShow", "title", "content", "showClose" , "noArrow"],
  data() {
    return {
      name: "tip_mask",
    };
  },
  methods: {
    closeMask() {
      this.$emit("handleClose", false);
    },
  },
};
</script>
<style lang="scss">
.tip_mask {
  width: 320px;
  border-radius: 4px;
  border: none;
  -webkit-box-shadow: 0 2px 11px 3px rgba(238, 55, 153, 0.2);
  box-shadow: 0 2px 11px 3px rgba(238, 55, 153, 0.2);
  background-color: #fff;
  padding: 12px 14px;
  .popover-title {
    font-weight: 600;
    background-color: #fff;
    border: none;
    font-size: 16px;
    line-height: 18px;
    border-radius: 5px 5px 0 0;
    color: #222;
  }
  .popover-content {
    font-size: 12px;
    line-height: 1.5;
    color: #6f6f6f;
    margin: 14px 0;
    text-align: justify;
  }
  .tooltip-footer {
    border-top: 1px solid #eee;
    margin-top: 12px;
    overflow: hidden;
    .button {
      float: right;
      padding: 3px 12px;
      margin-top: 14px;
      bottom: 9px;
      border-radius: 3px;
      color: #fff;
      background-color: rgba(238, 55, 153, 0.8);
      border-color: transparent;
      font-weight: 600;
      text-align: center;
      vertical-align: middle;
      border: 2px solid transparent;
      white-space: nowrap;
      cursor: pointer;
      user-select: none;
    }
  }
  .arrow {
    position: absolute;
    width: 20px;
    height: 10px;
    background: url("../../assets/images/common/tip_arrow_down.png") no-repeat
      top center;
    background-size: 20px 20px;
    background-position: 0 -4px;
    bottom: -9px;
    left: 1px;
    // border:10px solid rgba(1,1,1,0.25);
    // border-top: 10px solid #fff;
    // border-radius: 0 0 20px 20px;
  }
}
</style>
