<style lang='scss' scoped>
.book-info-null {
  min-height: 800px;
  box-sizing: border-box;
  background: #fff;
  padding-top: 100px;
}
.bookinfo {
  overflow: hidden;
  min-width: 1300px;
  background: #fff;
}
.bi_main {
  overflow: hidden;
  margin: 0 auto;
}
.bi_banner {
  // overflow: hidden;
  width: 1300px;
  margin: 0 auto;
  // height: 480px;
  // background-size: 100% 100%;
  // padding-left: 150px;
}
.bib_box {
  // overflow: hidden;
  margin: 0;
  // padding-right: 140px;
  // height: 480px;
  // width: 1080px;

  box-sizing: border-box;
  padding-top: 40px;
}
.bib_img {
  // float: left;
  padding: 0 40px 0 0px;
  // margin-left: -140px;
  // margin-top: 76px;
  display: inline-block;
  width: 240px;
  height: 320px;
  vertical-align: middle;
}
.bib_img img {
  display: block;
  width: 240px;
  height: 320px;
  border-radius: 4px;
}
.bib_info {
  // margin: 70px 0 0 528px;
  // height: 410px;
  display: inline-block;
  width: 692px;
  vertical-align: top;
  text-align: left;
}
.bib_info h1 {
  margin-bottom: 8px;
  overflow: hidden;
  // height: 134px;
  font-weight: bold;
  line-height: 32px;
  font-size: 28px;
  font-family: Ubuntu-Bold, Ubuntu;
  color: #333333;
}
.bibio_li .book_status {
  height: 22px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(67, 83, 102, 1);
  line-height: 22px;
}
.bibi_other {
  overflow: hidden;
  height: 24px;
  font-weight: 500;
  font-size: 14px;
  font-family: Ubuntu-Italic, Ubuntu;
  font-weight: normal;
  color: #545862;
  line-height: 28px;
  &.lang{
    margin-bottom: 38px;
  }
}
.bibio_li {
  float: left;
  height: 28px;
  white-space: nowrap;
  margin-right: 24px;
  line-height: 28px;
}
.autor{
  font-style: normal;
}
.bibio_li strong,
.bibio_li span {
  font-size: 14px;
  font-weight: 400;
  color: rgba(58, 74, 90, 0.6);
  line-height: 16px;
}
.bibio_li span {
  color: rgba(58, 74, 90, 1);
}
.alpha_contain{
  height: 40px;
}
.alpha{
    overflow: hidden;
    .item{
      float: left;
      img{
        width: 40px;
        height: 40px;
        vertical-align: middle;
        position: relative;
      }
      span{
        display: inline-block;
        height: 32px;
        background: #FFDDEF;
        border-radius: 16px;
        line-height: 32px;
        font-size: 20px;
        font-family: Helvetica;
        color: #EE3799;
        text-align: center;
        vertical-align: middle;
        margin:0 32px 0 -24px;
        padding: 0 14px 0 30px;
        &.pack{
          background:rgba(220, 232, 240, 1);
          color:rgba(0, 122, 209, 1);
        }
      }
    }
  }
