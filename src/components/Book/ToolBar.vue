<template>
    <div class="tool-bar" ref='toolBar'>
        <div class="box">
            <div class="left-box" v-show="opeationIndex >= 0">
                <div :class="['content-item','content-chapter', {'active': opeationIndex == 0}]"
                >
                    <div class="content-title">
                        章節目錄
                    </div>
                    <div class="cg_hd">
                        <div class="chapter-list" ref="chapterListRef">
                            <div
                            v-for="(item,index) in chapterList"
                            :key='index'
                            :data-chpateId='"chapterid"+item.id'
                            :class="['chapter-item',
                            {'chapter-active': chapterCurrentIndex == item.id},
                            {'unlock': !item.unlock}]"
                            @click="handleChangeChpater(item,index)">{{item.chapterName}}</div>
                        </div>
                    </div>

                </div>
                <div :class="['content-item','content-color', {'active': opeationIndex == 1}]"
                >
                    <div class="content-title">
                        章節目錄
                    </div>
                    <div class="bg">
                        <div class="tip">背景顏色</div>
                        <div class="bg-list">
                            <div :class="['bg-item','write',{'active': bgIndex == 0}]"
                            @click="handleChangeBg(0)">
                              <img v-if="bgIndex == 0" src="../../assets/images/book/bg_selected_icon.png" alt="">
                            </div>
                            <div :class="['bg-item','yellow',{'active': bgIndex == 1}]"
                            @click="handleChangeBg(1)">
                              <img v-if="bgIndex == 1" src="../../assets/images/book/bg_selected_icon.png" alt="">
                            </div>
                            <div :class="['bg-item','black',{'active': bgIndex == 2}]"
                            @click="handleChangeBg(2)">
                             <img v-if="bgIndex == 2" src="../../assets/images/book/bg_selected_icon.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="ftsz">
                        <div class="tip">字號選擇</div>
                        <div class="ftsz-list">
                            <span :class="[{'disabled': addDisabled}]" @click="handleChangeFontSize(1)">A+</span>
                            <span>{{fontSize}}</span>
                            <span :class="[{'disabled': reduceDisabled}]" @click="handleChangeFontSize(-1)">A-</span>
                        </div>
                    </div>
                </div>
                <!-- webfic关闭书籍评论 -->
                <!-- <div :class="['content-item','content-comment', {'active': opeationIndex == 2}]"
                >
                    <div class="comment-list">
                        <all-comment-pop
                        :visible.sync='showAllComment'
                        v-if="showAllComment"
                        :bookInfo='bookInfo'
                        ></all-comment-pop>
                    </div>
                </div> -->
            </div>
            <div class="side-bar">
                <div :class="[
                'side-item', 'chapter', {'active': opeationIndex == 0}]"
                @click="handleChangeActive(0)"></div>
                <div :class="[
                'side-item', 'color', {'active': opeationIndex == 1}]"
                @click="handleChangeActive(1)"></div>
                <!-- webfic关闭评论
                <div :class="[
                'side-item', 'comment', {'active': opeationIndex == 2}]"
                @click="handleChangeActive(2)">
                </div> -->
                <!-- 帮助 -->
                <!-- <div :class="[
                'side-item', 'question', {'active': opeationIndex == 3}]"
                @click="$router.push('/support')"></div> -->
            </div>
        </div>
    </div>
