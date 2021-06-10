<style scoped>
.s_banner_li {
  overflow: hidden;
  /* min-width: 1360px;
  height: 481px; */
  cursor: pointer;
}
.s_banner_li a {
  display: block;
  margin: 0 auto;
  width: 1300px;
  height: 400px;
  /* width: 1300px;
  height: 481px; */
}
.s_banner_li img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 16px;
}
.sbl_img {
  /* height: 560px;
  width: 1300px; */
  width: 100%;
  height: 100%;
}
.sbl_img img {
  /* min-width: 1360;
  height: 481px; */
}
.my-swiper-box {
  background: #fff;
  height:400px;
  overflow: hidden;
  padding: 30px 0;
}
</style>

<template>
  <div class="my-swiper-box">
    <swiper class="swiper-container" :options="swiperOption">
      <swiper-slide v-for="(item,index) in componentData.items" :key="index">
        <div class="s_banner_li">
          <a class="sbl_a">
            <div class="sbl_img">
              <img :src="item.bannerUrl" alt="swiper item" />
            </div>
          </a>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>

import "swiper/dist/css/swiper.min.css";
let vm = {};
export default {
  name: "index_banner",
  props: ["componentData", "isShowFlag"],
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 5000,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        observeParents: true,
        observer: true,
        on: {
          click:function(e){
            if (e.target.nodeName == "SPAN") return; // 阻止点击分页器打开页面
            vm.handleClickItem(this.realIndex);
          },
        },
        preventLinksPropagation: false,
      },
    };
  },
  methods: {
    handleClickItem(item) {

      this.$emit(
        "clickItem",
        this.componentData.items[item]
      );
      let target = window.sessionStorage.getItem('target');
      if(target){
        window.sessionStorage.removeItem('target');
      }
    },
  },
  mounted() {
    let that = this;
    vm = this;
    console.log()
    if (this.componentData.items && this.componentData.items.length === 1) {
      this.swiperOption.autoplay = false;
      this.swiperOption.pagination = {};
    }
  },
  
};
</script>
