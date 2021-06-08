<template>
  <div class="head_box">
    <header class="head">
      <router-link to="/" class="r_logo"> </router-link>

      <!-- 
      <div v-if="userInfo.id" class="user-box">
        <div
          class="nickname right-item"
          @click="handleGoUserCenter"
          @mouseover="hanldeMouseoverUser"
          @mouseout="hanldeMouseoutUser"
        >
          <img
            v-if="userInfo.avatar"
            :src="userInfo.avatar"
            alt="goodenovel user avtar"
          />
          <img
            v-else
            src="../../assets/images/center/user_center_avatar_default.png"
            alt=""
          />

          <div class="user-center" v-show="userCenterFlag">
            <div
              class="user-center-item"
              @click.stop="$router.push('/income?pos=topup')"
            >
              <span>Wallet</span>
            </div>
            <div
              class="user-center-item"
              @click.stop="$router.push('/income?pos=history')"
            >
              <span>Inbox</span>
            </div>
            <div class="user-center-item"><span>Follow</span></div>
            <div class="user-center-item" @click.stop="handleLogout">
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
      <a
        v-else
        href="javascript:;"
        class="h_login_but right-item"
        @click="loginShowChild"
        >{{ $t("head_login") }}</a
      >
       -->
      <!-- 书架入口关闭
      <div
        class="shelf"
        :class="[{ active: currentPath == '/library' }]"
        @click="$router.push('/library')"
      >
        Library
      </div> 
      -->
      <div class="search-box">
        <div class="serarch">
          <input
            type="text"
            placeholder="搜索..."
            @keyup.enter="handleGoSearch"
            v-model="inputKeyword"
            @input="handleChangeInput($event)"
          />
          <div
            class="search-icon"
            @click="handleGoSearch"
            autocomplete="new-password"
          ></div>
        </div>
      </div>

      <!-- 导航内容 -->
      <nav>
        <ul class="h_nav">

          <li
            :class="[
              'slide_contain',
              { active: currentPath == '/contest' || currentPath == '/alpha' },
            ]"
          >
            <a
              :class="[
                'slide_top',
                {
                  active: currentPath == '/business',
                },
              ]"
              href="javascript:;"
            >
              聯系我們
              <!-- <img
                v-if="currentPath == '/business'"
                class="top_arrow_down"
                src="../../assets/images/banner/banner_down.png"
              /> -->
              <!-- <img
                v-else
                class="top_arrow_down"
                src="../../assets/images/banner/banner_down_unactive.png"
              /> -->
              <img
                class="top_arrow_down"
                src="../../assets/images/banner/banner_down_unactive.png"
              />
            </a>
            <a
              :class="[
                'activity_slide',
                'activity_slidefade',
                'slide_btm1',
                { active: currentPath == '/contest' },
              ]"
              href="https://docs.google.com/forms/d/e/1FAIpQLScrrnis4t6XFnqjm6UolgH4OWiGY2BJ67JGwhg5FTb8Qq76oQ/viewform?usp=pp_url"
              >帮助和建议</a>
            <router-link
              :class="[
                'activity_slide',
                'activity_slidefade',
                'slide_btm2',
                { active: currentPath == '/business' },
              ]"
              :to="{ name: 'business' }"
              @click.native="routePush('/business')"
              >业务</router-link>
            <img class="nav_bar" src="../../assets/images/icons/btm_img.png" alt="">

          </li>
          <li :class="[{ active: currentPath == '/about_us' }]">
            <router-link
              :to="{ name: 'about_us' }"
              @click.native="routePush('/about_us')"
              >關於我們</router-link
            >
            <img class="nav_bar" src="../../assets/images/icons/btm_img.png" alt="">

          </li>
          <li :class="[{ active: currentPath == '/more/rankings' }]">
            <router-link
              :to="{ name: 'rankings' }"
              @click.native="routePush('/more/rankings')"
              >{{ '書籍排名' }}</router-link
            >
            <img class="nav_bar" src="../../assets/images/icons/btm_img.png" alt="">

          </li>
          <li :class="[{ active: currentPath == '/' }]">
            <router-link
              :to="{ name: 'home' }"
              @click.native="routePush('/')"
              >{{ '首頁' }}</router-link
            >
            <img class="nav_bar" src="../../assets/images/icons/btm_img.png" alt="">
          </li>
          
        </ul>
      </nav>
    </header>

    <!-- <Login :isloginshow="ishow" v-if="ishow" v-on:closeloginparent="onlogin"></Login> -->
  </div>
</template>

<script>
import Login from "@/Views/Login/Login";
import { mapState } from "vuex";

