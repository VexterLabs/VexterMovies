<!--
 * @Description:
 * @FilePath: \webfic_pc_ssr\src\components\Common\Title.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2019-12-30 16:50:48
 * @LastEditors: CuiGang
 * @LastEditTime: 2021-01-04 15:10:03
-->
<style lang='scss' scoped>
.breadLine{
    position: absolute;
    top: -88px;
    left: 0;
    cursor: pointer;
    a {
        font-size: 14px;
        font-family: PingFangTC-Regular, PingFangTC;
        font-weight: 400;
        color: #333333;
        line-height: 20px;
    }
}
</style>

<template>
    <div class="breadLine">
        <span><a href="/">首页 > </a></span>
        <span @click="$router.push(target.url)">{{target.tit||'其他'}} > </span>
        <span @click="$router.push(`/book_info/${bookInfo.bookId}/${formatSpace( bookInfo.typeTwoNames && bookInfo.typeTwoNames[0]|| 'null')}/${formatSpace(bookInfo.bookName)}`)">{{bookInfo.bookName}}</span>
    </div>
</template>

<script>
import { formatSpace } from "@/core/js/common.js";
import { mapState } from 'vuex'
export default {
  name: 'router_line',
  props: ['commontit','bookInfo'],
  data(){
    return {
      formatSpace: formatSpace,
      target:{tit:"其他",url:'/'},
    }
  },
  methods: {

  },
  mounted(){
     let line = window.sessionStorage.getItem('target');
     if(line){
        line = JSON.parse(line);
        this.target = line;
     }
     console.log(line)
  },
  computed:{
    ...mapState({
        line: state => state.moduleHome.routerLine,
    }),
  }
}
</script>

