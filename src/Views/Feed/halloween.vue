<template>
<div class="halloween">
    <div class="banner">
        <img src="../../assets/images/wsj/wsj_banner.png" alt="">
    </div>
    <div class="main">

        // 未领取
        <div class="unearn" v-if="!isLogin" @click="handleEarn">
            RECEIVE FREE BONUS
        </div>

        // 已领取
        <div class="earned" v-if="isLogin">
            <div class="earned_counts">
                <h2> {{dealSosen(earnCountTatal || 0)}} BONUS</h2>
                <h3>YOU’VE EARNED</h3>
            </div>
            <div class="earned_btn" v-if="signIn">
                EARNED TODAY <br>
                COME BACK TOMORROW TO EARN MORE BONUS!
            </div>
            <div class="earned_btn2" v-if="!signIn" @click="handleEarn">
                RECEIVE FREE BONUS
            </div>
            <h1>INVITE FRIENDS TO EARN MORE BONUS!</h1>
            <div class="share_btns">
                <div class="fb" @click="handleFB">
                    <img src="../../assets/images/wsj/wsj_fb.png" alt="">FACEBOOK
                </div>
                <div class="cp" @click="handleCP">
                    <img src="../../assets/images/wsj/wsj_copy.png" alt="">COPY LINK
                </div>
            </div>
        </div>

        // 分享详情
        <div class="container">
            <div class="detail">
                <div class="top">
                    <div class="terms" v-if="detailList.length > 0">{{detailList.length}} ITEMS</div>
                    <div class="line"></div>
                    <h1> FRIENDS DETAIL </h1>
                </div>
                <div class="con emp" v-if="detailList.length == 0">
                    IT'S EMPTY
                </div>
                <div class="con" v-if="detailList.length > 0">
                    <div class="item" v-for="(item , index) in detailList" :key="index" v-if="showMore || index < 5">
                        <div class="top">{{item.nickname}}</div>
                        <div class="btm">
                            <span class="date">{{item.ctime}}</span>
                            <div class="bon">+ {{item.bonus}} BONUS</div>
                        </div>
                    </div>
                    <div class="item more" v-if="detailList.length > 5 && !showMore" @click="showMore=true">More</div>
                </div>
            </div>
            <div class="rule">
                <img src="../../assets/images/wsj/mty.png" alt="" class="mty">
                <div class="top">
                    <div class="line"></div>
                    <h1>RULES</h1>
                </div>
                <div class="con">
                    <div class="rule_item"><span>1.</span> During the event, each account can log in daily to earn more Bonus. In order to earn more bonus, you will need to refer the link to your friend, let he/she join the app successfully by the link.</div>
                    <div class="rule_item"><span>2.</span> Bonus can only be used by users while reading novels, and will automatically expire after the expiration date.</div>
                    <div class="rule_item"><span>3.</span> There is no limit on the number of users you can refer to.</div>
                    <div class="rule_item"><span>4.</span> If the system detects that the user has violated the rules, the Bonus obtained in violation of the rules will be void.</div>
                    <div class="rule_item"><span>5.</span> GoodNovel reserves the right to explain this event.</div>
                </div>
            </div>
            <img src="../../assets/images/wsj/ngt.png" alt="" class="ngt">
        </div>

    </div>

    <div class="mask" v-if="showMask">
        <div class="line"></div>
        <div class="inner" v-if="fromPage">
            <h2>Congratulations</h2>
            <h3>You've earned </h3>
            <p class="p3">
                {{earnCount}}
                <span class="r">bonus</span>
            </p>
            <p class="p2">Share to your friends to get more</p>
            <div class="ok" @click="showMask = false;fromPage=false;">OK</div>
            <img src="../../assets/images/wsj/cls.png" alt="" class="cls" @click="showMask = false;fromPage=false;">
        </div>

        <div class="inner" v-if="fromShare">
            <h2>New user gift!</h2>
            <h3>You have </h3>
            <p class="p3">
                50
            </p>
            <p class="p2" style="color:rgb(255 108 0);font-weight:bold;">bonus to get! </p>
            <div class="ok" @click="handleEarn">Get！</div>
            <img src="../../assets/images/wsj/cls.png" alt="" class="cls" @click="showMask = false">
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'halloween',
    data() {
        return {
            showMask: false,
            earnCount: false,
            earnCountTatal: false,
            isEarned: false,
            shareCode: false, // 自己的分享码
            fromShare: false, // 传入的分享码
            fromPage: false, // 页面领取按钮对应弹窗
            showMore: false, // 列表展示更多
            isLogin: false,
            signIn: false,
            detailList: [],
        }
    },

    metaInfo: {
        title: 'GoodNovel | Halloween', // set a title
        meta: [{ // set meta
            name: 'og:url',
            content: 'https://www.goodnovel.com/halloween'
        }, { // set meta
            name: 'og:type',
            content: 'website'
        }, { // set meta
            name: 'og:title',
            content: 'GoodNovel | Halloween'
        }, { // set meta
            name: 'og:description',
            content: 'Free online books for story lovers. Popular novels for reading: romance stories, horror fictions, fantasy novels, mystery books & more. Recruiting novel writers, create your chapter！'
        }, { // set meta
            name: 'og:image',
            content: '/static/img/wsj_banner.png'
        }, { // set meta
            name: 'og:image:width',
            content: '764'
        }, { // set meta
            name: 'og:image:height',
            content: '400'
        }]
    },

    mounted() {
        // 校验页面是否是有分享参数
        this.judgeIsShareIncome();

        this.infoInit()
    },

    methods: {
        // 进入页面初始化
        async infoInit() {
            let res = await this.$axios.post("/webfic/activity/halloween/info");
            if (res.data.status == 0) {

                $logEvent({
                    event: "hqwsjsjcg", // 获取万圣节数据成功
                });

                let pageInfo = res.data.data

                // console.log(pageInfo.hallowweenUserInfos)

                if (pageInfo.login) { // 已登录 是否签到过

                    this.isLogin = true;

                    if (pageInfo.signIn || pageInfo.dailySignIn) { // 已签到过, 展示数据
                        this.signIn = true;
                    } else { // 已登录  未签到
                        this.signIn = false;
                    }
                    this.earnCountTatal = pageInfo.totalBonus || 0;
                    this.shareCode = pageInfo.halloweenShareCode || false;
                    this.detailList = pageInfo.halloweenUserInfos || [];

                }

            } else if (res.data.status == 3610) {
                $logEvent({
                    event: "hqwsjsjsb", // 获取万圣节数据失败
                });
                this.$msg({
                    content: "The event expired already."
                })
            } else {
                $logEvent({
                    event: "hqwsjsjsb", // 获取万圣节数据失败
                });
                this.$msg({
                    content: "Oops , Network Error, status:" + res.data.status
                })
            }
        },

        async handleEarn() {
            // TODO打点
            $logClick({
                module: "Halloween_activity", // facebook分享约稿
                zone: "djlqjb", // 点击领取金币
                adid: "click_earn_halloween", // 打开书籍详情
            });

            // 已登录 进行请求
            let res = await this.$axios.post("/webfic/activity/halloween/dailySignIn");
            // console.log(res)
            if (res.data.status == 0) {
                let earnInfo = res.data.data;

                if (!earnInfo.login) { // 响应结果未登录拉起登录
                    this.$store.dispatch('moduleHome/changeLoginShow', {
                        isShow: true
                    })

                    $logEvent({
                        event: "lqbonusfail", // 领取bonus失败
                    });
                    return;
                } else { // 签到结果返回已登录
                    if (earnInfo.signIn) { // 签到成功后请求页面最新数据
                        $logEvent({
                            event: "lqbonussuc", // 领取bonus陈宫
                            map: {
                                bonus: earnInfo.bonus,
                            },
                        });
                        this.earnCount = earnInfo.bonus;
                        this.showMask = true; // 展示阴影
                        this.fromShare = false; // 隐藏由分享链接进入弹窗
                        this.fromPage = true; // 展示页面内容领取成功弹窗

                        // 成功处理 签到成功, 请求用户关联列表数据
                        this.infoInit();
                    } else {
                        $logEvent({
                            event: "lqbonusfail", // 领取bonus失败
                        });
                        this.$msg({
                            content: "Oops, Something is wrong, Please try again!"
                        })
                    }
                }

            } else if (res.data.status == 3610) {
                $logEvent({
                    event: "lqbonusfail", // 获取万圣节数据失败
                });
                this.$msg({
                    content: "The event expired already."
                })
                this.showMask = false;
                this.fromShare = false;
                this.fromPage = false;
            } else if (res.data.status == 3601) {
                $logEvent({
                    event: "lqbonusfail", // 领取bonus失败
                    map: {
                        bonus: -1, // 已经领取
                    }
                });
                this.$msg({
                    content: "You already received!"
                })
                this.showMask = false;
                this.fromShare = false;
                this.fromPage = false;
                this.infoInit();
            } else {
                $logEvent({
                    event: "lqbonusfail", // 领取bonusshiba
                });
                this.$msg({
                    content: "Network Error, status" + res.data.data.status
                })
            }

        },

        // FB
        handleFB() {
            let share = this.shareCode;
            $logClick({
                module: "Halloween_facebook_share", // facebook分享约稿
                zone: "djfxzfb", // 点击分享到facebook
                adid: "open_share_page", // 打开分享页
            });
            // 打开facebook分享------------注意移动端IOS兼容

            let url = document.location.href.split("?")[0];

            url = url + `?share=${share}`;

            // 拉起成功事件打点
            try {
                $logEvent({
                    event: "Halloween_lqfbfxcg", //拉起facebook分享页成功
                    map: {
                        module: share, // 分享码
                    },
                });

                window.open(
                    "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(url),
                    "_blank",
                    "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=600, height=450,top=100,left=350"
                );
            } catch (error) {
                $logEvent({
                    event: "Halloween_lqfbfxsb", //拉起facebook分享页失败
                    map: {
                        module: JSON.stringify(error), // 分享码
                    },
                });
            }
        },

        handleCP() {
            let shareCode = this.shareCode;

            if (!shareCode) {
                this.$msg({
                    content: "Oops! Sharecode expired"
                })
                return
            }

            $logClick({
                module: "Halloween_facebook_share", // facebook分享约稿
                zone: "djfzfxlj", // 点击赋值分享链接
                adid: "click_copy_share_link", // 打开分享页
            });

            let message = window.location.href.split("?")[0] + "?share=" + shareCode;

            this.$copyText(message).then(
                (e) => {
                    $logEvent({
                        event: "Halloween_fzfxljcg", // 复制分享链接成功
                        map: {
                            module: shareCode, // 分享码
                        },
                    });

                    this.$msg({
                        content: "The link has been pasted to your clipboard.",
                    });
                    // console.log(e);
                },

                (e) => {
                    $logEvent({
                        event: "Halloween_fzfxljsb", // 复制分享链接失败
                        map: {
                            module: shareCode, // 分享码
                        },
                    });

                    this.$msg({
                        content: "Oops! Something is wrong , Please try again later.",
                    });
                    // console.log(e);
                }
            );
        },

        judgeIsShareIncome() {
            let share = this.$route.query.share;

            if (share) {
                //打点各用户分享链接的点击量
                $logEvent({
                    event: "Halloween_fwfxljcg", // 访问分享链接成功
                });
                this.showMask = true;
                this.fromShare = share;
                this.fromPage = false;

                // 有sharecode就进行存储sessionStorage localStorage
                window.localStorage.setItem("halloweenShare", share);
            } else {
                this.fromShare = false;
                this.showMask = false;
                this.fromPage = false;
            }
        },

        // 处理千位
        dealSosen: function (num) {
            num = num.toString().split("."); // 分隔小数点
            var arr = num[0].split("").reverse(); // 转换成字符数组并且倒序排列
            var res = [];
            for (var i = 0, len = arr.length; i < len; i++) {
                if (i % 3 === 0 && i !== 0) {
                    res.push(","); // 添加分隔符
                }
                res.push(arr[i]);
            }
            res.reverse(); // 再次倒序成为正确的顺序
            if (num[1]) {
                // 如果有小数的话添加小数部分
                res = res.join("").concat("." + num[1]);
            } else {
                res = res.join("");
            }
            return res;
        },
    },

}
</script>

