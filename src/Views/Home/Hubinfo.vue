<template>
<div class="hub_info">
    <div class="center">
        <h1>GoodNovel Hub</h1>
        <div class="main">
            <div class="banner" v-if="hubInfo.pcBanner">
                <img :src="hubInfo.pcBanner" :alt="hubInfo.title">
            </div>
            <div class="intro" v-if="hubInfo.topDesc">{{hubInfo.topDesc}}</div>
            <div class="top_story" v-if="hubInfo.hubBookVos && hubInfo.hubBookVos.length && hubInfo.hubBookVos.length > 0">
                <h2>This Week Top Stories</h2>
                <div class="top_story_item" v-for="(item , index) in hubInfo.hubBookVos" :key="item.bookId">
                    <div class="top">
                        <img v-if="item.bookCover" :src="item.bookCover" :alt="item.bookName" :title="item.bookName" class="top_left">
                        <img v-else src="../../assets/images/common/default_book_bg.png" :alt="item.bookName" :title="item.bookName" class="top_left">

                        <div class="top_right">
                            <div class="title" :title="item.bookName">{{item.bookName}}</div>
                            <div class="pseudonym">{{item.pseudonym}}</div>
                            <div class="tags">
                                <span class="tag_item" v-for="(tag , tindex) in item.labelNames" :key="tindex">{{tag}}</span>
                            </div>
                            <div class="btns">
                                <span class="read" @click="handleReadBook(item.bookId)">Read Now</span>
                                <span @click="addOrRemoveShelf(item , index)" :class="{
                                  'add' : !(item.inShelf),
                                  'added' : !!(item.inShelf),
                                }">{{ item.inShelf ? 'Added' : 'Add to library'}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="btm" v-if="item.introduction">{{item.introduction}}</div>
                </div>
            </div>
            <div class="intro" v-if="hubInfo.endDesc">{{hubInfo.endDesc}}</div>
            <div class="share_contain">
                <h2>Share it With Your Friends!</h2>
                <div class="icon_contain">
                    <div class="img" @click="handleFBShare">
                        <img src="../../assets/images/icons/ic_facebook.png" alt="">
                        Facebook
                    </div>
                    <div class="img" @click="handleCopy">
                        <img src="../../assets/images/icons/ic_CopyLink.png" alt="">
                        CopyLink
                    </div>
                </div>
            </div>
            <div class="btn_story" v-if=" hubInfo.recommendHubs && hubInfo.recommendHubs.length !=0 ">
                <h2>
                    看過這本書的人還在看
                </h2>
                <div class="list_item" v-for="(item ,index) in hubInfo.recommendHubs" :key="index">
                    <div class="line" v-if="index!=0"></div>
                    <img v-if="item.pcCover" :src="item.pcCover" :alt="item.title" :title="item.title" class="left" @click="handleOpenDetail(item)">
                    <img v-else src="../../assets/images/common/default_book_bg.png" :alt="item.title" :title="item.title" class="left" @click="handleOpenDetail(item)">

                    <div class="list_item_right">
                        <h2>{{item.title}}</h2>
                        <div class="rb">
                            <span class="tag">{{item.hubTag}}</span>
                            <span class="views">
                                <img src="../../assets/images/icons/view_icon.png" alt="" class="view_icon">
                                <span class="iconfont">{{handleK(item.viewCount)}}</span>
                            </span>
                            <span class="time">
                                <img src="../../assets/images/icons/ic_time.png" alt="" class="view_icon">
                                <span class="iconfont">{{item.ctime}}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    formatSpace
} from "@/core/js/common.js"
import { mapState,mapMutations} from "vuex";
export default {
    name: "hubinfo",
    async asyncData({store, route}){
        let param = route.params;
        if (route.query.from) {
            let from = route.query.from;
        }
        if (route.query.previewKey) { // 通过分享链接进入增加额外参数
            param.previewKey = route.query.previewKey
        }
        await store.dispatch('HubDataModule/getHubInfo',param);
    },
    computed: {
        ...mapState('HubDataModule',['hubInfo','initLoad'])
    },
    data() {
        return {
            // hubInfo: {},
            addingFlag: false,
        }
    },
    mounted() {
        let param = this.$route.params;
        if (this.$route.query.from) {
            let from = this.$route.query.from;
            $logEvent({
                event: "fxyjrhub", //分享页进入hub详情
                map: {
                    module: "hub_info",
                    from: from // fbshare  copylink
                },
            });
        } else {
            $logEvent({event: "fqhubxqqq", map: {module: "hub_info"}});
        }
        if (this.$route.query.previewKey) { // 通过分享链接进入增加额外参数
            param.previewKey = this.$route.query.previewKey
        }
        // console.log('this.initLoad',this.initLoad)
        if(this.initLoad) this.getPageInfo(param);
    },
    methods: {
        ...mapMutations('HubDataModule', ['INIHUBINFODATA']),
        // 转post
        async getPageInfo(param,OpenDetail) {
            let data = {};
            if(OpenDetail) {
                // 发起hub详情请求
                $logEvent({event: "fqhubxqqq", map: {module: "hub_info"}});
                let res = await this.$axios.post('/webfic/hub/detail', param);
                if (res.data.status == 0 && res.data.data) {
                    data = res.data.data;
                    this.INIHUBINFODATA({hubInfo:data,initLoad: true})
                } else {
                    this.$msg({
                        content: "Network Error, status: " + res.data.status
                    })
                }
            } else data = this.hubInfo;
            
            if (this.hubInfo && this.hubInfo.id) {
                // 发起hub详情成功请求
                $logEvent({event: "hubxqqqcg", map: {module: "hub_info"}});
                this.$forceUpdate();
            } else {
                // 发起hub详情失败请求
                $logEvent({event: "hubxqqqsb",map: {module: "hub_info"}});
            }
            await this.$nextTick()
            setTimeout(()=>{
                document.body.scrollTop = 200;
            },500)
        },

        // 阅读书籍
        handleReadBook(bookId) {
            $logClick({
                module: "Hub_info",
                zone: "djydsj", // 点击阅读书籍
                adid: "read_hub_book",
                map: {
                    bookId: bookId,
                },
            });
            this.$router.push(`/book/${bookId}`);
        },
        // 添加移除书架
        async addOrRemoveShelf(book, index) {
            if (this.addingFlag) return;
            this.addingFlag = true;
            let url = '/webfic/shelf/add'
            let param = {
                "bookId": book.bookId,
            }

            if (!!(book.inShelf)) {
                url = '/webfic/shelf/delete/batch2'
                param = {
                    bookIds: [book.bookId]
                }
            }

            $logClick({
                module: "Hub_info",
                zone: "djtjsj", // 点击添加书架
                adid: !!(book.inShelf) ? "removeShelf" : "addToShelf",
                map: {
                    bookId: book.bookId,
                },
            });

            let res = await this.$axios.post(url, param)
            if (res.data.status == 0) {
                $logEvent({
                    event: "sjczcg", // 书架操作成功
                    map: {
                        module: book.bookId,
                    }
                });

                this.hubInfo.hubBookVos[index].inShelf = res.data.data.inShelf;
                this.addingFlag = false;

                this.$forceUpdate();
            } else if(res.data.status == 6){
                $logEvent({
                      event: "sjczsb", // 书架操作失败
                      map: {
                          module: book.bookId,
                      }
                  });
                  this.addingFlag = false;
            }else{

                $logEvent({
                    event: "sjczsb", // 书架操作失败
                    map: {
                        module: book.bookId,
                    }
                });
                this.addingFlag = false;

                this.$msg({
                    content: "Network Error , status:" + res.data.status
                })
            }
        },
        // 打开hub详情
        handleOpenDetail(bookInfo) {
            $logClick({
                module: "hubInfo_open_book_detail",
                zone: "djhubsjxq", // 点击书籍详情
                adid: "hubInfo_open_book_detail",
                map: {
                    bookId: bookInfo.id,
                    tag: bookInfo.hubTag
                }
            })
            this.getPageInfo({urlSuffix: bookInfo.urlSuffix}, true)
        },
        // 分享操作
        handleFBShare() {

            $logClick({
                module: "Hub_info",
                zone: "djfxfb", // 点击分享facebook
                adid: "hub_FBshare",
                map: {
                    hubid: this.hubInfo.id,
                },
            });
            // 拉起成功事件打点
            try {
                let url = document.location.href.split("?")[0] + "?from=fbshare";

                $logEvent({
                    event: "lqfbfxcg", //拉起facebook分享页成功
                    map: {
                        module: "hub_info",
                    },
                });
                window.open(
                    "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(url),
                    "_blank",
                    "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=600, height=450,top=100,left=350"
                );
            } catch (error) {
                $logEvent({
                    event: "lqfbfxsb", //拉起facebook分享页失败
                    map: {
                        module: "hub_info",
                    },
                });
            }
        },
        handleCopy() {

            $logClick({
                module: "Hub_info",
                zone: "djfz", // 点击复制
                adid: "hub_copy",
                map: {
                    hubid: this.hubInfo.id,
                },
            });

            let message = window.location.href.split("?")[0] + '?from=copylink'

            this.$copyText(message).then(
                (e) => {
                    $logEvent({
                        event: "fzfxljcg", // 复制分享链接成功
                        map: {
                            module: 'hub_info', // 分享码
                        },
                    });

                    this.$msg({
                        content: "The link has been pasted to your clipboard.",
                    });
                    // console.log(e);
                },

                (e) => {
                    $logEvent({
                        event: "fzfxljsb", // 复制分享链接失败
                        map: {
                            module: 'hub_info', // 分享码
                        },
                    });

                    this.$msg({
                        content: "Oops! something is wrong , please try again later.",
                    });
                    // console.log(e);
                }
            );
        },
        // 字数变K
        handleK(count) {
            if (count > 1000) return (count + '').slice(0, -3) + "K"
            return count;
        }
    }
}
</script>

