<template>
  <div class="search">
    <div class="search-title">
      <div class="box">
        <div class="title-name"> <i class="left_bar"></i> {{moreName}}</div>
        <!-- <div class="search-tag">
                    <div class="search-tag-item" v-for="item in 5" :key="item">All</div>
        </div>-->
      </div>
    </div>
    <div class="container">
      <template v-if="moreBooks.length > 0">
        <more-book v-for="item in moreBooks" :key="item.bookId" :bookInfo="item" :moreName='moreName'></more-book>
        <v-pagiation
          :totals="Math.ceil(allBookCount / pageSize)"
          :pageNo="pageNo"
          @handleClickPrev="handleClickPrev"
          @handleClickNext="handleClickNext"
          @handlePageNumItem="handlePageNumItem"
        ></v-pagiation>
      </template>
      <null-verify-password v-else :resultFlag="false" :isShowText="false"></null-verify-password>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import MoreBook from "@/components/More/more.vue";
import VPagiation from "@/components/Common/Pagiation.vue";
import NullVerifyPassword from "@/components/Common/NullVerifyPassword.vue";
export default {
    async asyncData({store, route}){
        let columnId = route.params.id || '';
        await store.dispatch('HomeDataModule/getMoreData',{
            columnId,
            pageNo:  1,
            pageSize: 10
        });
    },
    components: {
        MoreBook,
        VPagiation,
        NullVerifyPassword
    },
     computed:{
        ...mapState('HomeDataModule', [
            'moreName','moreBooks','allBookCount'
        ])
    },
    data() {
        return {
            name: "",
            // books: [],
            // allBookCount: 0,
            pageNo: 1,
            pageSize: 10
        };
    },
    mounted() {
        // console.log('moreBooks',this.moreBooks)
        // this.getMoreList(this.pageNo);
    },
    methods: {
        async getMoreList(pageNo) {
            let that = this;
            let payLoad = {
                columnId: this.$route.params.id - 0,
                pageNo: pageNo,
                pageSize: that.pageSize}
            this.$store.dispatch('HomeDataModule/getMoreData',payLoad)
            // let res = await this.$axios.post("/xsdq/home/second/list", payLoad);
            // if (res.data.status == 0) {
            //     this.moreBooks = res.data.data.items;
            //     this.moreName = res.data.data.name;
            //     this.allBookCount = res.data.data.totalSize;
            // } else {
            //     this.$msg({
            //     content: "Network Error , Status: " + res.data.status
            //     });
            // }
        },
        handleClickPrev() {
            if (this.pageNo == 1) return;
            this.pageNo -= 1;
            this.getMoreList(this.pageNo);
        },
        handleClickNext() {
            if (this.pageNo == Math.ceil(this.allBookCount / 10)) return;
            this.pageNo += 1;
            this.getMoreList(this.pageNo);
        },
        handlePageNumItem(target) {
            if (this.pageNo == target) return;
            this.pageNo = target;
            this.getMoreList(this.pageNo);
        }
    },
    destroyed() {
        // this.$store.dispatch("moduleHome/changeLoadingStatus", false);
        // this.$store.dispatch('moduleSearch/changeKeyWord', '')
        // this.$store.dispatch('moduleSearch/changeBooks', {books: [],allBookCount: 0})
    }
};
</script>
<style lang='scss' scoped>
.search {
  width: 100%;
  min-height: 800px;
  background: #fff;
  padding-bottom: 40px;
  .search-title {
    width: 100%;
    height: 80px;
    box-sizing: border-box;
      margin-top: 10px;
    .box {
      width: 1080px;
      height:80px;
      margin: 0 auto;
      .title-name {
        font-size: 32px;
        font-weight: bold;
        height: 80px;
        line-height: 80px;
        color: #333333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        position: relative;
        padding-left:22px;

        .left_bar{
          position: absolute;
          width: 6px;
          height: 22px;
          left:0;
          top:29px;
          background:rgba(255, 126, 66, 1);
        }
      }
      .search-tag {
        font-size: 0;
        .search-tag-item {
          display: inline-block;
          margin-bottom: 40px;
          height: 44px;
          line-height: 44px;
          border-radius: 44px;
          min-width: 140px;
          box-sizing: border-box;
          padding: 0 10px;
          text-align: center;
          background: rgba(0, 0, 0, 0.05);
          color: rgba(76, 93, 114, 1);
          font-size: 16px;
          cursor: pointer;
          margin-right: 32px;
          &:hover {
            background: linear-gradient(
              142deg,
              rgba(255, 123, 186, 1) 0%,
              rgba(246, 34, 148, 1) 100%
            );
            font-weight: bold;
            color: #fff;
          }
        }
      }
    }
  }
  .container {
    width: 1080px;
    margin: 0 auto;
    padding-top: 20px;
  }
}
</style>
