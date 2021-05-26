<template>
  <div class="user-center">
    <div class="user-container">
      <div class="user-left">
        <div class="user-avatar">
          <img v-if="userBaseInfo.avatar" v-lazy="userBaseInfo.avatar" alt="goodnovel user avatar" />
          <img v-else src="../../assets/images/center/user_center_avatar_default.png" alt="goodnovel user avatar" />
        </div>
        <div class="user-handle" @click="handleGoUserSetting"></div>
        <div class="user-name">{{userBaseInfo.nickname}}</div>
        <div class="user-id">
          <!-- <span class="user-level">LV.12</span> -->
          <span class="user-id-num">ID: {{userBaseInfo.id}}</span>
        </div>
        <div class="user-about">About me:</div>
        <div class="user-habit">{{userBaseInfo.about}}</div>
      </div>
      <div class="user-right">
        <div class="user-top">
          <div class="user-wallet">
            <div class="title">
              <span class="title-tip">Wallet</span>
            </div>
            <div class="detail">
              <img src="../../assets/images/center/user_center_wallet.png" alt="goodnovel_wallet" class="detail_cover">

              <div class="detail_center">
                <span
                  class="detail-num detail_cneter_top"
                  :title="userBaseInfo.balance||0"
                >
                  {{showBalance}}
                  <span class="detail_dl">Coins</span>
                </span>
                <span class="detail_cneter_bottom">
                  Bonus {{award}}
                </span>
              </div>

              <span class="detail-go" @click="toggleRechargeShow">TOP-UP</span>
              <!-- @click="handleGoIncRev('topup')"   -->
            </div>
          </div>
          <div class="user-income">
            <div class="title">
              <span class="title-tip">Income</span>
              <span class="title-more" ><img src="../../assets/images/center/tag_beta.png" alt=""></span>
            </div>
            <div class="detail">

              <img src="../../assets/images/center/user_center_income.png" alt="goodnovel_wallet" class="detail_cover">

              <div class="detail_center">
                <span class="detail-num detail_cneter_top" >
                  {{showM}}
                </span>
                <span class="detail_cneter_bottom account_info" @click="handleAcount">
                  Payment Info
                  <img src="../../assets/images/center/icon_more.png" alt="">
                </span>
              </div>

              <span class="detail-go" @click="handleGoIncRev('history')">Detail</span>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="nav-box">
            <div
              :class="['item',{'active': toggleItem=='story'}]"
              @click="handleToggleItem('story')"
            >Stories</div>
            <div
              :class="['item',{'active': toggleItem=='comment'}]"
              @click="handleToggleItem('comment')"
            >Comment</div>
          </div>
          <div class="content">
            <div v-if="toggleItem=='story'" class="sotry-content">
              <template v-if="storyList.length > 0 && isLoading ">
                <v-story
                  v-for="item in storyList"
                  :key="item.bookId"
                  :bookInfo="item"
                  :sixMonths="sixMonths"
                  @pageInit="pageInit"
                ></v-story>
                <v-pagiation
                  :totals="storyTotal"
                  :pageNo="storyPageNo"
                  @handleClickPrev="handleClickStoryPrev"
                  @handleClickNext="handleClickStoryNext"
                  @handlePageNumItem="handleStoryPageNumItem"
                ></v-pagiation>
              </template>
              <null-story v-if="!storyList.length && isLoading"></null-story>
              <div class="add-story">
                <span @click="$router.push('/create_book')">NEW STORY +</span>
              </div>
            </div>
            <div v-else-if="toggleItem=='comment'" class="comment">
              <template v-if="commentList.length > 0">
                <v-comment
                  v-for="item in commentList"
                  :key="item.id"
                  :commentInfo="item"
                  @getCommentList="getCommentList"
                ></v-comment>
                <v-pagiation
                  :totals="commentTotal"
                  :pageNo="commentPageNo"
                  @handleClickPrev="handleClickCommentPrev"
                  @handleClickNext="handleClickCommentNext"
                  @handlePageNumItem="handleCommentPageNumItem"
                ></v-pagiation>
              </template>
              <null-comment v-else></null-comment>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-recharge
      v-if="rechargeShow"
      @closePageChild="closePageChild"
      @toggleRechargeShow="toggleRechargeShow"
    ></v-recharge>

    <v-account :editable="editable" v-if="accountShow" @closePageAccount="closePageAccount"></v-account>

    <v-signperson
      v-if="showSignMask == 1"
      :bookInfo="signBookInfo"
      :pseudonym="userBaseInfo.pseudonym|| ''"
      @closePageAccount="closePageSign"
    ></v-signperson>
  </div>
