<!--
 * @Description:
 * @FilePath: \haiwai_pc\src\Views\Trash\Trash.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2020-04-22 21:59:58
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-06-12 11:56:55
 -->
<template>
  <div>
    <div class="container">
      <div class="box" v-if="trashList.length==0">
        <div class="del_all">
          <h1>No data</h1>
        </div>
      </div>
      <div class="box" v-if="trashList.length>0">
        <div class="del_all" @click.stop="delAll">
          <h1>Delete All Permanently</h1>
        </div>

        <div class="trash_list">
          <ul>
            <li v-for="item in trashList" :key="item.id">
              <div class="item_left fl">
                <h2>{{(item.chapterName +' : '+ item.previewContent) | nameFilter}}</h2>
                <div class="item_inner_bottom">
                  <span class="count">{{item.wordNum}} words</span>
                  <span class="time">{{item.utime}}</span>
                </div>
              </div>

              <div class="del fr" @click.stop="delCurrent(item.id)">Delete Permanetly</div>
              <div class="recover fr" @click.stop="recoverCurrent(item.id)">Recover</div>
            </li>
          </ul>
        </div>

        <!-- <v-pagenation
          class="trash_page"
          :totals="10"
          :pageNo="1"
          :color="'#e33'"
          @handleClickPrev="handleClickPrev"
          @handleClickNext="handleClickNext"
          @handlePageNumItem="handlePageNumItem"
        ></v-pagenation>-->
      </div>
    </div>
  </div>
</template>
<script>
import Pagenation from "@/components/Common/Pagiation.vue";

export default {
  data() {
    return {
      bookId: 0,
      trashList: [],
      ids: []
    };
  },
  mounted() {
    this.bookId = this.$route.query.bookId;
    this.init();
  },
  methods: {
    async init() {
      let res = await this.$axios.post("/webfic/chapter/findByBookId", {
        bookId: this.bookId
      });
      if (res.data.status == 0) {

        this.trashList = res.data.data;
      } else {
        this.$msg({
          content: "Network Error, Please Try Again Later"
        });
      }
    },

    async handlePost(param) {
      return await this.$axios.post("/webfic/chapter/updateChapterStatus", {
        bookId: this.bookId,
        chapterDraftStatusEnum: param.key,
        chapterIds: param.ids
      });
    },

    // 全部删除
    async delAll() {
      $logClick({
        module: "trash", // 草稿页
        zone: "qbsc", // 全部删除
        adid: "delete_all" // 全部删除
      });

      // 弹窗
      this.$msgBox({
        type: "del",
        title: "Confirm Trash Delete",
        tips: [`Those trash will no longer exist on GoodNovel`]
      }).then(async val => {
        if (val) {
          if (val) {
            this.trashList.forEach(item => {
              this.ids.push(item.id);
            });

            let res = await this.handlePost({
              key: "DELETE",
              ids: this.ids
            });
            if (res.data.status == 0) {
              $logEvent({
                event: "qbsccg", //全部删除成功
                map: {
                  module: "delete_all_success" // 全删成功
                }
              });

              this.$msg({
                content: "Delete Success"
              });
              this.init();
            } else {
              this.$msg({
                content: "Network Error"
              });
            }
          }
        }
      });
    },

    // 删除当前
    async delCurrent(id) {
      $logClick({
        module: "trash", // 草稿页
        zone: "scyt", // 删除1条
        adid: "delete_one", // 删除1条
        chapterId: id // 删除的id
      });

      let flag = false;
      // 弹窗
      this.$msgBox({
        type: "del",
        title: "Confirm Trash Delete",
        tips: [`This trash will no longer exist on GoodNovel`]
      }).then(async val => {
        if (val) {
          if (val) {
            let res = await this.handlePost({
              key: "DELETE",
              ids: [id]
            });
            if (res.data.status == 0) {
              $logEvent({
                event: "scytcg", // 删除一条成功
                map: {
                  module: "delete_one_success", // 删除一条成功
                  chapterId: id // 删除的章节ID
                }
              });

              this.$msg({
                content: "Delete Success"
              });
              this.init();
            } else {
              this.$msg({
                content: "Network Error"
              });
            }
          }
        }
      });
    },

    // 恢复
    async recoverCurrent(id) {
      $logClick({
        module: "trash", // 草稿页
        zone: "hfzj", // 恢复章节
        adid: "recover", // 恢复章节
        chapterId: id // 恢复章节的id
      });

      let res = await this.handlePost({
        key: "UNPUBLISHED",
        ids: [id]
      });
      if (res.data.status == 0) {
        $logEvent({
          event: "fhzjcg", // 恢复章节成功
          map: {
            module: "recover_success", // 恢复章节成功
            chapterId: id // 恢复章节成功ID
          }
        });

        this.$msg({
          content: "Recover Success"
        });
        this.init();
      } else {
        this.$msg({
          content: "Network Error"
        });
      }
    },

    handleClickPrev() {},
    handleClickNext() {},
    handlePageNumItem(e) {
    }
  },
  filters: {
    nameFilter(str) {
      let regx = /<[^>]*>|<\/[^>]*>/gm;
      str = str.replace(regx, "");

      if (str.length > 80) {
        return str.slice(0, 80) + "...";
      } else {
        return str;
      }
    }
  },
  components: {
    vPagenation: Pagenation
  }
};
</script>
<style scoped lang="scss">
* {
  box-sizing: border-box;
}
.fr {
  float: right;
}
.fl {
  float: left;
}
.container {
  padding: 40px 0;
}
.box {
  margin-top: 40px;
  width: 1024px;
  margin: 0 auto;
  background: #fff;
  min-height: 730px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding: 0 24px;
  position: relative;
  .del_all {
    width: 266px;
    height: 36px;
    margin-top: 12px;
    padding: 12px;
    background: rgba(238, 51, 51, 1);
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
    h1 {
      padding-left: 28px;
      background: url(../../assets/images/icons/trash_del.png) no-repeat 0px
        center;
      background-size: 20px 20px;
      font-size: 16px;
      color: #fff;
      font-weight: bold;
      margin-top: -5px;
    }
  }

  .trash_list {
    margin-top: 24px;
    ul {
      li {
        overflow: hidden;
        margin-bottom: 12px;
        width: 100%;
        min-height: 88px;
        background: rgba(244, 246, 248, 1);
        padding: 20px 24px;
        border-radius: 8px;
        .item_left {
          max-width: 670px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          h2 {
            height: 24px;
            font-size: 16px;
            line-height: 24px;
            font-weight: 600;
            color: rgba(58, 74, 90, 1);
            margin-bottom: 10px;
          }
          .item_inner_bottom {
            height: 22px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(58, 74, 90, 0.6);
            line-height: 22px;
            span {
              display: inline-block;
              width: 150px;
              text-align: left;
            }
          }
        }
        .del,
        .recover {
          font-size: 16px;
          font-family: SourceHanSansSC-Regular, SourceHanSansSC;
          font-weight: 600;
          line-height: 28px;
          margin-top: 14px;
          cursor: pointer;
        }
        .del {
          color: rgba(238, 55, 153, 1);
        }
        .recover {
          color: rgba(248, 69, 69, 1);
          margin-right: 24px;
        }
      }
    }
  }

  .trash_page {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>
