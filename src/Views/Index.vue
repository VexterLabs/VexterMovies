<!--
 * @Description: 
 * @FilePath: \webfic_pc_ssr\src\Views\Index.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2020-12-23 19:14:36
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-12-31 17:42:32
-->


<template>
  <div class="index"  @keydown="f12($event)">
    <NavBox></NavBox>
    <div class="container-box"   @contextmenu.prevent="rightClick">

      <template v-show="loadingFinished">
        <router-view></router-view>
        <footer-nav></footer-nav>
        <go-top></go-top>
        <!-- <Pwa></Pwa> -->
      </template>
    </div>
  </div>
</template>
<script>
// import Pwa from "@/components/Common/pwa.vue"
import NavBox from '@/components/Home/NavBox.vue'
import FooterNav from '@/components/Common/FooterNav.vue'
import GoTop from '@/components/Common/GoTop.vue'

import { mapState } from 'vuex'
export default {
  name: 'index',
  data(){
    return {
      anav: []
    }
  },
  computed: {
    ...mapState({
      loadingFinished: state => state.moduleHome.loadingFinished
    })
  },
  mounted(){
     document.body.ondragstart=()=>{
      return false;
    }
     document.onkeydown = (e) => {
       if(e.key == 'F12'){
         e.preventDefault()
         return;
       }
    }
  },
  methods: {
    rightClick(MouseEvent){
      return;
    },
    f12($event){
      console.log(123);
    }
  },
  components: {
    NavBox,
    FooterNav,
    GoTop,
    // Pwa
  }
}
</script>
<style lang='scss'>
.container-box{
  width: 100%;
  min-width: 1360px;
  min-height: 1000px;
  position: relative;
  // padding-bottom: 320px;
  box-sizing: border-box;
  background: rgba(245,247,249,1);
  // overflow: hidden;
}


</style>
