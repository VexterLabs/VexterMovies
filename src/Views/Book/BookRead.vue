<template>
    <div class="book-read" :class="'bgColor'+bgColor">
        
        <!-- 展现随当前阅读的章节 xx书名/xx章节-->
        <!-- <read-nav @closeloginparent="changeLoginStatus" :bookInfo="bookInfo" v-if="!isPreview"></read-nav> -->
        <template v-if="nullPageFalg">
        <div class="container" >
            <div class="box"
            ref='chapterBox'
            >
                <!-- 面包线 -->
                <router-line :bookInfo='bookInfo'></router-line>
                <!-- 书封 -->
                <read-cover v-if="bookInfo.bookId && firstChapterFlag" :bookInfo='bookInfo'></read-cover>
                <!-- 加载上一章 -->
                <loading-prev-tip v-if="loadingPrevFlag"></loading-prev-tip>
                <!-- 阅读章节 -->
                <read-chapter class="chapter-out" v-for="(item,index) in chapterList" :key="index"
                    :chapterInfo='item'
                    :bookInfo='bookInfo'
                    :noBorder='index == chapterList.length - 1'
                    @payMoneyChapter='payMoneyChapter'
                    @payMoneyBook = "payMoneyBook"
                    :unlockFlag='!item.filePath'>
                </read-chapter>

                <read-finished v-show="isEndFlag" :writeStatus="writeStatus"></read-finished>
                <read-serialize v-show="false"></read-serialize>
                <loading-tip v-if="loadingFlag"></loading-tip>
            </div>
        </div>
        <!-- 购买充值 -->
        <com-recharge v-if="rechargeShow"
        @toggleRechargeShow='toggleRechargeShow'
        @closePageChild='closePageChild'></com-recharge>

        <!-- 指定金额充值  充值展示隐藏  fixRechargeShow -->
        <detail-recharge v-if="false"
        :moneyinfo="moneyinfo"
        @toggleDetailRechargeShow="toggleDetailRechargeShow"
        @closePageChild='closePageChild'
        ></detail-recharge>

        <tool-bar :bookId='bookId' v-if="!isPreview"
        @childGetChapters='childGetChapters'
        :bookInfo='bookInfo'
        ></tool-bar>

        <!--  :commentCount='chapterTotalComments'-->
        <login @closeloginparent='changeLoginStatus' v-if="isShowLogin"></login>
        <recharge-status v-if="rechargeSuccess"
        @handleRechargeStatus='handleRechargeStatus'></recharge-status>
        </template>
        <template v-else>
            <div class="book-read-null" >
                <null-verify-password :resultFlag='false' :isShowText='false'>
                    <template slot="noBookTip">
                        The current book does not exist！
                    </template>
                </null-verify-password>
            </div>
            <footer-nav></footer-nav>
        </template>
    </div>

</template>
<script>
import ToolBar from '@/components/Book/ToolBar.vue'
import RouterLine from '@/components/Common/RouterLine.vue'
import ReadNav from '@/components/Book/ReadNav.vue'
import ReadCover from '@/components/Book/ReadCover.vue'
import ReadChapter from '@/components/Book/ReadChapter.vue'
import LoadingTip from '@/components/Book/LoadingTip.vue'
import LoadingPrevTip from '@/components/Book/LoadingPrevTip.vue'
import ReadFinished from '@/components/Book/ReadFinished.vue'
import ReadSerialize from '@/components/Book/ReadSerialize.vue'
import ReadUnlock from '@/components/Book/ReadUnlock.vue'
import ComRecharge from '@/components/Common/Recharge.vue'
import DetailRecharge from '@/components/Common/DetailRecharge.vue'
import Login from '@/Views/Login/Login'
import RechargeStatus from '@/components/Book/RechargeStatus.vue'
import NullVerifyPassword from '@/components/Common/NullVerifyPassword.vue'
import FooterNav from '@/components/Common/FooterNav.vue'

// 获取公共js
import { eleIsCanSee , exchangeURI } from '@/core/js/common.js'

