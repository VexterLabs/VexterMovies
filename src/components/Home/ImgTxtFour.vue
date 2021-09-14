<style scoped>
.imgtxtsix{
  overflow: hidden;
  min-width: 1360px;
  background-color: #fff;
}
.its_box{
  overflow: hidden;
  margin: 0 auto;
  width: 1300px;
}
.its_list{
  overflow: hidden;
  width: 1300px;
}
.itsl_ul{
  overflow: hidden;
  margin-left: -30px;
}
.itsl_ul li{
  float: left;
  margin: 0 0 40px 30px;
  width: 302px;
  height: 200px;
}
.itslu_a{
  display: block;
  height: 200px;
}
.itslu_img{
  float: left;
  overflow: hidden;
  width: 150px;
  height: 200px;
  border-radius: 4px;
  box-shadow:0px 6px 10px 0 rgba(0,0,0,0.08);
  background: rgba(58, 74, 90, 0.05);
  border: 1px solid rgba(58, 74, 90, 0.1);
}
.itslu_img img{
  display: block;
  height: 200px;
  width: 150px;
  border-radius: 4px;
}
.itslu_main{
  overflow: hidden;
  margin-left: 170px;
  height: 200px;
}
.itslu_main h3{
  overflow: hidden;
  margin-bottom: 10px;
  max-height: 56px;
  font-size: 20px;
  color: #3A4A5A;
  font-weight: bold;
  line-height: 28px;
  display: -webkit-box;/* autoprefixer: ignore next */
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
  word-break: break-word;
}
.itslum_other{
  margin-bottom: 10px;
  overflow: hidden;
  height: 22px;
  margin-top: 10px;
}
.itslum_other strong{
  overflow: hidden;
  display: block;
  font-size: 14px;
  color: rgba(58,74,90,0.6);
  line-height: 22px;
  font-weight: normal;
  text-align: left;
  display: -webkit-box;/* autoprefixer: ignore next */
  -webkit-box-orient:vertical;
  -webkit-line-clamp:1;
}
.itslu_main p{
  overflow: hidden;
  height: 84px;
  font-size: 16px;
  font-weight: 400;
  color: #3A4A5A;
  line-height: 28px;
  display: -webkit-box;/* autoprefixer: ignore next */
  -webkit-box-orient:vertical;
  -webkit-line-clamp:3;
  margin-top: 15px;
}
</style>

<template>
  <div class="imgtxtsix">
    <div class="its_box">
      <Title :commontit="commontit"
      :name="componentData.name"
      :isMore='componentData.more'
      :id='componentData.id'></Title>
      <div class="its_list">
        <ul class="itsl_ul">
          <li v-for="(item, index) in imgtxtsix_list.items" :key="index"
          @click.prevent="handleClickItem(item)">
            <!-- <a class="itslu_a" :href="'/book_info/'+item.bookId" target="_blank" style="display:inline-block;" @click.self.prevent=""> -->
            <a class="itslu_a" :href="'/book/'+item.bookId" target="_blank" style="display:inline-block;" @click.self.prevent="">
              <div class="itslu_img">
                <img v-lazy="item.cover" src="../../assets/images/book/book_err.gif" :alt="item.bookName">
              </div>
              <div class="itslu_main">
                <h3>{{ fixPopularTitle(item.bookName) }}</h3>
                <div class="itslum_other">
                  <strong>{{ item.author }}</strong>
                </div>
                <p>{{ item.introduction }}</p>
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
export default {
  name: 'imgtxtsix',
  props:['componentData'],
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
  methods: {
    handleClickItem (item) {
      this.$emit('clickItem', item)
    },
    fixPopularTitle(titleStr){
      return titleStr.replace(/&nbsp;/g , ' ').replace(/\s+/g, ' ');
    }
  },
  components: {
    Title
  }
}
</script>

