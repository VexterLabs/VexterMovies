<!--
 * @Description:
 * @FilePath: \webfic_pc_ssr\src\components\Common\Title.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2019-12-30 16:50:48
 * @LastEditors: CuiGang
 * @LastEditTime: 2021-01-04 15:10:03
-->
<style scoped>
.common_tit{
  overflow: hidden;
  height: 104px;
}
.ct_more{
  float: right;
  width: 63px;
  margin: 46px 0 0 0;
  padding-right: 26px;
  height: 20px;
  background: url('../../assets/images/common/more_icon.png') no-repeat right center;
  background-size: 16px 16px;
  font-size: 16px;
  color: rgba(255, 126, 66, 1);
  line-height: 20px;
  font-weight: 400;
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
    <!-- <a href="javascript:;" @click="handleGoRanking" class="ct_more" v-if="isMore && goRanking">More</a> -->
    <a href="/more/rankings" class="ct_more" v-if="isMore && goRanking">View All</a>
    <a :href="'/more/'+ id +'/' + formatSpace(name.toLowerCase())" class="ct_more" v-if="isMore && !goRanking && name && id">View All</a>
    <a :href="'/more/'+ id +'/popular'" class="ct_more" v-if="isMore && !goRanking && !name && id">View All</a>
   
    <h2 class="fs_u"> <i class="left_bar"></i> {{ commontit.tit }}</h2>
  </div>
</template>

<script>
import { formatSpace } from "@/core/js/common.js";

export default {
  name: 'common_tit',
  props: ['commontit', 'isMore', 'id' ,'name' , 'goRanking'],
  data(){
    return {
      formatSpace: formatSpace
    }
  },
  methods: {
    handleGoRanking () {
      if(this.goRanking){
        this.$router.push(`/more/rankings`)
      }else{
        if(!this.name){
          this.name = 'popular'
        }
        this.$router.push(`/more/${this.id}/${formatSpace(this.name.toLowerCase())}`)
      }
    },
  }
}
</script>

