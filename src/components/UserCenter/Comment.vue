<template>
    <div class="comment">
        <div class="left">
            <img v-if="commentInfo.userAvatar" v-lazy="commentInfo.userAvatar" alt="goodnovel user avatart">
            <img v-else src="../../assets/images/center/user_center_avatar_default.png" alt="goodnovel user avatart">
        </div>
        <div class="right">
            <div class="user-name">
                {{commentInfo.userNickname}}
                <span class="like" v-if="commentInfo.type == 3">Like comment</span>
            </div>
            <div class="comment-content">{{commentInfo.content}}</div>
            <div class="book-detail" >
                <div class="book-img">
                    <img v-lazy="commentInfo.bookCover" :alt="commentInfo.bookName">
                </div>
                <div class="comment-detail">
                    <div class="other-reply" v-if="commentInfo.referBookComment">
                        <span v-if="commentInfo.referUserName">{{commentInfo.referUserName}}: </span>
                        {{commentInfo.referBookComment.content}}
                    </div>
                    <div class="comment-tips" :class="[{special: !commentInfo.referBookComment}]">
                        {{commentInfo.bookName}}&nbsp;&nbsp;{{commentInfo.chapterName}}
                    </div>
                </div>
            </div>
            <div class="comment-time">
                {{commentInfo.utime}}
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default{
    props: [
        'commentInfo',
    ],
    computed: {
        ...mapState({
            userInfo: state => state.moduleHome.userInfo
        })
    },
    data () {
        return {
            inputComment: '',
        }
    },
    methods: {

    }
}
</script>
<style lang='scss' scoped>
.comment{
    width: 100%;
    min-height: 100px;
    overflow: hidden;
    margin-bottom: 20px;
    .left{
        float: left;
        width: 48px;
        height: 48px;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    .right{
        margin-left: 64px;
        width: 647px;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        padding-bottom: 26px;
        .user-name{
            color:rgba(58,74,90,1);
            overflow: hidden;
            font-size: 16px;
            font-weight: bold;
            margin: 12px 0;
            .like{
                color:rgba(238,55,153,1);
                font-size: 16px;
                font-family:SourceHanSansCN-Regular,SourceHanSansCN;
                font-weight:400;
                margin-left: 10px;
                background: url('../../assets/images/common/like_unactive.png') no-repeat center left/16px 16px;
                padding-left: 20px;

            }
        }
        .comment-content{
            color:rgba(67,83,102,1);
            line-height:28px;
            font-size: 16px;
        }
        .book-detail{
            box-sizing: border-box;
            padding: 8px 12px;
            width: 100%;
            background: rgba(0,0,0,0.05);
            border-radius: 8px;
            font-size: 0;
            overflow: hidden;
            position: relative;
            min-height: 60px;
            .book-img{
                width: 30px;
                height: 40px;
                position: absolute;
                bottom: 10px;
                background: rgba(58, 74, 90, 0.05);
                border: 1px solid rgba(58, 74, 90, 0.1);
                box-sizing: border-box;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 2px;
                }
            }
            .comment-detail{
                float: left;
                margin-left: 42px;
                .other-reply{
                    color:rgba(67,83,102,1);
                    font-size: 16px;
                    line-height: 28px;
                    // white-space: pre-wrap;
                    word-break: break-all;
                    span{
                        font-weight:bold;
                        color:rgba(58,74,90,1);
                    }
                }
                .comment-tips{
                    line-height: 22px;
                    color:rgba(58,74,90,0.6);
                    font-size: 14px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    width: 580px;
                    &.special{
                        line-height: 40px;
                    }
                }
            }
        }
        .comment-time{
            color:rgba(58,74,90,0.6);
            font-size: 14px;
            margin-top: 10px;
        }
    }
}
</style>
