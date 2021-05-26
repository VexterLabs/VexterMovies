<template>
  <div
    class="read-box"
    :data-chapterid="chapterInfo.id"
    :data-chaptername="chapterInfo.chapterName"
  >
    <div :class="['read-chapter',{'noBorder': unlockFlag},'bgColor'+bgColor]">
      <div :id="chapterInfo.id" class="title">{{chapterInfo.chapterName}}</div>
      <div class="author-info">
        <div class="author-item" v-if="bookInfo.translator">
          Translator:
          <span>{{bookInfo.translator}}</span>
        </div>
        <div class="author-item" v-if="bookInfo.author">
          Editor:
          <span>{{bookInfo.author}}</span>
        </div>
      </div>
      <div
        class="read-content"
        :class="'fontSize'+fontSize"
        :style="{fontSize: fontSize+'px', lineHeight: fontSize*1.5+'px'}"
        v-html="handleHypeLinks(chapterInfo.content)"
      ></div>

      <!-- webfic关闭书籍评论 -->
      <!-- <div class="comments" v-if="chapterInfo.commentList && chapterInfo.commentList.length>0">
        <div class="title">Comments ({{chapterInfo.totalCommenCount}})</div>
        <div class="comments-list">
          <read-comment
            v-for="(item,index) in chapterInfo.commentList"
            v-show="index < 3"
            :key="item.id"
            :commentInfo="item"
          ></read-comment>
        </div>
        <div class="comment-view-more" @click.stop="handleShowAllComments">VIEW ALL COMMENTS</div>
      </div> -->

      <!-- add-fellow webfic关闭添加同人-->
      <!-- <div class="add-fellow" v-if="chapterInfo.allowCopy && !($route.query.preview)" >
        <div class="dot" @mouseover.stop="isHover = true" @mouseout="isHover = false">{{ isHover ? 'Unsatisfied with this plot?' : 'Fanfics'}}
          <h3
            class="write_fan"
            @click="handleCreateFellow(chapterInfo)"
          >Write Fanfic</h3>
        </div>
        <img src="../../assets/images/icons/add_fanc.png" alt="goodnovel add" />
      </div> -->

      <!-- <div class="line">
        <span class="line-logo"></span>
      </div> -->
    </div>

    <WebficReadUnlock v-if="unlockFlag"></WebficReadUnlock>

    <!-- <read-unlock v-if="unlockFlag" :chapterInfo="chapterInfo" @payMoneyBook="payMoneyBook" @payMoneyChapter="payMoneyChapter"></read-unlock> -->
  </div>
