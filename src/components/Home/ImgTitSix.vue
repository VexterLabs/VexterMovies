<style scoped>
.imgtitsix{
  overflow: hidden;
  min-width: 1360px;
background: #FFFFFF;
  padding-bottom: 40px;
}
.itit_box{
  overflow: hidden;
  margin: 0 auto;
  width: 1302px;
}
.itit_list{
  overflow: hidden;
  width: 1302px;
}
.ititl_ul{
  margin-left: -30px;
  overflow: hidden;
  width: 1332px;
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
}
.ititlu_img{
  margin-bottom: 16px;
  overflow: hidden;
  height: 258px;
  width: 192px;
  border-radius: 4px;
  background: rgba(58, 74, 90, 0.05);
  border: 1px solid rgba(58, 74, 90, 0.1);
  box-sizing: border-box;

}
.ititlu_img img{
  display: block;
  height: 258px;
  width: 192px;
  border-radius: 4px;
}
.ititlu_img img[lazy=error] {
    /*your style here*/
    background-image: url('../../assets/images/book/book_err.gif');
}
.ititlu_main{
  overflow: hidden;
}
.ititlu_main h3{

  width: 192px;
  max-height: 52px;
  font-size: 20px;
  font-family: Ubuntu-Bold, Ubuntu;
  font-weight: bold;
  color: #333333;
  line-height: 26px;
  margin-bottom: 6px;
  overflow: hidden;
  display: -webkit-box;/* autoprefixer: ignore next */
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
}

.ititlu_main .auth{
  height: 20px;
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  color: #545862;
  width: 100%;
  display: inline-block;
  line-height: 20px;
  margin-bottom: 6px;
}
.ititlu_main .views{
  color:rgba(255, 126, 66, 1);
  height: 19px;
  font-size: 14px;
  font-weight: bold;
  line-height: 19px;
}
.ititlu_main .views span{
  display: inline;
  color:rgba(127, 132, 147, 1);
}
.slh_1{
  overflow:hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow:ellipsis;
}
</style>

<template>
  <div class="imgtitsix">
    <div class="itit_box">
      <Title :commontit="commontit"  :isMore="componentData.more" :id="componentData.id" :name="componentData.name"></Title>
      <div class="itit_list">
        <ul class="ititl_ul">
          <li v-for="(item, index) in imgtxtsix_list.items" :key="index"
          @click.prevent="handleClickItem(item)">
            <a :href="'/book_info/'+item.bookId+'/'+formatSpace(item.typeTwoNames && item.typeTwoNames[0] || 'null')+'/'+formatSpace(item.bookName)" target="_blank" style="display:inline-block;" @click.self.prevent="">
              <div class="ititlu_a" :to="{ path: item.url, query: item.search }">
                <div class="ititlu_img">
                  <img v-lazy="item.cover" src="../../assets/images/book/book_err.gif" :alt="item.bookName">
                </div>
                <div class="ititlu_main">
                  <h3>{{ item.bookName }}</h3>
                  <i class="auth slh_1">{{ item.author }}&nbsp;著</i>
                  <p class="views slh_1">
                    {{ item.viewCountDisplay }} <span>阅读量</span>
                  </p>
                </div>
              </div>
            </a>
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
  props: ['componentData'],
  data () {
    return {
      // window:window
    }
  },
  computed:{
      imgtxtsix_list(){
        return this.componentData
      },
      commontit(){
        return {
          tit: this.componentData.name,
          url: this.componentData.url,
          search: {
            bookid: '123456789'
          }
        }
      }
  },
  mounted() {
  },
  methods: {
    handleClickItem (item) {
      this.$emit('clickItem', item)
      let target = {};
      target.tit = this.commontit.tit;
      target.url = '/more/'+ this.componentData.id +'/' + this.formatSpace(this.componentData.name.toLowerCase());
      target = JSON.stringify(target);
      window.sessionStorage.setItem('target',target);
    },
    formatSpace(param) {
      let res = encodeURI(param);
      res = res.split("%20").join("-").split("%C2%A0").join("-");
      res = res.replace(/[^A-Za-z0-9]/ig , '')// \_\'\*\(\)\$\+\!\-\.
      return res;
    },
  },
  components:{
    Title
  }
}
</script>