<style lang="scss">
.hub_info {
    .center {
        width: 848px;
        margin: 0 auto;

        h1 {
            height: 74px;
            line-height: 74px;
            font-size: 28px;
            font-family: Helvetica-Bold, Helvetica;
            font-weight: bold;
            color: rgba(58, 74, 90, .7);
        }

        .main {
            border: 1px solid rgba(0, 0, 0, 0.05);
            border-radius: 8px;
            padding: 20px 40px 40px;
            background: #FFFFFF;
            margin-bottom: 40px;

            .banner {
                margin-bottom: 20px;

                img {
                    width: 100%;
                }
            }

            .intro {
                font-size: 16px;
                font-family: Helvetica;
                color: #3A4A5A;
                line-height: 22px;
                margin-bottom: 32px;
            }

            .top_story {
                margin-bottom: 20px;

                h2 {
                    height: 24px;
                    font-size: 20px;
                    font-family: Helvetica-Bold, Helvetica;
                    font-weight: bold;
                    color: #EE3799;
                    line-height: 24px;
                    margin-bottom: 24px;
                }

                .top_story_item {
                    box-sizing: border-box;
                    width: 100%;
                    padding: 20px;
                    background: rgba(244, 246, 248, .5);
                    border-radius: 8px;
                    margin-bottom: 16px;

                    .top {
                        overflow: hidden;
                        margin-bottom: 16px;

                        .top_left {
                            float: left;
                            width: 150px;
                            height: 200px;
                            border-radius: 10px;
                            background: #fff;
                            margin-right: 16px;
                        }

                        .top_right {
                            float: left;
                            width: 560px;

                            .title {
                                height: 64px;
                                font-size: 24px;
                                font-family: Helvetica-Bold, Helvetica;
                                font-weight: bold;
                                color: #3A4A5A;
                                line-height: 32px;
                                margin-bottom: 14px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                            }

                            .pseudonym {
                                height: 22px;
                                font-size: 18px;
                                font-family: Helvetica;
                                color: rgba(58, 74, 90, .6);
                                line-height: 22px;
                                margin-bottom: 16px;
                            }

                            .tags {
                                margin-bottom: 18px;

                                .tag_item {
                                    display: inline-block;
                                    padding: 0 12px;
                                    height: 28px;
                                    line-height: 28px;
                                    background: rgba(0, 0, 0, 0.05);
                                    border-radius: 14px;
                                    font-size: 16px;
                                    font-family: Helvetica;
                                    color: #EE3799;
                                    text-align: center;
                                    margin-right: 16px;
                                }
                            }

                            .btns {
                                span {
                                    display: inline-block;
                                    width: 160px;
                                    height: 36px;
                                    line-height: 36px;
                                    font-size: 16px;
                                    font-family: Helvetica-Bold, Helvetica;
                                    font-weight: bold;
                                    color: #FFFFFF;
                                    background: #EE3799;
                                    border-radius: 4px;
                                    margin-right: 16px;
                                    text-align: center;
                                    cursor: pointer;

                                    &.add {
                                        background: rgba(238, 55, 153, .1);
                                        color: rgba(238, 55, 153, 1);
                                    }

                                    &.added {
                                        background: rgba(236, 237, 238, 1);
                                        color: rgba(134, 144, 154, 1);
                                    }
                                }
                            }
                        }
                    }

                    .btm {
                        font-size: 16px;
                        font-family: Helvetica;
                        color: #858E9A;
                        line-height: 22px;
                    }
                }
            }

            .share_contain {
                margin-top: 32px;

                h2 {
                    height: 24px;
                    font-size: 20px;
                    font-family: Helvetica-Bold, Helvetica;
                    font-weight: bold;
                    color: #3A4A5A;
                    line-height: 24px;
                    margin-bottom: 24px;
                }

                .icon_contain {
                    display: flex;
                    justify-content: space-evenly;
                    margin-bottom: 32px;

                    .img {
                        cursor: pointer;
                        width: 80px;
                        text-align: center;
                        font-size: 16px;
                        font-family: Roboto-Regular, Roboto;
                        font-weight: 400;
                        color: #7F8493;

                        img {
                            width: 56px;
                            margin-bottom: 6px;
                        }
                    }
                }
            }

            .btn_story {
                h2 {
                    height: 24px;
                    font-size: 20px;
                    font-family: Helvetica-Bold, Helvetica;
                    font-weight: bold;
                    color: #3A4A5A;
                    line-height: 24px;
                    margin-bottom: 24px;
                }

                .list_item {
                    overflow: hidden;
                    margin-bottom: 20px;
                    cursor: pointer;

                    .left {
                        float: left;
                        width: 120px;
                        height: 160px;
                        border-radius: 8px;
                        margin-right: 24px;
                    }

                    .list_item_right {
                        float: left;
                        width: 620px;
                        margin-bottom: 20px;

                        h2 {
                            margin-top: 25px;
                            margin-bottom: 16px;
                            height: 72px;
                            font-size: 24px;
                            font-family: Helvetica-Bold, Helvetica;
                            font-weight: bold;
                            color: #3A4A5A;
                            line-height: 36px;
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
                        height: 0;
                        border: 1px solid rgba(238, 238, 238, 1);
                        margin-bottom: 20px;
                    }
                }
            }
        }
    }
}
</style>
