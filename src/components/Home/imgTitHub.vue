<template>
<div class="hub_item">
    <div class="top">
        <router-link :to="{path: '/hubinfo/'+ bookInfo.urlSuffix }" @click.native="handleOpenDetail(bookInfo.id)">
            <img v-if="bookInfo.pcCover" :src="bookInfo.pcCover" :alt="bookInfo.title" :title="bookInfo.title" class="cover" @click.native="handleOpenDetail(bookInfo.id)">
            <img v-else src="../../assets/images/common/default_book_bg.png" :alt="bookInfo.title" :title="bookInfo.title" class="cover"  @click.native="handleOpenDetail(bookInfo.id)">
        </router-link>
        <div class="right">
            <!-- <h2 @click="handleOpenDetail(bookInfo.id)">{{bookInfo.title}}</h2> -->
            <router-link :to="{path: '/hubinfo/'+ bookInfo.urlSuffix }" @click.native="handleOpenDetail(bookInfo.id)">{{bookInfo.title}}</router-link>
            <div class="rb">
                <span class="tag">{{bookInfo.hubTag}}</span><!-- @click="handleOpenHub" 暂无根据标签请求列表需求-->
                <span class="views">
                    <img src="../../assets/images/icons/view_icon.png" alt="" class="view_icon">
                    <span class="iconfont">{{bookInfo.viewCount}}</span>
                </span>
                <span class="time">
                    <img src="../../assets/images/icons/ic_time.png" alt="" class="view_icon">
                    <span class="iconfont">{{bookInfo.ctime}}</span>
                </span>
            </div>
        </div>
    </div>
    <div class="line"></div>
</div>
</template>

<script>
import {
    formatSpace
} from "@/core/js/common.js"

export default {
    name: "ImgHub",
    data() {
        return {

        }
    },
    props: ['bookInfo'],
    methods: {
        handleOpenDetail() {
            $logClick({
                module: "hub_open_book_detail",
                zone: "djhubsjxq", // 点击书籍详情
                adid: "hub_open_book_detail",
                map: {
                    bookId: this.bookInfo.id,
                    tag: this.bookInfo.hubTag
                }
            })
            // this.$router.push('/hubinfo/' + this.bookInfo.urlSuffix + '/' + this.bookInfo.id + '/' + formatSpace(this.bookInfo.typeTwoNames && this.bookInfo.typeTwoNames[0] || "null") + '/' + formatSpace(this.bookInfo.title));
            // this.$router.push('/hubinfo/' + this.bookInfo.urlSuffix);
        },
        handleOpenHub() {
            $logClick({
                module: "hub_open_hub_list",
                zone: "djhubbq", // 点击Hub标签
                adid: "hub_open_hub_list",
                map: {
                    tagId: this.bookInfo.hubTagId,
                    tag: this.bookInfo.hubTag
                }
            })
            this.$router.push(`/hublist?tagId=${this.bookInfo.hubTagId}&tagName=${this.bookInfo.hubTag}`)
        }
    }
}
</script>

<style lang="scss">
.hub_item {
    box-sizing: border-box;
    width: 100%;
    padding: 20px 0px;
    background: rgba(255, 255, 255, 1);

    .top {
        overflow: hidden;
        margin-bottom: 20px;
    }

    .cover {
        width: 120px;
        height: 160px;
        border-radius: 8px;
        background: rgba(238, 238, 238, 1);
        margin-right: 24px;
        float: left;
        cursor: pointer;
    }

    .right {
        float: left;
        padding-top: 25px;
        width: 624px;

        h2,a {
            cursor: pointer;
            font-size: 24px;
            font-family: Helvetica-Bold, Helvetica;
            font-weight: bold;
            color: #3A4A5A;
            line-height: 36px;
            margin-bottom: 16px;
            height: 72px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }

        .rb {
            .tag {
                display: inline-block;
                width: 54px;
                height: 20px;
                border-radius: 2px;
                border: 1px solid rgba(238, 55, 153, .4);
                font-size: 12px;
                font-family: Helvetica;
                color: rgba(238, 55, 153, 1);
                line-height: 20px;
                text-align: center;
                margin-right: 40px;
            }

            .views,
            .time {
                img {
                    width: 16px;
                    height: 16px;
                    margin-right: 4px;
                    vertical-align: middle;
                }

                .iconfont {
                    display: inline-block;
                    vertical-align: middle;
                    height: 22px;
                    line-height: 22px;
                    font-size: 18px;
                    font-family: Helvetica;
                    color: #3A4A5A;
                }
            }

            .views {
                margin-right: 40px;
            }
        }
    }

    .line {
        float: left;
        width: 100%;
        height: 0px;
        border-bottom: 1px solid rgba(238, 238, 238, 1);
    }
}
</style>