import { mapState } from 'vuex'
export default{
     components: {
         ReadNav,
         ReadCover,
         ReadChapter,
         LoadingTip,
         ReadFinished,
         ReadSerialize,
         ReadUnlock,
         ComRecharge,
         DetailRecharge,
         ToolBar,
         Login,
         LoadingPrevTip,
         RechargeStatus,
         NullVerifyPassword,
         FooterNav,
         RouterLine
     },
     computed: {
         ...mapState({
             bgColor: state => state.moduleRead.bgColor,
             userInfo: state => state.moduleHome.userInfo,
         }),
     },
     data () {
        return {
            rechargeShow: false,
            isShowLogin: false,
            chapterList: [],
            container: null,
            domHeight: 0,
            loadingFlag: false,
            bookId: '',
            bookInfo: {},
            chapterId: '',
            chapterTotalComments:0, // 章节评论数
            rssChapterId:false,
            isEndFlag: false,
            needLockChapterId: '',
            loadingPrevFlag: false,
            loadPageContinueFlag: false,
            rechargeSuccess: false,
            chapterLoadingTimes: 0,
            chapterListPrev: [],
            prevChapterId: '',
            isFristLoading: true, // 首次调用章节信息和点击点击工具列表中的章节获取信息时设置为true
            prevLoadingFlag: false,
            preScrollTop: 0,
            firstChapterFlag: false,
            timer: null, // 滚动定时器
            nullPageFalg: true,
            toolBarChapterFlag: false, // 如果是工具栏点击章节获取的内容需要先去除滚动时间
            nextChapterObj: {}, // 预加载下章节内容
            prevChapterObj: {}, // 预加载上涨内容
            isPreview:false, // 预览falg  true标识预览章节
            writeStatus:'', // 书籍状态: 完结 待续
            fixRechargeShow:false, // 指定金额充值弹窗
            moneyinfo:{}, // 指定金额充值的金额信息
        }
    },
    created () {
        
    },
    async mounted(){
        // 获取充值成功状态
        try {
                if(window.RECHARGESUCC){
                    this.rechargeSuccess = true
                    window.RECHARGESUCC = false
                }
        } catch (error) {
            console.log(error);
        }

        this.container = document.body|| document.documentElement

        if(this.$route.query.preview){// 预览状态
          const chapter = JSON.parse(window.localStorage.getItem('tempChapter'))
          chapter.filePath = true;
          this.isPreview = true;
          this.chapterList = [chapter]

        }else{  // 正常阅读状态
          // 正在观看的章节id
          window.oldChapterId = "";

          // 校验是否是rss路径
          if(this.$route.params.id && this.$route.params.id.includes('-')){
            let bookInfo = this.$route.params.id.split('-');
            this.bookId = bookInfo[0]
            let reg = /^-?\d+(\.\d+)?$/;

            if(reg.test(bookInfo[1])){this.rssChapterId = bookInfo[1];}

          }else {
            this.bookId = this.$route.params.id
          }

          await this.getBookInfo()
          await this.switchBottom()
          this.bindScroll()
          }


    },

    beforeRouteEnter: (to, from, next) => {
        if(to.query.cm){
            window.RECHARGESUCC = true
            next(to.path)
        }else{
            next()
        }

    },
    methods: {
        toggleRechargeShow(){

            this.rechargeShow = !this.rechargeShow
        },
        toggleDetailRechargeShow(){

            this.fixRechargeShow = !this.fixRechargeShow
        },
        closePageChild(){
            // 充值完成之后子窗口关闭的回调(重新获取接口状态没变，所以重新刷新下页面，不确定是不是延迟到账的问题)
            this.rechargeShow = false;
            this.fixRechargeShow = false;
        },
        async payMoneyChapter(chapterId){
            // 解锁付费章节
               $logClick({
                  module: this.$route.name,
                  zone: "djzjjs", // 点击章节解锁
                  adid: "click-chapter-unclock"
                });

            let res = await this.$axios.post('/webfic/chapter/unlock',{
                bookId: this.bookId,
                chapterId: chapterId
            })
            if(res.data.status == 0){
              $logEvent({
                event: "gmzjcg", //购买章节成功
                map: {
                  module: chapterId // 章节ID数据
                }
              });

                // 解锁
                this.getBookChapter(chapterId,true)
            }else if(res.data.status == 6){
                this.isShowLogin = true
            }else if(res.data.status == 140001){
                this.rechargeShow = true
            }else{
                this.$msg({
                    content: 'Network error please try again later'
                })
            }
        },
        // !整本解锁
        async payMoneyBook(chapterInfo){

            $logClick({
              module: this.$route.name,
              zone: "djzbjs", // 点击整本解锁
              adid: "click-book-unclock"
            });


            let res = await this.$axios.post('/webfic/chapter/unlock',{
                bookId: this.bookId,
                chapterId: chapterInfo.id,
            })
            if(res.data.status == 0){
              $logEvent({
                event: "gmzbcg", //购买整本成功
                map: {
                  module: this.bookId // 章节ID数据
                }
              });
                // 解锁
                this.getBookChapter(chapterInfo.id,true)
            }else if(res.data.status == 6){
                this.isShowLogin = true
            }else if(res.data.status == 140001){// 余额不足
                this.rechargeShow = true
            }else if(res.data.status == 3008){ // 余额为0
                // 拉起定向支付
                this.moneyinfo.bookPrice = chapterInfo.bookPrice;
                this.moneyinfo.bookId = chapterInfo.bookId;
                this.fixRechargeShow = true;
            }else{
                this.$msg({
                    content: 'Network error please try again later'
                })
            }
        },
        changeLoginStatus(target){
            this.isShowLogin = target
        },
        getCurrentClientEleChapterId(){
          let _this = this;
            // 这里获取当前可视区域内的元素的chapterid
            Array.prototype.slice.call(document.querySelectorAll('.chapter-out')).map(item => {
                if(eleIsCanSee(item)){
                    let chapterId = item.getAttribute('data-chapterid');
                    exchangeURI(_this.bookInfo.bookId , chapterId)
                    this.$store.dispatch('moduleRead/changeChapterId', {id:item.getAttribute('data-chapterid'),chapterName: item.getAttribute('data-chaptername')})
                }
            })
        },
        async scrollPage(){
            this.domHeight = this.container.clientHeight
            // if(!this.$el || !document.querySelector('.read-box')){
            //     return
            // }
            // 这里获取当前可视区域内的元素的chapterid
            this.getCurrentClientEleChapterId()

            let domScrollTop = document.body.scrollTop|| document.documentElement.scrollTop;
            let scroll = domScrollTop - this.preScrollTop;

            if(this.oldChapterId != this.chapterId){
              this.preScrollTop = domScrollTop;
            }

            if(scroll<=0){
                // 向上滑动
                if(domScrollTop < 100 && !this.prevLoadingFlag){
                    this.prevLoadingFlag = true
                    if(this.firstChapterFlag){
                        // 第一张
                        this.prevLoadingFlag = false
                        return
                    }
                    await this.getPrevChapterList()
                    this.prevLoadingFlag = false
                    await this.$nextTick()
                    if(!this.prevChapterObj.id){
                        // 有了上一章预处理之后就不能再滚动到指定位置了
                        // let scrollNeedHeight = document.body.scrollTop|| document.documentElement.scrollTop + document.querySelector('.read-box') && document.querySelector('.read-box').offsetHeight + 40
                        let scrollNeedHeight = document.querySelector('.read-box') && document.querySelector('.read-box').offsetHeight + 40
                        window.scroll(0,scrollNeedHeight);
                    }
                }
            }else{
                // 计算公式：元素的高度-当前可视高度-滚动高度,向下滑动
                if(this.container.scrollHeight - this.domHeight - domScrollTop < 50){
                    this.getChapterList()
                }
            }

        },
        async switchBottom(){
            this.toolBarChapterFlag = true
            await this.getChapterList()
            this.$forceUpdate()
            await this.$nextTick()
            // 处理大屏幕的显示器内容不能填充完成的方案一： 自动加载下一章
            // if(this.$refs.chapterBox && !this.isEndFlag && (this.$refs.chapterBox.clientHeight <= (document.body.clientHeight|| document.documentElement.clientHeight))){
            //     this.switchBottom()
            // }

            // 处理方案二
            if(this.$refs.chapterBox && !this.isEndFlag && (this.$refs.chapterBox.clientHeight <= (document.body.clientHeight|| document.documentElement.clientHeight))){
                this.$refs.chapterBox.style = `min-height: ${((document.body.clientHeight|| document.documentElement.clientHeight))}px;`
            }
            window.scroll(0,0)

        },
        async childGetChapters(chapterId){

            if(this.oldChapterId == chapterId){  //跳转前校验是否是重复章节
              return;
            }

            // 右边工具栏跳转指定章节
            this.isEndFlag = false
            this.loadingFlag = false
            this.chapterList = []
            this.chapterListPrev = []
            this.nextChapterObj = {}
            this.prevChapterObj = {}
            this.chapterId = chapterId
            this.firstChapterFlag = false
            this.isFristLoading = true
            this.prevChapterId = ''
            this.preScrollTop = 0
            this.getBookInfo()
            await this.switchBottom()

            await this.$nextTick()
            window.scroll(0,20)
        },
        async getPrevChapterList(){
            await this.getBookPrevChapter(this.prevChapterId)
        },
        // 向上滚动函数
        async getBookPrevChapter(chapterId){
            this.loadingPrevFlag = true
            // 向上滑动时加载章节
            if(this.prevChapterObj.id){
                // 预处理上章章节
                if(this.prevChapterObj.content){
                    this.chapterList.unshift(this.prevChapterObj)
                }
                this.loadingPrevFlag = false
                await this.$nextTick(() => {
                    let scrollNeedHeight = document.querySelector('.read-box') && document.querySelector('.read-box').offsetHeight + 40
                    window.scroll(0,scrollNeedHeight);
                })
            }

            // let commentList = await this.getCommentChapter(chapterId)

            let res = await this.$axios.post('/webfic/chapter/detail.do', {
                chapterId: chapterId,
                bookId: this.bookId
            })
            if(res.data.status == 0){
                this.loadingPrevFlag = false

                if(!res.data.data.content){
                    // 该章节收费，需要手动解锁
                    this.chapterList.unshift(Object.assign({
                        content: res.data.data.previewContent || '',
                    }, res.data.data))
                    this.needLockChapterId = res.data.data.id
                    this.prevChapterId = res.data.data.pre ? res.data.data.pre.id : ''
                    if(res.data.data.pre){
                        // 有上一章
                        this.prevChapterId = res.data.data.pre.id
                        this.firstChapterFlag = false
                    }else{
                        this.firstChapterFlag = true
                    }
                    return
                }
                // 接口获取文章的具体内容
                // let content = await this.$axios.get(res.data.data.filePath)
                if(this.prevChapterObj.id){
                    // 预处理上一章节，接口请求完成之后直接替换原来的内容
                    this.chapterList[0] = Object.assign({
                        content: res.data.data.content || '',
                        // commentList: commentList
                    }, res.data.data)
                }else{
                    this.chapterList.unshift(Object.assign({
                        content: res.data.data.content || '',
                        // commentList: commentList
                    }, res.data.data))
                }

                if(res.data.data.pre){
                    // 有上一章
                    this.prevChapterId = res.data.data.pre.id
                    this.firstChapterFlag = false
                    this.prevChapterObj = res.data.data.pre
                }else{
                    this.firstChapterFlag = true
                }
                // 如果是第一章,章节ID不修改
                // 替换网页地址 url中显示章节id
                // exchangeURI( this.bookInfo.bookId , chapterId)

                this.chapterList.forEach((item, index)=>{
                  if(item.id == chapterId){
                    item.totalCommenCount = this.chapterTotalComments
                  }
                })


            }else if(res.data.status == 12005){
                window.location.href = window.location.href.split('-')[0];
            }
            // this.$store.dispatch('moduleRead/changeChapterId', this.chapterList.filter(item => {return item.id == chapterId})[0])
        },
        bindScroll(){
            window.addEventListener('scroll', this.specialScrollPage)
        },
        specialScrollPage(){
            if(this.toolBarChapterFlag){
                this.toolBarChapterFlag = false
                return
            }

            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.scrollPage()
            },300)
        },
        async getBookInfo(){
            let res = await this.$axios.post('/webfic/book/reader.do',{
                bookId: this.bookId
            })
            if(res.data.status == 0){
                this.bookInfo = res.data.data
                this.writeStatus = res.data.data.writeStatus
                // 如果是rss请求,会携带章节id,首次请求以rssChapterId为准
                if(this.rssChapterId){
                  this.chapterId = this.rssChapterId
                  this.rssChapterId = false;// 用完就改false
                }else{
                //   this.chapterId = res.data.data.defaultChapterId
                  this.chapterId = res.data.data.chapterId
                }

                this.nullPageFalg = true
            }else{
                this.nullPageFalg = false
                window.scroll(0,0)
                return
            }
        },
        async getChapterList(){
            if(this.loadingFlag){
                return
            }
            if(this.isEndFlag){
                // 最后章节
                return
            }

            // 请求前判断是否同一章请求,重复请求就阻断
            if(this.oldChapterId == this.chapterId){
              window.scroll(0 , (window.scrollY-30));

              this.loadingFlag =false;
              return;
            }
            this.oldChapterId = this.chapterId;

            this.loadingFlag = true

            await this.getBookChapter(this.chapterId)
            this.loadingFlag = false
        },
        // 获取章节信息(下一章，解锁，以及工具栏获取章节信息)
        // flag为true的时候是解锁获取章节信息，此时要将需解锁的章节替换
        async getBookChapter(chapterId, flag){

            if(this.nextChapterObj.id){
                // 下拉加载时，直接从上次的下章内容获取，
                if(this.nextChapterObj.content){
                    // 不是收费章节的时候
                    this.chapterList.push(this.nextChapterObj)
                }
                this.loadingFlag = false
            }
            // TODO: 评论返回后添加给对应id的 chapterLisItem中
            let commentList = []
            // let commentList = await this.getCommentChapter(chapterId)

            let res = await this.$axios.post('/webfic/chapter/detail.do', {
                chapterId: chapterId,
                bookId: this.bookId
            })
            if(res.data.status == 0){
                if(flag){
                    // 解锁收费章节(如果是解锁章节的话，只需要获取当前章节的内容，并替换，不能再往下处理数据)
                    let urlLock = res.data.data.filePath
                    let contentLock = await this.$axios.get(urlLock)
                    let chapterTemp = this.chapterList.map(item => {
                        if(item.id == chapterId){
                            item = Object.assign({
                                content: contentLock.data || '',
                            }, res.data.data)
                        }
                        return item
                    })
                    this.chapterList = chapterTemp
                    return
                }
                if(this.isFristLoading){
                    // 向下滚动加载时以第一次加载时获取的上张章节id为准
                    if(res.data.data.pre){
                        // 有上一章
                        this.prevChapterId = res.data.data.pre.id
                        this.firstChapterFlag = false
                        this.prevChapterObj = res.data.data.pre
                    }else{
                        this.firstChapterFlag = true
                    }
                }
                this.isFristLoading = false

                if(!res.data.data.content){
                    // 下一章收费，需要手动解锁
                    this.chapterList.push(Object.assign({
                        content: res.data.data.previewContent || '',
                    }, res.data.data))
                    this.needLockChapterId = res.data.data.id
                    if(res.data.data.next){
                        // 有下一章
                        this.chapterId = res.data.data.next.id
                    }else{
                        // 没有下一章
                        this.isEndFlag = true
                    }
                    return
                }
                // 接口获取文章的具体内容
                // let url = res.data.data.filePath
                // let content = await this.$axios.get(url)
                if(this.nextChapterObj.id){
                    // 处理之前的下章章节内容，通过请求后的内容把之前的替换掉
                    this.chapterList[this.chapterList.length - 1] = (Object.assign({
                        content: res.data.data.content || '',
                        // commentList: commentList
                    }, res.data.data))
                }else{
                    this.chapterList.push(Object.assign({
                        content: res.data.data.content || '',
                        // commentList: commentList,

                    }, res.data.data))
                }
                if(res.data.data.next){
                    // 有下一章
                    this.chapterId = res.data.data.next.id
                    this.nextChapterObj = res.data.data.next

                    // exchangeURI( this.bookInfo.bookId , this.chapterId - 1)
                }else{
                    // 没有下一章
                    this.isEndFlag = true
                    this.nextChapterObj = {}

                    // exchangeURI( this.bookInfo.bookId , this.chapterId)
                }

                this.chapterList.forEach((item, index)=>{
                  if(item.id == chapterId){
                    item.totalCommenCount = this.chapterTotalComments
                  }
                })

            }else if(res.data.status == 12005){
                // 如果存在错误章节,重新请求阅读记录中的章节
                this.chapterId = this.bookInfo.defaultChapterId
                this.loadingFlag = true
                await this.getBookChapter(this.chapterId);
                this.loadingFlag = false
            }else{
                this.isEndFlag = true
            }

            this.$store.dispatch('moduleRead/changeChapterId', this.chapterList.filter(item => item.id == chapterId)[0])

        },
        handleRechargeStatus(target){
            this.rechargeSuccess = target
        },
        async getCommentChapter(chapterId){
            let _this = this;
            let res = await this.$axios.post('/webfic/comment/book/comments', {
                "bookId": this.bookInfo.bookId,
                "bookName": this.bookInfo.bookName,
                bookCover: this.bookInfo.cover,
                "chapterId": chapterId,
                "order": '',
                referId: '',
                level: 3,
                "pageNo": 1,
                "pageSize": 10,
                "sort": "",
                userId: this.userInfo.id ||0
            })
            if(res.data.status == 0 && res.data.data.webBookComments){
                _this.chapterTotalComments = res.data.data.webBookComments.total;
                return res.data.data.webBookComments.records || []
            }else{
                _this.chapterTotalComments = 0;
                return []
            }

        }
    },
    updated () {
        document.onselectstart =function(){
            return false;
        }
    },
    destroyed(){
        window.removeEventListener('scroll', this.specialScrollPage)
        this.$store.dispatch('moduleHome/changeLoadingStatus', false)
        this.$store.dispatch('moduleRead/changeChapterId', {id:'',chapterName: ''})
        document.onselectstart =function(){
            return true;
        }
    }
}
</script>
<style lang='scss' scoped>
.book-read-null{
  min-height: 800px;
  box-sizing: border-box;
  background: #fff;
  padding-top: 100px;
}
.book-read{
    width: 100%;
    min-height: 100%;
    background: rgba(244,246,248,1);

    &.bgColor1{
        // 护眼模式
        background: #f5e7d7;
        .container{
            .box{
                background: #f5e7d7;
            }
        }
    }
    &.bgColor2{
        // 夜间模式
        background: #000;
        .container{
            .box{
                background: #111;
                color: rgba(255,255,255,0.9);

            }
        }
    }
    .fixed{
        position: fixed;
        left: 20px;
        top: 100px;
    }
    .container{
        width: 100%;
        height: 100%;
        padding-top: 100px;
        .box{
            width: 856px;
            min-height: 1000px;
            margin: 0 auto;
            background: #fff;
            box-sizing: border-box;
            padding: 20px 78px 50px;
            position: relative;
        }
    }
}
</style>
