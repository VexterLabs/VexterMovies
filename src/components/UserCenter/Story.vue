<template>
  <div class="stroy_container">
    <div class="story">
      <div class="left">
        <img v-if="bookInfo.cover" v-lazy="bookInfo.cover" @click="handleGoDetail" :alt="bookInfo.bookName" />
        <img v-else src="../../assets/images/common/default_book_bg.png" @click="handleGoDetail" :alt="bookInfo.bookName" />
      </div>
      <div class="middle">
        <div class="book-name">{{bookInfo.bookName || 'unnamed'}}</div>
        <div class="main_contain">
          <div class="con_item bookitem_left">
            <div class="last-read"><div class="c1">Status</div> <h3>{{formatStatus(bookInfo.writeStatus)}}</h3></div>
            <div class="last-read"><div class="c1">Chapters</div> <h3>{{bookInfo.chapterCount}}</h3></div>
            <div class="last-read mb2"><div class="c1">Words</div> <h3>{{bookInfo.totalWords}}</h3></div>
          </div>

          <!--已签约的书籍才展示右侧月份选择-->
          <div class="con_item bookitem_right" v-if="sixMonths && bookInfo.signStatus == 3" >
            <div class="con_top">
              <div class="select" @click="showOpt = !showOpt">
                <img class="adown" src="../../assets/images/center/arrow_down.png" alt="">
                <input v-model="sixMonths[selectedMonthIndex]" type="text" :placeholder="sixMonths[0]" disabled>
              </div>
              <div class="list" v-show="showOpt">
                <ul>
                  <li class="option" @click="getvalue(index,item)" v-for="(item , index) in sixMonths" :key="index">{{sixMonths[index]}}</li>
                </ul>
              </div>
            </div>
            <div class="con_count mt31">
              <div class="c1">Days Updated
              <h3>{{bookReleaseInfos.releaseDays || 0}}</h3></div>
            </div>
            <div class="con_count">
              <div class="c1">Words Updated
              <h3>{{bookReleaseInfos.wordCountPremium || 0}}</h3></div>
            </div>
          </div>
        </div>
        <div class="new_struc">
          <div class="edit" @click="handleGoEdit">NEW CHAPTER</div>
          <!-- 默认是-1  bookInfo.signStatus  签约审核状态下隐藏-->
          <div
            v-if="bookInfo.status == 'PUBLISHED' && bookInfo.signStatus != 1"
            :class="['edit2', 'on_line_sign' , {'disabled':bookInfo.signStatus == 3}]"
            @click="signClick(bookInfo)"
          >{{signStatusContent[bookInfo.signStatus]}}</div>
        </div>
      </div>
      <div class="right">
        <div class="handle" @click="isShow = true">
          <i></i>
          <i></i>
          <i></i>
        </div>

        <transition name="moveR">
          <div class="handle-pop" v-if="isShow">
            <div class="handle-pop-close" @click="isShow = false">
              <i></i>
              <i></i>
              <i></i>
            </div>
            <div class="group">
              <!-- <div class="manage-story item">Manage Story</div> -->
              <div class="edit-story item" @click="handleSaveStoryInfo">Edit Story</div>
              <div class="delete-story item" @click="handleDeleteBook">Delete Story</div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div
      class="bottom_content inreview"
      v-if="  bookInfo.checkInfo && bookInfo.checkInfo.checkStatus && (bookInfo.checkInfo.checkStatus == 'CHECKING' || this.bookInfo.checkInfo.checkStatus == 'UNCHECK')"
    >
      <span class="arrow"></span>
      <div class="content">
        <span class="title">In Review :</span> <br>Your book info is in review. It will be available soon.
      </div>
    </div>

    <div class="bottom_content refuse" v-if="bookInfo.checkInfo && bookInfo.checkInfo.checkStatus && (bookInfo.checkInfo.checkStatus == 'REFUSE')">
      <span class="arrow"></span>
      <div class="content">
        <span class="title">Refuse :</span> <br>
        {{bookInfo.checkInfo.rejectReason}}
      </div>
      <div class="btns_contain">
        <i class="resume" @click="handleResume" v-if="bookInfo.checkInfo.restore">Resume</i>
        <i class="modify" @click="handleSaveStoryInfo">Modify</i>
      </div>
    </div>

    <!--签约状态:  审核中状态才展示 -->
    <div
      class="bottom_content inreview"
      v-if="bookInfo.signStatus == 1"
    >
      <span class="arrow"></span>
      <div class="content">
        <span class="title">Applied :</span> <br>Your application for a contract is now in review, you may handle your book freely if no offer is made within a month. Feel free to write and edit in the mean time :)
      </div>
    </div>
    <!--拒绝签约原因 有closeReason字段就展示-->
    <div
      class="bottom_content refuse"
      v-if="bookInfo.closeReason"
    >
      <span class="arrow"></span>
      <div class="content">
        <span class="title">Closed :</span> <br>{{bookInfo.closeReason}}
      </div>
    </div>
  </div>