</template>
<script>
import VStory from "@/components/UserCenter/Story.vue";
import VComment from "@/components/UserCenter/Comment.vue";
import VSignperson from "@/components/UserCenter/Signperson.vue";
import VSignbook from "@/components/UserCenter/Signbook.vue";
import NullStory from "@/components/Common/NullStory.vue";
import NullComment from "@/components/Common/NullComment.vue";
import VRecharge from "@/components/Common/Recharge.vue";
import VAccount from "@/components/IncRenv/account.vue";
import { mapState } from "vuex";
import VPagiation from "@/components/Common/Pagiation.vue";
import { showMoney } from "@/core/js/common.js";
export default {
  components: {
    VStory,
    VComment,
    VPagiation,
    NullStory,
    NullComment,
    VRecharge,
    VAccount,
    VSignperson,
    VSignbook
  },
  computed: {
    ...mapState({
      userInfo: state => state.moduleHome.userInfo
    })
  },
  data() {
    return {
      showM:0, //income
      award:0 ,// bonus
      showBalance:0,// Coins
      toggleItem: "story",
      storyPageSize: 10,
      storyPageNo: 1,
      storyTotal: 1,
      isLoading: false,
      storyList: [],
      commentList: [],
      commentPageNo: 1,
      commentPageSize: 10,
      commentTotal: 1,
      userBaseInfo: {}, // 这个用户信息记录用户的基本信息和作者的收支情况
      rechargeShow: false,
      accountShow: false,
      editable: false, // 是否可编辑
      showSignMask: 0, // 展示线上签约信息弹层 0 不展示, 1展示个人信息 , 2展示书籍信息
      signBookInfo: {}, // 单条书籍数据
      workDataCount: 0, // 签约书籍数量
      sixMonths:false, // 作者更新书籍的频率

    };
  },
  mounted() {
    this.getUserInfo();
    this.pageInit();
  
  },
  methods: {
    closePageSign() {
      this.showSignMask = 0;
    },

    async pageInit() {
      this.isLoading = false;
      let res = await this.$axios.post("/webfic/profile/my/books", {
        authorId: this.userInfo.id,
        order: "",
        pageNo: this.storyPageNo,
        pageSize: this.storyPageSize,
        sort: ""
      });
      if (res.data.status == 0 && res.data.data.bookList) {
        this.storyList = res.data.data.bookList.records;
        // console.log(this.storyList)
        this.storyTotal = res.data.data.bookList.pages;
        this.sixMonths = res.data.data.months || false;
      } else {
        this.storyList = [];
      }

      this.storyList.forEach((item, index) => {
        if (
          item.contractStatus == "SIGNED" ||
          item.contractStatus == "ARCHIVED"
        ) {
          this.workDataCount += 1;
        }
      });
      this.isLoading = true
      window.scroll(0, 0);
      this.$store.dispatch("moduleHome/changeLoadingStatus", true);
    },
    async getCommentList() {
      let res = await this.$axios.post("/webfic/profile/my/comments", {
        pageNo: this.commentPageNo,
        pageSize: this.commentPageSize,
        userId: this.userInfo.id
      });
      if (res.data.status == 0 && res.data.data.bookCommentVos) {
        this.commentList = res.data.data.bookCommentVos.records;
        this.commentTotal = res.data.data.bookCommentVos.pages;
      }
      await this.$nextTick();
      window.scroll(0, 0);
    },
    async getUserInfo() {
      let res = await this.$axios.post("/webfic/profile/user/info", {
        id: this.userInfo.id
      });
      if (res.data.status == 0 && res.data.data) {
        this.userBaseInfo = res.data.data;
        this.showM = showMoney(this.userBaseInfo.revenueDisplay ? this.userBaseInfo.revenueDisplay : "$ 0.00" , true)
        // this.showBalance = showMoney(this.userBaseInfo.balance ? this.userBaseInfo.balance +'' : "0.00" , false)
        this.showBalance = this.userBaseInfo.balance ? this.userBaseInfo.balance +'' : "0";
        this.award = this.userBaseInfo.award || 0;
      }
    },
    async getUserAccount() {
      let res = await this.$axios.post("/webfic/profile/user/account", {});
      // console.log(res);
    },

    toggleRechargeShow() {
      // 显示关闭充值弹窗
      this.rechargeShow = !this.rechargeShow;

      if (this.rechargeShow) {
        // 点击充值按钮打点
        $logClick({
          module: this.$route.name,
          zone: "djhqcoins", // 点击获取更多coins
          adid: "click-get-more-coins"
        });
      } else {
        $logClick({
          module: this.$route.name,
          zone: "djgbcz", // 点击关闭充值
          adid: "click-close-get-more-coins"
        });
      }
    },
    closePageChild() {
      // 充值完成之后子窗口关闭的回调(重新获取接口状态没变，所以重新刷新下页面，不确定是不是延迟到账的问题)
      this.getUserInfo();
      this.rechargeShow = !this.rechargeShow;
      // window.location.reload()
    },
    closePageAccount() {
      this.accountShow = false;
    },
    handleGoIncRev(pos) {
      $logClick({
        module: this.$route.name,
        zone: "djjrsz", // 点击进入收支详情
        adid: "click-incRev" // 点击进入收支详情
      });
      // 进入收支页面
      this.$router.push("/income?pos=" + pos);
    },
    handleAcount() {
      $logClick({
        module: this.$route.name,
        zone: "djwithdraw", // 点击withdraw
        adid: "click-withdraw"
      });

      this.accountShow = true;
      if (this.userBaseInfo.accountNumber == 0) {
        this.editable = false;
      } else {
        this.editable = true;
      }
    },
    handleGoUserSetting() {
      $logClick({
        module: this.$route.name,
        zone: "djyhszan", // 点击用户设置按钮
        adid: "click-user-setting-btn"
      });

      this.$router.push({
        name: "user_edit",
        query: {
          ...this.userBaseInfo
        }
      });
    },
    handleToggleItem(target) {
      if (this.toggleItem == target) {
        return;
      }
      if (target == "comment") {
        this.getCommentList();
      }
      this.toggleItem = target;
    },
    handleClickStoryPrev() {
      this.storyPageNo -= 1;
      this.pageInit();
    },
    handleClickStoryNext(target) {
      this.storyPageNo += 1;
      this.pageInit();
    },
    handleStoryPageNumItem(target) {
      this.storyPageNo = target;
      this.pageInit();
    },
    handleClickCommentPrev() {
      this.commentPageNo -= 1;
      this.getCommentList();
    },
    handleClickCommentNext() {
      this.commentPageNo += 1;
      this.getCommentList();
    },
    handleCommentPageNumItem(target) {
      this.commentPageNo = target;
      this.getCommentList();
    }
  },
  destroyed() {
    this.$store.dispatch("moduleHome/changeLoadingStatus", false);
  }
};
</script>
<style lang='scss' scoped>
.user-center {
  width: 100%;
  background: rgba(244, 246, 248, 1)
    url("../../assets/images/center/user_center_bg.png") no-repeat top
    center/100% 240px;
  // overflow: hidden;
  padding-top: 120px;
  .user-container {
    width: 1080px;
    min-height: 600px;
    margin: 0 auto;
    position: relative;
    margin-bottom: 20px;
    .user-left {
      width: 302px;
      min-height: 200px;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      border: 1px solid rgba(0, 0, 0, 0.05);
      background: #fff;
      position: absolute;
      left: 0;
      top: 0;
      text-align: center;
      .user-avatar {
        width: 180px;
        height: 180px;
        box-sizing: border-box;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 8px 16px 0px rgba(232, 87, 135, 0.15);
        border-radius: 50%;
        padding: 10px;
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%) translateY(-50%);
        margin-top: 10px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .user-handle {
        width: 24px;
        height: 24px;
        position: absolute;
        background: url("../../assets/images/center/user_center_handle_icon.png")
          no-repeat center center/100% 100%;
        right: 8px;
        top: 8px;
        cursor: pointer;
      }
      .user-name {
        margin-top: 135px;
        font-weight: bold;
        color: rgba(67, 83, 102, 1);
        line-height: 48px;
        font-size: 32px;
      }
      .user-id {
        margin-top: 15px;
        margin-bottom: 32px;
        .user-level {
          box-sizing: border-box;
          padding: 0 10px;
          display: inline-block;
          background: linear-gradient(
            135deg,
            rgba(246, 131, 131, 1) 0%,
            rgba(220, 107, 219, 1) 100%
          );
          height: 22px;
          line-height: 22px;
          border-radius: 22px;
          text-align: center;
          font-size: 12px;
          color: #fff;
        }
        .user-id-num {
          font-weight: bold;
          color: rgba(58, 74, 90, 0.6);
          font-size: 16px;
          margin-left: 5px;
          display: inline-block;
          height: 22px;
          line-height: 24px;
        }
      }
      .user-about {
        text-align: left;
        width: 262px;
        margin: 0 auto;
        font-size: 16px;
        font-family: SourceHanSansCN-Bold, SourceHanSansCN;
        font-weight: bold;
        color: rgba(58, 74, 90, 1);
        line-height: 28px;
        padding: 11px 0 0;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
      }
      .user-habit {
        color: rgba(58, 74, 90, 0.6);
        line-height: 28px;
        font-size: 16px;
        margin-bottom: 20px;
        box-sizing: border-box;
        padding: 0 20px;
        display: -webkit-box;/* autoprefixer: ignore next */
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
        text-align: left;
      }
    }
    .user-right {
      width: 760px;
      min-height: 200px;
      margin-left: 320px;
      .user-top {
        width: 100%;
        height: 140px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0.05);
        padding: 21px 0 16px;
        box-sizing: border-box;
        .user-wallet , .user-income{
          float: left;
          width: 50%;
          box-sizing: border-box;
          height: 100%;
          border-right: 1px solid rgba(0, 0, 0, 0.1);
          padding: 0 16px;
          .title {
            .title-tip {
              // font-weight: bold;
              color: rgba(58, 74, 90, 1);
              font-size: 20px;
              height: 28px;
            }
            .title-more {
              color: rgba(238, 55, 153, 1);
              font-size: 16px;
              margin-left: 10px;
              img{
                width: 38px;
                height: 20px;
              }
            }
          }
          .detail {
            height: 70px;
            width: 100%;
            margin-top: 8px;
            height: 60px;
            display: flex;
            .detail_cover{
              width: 60px;
              height: 60px;
              margin-right: 8px;
            }
            .detail_center{
              flex:1;
              width: 170px;
              height: 100%;
              .detail_cneter_top{
                display: inline-block;
                height: 32px;
                line-height: 32px;
                font-size:32px;
                font-family:Helvetica-Bold,Helvetica;
                font-weight:bold;
                color:rgba(67,83,102,1);
                vertical-align: bottom;
                .detail_dl{
                  font-size:16px;
                  font-family:Helvetica;
                  color:rgba(58,74,90,.7);
                  font-weight: bold;
                  line-height:16px;
                }
              }
              .detail_cneter_bottom{
                display: inline-block;
                width: 100%;
                height: 28px;
                line-height: 28px;
                font-size:16px;
                font-family:Helvetica;
                color:rgba(58,74,90,.7);
                font-weight: bold;
              }
            }

            .detail-go {
              box-sizing: border-box;
              width:92px;
              height:30px;
              line-height: 30px;
              background:rgba(238,55,153,1);
              border-radius:4px;
              text-align: center;
              float: right;
              margin-top: 14px;
              font-size:14px;
              font-family:Helvetica;
              color:rgba(255,255,255,1);
              cursor: pointer;
            }
          }
        }
        .user-income{
          float: left;
          width: 49%;
          box-sizing: border-box;
          border-right: none;
          .account_info{
            cursor: pointer;
            margin-top: 4px;
            width:108px!important;
            background:rgba(0,0,0,0.05);
            border-radius:11px;
            font-size:12px!important;
            font-family:Helvetica!important;
            color:rgba(58,74,90,1);
            line-height:12px;
            text-align: center;
            img{
              width: 10px;
              height: 10px;
              margin-top: 6px;
            }
          }
        }
      }
      .container {
        width: 100%;
        overflow: hidden;
        background: #fff;
        box-sizing: border-box;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0.05);
        margin-top: 16px;
        padding: 20px 24px;
        .nav-box {
          width: 100%;
          font-size: 0;
          margin-bottom: 20px;
          .item {
            color: rgba(58, 74, 90, 1);
            font-size: 20px;
            display: inline-block;
            margin-right: 70px;
            cursor: pointer;
            &.active {
              font-weight: bold;
              // border-bottom: 4px solid rgba(238,55,153,1);
              position: relative;
              &::after {
                content: "";
                position: absolute;
                width: 100%;
                height: 4px;
                bottom: -6px;
                left: 0;
                border-radius: 2px;
                background: rgba(238, 55, 153, 1);
              }
            }
          }
        }
        .content {
          .sotry-content {
            .add-story {
              border-top: 2px solid rgba(0, 0, 0, 0.1);
              padding-top: 16px;
              span {
                display: block;
                margin: 0 auto;
                width: 192px;
                height: 56px;
                line-height: 56px;
                text-align: center;
                border-radius: 4px;
                background: rgba(238, 55, 153, 1);
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                font-size: 20px;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
</style>
