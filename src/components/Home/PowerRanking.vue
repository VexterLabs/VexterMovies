<style scoped>
.power_ranking {
  overflow: hidden;
  min-width: 1360px;
  background-color: #ffffff;
  padding-bottom: 30px;
}
.pr_box {
  overflow: hidden;
  margin: 0 auto;
  width: 1300px;
}
.pr_left {
  overflow: hidden;
  float: right;
  width: 850px;
}
.pr_right {
  overflow: hidden;
  /* margin-left: 886px; */
  width: 390px;
  float: left;
}
.prl_box {
  overflow: hidden;
  width: 100%;
  height: 568px;
  background-color: #f4f6f8;
  border-radius: 4px;
}
.prli_box {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
}
.prl_imgs {
  overflow: hidden;
}
.prli_1,
.prli_2 {
  display: block;
  overflow: hidden;
  width: 190px;
}
.prli_1 {
  float: left;
  margin: 78px 0 0 84px;
}
.prli_2 {
  float: right;
  margin: 78px 84px 0 0;
}
.prli_3 {
  display: block;
  overflow: hidden;
  margin: 0 308px;
  width: 220px;
  margin-top: 31px;
}
.prl_imgs , .prli_2 a, .prli_1 a{
  text-align: center;
}
.prrlu_img img {
  display: block;
  height: 100%;
  width: 100%;
}
.prli_3 img.cover{
  box-sizing: border-box;
  width: 220px;
  height: 290px;
  background: rgba(58, 74, 90, 0.05);
  border: 1px solid rgba(58, 74, 90, 0.1);
  border-radius: 4px;
}
.prli_2 img.cover , .prli_1 img.cover{
  box-sizing: border-box;
  width: 190px;
  height: 250px;
  background: rgba(58, 74, 90, 0.05);
  border: 1px solid rgba(58, 74, 90, 0.1);
  border-radius: 4px;
}
.prl_imgs img.top1 {
  width: 160px;
  height: 41px;
  display: inline-block;
  margin-bottom: 8px;
}
.prl_imgs img.top2 {
  width: 160px;
  height: 34px;
  margin-bottom: 8px;
  display: inline-block;
}
.prl_icon {
  position: absolute;
  left: 0;
  bottom: -20px;
  height: 106px;
  width: 100%;
  background: url("../../assets/images/icons/ranking_1.png") no-repeat center 0;
}
.prl_info {
  overflow: hidden;
  padding: 0 0 0 44px;
  margin-top: 16px;
}
.prl_info div {
  float: left;
  margin-left: 40px;
  width: 190px;
}
.prl_info h3 {
  overflow: hidden;
  max-height: 44px;
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  line-height: 22px;
  text-align: center;
  display: -webkit-box;/* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin-bottom: 8px;
}
.prl_info strong {
  display: block;
  overflow: hidden;
  text-align: center;
  display: -webkit-box;/* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;

  font-style: italic;
  height: 20px;
  font-size: 14px;
  font-weight: normal;
  color: #545862;
  line-height: 20px;
  margin-bottom: 12px;

}
.prl_info p {
  overflow: hidden;
  text-align: left;
  display: -webkit-box;/* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  max-height: 66px;
  font-size: 16px;
  font-weight: 400;
  color: #545862;
  line-height: 22px;
}
.prr_list {
  overflow: hidden;
  width: 413px;
  background-color: #ffffff;
  box-sizing: border-box;
}
.prrl_ul {
  overflow: hidden;
}
.prrl_ul li {
  /* overflow: hidden; */
  box-sizing: border-box;
  width: 390px;
  height: 104px;
  margin-bottom: 16px;
  padding:12px;
}
.prrl_ul a {
  overflow: hidden;
  display: block;
}
.prrlu_img {
  float: left;
  overflow: hidden;
  height: 80px;
  width: 60px;
  border-radius: 4px;
  background: rgba(58, 74, 90, 0.05);
  box-sizing: border-box;
  margin-right: 10px;
}
.prrlu_num{
  float: left;
  width: 24px;
  line-height: 78px;
  font-size: 24px;
  margin-right: 10px;
  font-style: italic;
  color:rgba(51, 51, 51, 1);
  font-weight: bold;
}
.prrlu_num.th3{
  color:rgba(255, 126, 66, 1);
}
.prrlu_info {
  overflow: hidden;
  padding: 14 0px 0px 15px;
}
.prrlu_info h3 {
  height: 22px;
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  line-height: 22px;
  margin-top: 15px;
}
.prrlu_info .view_count{
  height: 19px;
  font-size: 14px;
  font-weight: bold;
  color: #FF7E42;
  line-height: 19px;
}
.prrlu_info .view_count span{
  color:rgba(127, 132, 147, 1);
}
.slh_1{
  overflow:hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow:ellipsis;
}
.top3CSS .title{
  font-size: 18px;
  font-family: Ubuntu-Bold, Ubuntu;
  font-weight: bold;
  color: #333333;
  line-height: 22px;
  margin-bottom: 8px;
  margin-top: 16px;
    overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}
.top3CSS .auth{
  font-size: 14px;
  font-family: Ubuntu-Italic, Ubuntu;
  font-weight: normal;
  color: #545862;
  line-height: 20px;
  margin-bottom: 12px;
}
.top3CSS .intr{
  font-size: 16px;
  font-family: Ubuntu-Regular, Ubuntu;
  font-weight: 400;
  color: #545862;
  line-height: 22px;
  height: 66px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}
