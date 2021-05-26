<style scoped>
.ranking_tag{
  overflow: hidden;
  min-width: 1360px;
  background-color: #F4F6F8;
}
.rt_box{
  overflow: hidden;
  margin: 0 auto;
  width: 1300px;
}
.r_tab_box{
  float: left;
  width: 857px;
}
.rtb_tit{
  overflow: hidden;
  height: 128px;
}
.rtbt_h2{
  float: left;
  margin: 62px 10px 0 0;
  height: 44px;
  font-size: 32px;
  font-weight: bold;
  color: #3A4A5A;
  line-height: 40px;
}
.rtbt_tab{
  float: left;
  margin-top: 79px;
  height: 20px;
}
.rtbt_t{
  float: left;
  margin: 0 10px;
  height: 18px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(58,74,90,0.6);
  line-height: 18px;
}
.rtbt_t.hover{
  font-weight: bold;
  color: #3A4A5A;
  border-bottom: 2px solid rgba(255, 126, 66, 1);
}
.rtbt_list{
  overflow: hidden;
}
.rtbtl_ul{
  overflow: hidden;
}
.rtbtl_ul li{
  overflow: hidden;
  margin-bottom: 24px;
  height: 84px;
}
.rtbtl_ul a{
  display: block;
  overflow: hidden;
}
.rtbtlu_img{
  float: left;
  height: 84px;
  width: 150px;
  background: rgba(58, 74, 90, 0.05);
  border: 1px solid rgba(58, 74, 90, 0.1);
  box-sizing: border-box;
  border-radius: 4px;
}
.rtbtlu_img img{
  width: 150px;
  /* height: 100%; */
  border-radius: 4px;
}
.rtbtlu_info{
  overflow: hidden;
  margin: 0 0 0 166px;
  height: 84px;
}
.rtbtlu_ago{
  float:right;
  width: 130px;
  height: 84px;
  font-size: 16px;
  color: rgba(58,74,90,0.6);
  text-align: right;
  line-height: 52px;
  display: -webkit-box;/* autoprefixer: ignore next */
  -webkit-box-orient:vertical;
  -webkit-line-clamp:1;
}
.rtbtlu_other{
  overflow: hidden;
  margin: 0 150px 0 0;
  height: 84px;
}
.rtbtlu_other h3{
  margin: 12px 0 6px;
  margin-top: 2px;
  overflow: hidden;
  height: 28px;
  font-size: 20px;
  color: #3A4A5A;
  font-weight: bold;
  line-height: 28px;
  display: -webkit-box;/* autoprefixer: ignore next */
  -webkit-box-orient:vertical;
  -webkit-line-clamp:1;
}
.rtbtluo_over{
  overflow: hidden;
  height: 22px;
}
.rtbtluo_over span{
  float: left;
  overflow: hidden;
  height: 22px;
  margin-right: 12px;
  font-size: 14px;
  color: rgba(58,74,90,0.6);
  line-height: 22px;
  font-weight: normal;
}
.rtbtluo_over em{
  float: left;
  margin: 1px 12px 1px 0;
  padding: 0 10px;
  height: 20px;
  background-color: rgba(0,0,0,0.05);;
  font-size: 12px;
  color: rgba(51,51,51,0.6);
  line-height: 20px;
  font-weight: normal;
  border-radius: 11px;
}
.r_tag_box{
  overflow: hidden;
  margin: 32px 0 0 886px;
  height: 612px;
  background-color: #ffffff;
  border: 1px solid rgba(51,51,51,0.1);
  box-sizing: border-box;
}
.rgb_tit{
  margin: 24px 16px;
  height: 38px;
}
.rgbt_h2{
  overflow: hidden;
  height: 38px;
}
.rgbt_h2 span{
  float: left;
  overflow: hidden;
  margin: 5px 0 0 0;
  height: 28px;
  width: 4px;
  background-color: rgba(255, 126, 66, 1);
  border-radius: 3px;
}
.rgbt_h2 strong{
  display: block;
  overflow: hidden;
  margin-left: 14px;
  height: 38px;
  font-size: 32px;
  font-weight: bold;
  line-height: 38px;
  display: -webkit-box;/* autoprefixer: ignore next */
  -webkit-box-orient:vertical;
  -webkit-line-clamp:1;
  color: rgba(67, 83, 102, 1);
}
.rgb_list{
  overflow: hidden;
  margin: 10px 12px;
  height: 500px;
  text-transform: uppercase;
}
.rgb_list div , .rgb_list a{
  float: left;
  margin: 0 12px 24px;
  overflow: hidden;
  max-width: 100%;
  padding: 0 12px;
  height: 32px;
  background-color: rgba(0,0,0,0.05);
  font-size: 16px;
  /* color: #EE3799; */
  color:rgba(255, 126, 66, 1);
  line-height: 32px;
  border-radius: 22px;
  /* display: -webkit-box; */
  /* autoprefixer: ignore next */
  -webkit-box-orient:vertical;
  -webkit-line-clamp:1;
}
</style>

