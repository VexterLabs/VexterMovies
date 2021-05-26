<style scoped>
.imgtitsix {
  overflow: hidden;
  background-color: rgba(238, 55, 153, 0.05);
  padding: 24px 36px;
  margin-top: 30px;
}
.itit_box {
  overflow: hidden;
  margin: 0 auto;
}
.itit_list {
  overflow: hidden;
}
.ititl_ul {
  overflow: hidden;
}
.ititl_ul li {
  float: left;
  width: 50%;
}

.ititlu_a {
  display: block;
  width: 100%;
  cursor: pointer;
}
.ititlu_img {
  overflow: hidden;
  /* height: 256px; */
  width: 170px;
  border-radius: 4px;
  background: rgba(58, 74, 90, 0.05);
  border: 1px solid rgba(58, 74, 90, 0.1);
  float: left;
  margin-right: 30px;
  box-sizing: border-box;

}
.ititlu_img img {
  display: block;
  /* height: 256px; */
  width: 170px;
  border-radius: 4px;
}
.ititlu_main {
  overflow: hidden;
  width: 270px;
  float: left;
  margin-top: 30px;
}
.ititlu_main h3 {
  overflow: hidden;
  margin-bottom: 15px;
  max-height: 56px;
  display: -webkit-box;/* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  height: 28px;
  font-size: 20px;
  font-weight: bold;
  color: rgba(58, 74, 90, 1);
  line-height: 29px;
}
.ititlu_main strong {
  display: inline-block;
  width: 100px;
  overflow: hidden;
  height: 22px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(58, 74, 90, 0.6);
  line-height: 22px;
  margin-bottom: 22px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ititlu_main .introduction {
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  color: rgba(67, 83, 102, 1);
  line-height: 28px;
  text-align: justify;
  padding-right: 16px;
  height: 132px;
  overflow: hidden;
}
.common_tit {
  overflow: hidden;
  margin-bottom: 16px;
}
.common_tit h2 {
  overflow: hidden;
  height: 28px;
  font-size: 20px;
  font-weight: bold;
  color: rgba(238, 55, 153, 1);
  line-height: 29px;
}
.ititl_ul li.li_type2 {
  width: 16.6666%;
  box-sizing: border-box;
  padding: 0 7px;
}
.ititl_ul li.li_type2 .ititlu_img {
  width: 100%;
  margin: 0;
}
.ititl_ul li.li_type2 .ititlu_img img {
  width: 100%;
}
.ititl_ul li.li_type2 .ititlu_main {
  width: 100%;
  margin-top: 9px;
}
.ititl_ul li.li_type2 .ititlu_main h3 {
  font-size: 16px;
  font-weight: bold;
  color: rgba(58, 74, 90, 1);
  line-height: 28px;
  margin-bottom: 4px;
}
.ititl_ul li.li_type2 .ititlu_main strong {
  height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(58, 74, 90, 0.6);
  line-height: 22px;
  margin-bottom: 0;
}
</style>


<template>
  <div class="imgtitsix">
    <div class="itit_box">
      <div class="common_tit">
        <h2 class="fs_u">{{ componentData.name }}</h2>
      </div>
      <div class="itit_list">
        <ul class="ititl_ul" v-if="componentData.items.length < 3">
          <li
            v-for="(item, index) in componentData.items"
            v-show="index < 2"
            :key="index"
            @click="handleGetBookInfo(item)"
          >
            <div class="ititlu_a">
              <div class="ititlu_img">
                <img v-lazy="item.cover" src="../../assets/images/book/book_err.gif" :alt=" item.bookName " :title=" item.bookName " />
              </div>
              <div class="ititlu_main">
                <h3 :title=" item.bookName ">{{ item.bookName }}</h3>
                <strong :title=" item.pseudonym ">{{ item.pseudonym }}</strong>
                <strong :title=" item.viewCountDisplay ">{{ item.viewCountDisplay }}views</strong>
                <div class="introduction" :title=" item.introduction ">{{item.introduction}}</div>
              </div>
            </div>
          </li>
        </ul>

        <ul class="ititl_ul" v-if="componentData.items.length >= 3">
          <li
            class="li_type2"
            v-for="(item, index) in componentData.items"
            v-show="index < 6"
            :key="index"
            @click="handleGetBookInfo(item)"
          >
            <div class="ititlu_a">
              <div class="ititlu_img">
                <img v-lazy="item.cover" src="../../assets/images/book/book_err.gif" :alt="item.bookName" :title=" item.bookName " />
              </div>
              <div class="ititlu_main">
                <h3 :title="item.bookName">{{ item.bookName }}</h3>
                <strong :title="item.pseudonym">{{ item.pseudonym }}</strong>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/Common/Title";
import {formatSpace} from "@/core/js/common.js"

export default {
  name: "imgtitsix",
  props: ["componentData"],
  data() {
    return {
      commontit: {},
      imgtxtsix_list: {}
    };
  },
  mounted() {
  },
  methods: {
    handleGetBookInfo(target) {

      $logClick({
        module: "BookInfo", // 详情页面
        zone: "dktrtj", // 打开同人推荐
        adid: "open-origin", // 打开同人推荐
        map: {
          bookId: target.bookId
        }
      });

      this.$router.replace('/book_info/'+target.bookId + '/'+ formatSpace(target.typeTwoNames && target.typeTwoNames[0] || "null") +'/'+formatSpace(target.bookName));
    }
  },
  components: {
    Title
  }
};
</script>