</template>
<script>
import AllCommentPop from '@/components/Read/AllCommentPop.vue'
import { mapState } from 'vuex'
export default{
    components: {
        AllCommentPop
    },
     props: [
         'bookId',
         'bookInfo',
         'commentCount'
     ],
     data () {
        return {
            chapterList: [],
            // bgIndex: 0,
            reduceDisabled: false,
            addDisabled: false,
            showAllComment: false
        }
    },
    computed: {
        ...mapState({
            opeationIndex: state => state.moduleRead.opeationIndex,
            fontSize: state => state.moduleRead.fontSize,
            chapterCurrentIndex: state => state.moduleRead.currentChapterId,
            bgIndex: state => state.moduleRead.bgColor,
        }),
    },
    mounted(){
        document.addEventListener('click', (e) => {
            e.stopPropagation()
            if(this.$refs.toolBar && !this.$refs.toolBar.contains(e.target)){
                this.$store.dispatch('moduleRead/changeOpeationIndex',-1)
                this.showAllComment = false
            }
        })

    },
    methods: {
        handleChangeActive(index){
            if(this.opeationIndex == index){
                this.$store.dispatch('moduleRead/changeOpeationIndex',-2)
                this.showAllComment = false
                return
            }
            if(index == 0){
                this.getChapterList()
            }
            if(index == 2){
                this.showAllComment = true
            }else{
                 this.showAllComment = false
            }
            this.$store.dispatch('moduleRead/changeOpeationIndex',index)
        },
        async getChapterList(){
            this.chapterList = []
            let res = await this.$axios.post('/xsdq/chapter/list.do', {
                bookId: this.bookId
            })
            if(res.data.status == 0 && res.data.data.length > 0){
                res.data.data.map(item => {
                    this.chapterList = this.chapterList.concat(item.chapters)
                })
            }
            await this.$nextTick(() => {
                const eleChapter = document.querySelector(`.chapter-item[data-chpateId=chapterid${this.chapterCurrentIndex}]`)
                if(eleChapter){
                    this.$refs.chapterListRef.scrollTop = eleChapter.offsetTop - 178
                }
            })
        },
        handleChangeBg(index){
            // index 0是正常模式，1是护眼模式，2是夜间模式
            this.$store.dispatch('moduleRead/changeBgColor',index)
            // switch(index){
            //     case 0:
            //         this.$store.dispatch('moduleRead/changeBgColor','#fff')
            //         break;
            //     case 1:
            //         this.$store.dispatch('moduleRead/changeBgColor','rgb(245, 231, 215)')
            //         break;
            //     case 2:
            //         this.$store.dispatch('moduleRead/changeBgColor','#000')
            //         break;
            //     default:
            //         break;
            // }
        },
        handleChangeFontSize(target){
            let size = this.fontSize + target
            this.addDisabled = false
            this.reduceDisabled = false
            if(target > 0){
                this.addDisabled = size < 24?false:true
                if(size <= 24){
                    this.$store.dispatch('moduleRead/changeFontSize', size)
                }
            }else{
                this.reduceDisabled = size > 12?false:true
                if(size >= 12){
                    this.$store.dispatch('moduleRead/changeFontSize', size)
                }
            }
        },
        handleChangeChpater(item,index){
            this.$store.dispatch('moduleRead/changeChapterId', item)
            if(item && item.id){
                // 渲染指定章节，调用父组件js
                this.$emit('childGetChapters',item.id)
            }
        },
    },
    watch: {
        opeationIndex(v){
            if(v == 2){
                this.showAllComment = true
            }else{
                // this.showAllComment = false
            }
        }
    },
    destroyed(){
        this.showAllComment = false
    }
}
</script>
<style lang='scss' scoped>
.tool-bar{
    position: fixed;
    top: 150px;
    width: 856px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 22;
    .box{
        // background:rgba(58,74,90,1);
        background: #FFFFFF;
        border-radius: 0 4px 4px 0;
        position: absolute;
        right: -61px;
        .side-bar{
            width: 50px;
            min-height: 100px;
            box-sizing: border-box;
            overflow: hidden;
            .side-item{
                padding: 0;
                height: 56px;
                box-sizing: border-box;
                background: url('../../assets/images/book/read_tool_chapter.png') no-repeat center center/24px 24px;
                cursor: pointer;
                // opacity: 0.5;
                &.active{
                    background-color: rgba(0, 0, 0, 0.8);
                    opacity: 1;
                    .commentnum{
                      background-color: #EE3799;
                      color:#fff;
                    }
                }
                &:hover{
                    // background-color: #EE3799;
                    background-color: rgba(0, 0, 0, 1);
                    opacity: 1;
                }
                &.chapter{
                    background-image: url('../../assets/images/book/read_tool_chapter.png');
                }
                &.color{
                    background-image: url('../../assets/images/book/read_tool_color.png');
                }
                &.comment{
                    background-image: url('../../assets/images/book/active_comment_icon.png');
                    position: relative;
                    .commentnum{
                      position: absolute;
                      right: 0;
                      top:-4px;
                      width: 18px;
                      height: 18px;
                      line-height: 18px;
                      border-radius: 50%;
                      background-color: #fff;
                      font-size: 12px;
                      font-weight: bold;
                      text-align: center;
                    }
                }
                &.question{
                    background-image: url('../../assets/images/book/read_tool_question.png');
                }
                &:first-of-type{
                    border-radius: 0 4px 0 0;
                    height: 50px;
                    background-position-y: 12px;
                    border-bottom: 1px solid rgba(244, 246, 248, 1);
                }
                &:last-of-type{
                    border-radius: 0 0 4px 0;
                    height: 50px;
                    background-position-y: 12px;
                }
            }
        }
        .left-box{
            height: 82.5vh;
            position: absolute;
            top: -146px;
            box-sizing: border-box;
            padding: 100px 0;
            width: 200px;
            color: #fff;
            left: -414px;
            .content-item{
                width: 344px;
                height: 100%;
                // background: #3A4A5A;
                background:rgba(0, 0, 0, 0.8);
                box-shadow:0px 6px 8px 0px rgba(0,0,0,0.1);
                border-radius:8px 0 8px 8px;
                border:1px solid rgba(0,0,0,0.05);
                box-sizing: border-box;
                padding: 15px 24px 50px;
                display: none;
                position: relative;
                top: 46px;
                left: 71px;
                &.content-comment{
                    padding: 0;
                    .comment-list{
                        height: 100%;
                    }
                }
                &.active{
                    display: block;
                }
                .content-title{
                    font-size: 18px;
                    font-weight: bold;
                    // border-bottom: 1px solid rgba(255,255,255,0.2);
                    padding: 0 0px 20px;
                }
                .content-title::after{
                    width: 100%;
                    content: ' ';
                    position: absolute;
                    left: 0px;
                    top: 49px;
                    height: 1px;
                    background: #F4F6F8;
                    opacity: 0.1;
                }
                .cg_hd{
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }
                .chapter-list{
                    width: 110%;
                    height: 100%;
                    overflow-y: auto;
                    padding-bottom: 0;
                    .chapter-item{
                        padding: 16px 0px;
                        margin-right: 0px;
                        cursor: pointer;
                        font-size: 16px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        box-sizing: border-box;
                        padding-right: 28px;
                        &.unlock{
                            padding-right: 50px;
                            background: url('../../assets/images/book/read_unlock_icon.png') no-repeat;
                            background-position: 90% center;
                            background-size: 24px 24px;
                        }
                        &.chapter-active{
                            color: rgba(255, 126, 66, 1);
                        }
                    }
                }
                &.content-color{
                    .bg{
                        font-weight: bold;
                        padding: 23px 0 48px 0;
                        font-size: 0;
                        .tip{
                            font-size: 16px;
                        }
                        .bg-item{
                            display: inline-block;
                            width: 48px;
                            height: 48px;
                            border-radius: 48px;
                            box-sizing: border-box;
                            border:1px solid rgba(0,0,0,0.1);
                            margin-top: 24px;
                            margin-right: 48px;
                            position: relative;
                            cursor: pointer;
                            // &.active{
                            //     background-image: url('../../assets/images/book/bg_selected_icon.png');
                            //     background-repeat: no-repeat;
                            //     background-position-x: right ;
                            //     background-position-y:40px;
                            //     background-size: 18px 18px;
                            // }
                            &.write{
                                background-color: #fff;
                            }
                            &.yellow{
                                background-color: rgba(245,231,215,1);
                            }
                            &.black{
                                background-color: rgba(0,0,0,1);
                            }
                            img{
                                width: 18px;
                                height: 18px;
                                position: absolute;
                                left: 26px;
                                top: 32px;
                            }
                        }
                    }
                    .ftsz{
                        .tip{
                            font-size: 16px;
                            font-weight: 400;
                        }
                        .ftsz-list{
                            width: 242px;
                            height: 48px;
                            line-height: 48px;
                            box-sizing: border-box;
                            border-radius: 2px;
                            // border:1px solid rgba(255,255,255,0.2);
                            margin-top: 20px;
                            font-size: 0;
                            padding-top: 3px;
                            span{
                                display: inline-block;
                                cursor: pointer;
                                font-size: 16px;
                                font-weight: bold;
                                width: 40px;
                                box-sizing: border-box;
                                text-align: center;
                                height: 30px;
                                line-height: 30px;
                                border: 1px solid rgba(255,255,255,1);
                                border-radius: 4px;
                                opacity: 0.5;
                                &:nth-child(2){
                                    border: none;
                                    opacity: 1;
                                    margin:0px 10px;
                                }
                                &.disabled{
                                    color: rgba(255,255,255,0.5);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
