<template>
    <div class="error">
        <nav-box></nav-box>
        <div class="error-page">
            <!-- <div class="left">
                <div class="title">WHOOPS!</div>
                <div class="tips">
                    Can not found this page Try again or
                    <span @click="$router.replace('/')">Back to home</span>
                </div>
            </div> -->
            <div class="right">
                <!-- <img src="../../assets/images/common/404_bg.png" alt="404 not found"> -->
                <img src="../../assets/images/imgs/404image.png" alt="404 not found">
                <div class="bottom">
                    <p>沒有找到您想要的</p>
                    <p>看看有沒有其他喜歡的書籍</p>
                </div>
            </div>
        </div>
        <!-- <more-book  />
        <img-txt-six /> -->
        <div class="home">
    <component
      :is="comitem.style=='BANNER'?'Banner':(comitem.style=='BOOK3X2'?'ImgTxtSix':
    (comitem.style=='BOOK6X1'?'ImgTitSix':(comitem.style=='RANK_GROUP1'?'PowerRanking':(comitem.style=='BOOK4X1'?'ImgTxtFour':(comitem.style=='RANK_GROUP2'?'RankingTag':'')))))"
      v-for="(comitem,index) in bookList"
      :key="comitem.id + '_' +index"
      :componentData="comitem.style=='BANNER'?banners:comitem"
      @clickItem="handleClickItem"
      :isShowFlag="isShowFlag"
    ></component>
  </div>
        <footer-nav></footer-nav>
    </div>
</template>
<script>
import NavBox from '@/components/Home/NavBox'
import FooterNav from '@/components/Common/FooterNav.vue'
import MoreBook from './MoreBook.vue'
// import ImgTxtSix from '../../components/Home/ImgTxtSix.vue'
import { mapState, mapMutations } from "vuex";
import Banner from "@/components/Home/Banner";
import ImgTxtSix from "@/components/Home/ImgTxtSix";
import ImgTitSix from "@/components/Home/ImgTitSix";
import PowerRanking from "@/components/Home/PowerRanking";
import ImgTxtFour from "@/components/Home/ImgTxtFour";
import RankingTag from "@/components/Home/RankingTag";
import { formatSpace } from "@/core/js/common.js";
import Banner1 from "../../assets/images/common/banner1.jpg";
import Banner2 from "../../assets/images/common/banner2.jpg";
import Banner3 from "../../assets/images/common/banner3.jpg";
import Banner4 from "../../assets/images/common/banner4.jpg";
export default{
    async asyncData({store}){
        await store.dispatch('HomeDataModule/getIndexData');
    },
    computed:{
        ...mapState('HomeDataModule', [
            'bookList'
        ])
    },
    components: {
        NavBox,
        // Banner,
    ImgTxtSix,
    ImgTitSix,
    // PowerRanking,
    ImgTxtFour,
    // RankingTag,
    NullDiv: "<div></div>",
    FooterNav
    },
    data () {
        return {
            isShowFlag: false,
            banners:{
              items:[
                {
                  'bannerUrl':Banner1,
                  'bookId': "11010091629",
                  // 'bookId':'11000000227',
                  'bookName': "神王婿",
                  "author":"絕代天驕"
                },
                {
                  'bannerUrl':Banner2,
                  'bookId': "11010076840",
                  // 'bookId': "11000000153",
                  'bookName': "重生之一世梟龍",
                  "author":"青海長雲"
                },
                {
                  'bannerUrl':Banner3,
                  'bookId': "11010086319",
                  // 'bookId': "11000000207",
                  'bookName': "醜女重生：霍家後嬌又颯",
                  "author":"喬眉"
                },
                {
                  'bannerUrl':Banner4,
                  'bookId': "11010080493",
                  // 'bookId': "11000000231",
                  'bookName': "鬼手醫妃：王爺休書請拿好",
                  "author":"勤奮的螃蟹"
                }
              ]
            },
        }
    },
    	mounted() {
		this.$nextTick(() => {
			this.$store.dispatch("moduleHome/changeLoadingStatus", true);
        this.isShowFlag = true;
        document.body.scrollTop = 0;
      });
      console.log('fackUid:',this.$root.$options.fackUid)
      $logEvent({uid:this.$root.$options.fackUid,type:'Pageview',event:'Homepageview'})
	},
  methods: {
    handleClickItem(item) {
      this.dealActionType(item);
    },
    dealActionType(item) {
      switch (item.actionType) {
        case "URL":
          window.open(item.action, "_blank");
          break;
        case "BOOK":
          this.$router.push(
            `/book/${item.bookId || item.action}`
          );
          // this.$router.push(
          //   `/book_info/${item.bookId || item.action}/${formatSpace(
          //     item.typeTwoNames && item.typeTwoNames[0] || 'null'
          //   )}/${formatSpace(item.bookName || 'null')}`
          // );
          break;
        case "CATEGORY":
          this.$router.push("/search?other=1");
          this.$store.dispatch("moduleSearch/changeKeyWord", item.tag);
          break;
        case "READER":
          this.$router.push(`/book/${item.action}`);
          break;
        default:
          $logEvent({uid:this.$root.$options.fackUid,type:'Click',event:'homepage_item_click',data:{'book_id':item.bookId || ''}})
          this.$router.push(
            `/book/${item.bookId || item.action}`
          );
          // this.$router.push(
          //   `/book_info/${item.bookId || item.action}/${
          //     item.typeTwoNames && item.typeTwoNames[0] || 'null'
          //   }/${item.bookName || 'null'}`
          // );
          break;
      }
    }
  },
  destroyed() {
    this.$store.dispatch("moduleHome/changeLoadingStatus", false);
  },
}
</script>
<style lang='scss' scoped>
.error{
    .error-page{
        width: 1080px;
        // min-height: 800px;
        padding: 40px 0;
        box-sizing: border-box;
        overflow: hidden;
        margin: 0 auto;
        margin-bottom: 100px;
        display: flex;
        justify-content: center;
        .left{
            width: 410px;
            float: left;
            .title{
                padding-top: 162px;
                font-family:SourceHanSansCN-Heavy,SourceHanSansCN;
                font-weight:800;
                color:rgba(66,66,66,1);
                font-size: 72px;
            }
            .tips{
                font-family:SourceHanSansCN-Normal,SourceHanSansCN;
                font-weight:400;
                color:rgba(76,76,76,1);
                font-size: 32px;
                span{
                    font-size: 32px;
                    color: #5698E9;
                    cursor: pointer;
                }
            }
        }
        .right{
            width: 300px;
            height: 300px;
            // float: right;
            font-size: 0;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .bottom{
            width: 192px;
            height: 44px;
            text-align: center;
            margin: auto;
            opacity: 0.6;
        }
    }
}
</style>
