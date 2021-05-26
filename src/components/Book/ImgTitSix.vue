<style scoped>
.imgtitsix{
  overflow: hidden;
  background-color: #ffffff;
}
.itit_box{
  overflow: hidden;
  margin: 0 auto;
}
.itit_list{
  overflow: hidden;
}
.ititl_ul{
  margin-left: -30px;
  overflow: hidden;
  /* height: 350px; */
}
.ititl_ul li{
  float: left;
  margin-left: 30px;
  width: 192px;
}
.ititlu_a{
  display: block;
  width: 192px;
  cursor: pointer;
}
.ititlu_img{
  margin-bottom: 16px;
  overflow: hidden;
  height: 256px;
  width: 192px;
  border-radius: 4px;
  background: rgba(58, 74, 90, 0.05);
  border: 1px solid rgba(58, 74, 90, 0.1);
  box-sizing: border-box;
}
.ititlu_img img{
  display: block;
  height: 256px;
  width: 192px;
  border-radius: 4px;
}
.ititlu_main{
  overflow: hidden;
}
.ititlu_main h3{
  overflow: hidden;
  margin-bottom: 6px;
  max-height: 52px;
  font-size: 20px;
  color: #333;
  font-weight: bold;
  line-height: 26px;
  display: -webkit-box;
  /* autoprefixer: ignore next */
-webkit-box-orient: vertical;
  -webkit-line-clamp:2;
}
.ititlu_main strong{
  overflow: hidden;
  font-size: 14px;
  font-weight: normal;
  color: #545862;
  line-height: 20px;
  font-style: italic;
  text-align: left;
  display: -webkit-box;/* autoprefixer: ignore next */
  -webkit-box-orient:vertical;
  -webkit-line-clamp:1;
  margin-top: 10px;
  margin-bottom: 6px;
}
.view_count{
  height: 19px;
  font-size: 14px;
  font-family: Ubuntu-Bold, Ubuntu;
  font-weight: bold;
  color: #FF7E42;
  line-height: 19px;
} 
.view_count span{
  color:rgba(127, 132, 147, 1);
}
.common_tit{
  overflow: hidden;
  height: 104px;
}
.common_tit h2{
  overflow: hidden;
  margin: 34px 0 0 0;
  height: 44px;
  font-size: 32px;
  font-weight: bold;
  line-height: 40px;
  color: #333333;
  padding-left:22px;
  position: relative;
}
.common_tit span{
  float: right;
  height: 19px;
  font-size: 16px;
  font-family: Helvetica;
  color: #4A90E2;
  line-height: 19px;
  margin-top:50px;
  cursor: pointer;
}
.common_tit span img{
    width: 12px;
    height: 12px;
    margin-left: 4px;
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
  <div class="imgtitsix">
    <div class="itit_box">
      <div class="common_tit">
        <span v-if="showmore">
          more
          <img src="../../assets/images/book/showmore.png" alt="">
        </span>
        <h2 class="fs_u"><i class="left_bar"></i>{{ componentData.name }}</h2>
      </div>
      <div class="itit_list">
        <ul class="ititl_ul">
          <li v-for="(item, index) in componentData.items"
          v-show="index < 5"
          :key="index"
          @click.native="handleGetBookInfo(item , index)">
            <router-link class="ititlu_a" replace :to="{path:'/book_info/'+ item.bookId + '/'+ formatSpace(item.typeTwoNames && item.typeTwoNames[0] || 'null') + '/' +formatSpace(item.bookName)}">
              <div class="ititlu_img">
              <!--
                <img v-lazy="item.cover" src="../../assets/images/book/book_err.gif" :alt="item.bookName">
              -->
                <img :src="item.cover" :alt="item.bookName">
              </div>
              <div class="ititlu_main">
                <h3>{{ item.bookName }}</h3>
                <strong>By: {{ item.pseudonym }}</strong>
                <div class="view_count">
                  {{ item.viewCountDisplay }} <span>views</span>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '@/components/Common/Title'
import {formatSpace} from "@/core/js/common.js"

export default {
  name: 'imgtitsix',
  props: {
    'componentData':{
      default:[],
    },
    'showmore':{
      default:false,
    }
  },
  data () {
    return {
      commontit: {},
      formatSpace,
      imgtxtsix_list: {},
    }
  },
  mounted() {
  },
  methods: {
    handleGetBookInfo(target , index){
      if(this.componentData.isAlpha){
        // 点击alpha推荐列表
        $logClick({
          module: "alpha_share",
          zone: "columndksjxq", // 点击阿尔法推荐列表
          adid: "open_book_detail",
          map: {
            bookId:target.bookId,
            position:index
          },
        });
      }else{
        $logClick({
          module: "open_book_detail",
          zone: "djsjxq", // 点击书籍详情
          adid: "open_book_detail",
          map: {
            index:index
          },
        });
      }
      this.$router.replace('/book_info/'+target.bookId + '/'+ formatSpace(target.typeTwoNames && target.typeTwoNames[0] || "null") +'/'+formatSpace(target.bookName));
    }
  },
  components:{
    Title
  }
}
</script>