</template>
<script>
import { formatSpace } from "@/core/js/common.js";
export default {
  props: ["bookInfo" , "sixMonths"],
  data() {
    return {
      isShow: false,
      showOpt:false,
      signStatusContent: [
        "Apply for contract",
        "In review",
        "Contract sent",
        "Signed",
      ],
      selectedMonthIndex:0, // 选择下拉框月份的日期, 自动更新展示月份的内容
      bookReleaseInfos:{ // 匹配的用户月份数据
        releaseDays:0,
        wordCountPremium:0
      }
    };
  },
  mounted() {
    if (!this.bookInfo.checkInfo) {
      this.bookInfo.checkInfo = {
        checkStatus: "PASS",
        rejectReason: "",
        restore: false,
      };
    }

    let contractStatus = this.bookInfo.contractStatus;
    if (contractStatus == "CLOSED") {// 除此状态外展示下放allplied
      this.bookInfo.signStatus = 0;
    } else if (
      contractStatus == "PENDING" ||
      contractStatus == "IN_REVIEW" ||
      contractStatus == "IN_NEGOTIATION"
    ) {
      this.bookInfo.signStatus = 1;
    } else if (contractStatus == "CONTRACT_SENT") {
      this.bookInfo.signStatus = 2;
    } else if (contractStatus == "SIGNED" || contractStatus == "ARCHIVED") {
      this.bookInfo.signStatus = 3;
    }else{
      this.bookInfo.signStatus = 0;
    }


        /* TODO假数据 */
        /* this.sixMonths = ['11111-11' , '22222-22' ,, '22222-22' , '22222-22' , '33333-33' , '44444-44', '54444-44', '64444-44']
        this.bookInfo.sixMonthReleaseInfos = [
          {bookId:1, month:1, releaseDays:1, wordCountPremium:1},
          {bookId:2, month:2, releaseDays:2, wordCountPremium:2},
          {bookId:2, month:2, releaseDays:2, wordCountPremium:2},
          {bookId:2, month:2, releaseDays:2, wordCountPremium:2},
          {bookId:3, month:3, releaseDays:3, wordCountPremium:3},
          {bookId:4, month:4, releaseDays:4, wordCountPremium:4},
          {bookId:5, month:5, releaseDays:6, wordCountPremium:5},
          {bookId:6, month:6, releaseDays:5, wordCountPremium:6},
        ] */

    this.$forceUpdate();
    this.getvalue(0);
  },
  methods: {
    getvalue(index, itemMonth){
      let that = this;
      let flag = true;
      if(this.bookInfo && this.bookInfo.sixMonthReleaseInfos){

        if(!itemMonth && this.sixMonths ){ itemMonth = this.sixMonths[0] } // 初始化进入默认传入第一个月时间

        // 过滤对应的月份数据
        this.bookInfo.sixMonthReleaseInfos.forEach((item , i)=>{
          if(item.month == itemMonth){
            flag = false;
            that.bookReleaseInfos = item;
          }
        })

        if(flag){
          that.bookReleaseInfos = {
              releaseDays:0,
              wordCountPremium:0
            };
        }

        if(flag){
          that.bookReleaseInfos = {
            releaseDays:0,
            wordCountPremium:0
          };
        }

        that.selectedMonthIndex = index;
        this.showOpt = false;
      }
    },

    formatStatus(str){
      return str[0].toUpperCase() + str.slice(1).toLowerCase();
    },
    handleGoDetail() {
      $logClick({
        module: this.$route.name,
        zone: "djgrzxsf", // 点击个人中心书封
        adid: "click-usercenter-bookcover",
      });

      this.$router.push(`/book_info/${this.bookInfo.bookId}/${formatSpace(this.bookInfo.typeTwoNames && this.bookInfo.typeTwoNames[0] || 'null')}/${formatSpace(this.bookInfo.bookName)}`);
    },
    handleGoEdit() {
      $logClick({
        module: this.$route.name,
        zone: "djgrzxcjzj", // 点击个人中心创建章节
        adid: "click-usercenter-createchapter",
      });
      this.$router.push(`/create_chapter/${this.bookInfo.bookId}`);
    },
    handleSaveStoryInfo() {
      $logClick({
        module: this.$route.name,
        zone: "djgrzxbjsf", // 点击个人中心编辑书封
        adid: "click-usercenter-edit-bookcover",
        map: {
          bookId: this.bookInfo.bookId,
        },
      });

      // TODO:如果审核中 审核拒绝状态, 断掉并提示
      if (this.bookInfo.checkInfo.checkStatus == "CHECKING") {
        this.$msg({
          content:
            "Your book info is in review. You will be able to make changes after it's proceeded.",
        });
      }

      this.$router.push({
        name: "create_book",
        query: {
          bookId: this.bookInfo.bookId,
        },
      });
    },
    handleResume() {
      $logClick({
        module: this.$route.name,
        zone: "djhysjxx", // 点击还原书籍信息
        adid: "click-usercenter-resume-bookcover",
        map: {
          bookId: this.bookInfo.bookId,
        },
      });

      this.$msgBox({
        content:
          "You are restoring your previous book info, any new changes will be deleted. Do you want to proceed?",
        type: "resume",
      }).then(async (flag) => {
        if (!flag) return;
        let res = await this.$axios.post("/webfic/book/edit/restore", {
          bookId: this.bookInfo.bookId,
        });

        if (res.data.status == 0) {
          $logEvent({
            event: "hysjxxcg", //还原书籍信息成功
            map: {
              module: "resume_book_suc",
            },
          });

          this.$msg({
            content: "Resume success!",
          });
          // this.$emit("pageInit");
          window.location.reload();
        } else {
          $logEvent({
            event: "hysjxxsb", //还原书籍信息失败
            map: {
              module: "resume_book_fail",
            },
          });

          this.$msg({
            content: "Resume failed , please try again later!",
          });
        }
      });
    },
    async handleDeleteBook() {
      $logClick({
        module: this.$route.name,
        zone: "djgrzxscsj", // 点击个人中心删除书籍
        adid: "click-usercenter-del-bookcover",
        map: {
          bookId: this.bookInfo.bookId,
        },
      });

      // 已签约书籍不允许删除
      if (
        this.bookInfo.contractStatus == "SIGNED" ||
        this.bookInfo.contractStatus == "ARCHIVED"
      ) {
        $logEvent({
          event: "grzxscsjsb", //个人中心删除书籍成功
          map: {
            module: this.bookInfo.bookId, // 设置定时发布
          },
        });
        this.$msg({
          content:
            "Oops, you are trying to delete a contracted book. Is there a problem? You may contact your editor for the problem.",
        });
        return;
      }

      this.$msgBox({
        content: "Delete this book or not",
      }).then(async (val) => {
        // 删除
        let res = await this.$axios.post("/webfic/book/delete", {
          bookId: this.bookInfo.bookId,
        });
        this.isShow = false;
        if (res.data.status == 0) {
          $logEvent({
            event: "grzxscsjcg", //个人中心删除书籍成功
            map: {
              module: this.bookInfo.bookId, // 设置定时发布
            },
          });
          this.$msg({ content: "Delete success!" });
          this.$emit("pageInit");
        } else {
          this.$msg({ content: "Delete failed" });
          $logEvent({
            event: "grzxscsjsb", //个人中心删除书籍失败
            map: {
              module: this.bookInfo.bookId, // 设置定时发布
            },
          });
        }
      });
    },
    isImg(val) {
      if (!val) {
        return "";
      } else {
        return val;
      }
    },
    signClick(bookInfo) {
      let state = this.bookInfo.signStatus; // TODO默认是-1
      if (this.bookInfo.totalWords < 15000) {
        this.$msg({
          content:
            "At least 15,000 words are required for the contract application.",
        });
        $logClick({
          module: this.$route.name,
          zone: "djqysjzsbz", // 点击签约书籍字数不足
          adid: "click-in-review",
        });
      } else if (state == 3) {
        reutrn;
      } else {
        this.judgeSign();
      }
    },

    async judgeSign() {
      let that = this;
      let res = await this.$axios.post("/webfic/contract/apply", {
        bookId: that.bookInfo.bookId,
      });

      if (res.data.status == 0) {
        // 不满24小时 不允许进入
        if (
          !res.data.data.expireFlag &&
          res.data.data.contractStatus == "CLOSED"
        ) {
          this.$msg({
            content:
              "You need to wait 24 hours to apply for the contract again.",
          });
          $logEvent({
            event: "sqqysb", //申请签约失败
            map: {
              module: this.bookInfo.bookId, // 设置定时发布
            },
          });
          return;
        }

        // 不允许进入的情况
        if (!res.data.data.applyFlag) {
          switch (res.data.data.contractStatus) {
            case "PENDING":
              this.$msg({
                content:
                  "Your contract application is under review, thank you for your patience.",
              });
              $logClick({
                module: this.$route.name,
                zone: "djqyshz", // 点击签约审核中
                adid: "click-in-review",
              });
              break;
            case "IN_REVIEW":
              this.$msg({
                content:
                  "Your contract application is under review, thank you for your patience.",
              });
              $logClick({
                module: this.$route.name,
                zone: "djqyshz", // 点击签约审核中
                adid: "click-in-review",
              });
              break;
            case "IN_NEGOTIATION":
              this.$msg({
                content:
                  "Your contract application is under review, thank you for your patience.",
              });
              $logClick({
                module: this.$route.name,
                zone: "djqyshz", // 点击签约审核中
                adid: "click-in-review",
              });
              break;
            case "CONTRACT_SENT":
              this.$msg({
                content: "Your contract has been sent to your email.",
              });
              $logClick({
                module: this.$route.name,
                zone: "djhtyjz", // 点击合同邮寄中按钮
                adid: "click-contract-has-been-sent",
              });
              break;
            case "SIGNED":
              this.$msg({
                content: "You have signed the contract.",
              });
              $logClick({
                module: this.$route.name,
                zone: "djyqy", // 点击已签约
                adid: "click-signed",
              });
              window.location.reload();
              break;
            case "ARCHIVED":
              this.$msg({
                content: "You have signed the contract.",
              });
              $logClick({
                module: this.$route.name,
                zone: "djyqy", // 点击已签约
                adid: "click-signed",
              });
              window.location.reload();
              break;
          }
          $logEvent({
            event: "sqqysb", //申请签约失败
            map: {
              module: this.bookInfo.bookId,
            },
          });
          return;
        }

        // 满足24小时 允许进入
        if (
          res.data.data.expireFlag &&
          res.data.data.contractStatus == "CLOSED"
        ) {
          window.localStorage.setItem(
            "contractInfo",
            JSON.stringify(res.data.data)
          );
          window.localStorage.setItem("reshow", this.bookInfo.bookId);
        }

        if (res.data.data.id) {
          this.bookInfo.contractId = res.data.data.id;
        }
        this.bookInfo = Object.assign(this.bookInfo , res.data.data)
        window.localStorage.setItem("bookInfo", JSON.stringify(this.bookInfo));
        that.$router.push("/agency");
      } else {
        that.$msg({
          content: "Error Status: " + res.data.status,
        });

        $logEvent({
          event: "sqqysb", //申请签约失败
          map: {
            module: this.bookInfo.bookId, // 设置定时发布
          },
        });
        return;
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.stroy_container {
  padding-bottom: 60px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
// .moveR-enter-active,  .moveR-leave-active {
//     transition: all 0.3s linear;
//     // transform: translateX(0);
//     width: 0;
//     height: 0;
//     opacity: 0;

// }
// .moveR-enter,  .moveR-leave {
//     // transform: translateX(100%);
//     width: 156px;
//     height: 100px;
// }
// .moveR-leave-to{
//     // transform: translateX(100%);
//     width: 156px;
//     height: 100px;
// }
.story {
  width: 100%;
  min-height: 200px;
  margin-bottom: 40px;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 3px;
  .left {
    float: left;
    width: 150px;
    height: 200px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      cursor: pointer;
    }
  }
  .middle {
    margin-left: 24px;
    float: left;
    width: 514px;
    .book-name {
      width: 100%;
      height: 26px;
      font-size: 26px;
      font-family: Helvetica-Bold, Helvetica;
      font-weight: bold;
      color: #3A4A5A;
      line-height: 26px;
      display: -webkit-box;/* autoprefixer: ignore next */
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      margin-bottom: 14px;
    }
    .main_contain{
      width: 100%;
      overflow: hidden;
      margin-bottom: 14px;
      .con_item {
        float:left;
        width: 56%;

        .last-read {
          margin-top: 12px;
          height: 16px;
          font-size: 16px;
          font-family: SourceHanSansSC-Regular, SourceHanSansSC;
          font-weight: 400;
          color: rgba(58, 74, 90, 0.6);
          line-height: 16px;
          .c1{
            display: inline-block;
            width: 106px;
            height: 16px;
            font-size: 16px;
            font-family: Helvetica;
            color: rgba(58, 74, 90, 0.6);
            line-height: 16px;
          }
          h3{
            display: inline-block;
            height: 16px;
            font-size: 16px;
            font-family: Helvetica;
            color: #3A4A5A;
            line-height: 16px;
          }
          &.mb2{
            margin-bottom: 20px;
          }
        }
      }

      .bookitem_right{
        box-sizing: border-box;
        width: 222px;
        height: 106px;
        background: #F5F6FA;
        border-radius: 8px;
        padding:0px 16px;
        .select{
          width: 190px;
          height: 30px;
          line-height: 30px;
          font-size: 12px;
          font-family: Helvetica;
          color: #3A4A5A;
          background:#F5F6FA;
          border-bottom:1px solid rgba(58, 74, 90, .1);
          cursor: pointer;
          input{
            margin-top: 8px;
          }
        }
        .list{
          width: 190px;
          background: #FFFFFF;
          box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.1);
          border-radius: 4px;

          .option{
              box-sizing: border-box;
              width: 190px;
              height: 30px;
              line-height: 30px;
              background: #FFFFFF;
              border:none;
              font-size: 12px;
              font-family: Helvetica-Light, Helvetica;
              font-weight: 300;
              color: rgba(58, 74, 90, 1);
              padding-left:8px;
              cursor: pointer;
              &:hover{
                background: #F9FAFC;
              }
          }
        }
        .con_top{
          position: absolute;
          z-index: 1;
          img.adown{
            position: absolute;
            width: 10px;
            height: 10px;
            top:10px;
            right:6px;
            background:#F5F6FA;
          }
        }
        .con_count{
            height: 37px;
            line-height: 37px;
          &.mt31{
            margin-top: 31px;
          }
          .c1{
            color: rgba(58, 74, 90, .6);
          }
          h3{
            color: rgba(58, 74, 90, 1);
            float: right;
            margin-right:2px;
          }
        }
      }
    }
    .chapter {
      color: rgba(67, 83, 102, 1);
      line-height: 28px;
      font-size: 16px;
      margin-top: 5px;
      margin-bottom: 20px;
      // min-height: 70px;
      display: -webkit-box;/* autoprefixer: ignore next */
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    .time {
      color: rgba(58, 74, 90, 0.6);
      font-size: 14px;
      margin-top: 10px;
    }

    .new_struc {
      overflow: hidden;
      .edit {
        float: left;
        width: 140px;
        height: 36px;
        font-size: 16px;
        font-family: SourceHanSansSC-Regular, SourceHanSansSC;
        font-weight: 400;
        color: #fff;
        line-height: 36px;
        text-align: center;
        background:rgba(238, 55, 153, 1);
        border-radius: 4px;
        border: 1px solid rgba(238, 55, 153, 1);
        cursor: pointer;
        margin-right: 10px;
      }
      .edit2 {
        width: 133px;
        height: 36px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(238, 55, 153, 1);
        line-height: 36px;
        cursor: pointer;
        text-align: right;
        border:1px solid rgba(238, 55, 153, 1);
        background:#fff;
        text-align: center;
        border-radius: 4px;
      }
      .on_line_sign {
        float: left;
        width: 160px;
        bottom: 32px;
        right: 10px;
        white-space: nowrap;
        font-size: 16px;
      }
      .disabled {
        width: 133px;
        height: 36px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(58, 74, 90, 0.7);
        border: 1px solid rgba(58, 74, 90, 0.7);
        line-height: 36px;
      }
    }
  }
  .right {
    position: absolute;
    right: 0px;
    top: 0;
    background: rgba(255, 255, 255, 0.7);
    .handle {
      height: 24px;
      cursor: pointer;
      vertical-align: top;
      position: relative;
      float: right;
      font-size: 0;
      &:hover {
        i {
          background: #ee3799;
        }
      }
      i {
        float: left;
        background: #ccc;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        margin-left: 3.2px;
      }
    }

    .handle-pop {
      width: 156px;
      box-sizing: border-box;
      height: 100px;
      border-radius: 16px;
      box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.2);
      padding: 12px;
      position: absolute;
      right: -8px;
      top: -17px;
      z-index: 22;
      background: #fff;
      .group {
        .item {
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: rgba(67, 83, 102, 1);
          font-size: 14px;
          height: 44px;
          line-height: 44px;
          cursor: pointer;
          &:hover {
            color: rgba(238, 51, 51, 1);
          }
        }
      }
      .handle-pop-close {
        position: absolute;
        right: 4px;
        top: 4px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.05);
        line-height: 32px;
        cursor: pointer;
        i {
          float: left;
          background: #ee3799;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin-left: 3.2px;
          margin-top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}

.bottom_content {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 20px;
  margin-top: 10px;
  padding: 12px 24px;
  border-radius: 8px;

  .arrow {
    position: absolute;
    width: 0px;
    height: 0;
    border-top: 0px solid #fff;
    border-left: 10px solid #fff;
    border-right: 10px solid #fff;
    left: 20px;
    top: -10px;
  }
  .content {
    span {
      font-size: 16px;
      font-family: SourceHanSansSC-Bold, SourceHanSansSC;
      font-weight: bold;
      line-height: 24px;
    }
    font-size: 16px;
    font-family: SourceHanSansSC-Bold, SourceHanSansSC;
    font-weight: bold;
    line-height: 24px;
  }

  &.inreview {
    background: rgba(0, 0, 0, 0.03);
    .arrow {
      border-bottom: 10px solid rgba(0, 0, 0, 0.03);
    }
    .content {
      color: rgba(67, 83, 102, 0.6);
      .title {
        color: #435366;
      }
    }
  }

  &.refuse {
    padding-bottom: 38px;
    background: rgba(238, 51, 51, 0.05);
    position: relative;
    .arrow {
      border-bottom: 10px solid rgba(238, 51, 51, 0.05);
    }
    .content {
      color: rgba(238, 51, 51, 0.6);
      .title {
        color: #ee3333;
      }
    }
    .btns_contain {
      position: absolute;
      right: 0;
      bottom: 10px;
      overflow: hidden;
      i {
        float: right;
        text-align: center;
        height: 22px;
        bottom: 8px;
        padding: 0 13px;
        background: rgba(255, 255, 255, 1);
        border-radius: 14px;
        font-size: 12px;
        font-family: SourceHanSansSC-Regular, SourceHanSansSC;
        font-weight: 400;
        color: rgba(58, 74, 90, 0.6);
        line-height: 22px;
        font-style: normal;
        font-weight: bold;
        cursor: pointer;
        margin-right: 10px;
      }
    }
  }
}
</style>