.bibi_record {
  overflow: hidden;
  margin-bottom: 40px;
  margin-top: 28px;
  .home_rate {
    font-size: 30px;
    margin-right: 10px;
    display: inline-block;
  }
  .stars {
    overflow: hidden;
    display: inline-block;
    margin-bottom: -2px;
    li {
      float: left;
      width: 14px;
      height: 28px;
      line-height: 28px;
      font-size: 28px;
      &:nth-child(2n) {
        margin-right: 7px;
        background-position: -14px 0;
      }
    }
  }
}
.bibir_li {
  float: left;
  overflow: hidden;
  margin-right: 91px;
}
.bibir_li strong,
.bibir_li span {
  display: block;
  text-align: center;
}
.bibir_li strong {
  height: 36px;
  font-size: 30px;
  font-weight: bold;
  color: #435366;
  line-height: 36px;
}
.bibir_li span {
  margin-top: 6px;
  font-size: 14px;
  font-family: Ubuntu-Regular, Ubuntu;
  font-weight: 400;
  color:rgba(67, 83, 102, 0.5)

  // line-height: 16px;
}
.bibi_but {
  height: 40px;
}
.bibi_but .read-continue-box {
  float: left;
}
.bibib_red {
  margin-right: 50px;
  height: 60px;
  width: 192px;
  background-color: #ee3799;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  line-height: 60px;
  box-shadow: 0px 8px 10px 0px rgba(252, 37, 187, 0.2);
  text-transform: uppercase;
  border-radius: 8px;
}
.bibib_add_bookshelf {
  margin-top: 2px;
  padding-left: 42px;
  height: 58px;
  background: url("../../assets/images/book/1.png") no-repeat 0 center;
  white-space: nowrap;
  font-size: 20px;
  font-weight: 400;
  color: #ee3799;
  text-transform: uppercase;
  line-height: 58px;
}
.bibib_over {
  background-image: url("../../assets/images/book/12.png");
}
.bi_dec {
  overflow: hidden;
  width: 1300px;
  margin: 0 auto;
  // margin-left: -140px;
}
.newBackground{
  width: 100%;
  background: #F5F6FA;
  padding-bottom: 32px;
}
.bid_tit {
  overflow: hidden;
  padding-top: 24px;
}
.bidt_h2 {
  // float: left;
  margin-right: 8px;
  // height: 48px;
}
.bidt_h2 span {
  float: left;
  margin: 10px 8px 0 0;
  height: 28px;
  width: 4px;
  background-color: #fa52ca;
  border-radius: 3px;
}
.bidt_h2 strong {
  // float: left;
  font-weight: bold;
  font-size: 22px;
  color: #333333;
  line-height: 26px;
}
.bid_tit a {
  float: left;
  margin: 16px 12px 16px 0px;
  padding: 8px 15px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  line-height: 16px;
  
}
.bid_p {
  overflow: hidden;
}
.bid_p p {
  font-size: 16px;
  color: #545862;
  line-height: 24px;
  margin-bottom: 8px;
  width: 1180px;
}
.bidp_more {
  position: relative;
  left: 0;
  top: 0;
}
.bidp_more p {
  overflow: hidden;
  height: 84px;
}
.bidp_more_but {
  display: none;
  height: 28px;
  white-space: nowrap;
  font-size: 16px;
  color: rgba(255, 126, 66, 1);
  font-weight: 400;
  line-height: 18px;
}
.bidp_more_but img{
  position: relative;
  top: 2px;
  left: -3px;
}
.bidp_more .bidp_more_but {
  display: block;
}
.bi_may_like_box,
.fellow {
  overflow: hidden;
  margin: 0 auto;
  // margin-left: 150px;
  width: 1300px;
}
.bi_may_like_box{
  padding-top: 8px;
  padding-bottom: 43px;
}
.add-shelf-box {
  margin-top: 10px;
  float: left;
  margin-left: 20px;
}
.comments {
  width: 1080px;
  margin: 40px auto;
  .title {
    font-weight: bold;
    color: rgba(67, 83, 102, 1);
    font-size: 32px;
    margin-bottom: 16px;
    .write_comment {
      display: inline-block;
      width: 170px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background: rgba(238, 55, 153, 1);
      border-radius: 4px;
      font-weight: bold;
      font-size: 16px;
      color: #fff;
      position: relative;
      top: -5px;
      cursor: pointer;
      margin-left: 30px;
    }
  }
}
.fellow_from {
  height: 70px;
  overflow: hidden;
  h2 {
    overflow: hidden;
    color: #435366;
    line-height: 28px;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 56px;
    font-size: 20px;
    font-weight: 400;
    display: -webkit-box;/* autoprefixer: ignore next */
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    white-space:nowrap strong {
      font-weight: 400;
    }
    em {
      font-size: 20px;
      font-style: normal;
    }
    a {
      color: rgba(238, 55, 153, 1);
      font-size: 20px;
    }
  }
}
.layoutCSS{
  width: 1px;
  height: 506px;
}
</style>


