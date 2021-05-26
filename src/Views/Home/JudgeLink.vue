<!--
 * @Description:
 * @FilePath: \haiwai_pc\src\Views\Home\JudgeLink.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2020-04-03 17:06:57
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-04-03 17:12:42
 -->
<template>
  <div class="box">
    <textarea name="" id="links" cols="50" rows="10" v-model="links"></textarea>
    <button id="btn" @click="spl">按钮</button>
    <ul id="u">
        <li v-for="(item, index) in items" :key="index">
          <a :href="item">{{item}}</a>
        </li>
    </ul>
  </div>
</template>
<script>
export default{
  data(){
    return {
      links:"",
      items:[]
    }
  },
  methods:{
    spl(){
      this.items = this.links.split(';');
    }
  }
}
</script>
<style  scoped>
textarea{
  border:1px solid #ccc;
}
</style>
