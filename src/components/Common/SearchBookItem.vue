<template>
    <div class="book-item">
        <div class="book-item-img"
        @click="handleGoDetail">
            <img v-lazy="bookInfo.cover" :alt="bookInfo.bookName">
        </div>
        <div class="book-item-info">
            <h3 class="book-title"
            @click="handleGoDetail">{{bookInfo.bookName}}</h3>
            <div class="book-tag-list" v-if="bookInfo.labels">
                <div v-for="(item,index) in bookInfo.labels"
                :key="index"
                class="book-tag-item">{{item}}</div>
            </div>
            <div>
                <v-star :ratings='bookInfo.ratings' :count="bookInfo.commentCount"></v-star>
            </div>
            <div class="book-detail">
                {{bookInfo.introduction}}
            </div>
        </div>
    </div>
</template>
<script>
import VStar from '@/components/Common/Star.vue'
import AddOrInlibrary from '@/components/Common/AddOrInlibrary.vue'
import { formatSpace } from "@/core/js/common.js";
export default{
    components: {
        VStar,
        AddOrInlibrary
    },
    props: ['bookInfo'],
    data () {
        return {

        }
    },
    methods: {
        handleGoDetail(){
            this.$router.push(`/book_info/${this.bookInfo.bookId}/${formatSpace(this.bookInfo.typeTwoNames && this.bookInfo.typeTwoNames[0] || 'null')}/${formatSpace(this.bookInfo.bookName)}`)
        }
    }
}
</script>
<style lang='scss' scoped>
.book-item{
    width: 650px;
    height: 256px;
    margin-bottom: 40px;
    overflow: hidden;
    float: left;
    .book-item-img{
        width: 192px;
        height: 100%;
        float: left;
        border-radius: 4px;
        cursor: pointer;
        background: rgba(58, 74, 90, 0.05);
        border: 1px solid rgba(58, 74, 90, 0.1);
        box-sizing: border-box;
        img{
            width: 100%;
            height: 100%;
            border-radius: 4px;
        }
    }
    .book-item-info{
        margin-left: 212px;
        .book-title{
            width: 420px;
            color:rgba(58,74,90,1);
            line-height:28px;
            font-weight: bold;
            display: -webkit-box;/* autoprefixer: ignore next */
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            box-sizing: border-box;
            cursor: pointer;
            font-size: 20px;

        }
        .book-tag-list{
            margin-top: 32px;
            overflow: hidden;
            display: -webkit-box;/* autoprefixer: ignore next */
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            max-height: 28px;
            .book-tag-item{
                height: 20px;
                line-height: 20px;
                border-radius: 20px;
                text-align: center;
                background:rgba(0,0,0,0.05);
                color:rgba(51,51,51,0.6);
                font-size: 12px;
                padding: 0 10px;
                margin-right: 12px;
                display: inline-block;
                margin-bottom: 10px;
            }
        }
        .book-star{
            font-size: 0;
            margin-top: 20px;
            .book-star-item{
                display: inline-block;
                width: 16px;
                height: 16px;
                background: url('../../assets/images/classify/start_active.png') no-repeat center center/100% 100%;
                margin-right: 8px;
                &.active{
                    background-image: url('../../assets/images/classify/star_unactive.png');
                }
            }
            span{
                color:rgba(58,74,90,1);
                font-size: 14px;
                position: relative;
                top: -2px;
            }
        }
        .book-detail{
            margin-top: 10px;
            color:rgba(67,83,102,1);
            line-height:28px;
            font-size: 16px;
            display: -webkit-box;/* autoprefixer: ignore next */
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            box-sizing: border-box;
            padding-right: 20px;
            max-height: 80px;
        }

    }
}
</style>
