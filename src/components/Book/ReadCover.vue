<template>
    <div class="read-cover" :class="'bgColor'+bgColor">
        <!-- <div class="left" >
            <div class="book-name">
                {{bookInfo.bookName}}
            </div>
            <div class="author-name" v-if="bookInfo.pseudonym">
                author: <span>{{bookInfo.pseudonym}}</span>
            </div>
            <div class="copy-right">
                Copyright GoodNovel
            </div>
        </div> -->
        <div class="book-img">
            <img :src="bookInfo.cover" :alt="bookInfo.bookName">
        </div>
        <div class="book-name">
            {{bookInfo.bookName}}
        </div>
        <div class="author-name" v-if="bookInfo.pseudonym">
            Author: {{bookInfo.pseudonym}}
        </div>
        <!-- <div class="line">
            <span class="line-logo"></span>
        </div> -->
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default{
     props: [
         'bookInfo'
     ],
     computed: {
        ...mapState({
            bgColor: state => state.moduleRead.bgColor,
        }),
     },
     data () {
        return {

        }
    }
}
</script>
<style lang='scss' scoped>
.read-cover{
    width: 100%;
    &.bgColor1{
        .line{
            .line-logo{
                background-color: #f5e7d7;
            }
        }
    }
    &.bgColor2{
        .line{
            background: rgba(170, 187, 204, 0.4);
            .line-logo{
                background-color: rgba(17, 17, 17, 1);
            }
        }
        .book-name{
            color:rgba(255,255,255,1);
        }
        .author-name{
            color:rgba(255,255,255,0.6);
        }
    }
    .book-img{
        width:180px;
        height:240px;
        box-shadow:0px 15px 20px 0px rgba(0,0,0,0.1);
        border-radius:4px;
        border:1px solid rgba(58,74,90,0.1);
        box-sizing: border-box;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        overflow: hidden;
        top: -84px;
        img{
            width: 100%;
            height: 100%;
            border:1px solid rgba(58,74,90,0.1);
            border-radius:4px;
        }
    }
    .book-name{
        font-size:20px;
        // font-family:SourceHanSansCN-Bold,SourceHanSansCN;
        font-family: "Vollkorn",serif;
        font-weight:bold;
        color:rgba(51, 51, 51, 1);
        line-height:28px;
        text-align: center;
        margin-top: -60px;
    }
    .author-name{
        font-size:16px;
        // font-family:SourceHanSansCN-Regular,SourceHanSansCN;
        font-weight:400;
        color: rgba(84, 88, 98, 1);
        line-height:24px;
        text-align: center;
        margin-top: 8px;
        font-style: italic;
    }
    .line{
        width: 100%;
        height: 2px;
        background: rgba(170, 187, 204, 0.4);
        margin-top: 43px;
        position: relative;
        .line-logo{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            width: 46px;
            height: 24px;
            background: url('../../assets/images/common/read_chapter_line_logo.png') no-repeat center center/24px 24px;
            background-color: #fff;
        }
    }

}
</style>