</template>
<script>
import ReadUnlock from "@/components/Book/ReadUnlock.vue";
import WebficReadUnlock from "@/components/Book/WebficReadUnlock.vue";
import ReadComment from "@/components/Read/Comment.vue";
import { mapState } from "vuex";
export default {
  components: {
    ReadUnlock,
    ReadComment,
    WebficReadUnlock
  },
  props: ["chapterInfo", "bookInfo", "noBorder", "unlockFlag"],
  computed: {
    ...mapState({
      fontSize: state => state.moduleRead.fontSize,
      bgColor: state => state.moduleRead.bgColor,
      userInfo: state => state.moduleHome.userInfo,
      chapterCurrentIndex: state => state.moduleRead.currentChapterId
    })
  },
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      isHover: false,
      // totalCommenCount:0,
    };
  },
  mounted() {
    // this.getPageInit()
  },
  methods: {
    handleCreateFellow(chapterInfo){
      $logClick({
          module: 'ReadChapter',
          zone: "djcjtr", //点击创建同人
          adid: "create_tr", // 创建同人
          map: {
            bookId: chapterInfo.bookId,
            chapterId:chapterInfo.chapterId||0
          }
        });
      this.$router.push('/create_book?fellowBookId='+chapterInfo.bookId+'&chapterId='+chapterInfo.chapterId);
    },
    async getPageInit() {

      let chapterId = this.$route.params.id.split('-')[1];

      let res = await this.$axios.post("/webfic/comment/book/comments", {
        bookId: this.bookInfo.bookId,
        bookName: this.bookInfo.bookName,
        bookCover: this.bookInfo.cover,
        chapterId: chapterId, //this.chapterCurrentIndex,
        order: "",
        referId: "",
        level: 3,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        sort: "",
        userId: this.userInfo.id || 0
      });
      if (res.data.status == 0 && res.data.data.webBookComments) {
        this.commentList = res.data.data.webBookComments.records;
        this.totalCommenCount = res.data.data.webBookComments.total;
        this.$forceUpdate();
      }
    },
    payMoneyChapter() {
      this.$emit("payMoneyChapter", this.chapterInfo.id);
    },
    payMoneyBook() {
      this.$emit("payMoneyBook" , this.chapterInfo);
    },
    handleShowAllComments() {
      // 这个是点击章节中的所有评论，这个方法需要组织冒泡
      this.$store.dispatch("moduleRead/changeChapterId", this.chapterInfo);
      this.$store.dispatch("moduleRead/changeOpeationIndex", 2);
    },
    handleHypeLinks(content) {
      // 使用'' 替换内容中的超链接
      var reg = /<\/?a.*?>/gi;
      return content.replace(reg, "");
    }
  }
};
</script>
<style lang='scss' scoped>
.read-box{
  position: relative;
}
.read-chapter {
  margin-top: 40px;
  .line {
    width: 100%;
    height: 2px;
    background: rgba(170, 187, 204, 0.4);
    margin-top: 60px;
    position: relative;
    .line-logo {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 46px;
      height: 24px;
      background: url("../../assets/images/common/read_chapter_line_logo.png")
        no-repeat center center/24px 24px;
      background-color: #fff;
    }
  }
  &.noBorder {
    border: none;
  }
  &.bgColor1 {
    .line {
      .line-logo {
        background-color: #f5e7d7;
      }
    }
  }
  &.bgColor2 {
    .title {
      color: rgba(255, 255, 255, 0.9);
    }
    .author-info {
      .author-item {
        color: rgba(244, 246, 248, 0.6);
        span {
          color: rgba(244, 246, 248, 0.6);
        }
      }
    }
    .read-content {
      color: rgba(255, 255, 255, 1)!important;
      p{
          color:rgba(255, 255, 255, 1)!important;
      }
      span{
          color: rgba(255, 255, 255, 1)!important;
      }
    }
    .line {
      background: rgba(170, 187, 204, 0.4);
      .line-logo {
        background-color: rgba(17, 17, 17, 1);
      }
    }
  }
  .title {
    color: rgba(58, 74, 90, 1);
    font-weight: bold;
    font-size: 28px;
    font-family: "Vollkorn", serif;
    line-height: 32px;
  }
  .author-info {
    font-size: 0;
    margin: 16px 0;
    font-family: "Vollkorn", serif;
    .author-item {
      font-size: 14px;
      color: rgba(76, 93, 114, 0.6);
      display: inline-block;
      margin-right: 24px;
      span {
        color: rgba(76, 93, 114, 0.6);
        font-weight: 400;
        font-size: 14px;
      }
    }
  }
  .read-content {
    font-family: "Vollkorn", serif;
    font-size: 18px;
    color: rgba(51, 51, 51, 1);
    line-height: 32px;
    // word-break: break-all;
    word-wrap: break-word;
    white-space: pre-wrap;
    text-align: justify;
  }
  .read-content p {
    font-family: "Vollkorn", serif !important;
    text-align: justify;
  }
}
.comments {
  .title {
    padding: 20px 0 0;
    font-size: 32px;
    color: #3a4a5a;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .comment-view-more {
    text-align: center;
    font-size: 20px;
    color: #ee3799;
    font-weight: 400;
    padding-top: 10px;
    cursor: pointer;
  }
}

.add-fellow {
  height: 80px;
  font-family: "Vollkorn", serif;
  font-size: 18px;
  color: #3a4a5a;
  word-wrap: break-word;
  white-space: pre-wrap;
  text-align: justify;
  position: relative;
  img {
    width: 62px;
    height: 72px;
    position: absolute;
    right: 0;
    bottom: -45px;
  }
  .dot {
    float: right;
    width: 160px;
    height: 48px;
    background: linear-gradient(
      122deg,
      rgba(90, 70, 251, 1) 0%,
      rgba(106, 87, 251, 1) 100%
    );
    border-radius: 24px;
    line-height: 48px;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    text-align: left;
    margin-top: 80px;
    cursor: pointer;
    position: relative;
    padding-left: 24px;
    box-sizing: border-box;
    overflow: hidden;
    transition: all 1s ease-in-out;
    -ms-transition: all 1s ease-in-out;
    -moz-transition: all 1s ease-in-out;
    -webkit-transition: all 1s ease-in-out;
    -o-transition: all 1s ease-in-out;
    h3.write_fan {
      position: absolute;
      left: 304px;
      top: 6px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      color: rgba(238, 55, 153, 1);
      line-height: 36px;
      width: 128px;
      height: 36px;
      background: rgba(255, 255, 255, 1);
      border-radius: 18px;
    }
  }
  .dot:hover {
    width: 500px;
  }
}
</style>