import { clearCookie } from "@/core/js/cookie.js";
export default {
  name: "head_box",
  props: ["loginshow"],
  data() {
    return {
      loadingFlag: false,
      userCenterFlag: false,
      inputKeyword: "",
      showInput: false,
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.moduleHome.userInfo,
      ishow: (state) => state.moduleHome.isShowLogin,
      currentPath: (state) => state.moduleHome.currentPath,
      keyword: (state) => state.moduleSearch.keyword,
    }),
  },
  mounted() {
    this.loadingFlag = true;
  },
  methods: {
    goForumPage() {
      // window.location.href='/vanilla/'
      let location = window.location.href;
      if (location.includes("goodnovel")) {
        window.location.href = "https://forum.goodnovel.com";
      } else if (location.includes("haiwaidz")) {
        window.location.href = "https://forum.haiwaidz.com";
      } else if (location.includes("dzhaiwai")) {
        window.location.href = "http://forum.dzhaiwai.com";
      } else {
        window.location.href = "https://forum.goodnovel.com";
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
    handleChangeInput(e) {
      // this.$store.dispatch('moduleSearch/changeKeyWord', e.target.value)
      // this.inputKeyword = e.target.value
    },
    async getUserInfo() {
      if (this.userInfo.id) {
        this.loadingFlag = true;
        return;
      }
      let res = await this.$axios.post("/webfic/user/info");
      this.loadingFlag = true;
      this.$store.dispatch("moduleHome/changeUserInfo", res.data.data || {});
    },
    loginShowChild() {
      if (
        this.$route.path === "/verify" ||
        this.$route.path === "/reset_password"
      ) {
        this.$router.push("/login");
        return;
      }
      let that = this;
      this.$store.dispatch("moduleHome/changeLoginShow");
    },
    onlogin(data) {
      let that = this;
      this.$store.dispatch("moduleHome/changeLoginShow");
    },
    routePush(url) {
      $logClick({
        module: "nav_box",
        zone: "djdh", //点击导航
        adid: url, // 导航路由地址
      });
      // this.$router.push(url)
    },
    handleGoSearch() {
      if (!this.inputKeyword) {
        return;
      }
      if (this.$route.path !== "/search") {
        this.$router.push("/search");
      }
      // this.$router.push({
      //     name: 'searchbook',
      //     query: {
      //         keyword: this.inputKeyword
      //     },
      // })
      this.$store.dispatch("moduleSearch/changeKeyWord", this.inputKeyword);
      this.$store.dispatch("moduleSearch/changeSearchResult", {
        pageNo: 1,
        keyword: this.inputKeyword,
        vm: this,
      });
      let target = window.sessionStorage.getItem('target');
      if(target){
        window.sessionStorage.removeItem('target');
      }
    },
    async handleLogout() {
      let res = await this.$axios.post("/webfic/user/logout");
      if (res.data.status == 0) {
        clearCookie("TOKEN");
        this.$store.dispatch("moduleHome/changeUserInfo", {});
        localStorage.removeItem("userInfo");
        localStorage.removeItem("packcode");
        this.$router.replace("/");
      } else {
        this.$msg({
          content: "Network error please try again later",
        });
      }
      this.userCenterFlag = false;
    },
  },
  components: {
    Login,
  },
};
</script>
<style lang="scss" scoped>
.index {
  min-width: 1360px;
}
.head_box {
  margin: 0 auto;
  height: 80px;
  background-color: #FF5F27;
}
.head {
  margin: 0 auto;
  width: 1300px;
  height: 80px;
}
.r_logo {
  float: left;
  height: 30px;
  width: 130px;
  background: url("../../assets/images/common/logo.png") no-repeat center
    center/100% 100%;
  // background: url('../../assets/images/common/wsj.png') no-repeat center center/100% 100%;
  margin-top: 25px;
}
.h_login_but {
  float: right;
  margin: 12px 0 0 0;
  height: 36px;
  width: 90px;
  background-color: #ee3799;
  font-size: 16px;
  color: #ffffff;
  text-align: center;
  font-weight: bold;
  border-radius: 4px;
  line-height: 36px;
  box-sizing: border-box;
}
.nickname {
  float: right;
  margin: 6px 0 0 0;
  height: 48px;
  font-size: 0px;
  width: 48px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.h_nav {
  float: left;
  margin-left: 90px;
  height: 80px;
}
.h_nav li {
  float: right;
  box-sizing: border-box;
  min-height: 80px;
  cursor: pointer;
  // margin-left: 40px;
  padding: 0 40px;
  text-align: center;
  &.slide_contain {
    position: relative;
    padding: 0;
    z-index: 999;
    a.slide_top {
      padding: 0 40px;
      display: block;
      text-align: center;
      background-color: #FF5F27;
      color: #FFF0EB;
      &:hover{
        color: #FFFFFF;
        font-weight: 600;
      }
      .top_arrow_down {
        width: 12px;
        height: 12px;
        vertical-align: middle;
      }
    }
    a.activity_slide {
      width: 154px;
      padding: 0 14px;
      display: block;
      text-align: left;
      background-color: #FFFFFF;
      color: #333333;
      &:hover {
        color: #FF5F27;
      }
    }
    a.activity_slidefade {
      position: absolute;
      width: 154px;
      height: 50px;
      line-height: 50px;
      display: none;
      color: rgba(51, 51, 51, 1);
    }
    a.activity_slidefade:hover {
      color: rgba(255, 126, 66, 1);
    }
    a.slide_btm1 {
      top: 77.5%;
      border-radius: 4px 4px 0 0;
    }
    a.slide_btm2 {
      top: 140%;
      border-radius: 0 0 4px 4px;
    }
    span.tip_top {
      position: absolute;
      width: 110px;
      height: 16px;
      line-height: 16px;
      top: 4px;
      left: 36px;
      font-size: 10px;
      font-family: Helvetica;
      color: #fafafa;
      text-align: center;
      background: url(../../assets/images/banner/banner_beta.png) no-repeat top
        center;
      background-size: 100% 100%;
    }
  }
  &.slide_contain:hover {
    a.slide_top {
      color: #FFF0EB;
      &:hover {
        color: #FFFFFF;
        font-weight: 600;
      }
    }
    a.activity_slidefade {
      display: block;
    }
  }
  &.active a.activity_slide.active {
    background: rgba(250, 240, 245, 1);
  }
}
.h_nav a {
  display: block;
  float: left;
  // padding: 0 10px;
  // margin: 10px 0 0;
  height: 80px;
  font-size: 16px;
  color: #FFF0EB;
  font-weight: 400;
  line-height: 80px;
}
.h_nav {
  li {
    position: relative;

    .nav_bar{
      width: 24px;
      height: 4px;
      position: absolute;
      bottom: 0;
      left:50%;
      transform: translateX(-50%);
      display: none;
    }

    &:hover {
      a {
        color: #FFFFFF;
        font-weight: 600;
      }
    }
    &.active {
      .nav_bar{
        display: block;
      }
      a {
        color: #FFFFFF;
        font-weight: 600;
        &.activity_slide {
          color: rgba(51, 51, 51, 1);
          &:hover {
            color: rgba(255, 126, 66, 1);
          }
        }
        &.active {
          color: rgba(255, 126, 66, 1);
        }
      }
    }
    
  }
}
.shelf {
  float: right;
  margin-right: 15px;
  height: 80px;
  line-height: 80px;
  color: rgba(58, 74, 90, 0.6);
  font-size: 14px;
  background: url("../../assets/images/book/3.png") no-repeat 10px center/16px
    16px;
  padding-left: 30px;
  cursor: pointer;
  &:hover {
    color: #ee3799;
    background-image: url("../../assets/images/book/library_active.png");
  }
  &.active {
    color: #ee3799;
    background-image: url("../../assets/images/book/library_active.png");
  }
}
.search-box {
  width: 220px;
  height: 32px;
  line-height: 32px;
  float: right;
  margin-top: 23px;
  background: #FFF1EC;  
  border-radius: 4px;
  .serarch {
    width: 100%;
    height: 100%;

    cursor: pointer;
    input {
      transition: all 0.3s;
      width: 192px;
      height: 100%;
      border-radius: 0 4px 4px 0;
      box-sizing: border-box;
      border: 1px solid rgba(197, 197, 197, 1);
      border-left: none;
      padding: 0 8px;
      padding-right: 24px;
      color: #FF5F27;
      border-color:rgba(255, 126, 66, 1);
    }
    ::-webkit-input-placeholder { /* WebKit browsers */
      color: #FF5F27;
      font-size: 14px;
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #FF5F27;
      font-size: 14px;
    }

    :-ms-input-placeholder { /* Internet Explorer 10+ */
      color: #FF5F27;
      font-size: 14px;
    } 
    .search-icon {
      transition: all 0.3s;
      width: 28px;
      height: 32px;
      float: left;
      border-radius: 4px 0 0 4px;
      border: 1px solid rgba(197, 197, 197, 1);
      border-right: none;
      box-sizing: border-box;
      background: #fff
        url("../../assets/images/common/search_unactive.png") no-repeat 12px
        center/16px 16px;
    }
    .search-icon {
        background-image: url("../../assets/images/common/search_active.png");
        border-color: rgba(255, 126, 66, 1);
        // background-color: rgba(255, 126, 66, 1);
      }
  }
}
.nickname {
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
    color: rgba(51, 51, 51, 1);
    z-index: 99;
    .user-center-item {
      height: 37px;
      line-height: 37px;
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
        }
      }
      &:nth-of-type(4) {
        span {
          background-image: url("../../assets/images/icons/home_logout_icon.png");
        }
      }
    }
  }
}
</style>