<template>
  <div class="bookinfo" v-if="nullPageFalg">
    <router-line :bookInfo="bookInfo" style="top: 9px;left: 40px;"/>
    <div class="newBackground">
    <div class="bi_banner">
      <div class="bib_box">
        <div class="bib_img">
          <img v-if="bookInfo.cover" :src="bookInfo.cover" :alt="bookInfo.bookName" />
          <img v-else src="../../assets/images/common/default_book_bg.png" :alt="bookInfo.bookName" />
        </div>

        <div class="bib_info">
          <h1>{{bookInfo.bookName}}</h1>

          <!-- 同人从属 -->
          <div class="fellow_from" v-if="originalBooks && (originalBooks instanceof Array) && originalBooks.length>0">
            <h2
              :title="fafictionTitle"
              v-if="originalBooks && (originalBooks instanceof Array) && originalBooks.length>0"
            >
              This is a
              <strong v-for="(item, index) in originalBooks" :key="index">
                <a
                  v-if="item.originalBookId"
                  href="javascript:;"
                  @click="openTR(item)"
                >《{{ item.originalBookName }}》</a>
                <em v-else>《{{item.originalBookName}}》</em>
              </strong>
              fanfiction
            </h2>
          </div>

          <!-- 作者 -->
          <div class="bibi_other">
            <div class="bibio_li autor">
              <strong
                class="auth"
                style="color:#3A4A5A;"
              >{{bookInfo.author || bookInfo.translator}} 著</strong>
              <!-- <strong class="book_status">&nbsp;&nbsp;{{bookInfo.lastUpdateTimeDisplay}}</strong> -->
            </div>
          </div>

          <!-- 写作状态 -->
          <!-- <div class="bibi_other">
            <div class="bibio_li"> -->
              <!-- <strong
                class="auth"
                style="color:#3A4A5A;"
              >By:&nbsp;&nbsp;{{bookInfo.pseudonym || bookInfo.translator}}</strong> -->
              <!-- <strong 
              class="book_status" 
              style="color:#3A4A5A;font-size:14px"
              >{{bookInfo.lastUpdateTimeDisplay}}</strong>
            </div>
          </div> -->

          <!-- 语言 -->
          <!-- <div class="bibi_other lang" v-if="bookInfo.language">
            <div class="bibio_li">
              <strong
                class="auth"
                style="color:#3A4A5A;"
              >Language:&nbsp;{{handleLanguage(bookInfo.language)}}</strong>
            </div>
          </div> -->

          <!-- alpha -->
          <div class="bibi_other alpha_contain" v-if="matePseudonym || packNum > 0">
            <div class="alpha">
              <div class="item" v-if="matePseudonym">
                <img src="../../assets/images/book/mate.png" :alt="matePseudonym">
                <span>Mate: {{matePseudonym}}</span>
              </div>
              <div class="item" v-if="packNum > 0">
                <img src="../../assets/images/book/pack.png" alt="packnum">
                <span class="pack">Pack: {{packNum}}</span>
              </div>
            </div>
          </div>

          <!-- <div class="bibi_other">
            <div class="bibio_li" v-if="bookInfo.editor">
              <strong>作者:</strong>
              <span>{{bookInfo.editor}}</span>
            </div>
          </div> -->

          <!-- 评分 -->
          <div class="bibi_record">
            <div class="bibir_li" style="margin-top:5px;">
              <!-- <v-star :ratings="bookInfo.ratings" textPos="home"></v-star> -->

              <strong class="home_rate">{{ true ? dealRatings(bookInfo.ratings) : "0.0"}}</strong>
              <ul class="stars">
                <li
                  v-for="(item, index) in 10"
                  :key="index"
                  :class=" { 'star-empty':true, 'star-fill': true && index <= Math.round(bookInfo.ratings)-1}"
                ></li>
              </ul>

              <span style="text-align:left;" v-if="allComments > 0 && bookInfo.commentCount>=20">
                {{allComments}}
                <!-- <template v-if="allComments == 1">rating</template> -->
                <template>条评论</template>
              </span>
              <!-- <span style="text-align:left;" v-else >
                Not enough ratings
              </span> -->
              <!-- <span style="text-align:left;" >
                Taken from Webfic client user ratings
              </span> -->
            </div>

            <div class="bibir_li">
              <strong>{{bookInfo.chapterCount}}</strong>
              <span>章节</span>
            </div>

            <div class="bibir_li">
              <strong>{{bookInfo.viewCountDisplay}}</strong>
              <span>观看数</span>
            </div>
          </div>

          <!-- 阅读 加入书架 -->
          <div class="bibi_but">
            <!-- 阅读 -->
            <div class="read-continue-box">
              <read-or-continue :bookInfo="bookInfo" type="detail"></read-or-continue>
            </div>

            <!-- 加入书架 -->
            <!-- <div class="add-shelf-box">
              <add-or-inlibrary :bookInfo="bookInfo"></add-or-inlibrary>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="bi_dec">
      <div class="bid_tit">
        <h2 class="bidt_h2">
          <!-- <span></span> -->
          <strong class="special-font">簡介</strong>
        </h2>
        <a
          href="javascript:;"
          class="fs_u"
          v-for="(item,index) in bookInfo.labels"
          :key="item + index"
          @click="handleGoSearch(item)"
        >{{item}}</a>
        <!--  | getRightWord -->
      </div>

      <div :class="['bid_p', isviewmore ? 'bidp_more' : '']">
        <p id="bidph">{{bookInfo.introduction}}</p>
        <a href="javascript:;" class="bidp_more_but" @click="openp">展開
          <img src="../../assets/images/icons/arrow.png" alt="">
        </a>
      </div>
    </div>
    </div>
    


    <!-- 同人 
    <div class="bi_may_like_box">
      <BookImgTitTwo :componentData="fellowList" v-if="fellowList.items.length > 0"></BookImgTitTwo>
    </div>
    -->
    <!-- 狼人 
    <div class="bi_may_like_box">
      <BookImgTitSix :componentData="alphalist" v-if="alphalist.items.length > 0" ></BookImgTitSix>
    </div>
    -->
    <div class="bi_may_like_box">
      <BookImgTitSix :componentData="maylikelist" v-if="maylikelist.items.length > 0"></BookImgTitSix>
    </div>
    <div class="layoutCSS" v-if="maylikelist&&maylikelist.items&&maylikelist.items.length<1"></div>

    <!-- 评论 TODO-->
    <!-- <div class="comments" ref="comments">
      <div class="title">
        Comments
        <span class="write_comment" @click="handleWriteReview">Write a review</span>
      </div>
      <template v-if="commentList.length > 0">
        <b-comment
          v-for="item in commentList"
          :key="item.id"
          :commentInfo="item"
          @handleShowAllComment="handleShowAllComment"
          @handleGetReloadComment="handleGetReloadComment"
          type="book"
        ></b-comment>
        <v-pagiation
          :totals="totals"
          :pageNo="pageNo"
          @handleClickPrev="handleClickPrev"
          @handleClickNext="handleClickNext"
          @handlePageNumItem="handlePageNumItem"
        ></v-pagiation>
      </template>
      <div v-else>
        <null-comment></null-comment>
      </div>
    </div> -->

    <post-comment
      v-if="writeReviewFlag"
      @handleWriteReview="handleWriteReview"
      @handleReviewSubmit="handleReviewSubmit"
      :bookInfo="bookInfo"
    ></post-comment>

    <all-comment-pop
      v-if="isShowAllComment"
      :bookInfo="bookInfo"
      :currentCommentInfo="currentCommentInfo"
      @handleShowAllComment="handleShowAllComment"
      @handleGetReloadComment="handleGetReloadComment"
    ></all-comment-pop>
  </div>
  <div class="book-info-null" v-else>
    <null-verify-password :resultFlag="false" :isShowText="false">
      <template slot="noBookTip">The current book does not exist！</template>
    </null-verify-password>
  </div>