<template>
  <div class="ranking_tag">
    <div class="rt_box">
      <div class="r_tab_box">
        <div class="rtb_tit">
          <h2 class="rtbt_h2 fs_u">{{ ranking_list.name }}</h2>
          <div class="rtbt_tab">
            <a href="javascript:;"
            v-for="(item,index) in ranking_list.columns"
            :key="index"
            :class="['rtbt_t', tindex==index?'hover':'']"
            @click="handleToggleItem(index)">{{ item.name }}</a>
          </div>
        </div>
        <div class="rtbt_list">
          <ul class="rtbtl_ul"
          v-for="(itemp, indexp) in ranking_list.columns"
          :key="indexp">
            <li v-for="(item, index) in itemp.items"
            :key="index"
            v-show="indexp == tindex && (index < 5)"
            @click.prevent="handleClickItem(item)">
              <a :href="'/book_info/'+item.bookId+'/'+formatSpace(item.typeTwoNames && item.typeTwoNames[0] || 'null')+'/'+formatSpace(item.bookName)" target="_blank" style="display:inline-block;" @click.self.prevent="">
                <div class="rtbtlu_img" >
                  <img v-lazy="item.cover" src="../../assets/images/book/book_err.gif" :alt="item.bookName">
                </div>
                <div class="rtbtlu_info">
                  <!-- <div class="rtbtlu_ago" v-if="item.lastUpdateTimeDisplay">{{ item.lastUpdateTimeDisplay }}</div> -->
                  <div class="rtbtlu_other">
                    <h3>{{ item.bookName }}</h3>
                    <div class="rtbtluo_over">
                      <span>{{ item.author }}</span>
                      <em v-for="(itemc, indexc) in item.tags" :key="indexc">{{ itemc }}</em>
                    </div>
                    <div class="rtbtluo_over" v-if="item.lastUpdateTimeDisplay">
                     <span>{{ item.lastUpdateTimeDisplay }}</span> 
                    </div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="r_tag_box">
        <div class="rgb_tit">
          <h2 class="rgbt_h2">
            <span></span>
            <strong class="fs_u">{{ tag_list.name }}</strong>
          </h2>
        </div>
        <div class="rgb_list">
          <div href="javascript:;"
          v-for="(item, index) in tag_list.items"
          :key="index"
          @click.prevent="handleClickItem(item)">
            <a :href="'/search?other=1&keywordtag='+item.tag" target="_blank" style="display:inline-block;" @click.self.prevent="">
              {{ item.name }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ranking_tag',
  props: ['componentData'],
  data () {
    return {
      tindex: 0,
      ranking_li: [],
      // window:window
    }
  },
  computed:{
    ranking_list(){
      return this.componentData.columns[0]||{};
    },
    tag_list(){
      return this.componentData.columns[1]||{};
    }
  },
  mounted () {},
  methods: {
    formatSpace(param) {
      let res = encodeURI(param);
      res = res.split("%20").join("-").split("%C2%A0").join("-");
      // res = res.replace(/\?/g, "");
      res = res.replace(/[^A-Za-z0-9]/ig , '')// \_\'\*\(\)\$\+\!\-\.
      return res;
    },
    routePush (url) {
      if(url) this.$router.push(url)
    },
    handleClickItem (item) {
      this.$emit('clickItem', item)
    },
    handleToggleItem(index){
      this.tindex=index
    }
  }
}
</script>