<style lang="scss">
.halloween {
    margin: 0;
    padding: 0;
    background: #000;
    margin-bottom: -44px;
    min-width: 1300px;

    .banner {
        width: 100%;
        font-size: 0;

        img {
            width: 100%;
        }
    }

    .main {
        width: 100%;
        text-align: center;
        margin-bottom: 44px;
        padding-bottom: 106px;

        .unearn {
            cursor: pointer;
            width: 496px !important;
            height: 75px;
            margin: 0 auto;
            line-height: 75px;
            background: url(../../assets/images/wsj/cy.png) no-repeat top center;
            background-size: 100%;
            width: 293px;
            font-size: 26px;
            font-family: Source Han Serif SC;
            font-weight: 500;
            color: #F6FFF6;
            text-align: center;
        }

        .earned {
            position: relative;
            top: -33px;
            overflow: hidden;

            .earned_counts {
                margin: 0 auto;
                width: 434px;
                height: 204px;
                background: url(../../assets/images/wsj/jinbi.png) no-repeat top center;
                background-size: 100%;
                background-position: 19px 0;
                text-align: center;
                overflow: hidden;

                h2 {
                    margin-top: 72px;
                    font-size: 40px;
                    font-family: PingFang SC;
                    font-weight: bold;
                    color: #FFD12F;
                }

                h3 {
                    margin-top: 20px;
                    font-size: 22px;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #FFD12F;
                }
            }

            .earned_btn {
                cursor: not-allowed;
                width: 496px;
                box-sizing: border-box;
                height: 74px;
                margin: 0 auto;
                text-align: center;
                font-size: 18px;
                font-family: Source Han Serif SC;
                font-weight: 500;
                color: #F6FFF6;
                line-height: 24px;
                background: url(../../assets/images/wsj/dis_btn.png) no-repeat top center;
                background-size: 100%;
                padding-top: 12px;
                margin-bottom: 26px;
            }

            .earned_btn2 {
                width: 496px;
                box-sizing: border-box;
                height: 74px;
                margin: 0 auto;
                text-align: center;
                font-size: 26px;
                font-family: Source Han Serif SC;
                font-weight: 500;
                color: #F6FFF6;
                line-height: 74px;
                background: url(../../assets/images/wsj/cy.png) no-repeat top center;
                background-size: 100%;
                margin-bottom: 26px;
            }

            h1 {
                margin: 0 auto;
                height: 20px;
                font-size: 20px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                margin-bottom: 20px;
            }

            .share_btns {
                width: 494px;
                margin: 0 auto;
                overflow: hidden;

                .fb,
                .cp {
                    width: 230px;
                    height: 75px;
                    text-align: center;
                    line-height: 75px;
                    font-size: 20px;
                    font-family: Source Han Serif SC;
                    font-weight: 500;
                    color: #F6FFF6;
                    float: left;
                    cursor: pointer;

                    img {
                        vertical-align: middle;
                        margin-top: -7px;
                        margin-right: 7px;
                    }
                }

                .fb {
                    background: url(../../assets/images/wsj/wsj_fb_bg.png) no-repeat top center;
                    background-size: 100% 100%;
                    margin-right: 34px;
                }

                .cp {
                    background: url(../../assets/images/wsj/wsj_copy_bg.png) no-repeat top center;
                    background-size: 100% 100%;
                }
            }
        }

        .container {
            box-sizing: border-box;
            width: 1080px;
            margin: 0 auto;
            background: #FFF6D1;
            border: 4px solid #EE8D01;
            border-radius: 16px;
            padding: 60px 40px;
            position: relative;

            .detail,
            .rule {
                .top {
                    overflow: hidden;
                    margin-bottom: 29px;

                    .terms {
                        width: 100px;
                        float: right;
                        font-size: 18px;
                        font-family: Source Han Sans CN;
                        font-weight: 400;
                        color: #ED521A;
                        line-height: 26px;
                    }

                    .line {
                        border-left: 6px solid rgba(254, 147, 3, 1);
                        height: 14px;
                        float: left;
                        margin-top: 2px;
                    }

                    h1 {
                        font-size: 18px;
                        font-family: Source Han Serif SC;
                        font-weight: bold;
                        color: #333333;
                        line-height: 18px;
                        text-align: left;
                        padding-left: 10px;
                        float: left;
                    }
                }

                .con {
                    box-sizing: border-box;
                    width: 100%;
                    background: rgba(255, 255, 255, 0.25);
                    border: 1px solid #313BA4;
                    border-radius: 8px;
                    padding: 10px 42px 30px;

                    &.emp {
                        line-height: 154px;
                        text-align: center;
                        padding-bottom: 10px;
                    }

                    .item {
                        overflow: hidden;
                        border-bottom: 1px solid rgba(223, 219, 203, 1);
                        padding-bottom: 20px;

                        .top {
                            margin-top: 29px;
                            margin-bottom: 14px;
                            height: 32px;
                            font-size: 16px;
                            font-family: PingFang SC;
                            font-weight: bold;
                            color: #222222;
                            line-height: 32px;
                            text-align: left;
                        }

                        .btm {
                            overflow: hidden;

                            .date {
                                height: 14px;
                                font-size: 14px;
                                font-family: PingFang SC;
                                font-weight: 400;
                                color: #222222;
                                line-height: 14px;
                                float: left;
                            }

                            .bon {
                                height: 16px;
                                font-size: 16px;
                                font-family: PingFang SC;
                                font-weight: bold;
                                color: #ED521A;
                                line-height: 16px;
                                float: right;
                            }
                        }

                        &.more {
                            cursor: pointer;
                            font-size: 18px;
                            padding-top: 24px;
                            font-weight: bold;
                            border: none;
                        }
                    }
                }
            }

            .rule {
                margin-top: 64px;
                position: relative;

                .mty {
                    width: 193px;
                    height: 108px;
                    position: absolute;
                    right: -40px;
                    top: -40px;
                }

                .con {
                    padding: 20px 30px 0px;

                    .rule_item {
                        padding-left: 14px;
                        text-align: left;
                        font-size: 14px;
                        font-family: PingFang SC;
                        font-weight: 400;
                        color: #333333;
                        line-height: 20px;
                        margin-bottom: 20px;
                        position: relative;

                        span {
                            position: absolute;
                            left: -8px;
                        }
                    }
                }
            }

            .ngt {
                position: absolute;
                bottom: -44px;
                left: -14px;
                width: 256px;
                height: 120px;
            }

        }
    }

    .mask {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, .6);
        text-align: center;
        z-index: 998;

        .line {
            vertical-align: middle;
            height: 100%;
            width: 0;
            display: inline-block;
        }

        .inner {
            display: inline-block;
            vertical-align: middle;
            width: 430px;
            height: 586px;
            background: url(../../assets/images/wsj/mask_bg.png);
            position: relative;
        }

        h2 {
            margin-top: 292px;
            margin-bottom: 18px;
            width: 100%;
            text-align: center;
            height: 30px;
            font-size: 30px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #C1A985;
        }

        h3 {
            text-align: center;
            height: 22px;
            font-size: 28px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #FF6C00;
            margin-bottom: 17px;
        }

        .p3 {
            text-align: center;
            font-size: 60px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #FF6C00;

            span.r {
                font-size: 32px;
                font-family: PingFang SC;
                font-weight: bold;
            }
        }

        .p2 {
            text-align: center;
            height: 20px;
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #C1A985;
            margin-bottom: 20px;
        }

        .ok {
            width: 328px;
            margin: 0 auto;
            height: 68px;
            background: url(../../assets/images/wsj/cy.png) no-repeat top center;
            background-size: 100% 100%;
            text-align: center;
            line-height: 68px;
            font-size: 22px;
            font-family: Source Han Serif SC;
            font-weight: 500;
            color: #F6FFF6;
        }

        .cls {
            width: 38px;
            height: 38px;
            position: absolute;
            bottom: -58px;
            left: 50%;
            margin-left: -19px;

        }
    }
}
</style>
