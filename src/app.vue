<template>
  <div>
    <router-view />
    <Login :isloginshow="ishow" v-if="ishow"  v-on:closeloginparent="onlogin"></Login>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Login from "@/Views/Login/Login.vue";

export default {
  components: {
    Login
  },
  name: "App",
  computed: {
    ...mapState({
      loadingFinished: state => state.moduleHome.loadingFinished,
      ishow: state => state.moduleHome.isShowLogin
    })
  },
  methods: {
    onlogin(data) {
      let that = this;
      this.$store.dispatch("moduleHome/changeLoginShow");
    }
  },
};
</script>

<style>
* {
  font-family: PingFangTC-Regular, PingFangTC;
  /* font-family: "Vollkorn",serif; */
  border: 0;
  margin: 0;
  padding: 0;
  font-size: 14px;
  /* font-weight:normal; */
  /* font-style:normal; */
  text-decoration: none;
  list-style: none;
  outline: none;
  word-break: normal;
  -webkit-tap-highlight-color: transparent;
  -moz-tap-highlight-color: transparent;
  -ms-tap-highlight-color: transparent;
  tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -moz-touch-callout: none;
  -ms-touch-callout: none;
  touch-callout: none;
  text-decoration: none;
}
 /*  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none; */ 

a {
  -webkit-tap-highlight-color: transparent;
  -moz-tap-highlight-color: transparent;
  -ms-tap-highlight-color: transparent;
  tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -moz-touch-callout: none;
  -ms-touch-callout: none;
  touch-callout: none;
  text-decoration: none;
}

::-webkit-input-placeholder {
  color: rgba(67, 83, 102, 0.3);
}
:-moz-placeholder {
  color: rgba(67, 83, 102, 0.3);
}
::-moz-placeholder {
  color: rgba(67, 83, 102, 0.3);
}
:-ms-input-placeholder {
  color: rgba(67, 83, 102, 0.3);
}

.fs_c {
  text-transform: capitalize;
}

.fs_l {
  text-transform: lowercase;
}
.bottom_hover {
  position: relative;
  left: 0;
  top: 0;
  transition: all 0.3s cubic-bezier(0, 0.22, 0.3, 1);
}
a:hover.bottom_hover {
  box-shadow: 0px 4px 4px 0px rgba(252, 37, 187, 0.2);
}
.bottom_hover::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0);
}
html,
body,
#app {
  width: 100%;
  height: 100%;
  /* background:rgba(244,246,248,1); */
}
.el-input__icon {
  line-height: 40px;
}
.ql-toolbar.ql-snow  {
  height: 64px;
}

.ql-toolbar.ql-snow  +  .ql-container.ql-snow {
  height: 548px;
}
.ql-toolbar.ql-snow + .ql-container.ql-snow {
  height: 548px;
  border: none;
  border-bottom: 1px solid #f4f4f4;
}
.ql-toolbar.ql-snow {
  border-color: #f4f4f4 #fff #f4f4f4 #fff !important;
  height: 40px;
}
input::-ms-clear {
  display: none;
}
input,
textarea,
* {
  user-select: text;
}
.fontSize12 * {
  font-size: 12px !important;
}
.fontSize13 * {
  font-size: 13px !important;
}
.fontSize14 * {
  font-size: 14px !important;
}
.fontSize15 * {
  font-size: 15px !important;
}
.fontSize16 * {
  font-size: 16px !important;
}
.fontSize17 * {
  font-size: 17px !important;
}
.fontSize18 * {
  font-size: 18px !important;
}
.fontSize19 * {
  font-size: 19px !important;
}
.fontSize20 * {
  font-size: 20px !important;
}
.fontSize21 * {
  font-size: 21px !important;
}
.fontSize22 * {
  font-size: 22px !important;
}
.fontSize23 * {
  font-size: 23px !important;
}
.fontSize24 * {
  font-size: 24px !important;
}
.pagiation .el-pagination .el-pager li {
  font-size: 16px;
  color: #435366;
  font-weight: 400;
  margin-right: 10px;
  height: 29px;
  min-width: 30px;
  padding: 0 8px;
  border-radius: 2px;
}
.pagiation .el-pagination .el-pager li.active {
  background: rgba(255, 126, 66, 1);
  color: #fff;
  min-width: 30px;
  padding: 0 8px;
  border-radius: 2px;
}
.pagiation .el-pagination .el-pager li:hover {
  background: rgba(255, 126, 66, 1);
  color: #fff;
  min-width: 30px;
  padding: 0 8px;
  border-radius: 2px;
}
.pagiation .el-pagination button span {
  font-size: 16px;
  color: #435366;
  font-weight: 400;
}
.pagiation .el-pagination button:disabled span {
  font-size: 16px;
  color: rgba(58, 74, 90, 0.6);
  font-weight: 400;
}
.swiper-container-horizontal > .swiper-pagination-bullets,
.swiper-pagination-custom,
.swiper-pagination-fraction {
  width: auto !important;
  left: 50% !important;
  transform: translateX(-50%);
}

@font-face {
  font-family: "icomoon";
  src: url("./assets/fonts/icomoon.eot?nzqgqc");
  src: url("./assets/fonts/icomoon.eot?nzqgqc#iefix")
      format("embedded-opentype"),
    url("./assets/fonts/icomoon.ttf?nzqgqc") format("truetype"),
    url("./assets/fonts/icomoon.woff?nzqgqc") format("woff"),
    url("./assets/fonts/icomoon.svg?nzqgqc#icomoon") format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

[class^="icon-"],
[class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: "icomoon" !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-star-empty:before {
  content: "\e9d7";
}
.icon-star-full:before {
  content: "\e9d9";
}
.star-empty {
  background: url("./assets/images/icons/empty_star.png") no-repeat center
    center;
  background-size: 200% 100%;
  background-position: 0 0;
}
.star-fill {
  background: url("./assets/images/icons/fill_star.png") no-repeat center center;
  background-size: 200% 100%;
  background-position: 0 0;
}
</style>