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
  margin:0 0 0px -30px;
  max-height: 480px;
}
.itsl_ul li{
  float: left;
  margin: 0 0 40px 30px;
  width: 413px;
  height: 200px;
}
.itslu_a{
  display: block;
  height: 200px;
  cursor: pointer;
}
.itslu_img{
  float: left;
  overflow: hidden;
  width: 160px;
  height: 210px;
  border-radius: 4px;
  box-shadow:0px 6px 10px 0 rgba(0,0,0,0.08);
  background: rgba(58, 74, 90, 0.05);
  border: 1px solid rgba(58, 74, 90, 0.1);
}
.itslu_img img{
  display: block;
  height: 100%;
  width: 100%;
  border-radius: 4px;
}
.itslu_main{
  overflow: hidden;
  margin-left: 176px;
  width: 220px;
  height: 212px;
}
.itslu_main h3{
  overflow: hidden;
  height: 52px;
  font-size: 20px;
  color: #333;
  font-weight: bold;
  line-height: 26px;
  display: -webkit-box;/* autoprefixer: ignore next */
  -webkit-box-orient:vertical;
  word-break: break-word;
  -webkit-line-clamp:2;
  margin-bottom: 8px;
}
.itslu_main .auth{
  height: 20px;
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  color: #545862;
  line-height: 20px;
  margin-bottom: 6px;
}
.itslu_main .update{
  height: 16px;
  font-size: 14px;
  font-weight: 400;
  color: #545862;
  line-height: 16px;
  margin-bottom: 6px;
}
.itslu_main .views{
  color:rgba(255, 126, 66, 1);
  height: 19px;
  font-size: 14px;
  font-weight: bold;
  line-height: 19px;
  margin-bottom: 20px;
}
.itslu_main .views span{
  color:rgba(127, 132, 147, 1);
}
.itslu_main .intr{
  height: 66px;
  font-size: 16px;
  font-weight: 400;
  color: #545862;
  line-height: 22px;

}
.slh_1{
  overflow:hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow:ellipsis;
}
.slh_3{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>

<template>
  <div class="imgtxtsix">
    <div class="its_box">
      <Title :commontit="commontit" :isMore="componentData.more" :id="componentData.id" :name="componentData.name"></Title>
      <div class="its_list">
        <ul class="itsl_ul">
          <li v-for="(item, index) in componentData.items"
          :key="index" @click.prevent="handleClickItem(item)">
            <a :href="'/book_info/'+item.bookId + '/'+ formatSpace(item.typeTwoNames && item.typeTwoNames[0] || 'null') +'/'+formatSpace(item.bookName)" target="_blank" style="display:inline-block;" @click.self.prevent="">
              <div class="itslu_a" :to="{ path: item.url, query: item.search }">
              <div class="itslu_img">
                <img v-lazy="item.cover" src="../../assets/images/book/book_err.gif" :alt="item.bookName">
              </div>
              <div class="itslu_main">
                <h3>{{ fixPopularTitle(item.bookName) }}</h3>
                <i class="auth slh_1">{{ item.author }}&nbsp;著</i>
                <p class="update slh_1">{{ item.lastUpdateTimeDisplay }}</p>
                <p class="views slh_1">
                  {{ item.viewCountDisplay }} <span>阅读量</span>
                </p>
                <p class="intr slh_3">{{ item.introduction }}</p>
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

export default {
  name: 'imgtxtsix',
  props:['componentData'],
  data () {
    return {
      // window:window
    }
  },
  computed: {
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
  mounted () {
    let that = this;

    //拿列表数据
    // that.imgtxtsix_list = that.componentData.items
  },
  methods: {
    handleClickItem (item) {
      this.$emit('clickItem', item)
    },
    fixPopularTitle(titleStr){
      return titleStr.replace(/&nbsp;/g , ' ').replace(/\s+/g, ' ');
    },
    formatSpace(param) {
      let res = encodeURI(param);
      res = res.split("%20").join("-").split("%C2%A0").join("-");
      // res = res.replace(/\?/g, "");
      res = res.replace(/[^A-Za-z0-9]/ig , '')// \_\'\*\(\)\$\+\!\-\.
      return res;
    },
  },
  components: {
    Title
  }
}
</script>