</style>

<template>
  <div class="power_ranking">
    <div class="pr_box">
      <div class="pr_left">
        <!-- :isMore='componentData.columns[0].more'
        :id='componentData.columns[0].actionId'-->
        <Title :commontit="commontit_left" :isMore="true" :goRanking="true"></Title>
        <div class="prl_box">
          <div class="prli_box">
            <div class="prl_imgs">
              <div
                v-for="(item,index) in prl_list"
                :key="index"
                style="cursor: pointer;"
                :class="[index==0?'prli_2':(index==1?'prli_1':'prli_3')]"
                @click.prevent="handleClickItem(item)"
              >
              <div v-if="index<3">
                <a
                  :href="'/book_info/'+item.bookId+ '/'+ formatSpace(item.typeTwoNames && item.typeTwoNames[0] || 'null') +'/'+formatSpace(item.bookName)"
                  target="_blank"
                  style="display:block;"
                  @click.self.prevent
                >
                  <img v-if="index==2" class="top1" src="../../assets/images/common/top1.png" alt="">
                  <img v-if="index==1" class="top2" src="../../assets/images/common/top2.png" alt="">
                  <img v-if="index==0" class="top2" src="../../assets/images/common/top3.png" alt="">
                  <img class="cover" v-lazy="item.cover" src="../../assets/images/book/book_err.gif" :alt="item.bookName" />
                  <div class="top3CSS">
                    <p class="title"> {{item.bookName}} </p>
                    <p class="auth">{{item.author}}&nbsp;著</p>
                    <p class="intr">{{item.introduction}}</p>
                    <p></p>
                  </div>
                </a>
              </div>
              </div>
            </div>
          </div>
          <!-- <div class="prl_info">
            <div
              v-for="(item,index) in prl_list"
              :key="index"
              :style="index==0?'float:right;margin:0 84px 0 0':''"
              @click.prevent="handleClickItem(item)"
            >
              <a
                :href="'/book_info/'+item.bookId + '/'+ formatSpace(item.typeTwoNames && item.typeTwoNames[0] || 'null') +'/'+formatSpace(item.bookName)"
                target="_blank"
                style="display:block;"
                @click.self.prevent
              >
                <h3>{{ item.bookName }}</h3>
                <strong>{{ item.author }}</strong>
                <p>{{ item.introduction }}</p>
              </a>
            </div> 
          </div>
          -->
        </div>
      </div>
      <div class="pr_right">
        <TitleMoreNull :commontitmorenull="commontit_right"></TitleMoreNull>
        <div class="prr_list">
          <ul class="prrl_ul">
            <li
              v-for="(item, index) in prr_list"
              :key="index"
              @click.prevent="handleClickItem(item)"
              :style=" index > 4 ? 'height:0px;padding:0px':'' "
            >
            <div v-if="index<5">
              <a
                :href="'/book_info/'+item.bookId+ '/'+ formatSpace(item.typeTwoNames && item.typeTwoNames[0] || 'null') +'/'+formatSpace(item.bookName)"
                target="_blank"
                style="display:inline-block;"
                @click.self.prevent
              >
                <div class="prrlu_img">
                  <img v-lazy="item.cover" src="../../assets/images/book/book_err.gif" :alt="item.bookName" />
                </div>
                <div :class="['prrlu_num' , {'th3':index <=2}]">
                  {{index+1}}
                </div>
                <div class="prrlu_info">
                  <h3 class="slh_1">{{ item.bookName }}</h3>
                  <p class="view_count">
                    {{ item.viewCountDisplay }} <span>阅读量</span>
                  </p>
                </div>
              </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/Common/Title";
import TitleMoreNull from "@/components/Common/TitleMoreNull";

export default {
  name: "power_ranking",
  props: ["componentData"],
  data() {
    return {
      // window: window,
    };
  },
  computed:{
    prl_list(){
      // let arr = [];
      // for (var i = 0; i < 3; i++) {
      //   arr.unshift(this.componentData.columns[0]["items"][i]);
      // }
      return this.componentData.columns[0]["items"].reduce((curent,item,index)=>{
        curent.push(item)
        if(index==2){
          let curent0= curent[0];
          curent[2] = curent0;
          curent[0] = item;
        }
        return curent;
      },[])
    },
    commontit_left(){
      return {
        tit: this.componentData.columns[0]["name"],
        url: this.componentData.columns[0].url,
        search: {
          bookid: "123456789",
        },
      }
    },
    prr_list(){
      return this.componentData.columns[1]["items"];
    },
    commontit_right(){
      return this.componentData.columns[1]["name"];
    }
  },
  mounted() {},
  methods: {
    routePush(url) {
      this.$router.push(url);
    },
    handleClickItem(item) {
      this.$emit("clickItem", item);
    },
    formatSpace(param) {
      // let res = encodeURI(param);
      // res = res.split("%20").join("-").split("%C2%A0").join("-");
      // // res = res.replace(/\?/g, "");
      // res = res.replace(/[^A-Za-z0-9]/ig , '')// \_\'\*\(\)\$\+\!\-\.
      return param;
    },
  },
  components: {
    Title,
    TitleMoreNull,
  },
};
</script>

