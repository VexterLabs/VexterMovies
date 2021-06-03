<template>
  <div class="read-nav">
    <div class="nav-content">
      <div class="logo" @click="$router.push('/')"></div>
      <div v-show="bookInfo.bookName || currentChapterName" class="book-info">
        <span
          class="title"
          @click="$router.push(`/book_info/${bookInfo.bookId}/${formatSpace( bookInfo.typeTwoNames && bookInfo.typeTwoNames[0]|| 'null')}/${formatSpace(bookInfo.bookName)}`)"
        >{{bookInfo.bookName}}</span>
        <template v-show="currentChapterName">/{{currentChapterName}}</template>
      </div>

      <!-- webfic 阅读器内不展示书架, 用户登录 -->
      <!-- <div
        class="nickname"
        v-if="userInfo.id"
        @click="handleGoUserCenter"
        @mouseover="hanldeMouseoverUser"
        @mouseout="hanldeMouseoutUser"
      >
        <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="user avatar" />
        <img v-else src="../../assets/images/center/user_center_avatar_default.png" alt="user avatar" />
        <div class="user-center" v-show="userCenterFlag">
          <div class="user-center-item" @click.stop="$router.push('/income?pos=topup')">
            <span>Wallet</span>
          </div>
          <div class="user-center-item" @click.stop="$router.push('/income?pos=history')">
            <span>Inbox</span>
          </div>
          <div class="user-center-item" @click.stop="handleLogout">
            <span>Logout</span>
          </div>
        </div>
      </div>
      <div v-else class="login" @click="$emit('closeloginparent',true)">LOGIN</div>

      <div class="library" @click="$router.push('/library')">Library</div>
      <div class="add-shelf" @click="handleAddLibrary" v-if="!bookInfo.inLibrary">Add to library</div>
      <div class="in-shelf" @click="handleRemoveLibrary" v-else>In library</div> -->
    </div>
  </div>
</template>
<script>
import { clearCookie } from "@/core/js/cookie.js";
import { mapState } from "vuex";

export default {
  props: ["bookInfo"],
  data() {
    return {
      tempInlibrary: false,
      userCenterFlag: false,
    };
  },
  mounted() {
    // 把点击加入书架的元素赋值到全局,方便登录后调用
    window.addLibaryEleReadNavFun = this.handleAddLibrary;
  },
  methods: {
    formatSpace(param) {
      let res = encodeURI(param);
      res = res.split("%20").join("-").split("%C2%A0").join("-");
      res = res.replace(/[^A-Za-z0-9]/ig , '')// \_\'\*\(\)\$\+\!\-\.
      return res;
    },
    async handleAddLibrary() {
      let res = await this.$axios.post("/webfic/shelf/add", {
        bookId: this.bookInfo.bookId,
      });
      if (res.data.status == 0) {
        this.bookInfo.inLibrary = true;
        this.bookInfo.libraryId = res.data.data.id;
      }
    },
    handleGoUserCenter() {
      this.$router.push("/user_center");
    },
    hanldeMouseoverUser() {
      this.userCenterFlag = true;
    },
    hanldeMouseoutUser() {
      this.userCenterFlag = false;
    },
    // 退出登录
    async handleLogout() {
      let res = await this.$axios.post("/webfic/user/logout");
      if (res.data.status == 0) {
        clearCookie("TOKEN");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("packcode");
        window.location.reload();
      } else {
        this.$msg({
          content: "Network error please try again later",
        });
      }
      this.userCenterFlag = false;
    },
    async handleRemoveLibrary() {
      let res = await this.$axios.post("/webfic/shelf/delete/batch", {
        idList: [this.bookInfo.libraryId],
      });
      if (res.data.status == 0) {
        this.bookInfo.inLibrary = false;
      }
    },
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.moduleHome.userInfo,
      currentChapterName: (state) => state.moduleRead.currentChapterName,
      currentChapterId: (state) => state.moduleRead.currentChapterId,
    }),
  },
};
</script>
<style lang='scss' scoped>
.read-nav {
  width: 100%;
  height: 80px;
  line-height: 80px;
  background-color: #ff5f27;
  box-sizing: border-box;
  padding: 0 10px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  .nav-content {
    width: 1300px;
    margin: 0 auto;
    & > div {
      float: left;
    }
    .logo {
      font-size: 32px;
      font-weight: bold;
      width: 136px;
      height: 30px;
      background: url("../../assets/images/common/logo.png") no-repeat center
    center/100% 100%;
      position: relative;
      top: 25px;
      cursor: pointer;
    }
    .book-info {
      font-size: 16px;
      font-weight: bold;
      width: 776px;
      padding: 0px 40px;
      overflow: hidden;
      position: absolute;
      left: 0px;
      right: 0px;
      margin: auto;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
       color: white;
      .title {
        cursor: pointer;
        color: white;
      }
    }
    .add-shelf {
      float: right;
      color: rgba(238, 55, 153, 1);
      font-size: 14px;
      font-weight: bold;
      background: url("../../assets/images/book/1.png") no-repeat 0 center/20px
        20px;
      padding-left: 26px;
      cursor: pointer;
    }
    .in-shelf {
      float: right;
      color: rgba(238, 55, 153, 1);
      font-size: 14px;
      font-weight: bold;
      background: url("../../assets/images/book/12.png") no-repeat 0 center/20px
        20px;
      padding-left: 26px;
      cursor: pointer;
    }
    .library {
      float: right;
      color: #3a4a5a;
      font-size: 14px;
      background: url("../../assets/images/book/3.png") no-repeat 0 center/16px
        16px;
      padding-left: 22px;
      margin-left: 40px;
      cursor: pointer;
      &:hover {
        color: #ee3799;
        background-image: url("../../assets/images/book/library_active.png");
      }
    }
    .login {
      float: right;
      background: rgba(238, 55, 153, 1);
      border-radius: 4px;
      color: #fff;
      font-weight: bold;
      margin-left: 20px;
      padding: 0 10px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      margin-top: 12px;
      cursor: pointer;
    }
    .nickname {
      float: right;
      margin-left: 20px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      box-sizing: border-box;
      margin-top: 6px;
      cursor: pointer;
      position: relative;
      .user-center {
        width: 120px;
        height: 120px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        position: absolute;
        right: 0;
        top: 48px;
        font-size: 16px;
        color: rgba(58, 74, 90, 1);
        z-index: 99;
        .user-center-item {
          height: 37px;
          line-height: 37px;
          text-align: center;
          span {
            background: url("../../assets/images/icons/home_wallet_icon.png")
              no-repeat 0px center/16px 16px;
            display: inline-block;
            width: 70px;
            box-sizing: border-box;
            padding-left: 16px;
          }
          &:nth-of-type(2) {
            span {
              background-image: url("../../assets/images/icons/home_inbox_icon.png");
            }
          }
          &:nth-of-type(3) {
            span {
              background-image: url("../../assets/images/icons/home_logout_icon.png");
              // background-image: url('../../assets/images/icons/home_follow_icon.png');
            }
          }
          &:nth-of-type(4) {
            span {
              background-image: url("../../assets/images/icons/home_logout_icon.png");
            }
          }
        }
      }
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
}
</style>
