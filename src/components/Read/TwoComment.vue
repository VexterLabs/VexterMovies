<template>
    <div class="comment">
        <div class="left">
            <img v-if="commentInfo.userAvatar" :src="commentInfo.userAvatar" alt="goodnovel comment avatar">
            <img v-else src="../../assets/images/center/user_center_avatar_default.png" alt="goodnovel comment avatar">
        </div>
        <div class="right-top">
            <div class="user-name">
                {{commentInfo.userNickname || 'visitor'}}
                <!-- <span class="user-level">LV.12</span> -->
            </div>

        </div>
        <div class="comment-content">
            <span v-if="commentInfo.referUserName">@{{commentInfo.referUserName}}: </span>{{commentInfo.content}}
        </div>
        <div class="hanlde-box">
            <span class="comment-time">{{commentInfo.ctime}}</span>
            <!-- <span class="reply-num">12 replies</span> -->
            <div class="right">
                <div class="handle-item star active"
                v-if="commentInfo.praise">{{commentInfo.likeNum}}</div>
                <div class="handle-item star"
                @click="handleStar" v-else>{{commentInfo.likeNum}}</div>
                <div class="handle-item reply"
                @click="handleReplyItem">
                    <span :class="[{'is-null': !isShowReplyNum}]">{{commentInfo.replyNum}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default{

    props: {
        commentInfo: {
            default: {}
        },
        type: {
            default: ''
        },
        isShowReplyNum: {
            default: true
        }
    },
    computed: {
      ...mapState({
        userInfo: state => state.moduleHome.userInfo,
        chapterCurrentIndex: state => state.moduleRead.currentChapterId
        })
    },
    data () {
        return {
            isShowInput: false,
            inputComment: ''
        }
    },
    mounted() {

    },
    methods: {
        handleReplyItem(){
            this.$emit('handleReplyTwo', {
                target: this.commentInfo,
                type: 2
            })
        },
        handleStar(){
          this.starAjax();

          // 富富ES20秒
          return;
            this.$emit('handleReplyTwo', {
                target: this.commentInfo,
                type: 3
            })
        },
        async starAjax() {
          let res = await this.$axios.post("/xsdq/comment/praise", {
            bookId: this.commentInfo.bookId,
            chapterId: this.chapterCurrentIndex,
            refer2Id: "",
            referId: this.commentInfo.id,
            referUserId: this.commentInfo.userId
          });
          if (res.data.status == 0) {
            this.commentInfo.praise = true;
            this.commentInfo.likeNum +=1;

            // TODO 富富ES20秒
            return
            this.$emit("handleGetReloadComment", {});
            this.getReplyComment();
          }
        },
    },

}
</script>
<style lang='scss' scoped>
.comment{
    width: 100%;
    min-height: 80px;
    overflow: hidden;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(255,255,255,0.2);
    padding-bottom: 10px;
    .left{
        float: left;
        width: 32px;
        height: 32px;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    .right-top{
        margin-left: 40px;
        width: 100px;
        .user-name{
            color:#ffffff;
            overflow: hidden;
            font-size: 16px;
            font-weight: bold;
            margin: 6px 0;
            .user-level{
                box-sizing: border-box;
                padding: 0 10px;
                display: inline-block;
                background:linear-gradient(135deg,rgba(246,131,131,1) 0%,rgba(220,107,219,1) 100%);
                height: 22px;
                line-height: 22px;
                border-radius: 22px;
                text-align: center;
                font-size:12px;
                color: #fff;
            }
        }

    }
    .comment-content{
        color: #ffffff;
        line-height:28px;
        font-size: 16px;
        span{
            font-size: 16px;
            font-weight: bold;
            color: rgba(255,255,255,0.5);
        }
    }
    .hanlde-box{
        margin-top: 10px;
        overflow: hidden;
        .comment-time{
            color:#ffffff;
            font-size: 14px;
            float: left;
        }
        .reply-num{
            color:rgba(86,152,233,1);
            font-size: 14px;
            margin-left: 10px;
        }
        .right{
            float: right;
            // width: 160px;
            text-align: right;
            .handle-item{
                display: inline-block;
                width: 16px;
                height: 16px;
                color:#ffffff;
                line-height: 18px;
                font-size: 14px;
                padding-left: 20px;
                background: url('../../assets/images/read/chapter_reply_icon.png') no-repeat left center/16px 16px;
                cursor: pointer;
                white-space: nowrap;
                margin-left: 10px;
                &.star{
                    background-image: url('../../assets/images/read/chapter_star_icon.png');
                    &.active{
                        background-image: url('../../assets/images/common/like_active.png');
                    }
                }
                &.more{
                    background-image: url('../../assets/images/read/chapter_reply_icon.png');
                    background-position: center 4px;
                }
                .is-null{
                    opacity: 0;
                }
            }
        }


    }
    .bottom{
        width: 100%;
        border-bottom: 1px solid #EE3799;
        box-sizing: border-box;
        padding-left: 70px;
        input{
            width: 920px;
            height: 70px;
        }
        .send{
            width: 84px;
            height: 36px;
            line-height: 36px;
            text-align: center;
            background:rgba(238,55,153,1);
            border-radius: 4px;
            float: right;
            box-sizing: border-box;
            font-weight:bold;
            color:rgba(255,255,255,1);
            font-size: 16px;
            margin-top: 17px;
            cursor: pointer;
        }
    }
}
</style>