</template>

<script>
import BookImgTitSix from "@/components/Book/ImgTitSix";
import BookImgTitTwo from "@/components/Book/imgTitTwo";
// import AddOrInlibrary from "@/components/Common/AddOrInlibrary.vue";
import BComment from "@/components/Book/Comment.vue";
import PostComment from "@/components/Comment/PostComment.vue";
import VPagiation from "@/components/Common/Pagiation.vue";
import AllCommentPop from "@/components/Book/AllCommentPop.vue";
import ReadOrContinue from "@/components/Common/ReadOrContinue.vue";
import NullComment from "@/components/Common/NullComment.vue";
import VStar from "@/components/Common/Star.vue";
import NullVerifyPassword from "@/components/Common/NullVerifyPassword.vue";
import { formatSpace } from "@/core/js/common.js";
import { mapState } from "vuex";
import RouterLine from '../../components/Common/RouterLine.vue';
export default {
  name: "book_info",
  async asyncData({store,route}){
    let bookId = route.params.id || '';
    console.log(bookId)
    await store.dispatch('HomeDataModule/getBookInfoData',{bookId: bookId || ''});
    var nullPage = store.state.HomeDataModule.nullPage
    console.log(nullPage,store);
  },
  components: {
    BookImgTitSix,
    BookImgTitTwo,
    // AddOrInlibrary,
    BComment,
    PostComment,
    VPagiation,
    AllCommentPop,
    ReadOrContinue,
    NullComment,
    VStar,
    NullVerifyPassword,
    RouterLine
  },
  data() {
    return {
      title:"",
      desc:"",
      isviewmore: false,
      nullPageF :false,
      fellowList: {
        // 同人数据
        name: "Fanfictions of this book",
        items: []
      },
      writeReviewFlag: false,
      pageSize: 10,
      pageNo: 1,
      totals: 1,
      allComments: 0,
      commentList: [],
      currentCommentInfo: {},
      isShowAllComment: false,
      level: 1, // 1是书籍一级评论，2是书籍二级评论，3是章节一级评论，4是章节二级评论
      // nullPageFalg: true,
      // genderList:[],
      // originalBooks: [],
      // fafictionTitle: "",
      // maylikelist: {
      //   name: "看過這本書的人還在看",
      //   items: []
      // },
      // matePseudonym:false,
      // packNum:0,
      //  alphalist:{
      //   name: "Stories from the alpha and mate",
      //   items: [],
      //   isAlpha:true,
      // },
    };
  },
  filters: {
    getRightWord(val) {
      const first = val.substring(0, 1).toUpperCase();
      const other = val.slice(1).toLowerCase();
      return first + other;
    },
  },
  created() {
     this.nullPageF = this.$store.state.HomeDataModule.nullPage
    // document.body.scrollTop = 0;
  },
  computed: {
    ...mapState({
      userInfo: state => state.moduleHome.userInfo
    }),
    ...mapState('HomeDataModule', [
        'bookInfo','fafictionTitle', 'originalBooks', 'maylikelist','packNum','matePseudonym','alphalist','nullPageFalg'
    ])
  },
  mounted() {
    let {id} = this.$route.params;
    $logEvent({uid:this.$root.$options.fackUid,type:'Pageview',event:'DetailPageView',data:{'book_id':id}})
    document.body.scrollTop = 0;
    setTimeout(function() {
      this.isviewmore = document.getElementById("bidph").offsetHeight > 84;
    }, 0);
    this.$nextTick(() => {
      this.$store.dispatch("moduleHome/changeLoadingStatus", true);
      window.scroll(0, 0);
    });
    // if(id) this.getComment(id)
  },
  watch: {
    $route() {
      let {id} = this.$route.params;
      if(id) {
        this.pageNo= 1;
        this.totals= 1;
        this.level = 1;
        this.allComments = 0;
        this.allComments= 0;
        this.commentList= [];
        this.currentCommentInfo=[]
        // this.getComment(id)
      }
    },
     nullPageF:{
      handler(){
        console.log(this.nullPageF,'ddd');
        if(this.nullPageF){
          // this.$router.push('/error')
        }
      }
    }
  },
  methods: {
    handleLanguage(lang){
      let str0 = lang.slice(0,1).toUpperCase();
      let str1 = lang.slice(1).toLowerCase();
      return str0+str1
    },
    filterNum(num){
      if(num.length == 1){
        return num+'.0'
      }else{
        return num
      }
    },
    openTR(item) {
      $logClick({
        module: "BookInfo", // 页面
        zone: "dktryz", // 打开同人的原著
        adid: "open-origin",
        map: {
          bookId: item.originalBookId
        }
      });
      this.$router.push(
        "/book_info/" + item.originalBookId + '/'+formatSpace(item.typeTwoNames && item.typeTwoNames[0] || 'null')+'/'+ formatSpace(item.originalBookName) + "?chapterId=" + item.chapterId
      );
    },
    async getPageInit(params) {
      let that = this;
      //获取用户信息
      that.$axios
        .post("/xsdq/book/detail", {
          bookId: params.id
        })
        .then(data => {
          if (data.data.data.bookId) {
            console.log('youid');
          }else{
            console.log('没有');
          }
          if (data.data.status === 12000) {
            this.nullPageFalg = false;
            window.scroll(0, 0);
            return;
          }
          this.nullPageFalg = true;
          that.bookInfo = data.data.data.book;
          console.log(that.bookInfo,'bookInfo');
          try {
            // console.log(data);
            that.title = that.bookInfo.bookName || 'Webfic'
            that.desc = that.bookInfo.introduction || ''
          } catch (error) {
            console.log(err);
          }
          that.originalBooks = data.data.data.originalBooks;
          if (
            data.data.data.originalBooks &&
            data.data.data.originalBooks instanceof Array &&
            data.data.data.originalBooks.length > 0
          ) {
            let str = "";
            data.data.data.originalBooks.forEach(function(item) {
              str += `《${item.originalBookName}》`;
            });
            that.fafictionTitle = `This is a ${str} fanfiction`;
          }
          that.maylikelist.items = data.data.data.recommends || [];

          // 狼人书 alpha
          that.matePseudonym = data.data.data.matePseudonym || false;
          that.packNum = data.data.data.packNum || 0;
          that.alphalist.items = data.data.data.mateTheAlphaBooks || [];//

          that.fellowList.items = data.data.data.fellowList || [];
          this.getComment();
          setTimeout(function() {
            that.isviewmore =
              document.getElementById("bidph").offsetHeight > 84;
          }, 0);
          this.$nextTick(() => {
            this.$store.dispatch("moduleHome/changeLoadingStatus", true);
            window.scroll(0, 0);
          });
        })
        .catch(error => {
          console.info(error);
        });
    },
    // 点击书籍标签跳转搜索页面
    handleGoSearch(item) {
      this.$store.dispatch("moduleSearch/changeKeyWord", item);
      this.$router.push("/search?other=1");
    },
    openp() {
      this.isviewmore = false;
    },
    // handleGoBookRead() {
    //   this.$router.push(`/book/${this.bookInfo.bookId}`);
    // },
    async handleReviewSubmit() {
      this.level = 1;
      this.handleWriteReview();
      this.handleGetReloadComment({ pageNo: 1, level: 1 });
    },
    handleWriteReview() {
      this.writeReviewFlag = !this.writeReviewFlag;
      if (this.writeReviewFlag) {
        // 点击评论的打点
        $logClick({
          module: this.$route.name,
          zone: "djpl",
          adid: "write-review"
        });
      }
    },
    async getComment(bookId) {
      let res = await this.$axios.post("/xsdq/comment/book/comments", {
        bookId: bookId || this.bookInfo.bookId,
        chapterId: 0,
        order: "",
        level: this.level,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        sort: "",
        userId: this.userInfo.id || 0
      });
      if (res.data.status == 0 && res.data.data.webBookComments) {
        this.totals = res.data.data.webBookComments.pages;
        this.allComments = res.data.data.webBookComments.total;
        this.commentList = res.data.data.webBookComments.records;
        let tempObj = [];
        // 这一步是重新给currentCommentInfo赋值
        tempObj = this.commentList.filter(item => {
          return item.id == this.currentCommentInfo.id;
        });
        if (tempObj.length > 0) {
          this.currentCommentInfo = tempObj[0];
        }
      } else {
        this.commentList = [];
        this.allComments = 0;
      }
    },
    handleShowAllComment({ target }) {
      this.isShowAllComment = !this.isShowAllComment;
      if (target) {
        this.currentCommentInfo = target;
      }
    },
    handleGetReloadComment({ pageNo, level }) {
      if (pageNo) {
        this.pageNo = pageNo;
      }
      if (level) {
        this.level = level;
      } else {
        this.level = 1;
      }
      // this.getComment();
    },
    handleClickPrev() {
      this.pageNo -= 1;
      this.handleGetReloadComment({ level: 1 });
    },
    handleClickNext() {
      this.pageNo += 1;
      this.handleGetReloadComment({ level: 1 });
    },
    handlePageNumItem(target) {
      this.pageNo = target;
      this.handleGetReloadComment({ level: 1 });
      // document.body.scrollTop = this.$refs.comments.offsetTop-200
    },
    dealRatings(ratings) {
      if ((ratings + "").length > 3) {
        var start = (ratings + "").slice(0, 3);
        var last = (ratings + "").slice(4, 5);
        ratings = start - 0 + (Math.round("0." + last) - 0);
      }

      if ((ratings + "").indexOf(".") > -1) {
        return ratings;
      } else {
        return ratings + ".0";
      }
    }
  },
  destroyed() {
    this.$store.dispatch("moduleHome/changeLoadingStatus", false);
  },
  metaInfo(){
    return {
      title: this.bookInfo.bookName||"小說大全-全新海量火熱小说",
      meta: [{
          name: 'description',
          content: this.bookInfo.introduction||"小說大全是一款免費多、顏值高、更新快的電子書閱讀神器，頁面設計精美大方，給你超級舒適的視覺體驗；隨時隨地，連載秒更。百家電子文庫，私人訂制推薦，都市辣文、玄幻修真、盜墓摸金、懸疑、鐵血軍事豪門總裁、校園純愛、古言仙俠、穿越宮鬥、幻想言情、影視原著應有盡有。網文：《鬼手神醫：王妃請上比特《龍王殿》《封少的掌上嬌妻》《幸得相愛，陸少深深寵》《都市無敵醫聖》《至尊女婿》《騙婚總裁：獨寵小嬌妻》《閃婚老公太凶猛》等暢銷書：《你好，舊時光》《你的孤獨，雖敗猶榮》《靈魂有香氣的女子》《微微一笑很傾城》等，趕走生活中無聊的每1秒。小說大全，千萬用戶正在使用的小說閱讀APP！打發無聊時間的絕佳利器！百萬部經典小說樣樣俱全，小說更新實时提醒，從此追書也是件幸福事。"
      }]
    }
  }
};
</script>
