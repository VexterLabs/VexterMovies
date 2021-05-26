<!--
 * @Description:
 * @FilePath: \haiwai_pc\src\components\Common\ShelfBook.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2019-12-30 16:50:48
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-08-22 15:36:02
-->
<template>
    <div class="library-book-item">
        <div class="book-img" @click="handleClickSelect">
            <img v-lazy="bookInfo.cover" :alt="bookInfo.bookName">
            <div v-if="canEdit" class="book-shadow"></div>
            <div v-show="canEdit"
            :class="['book-select',{'active': isSelected}]"
            ></div>
        </div>
        <div class="book-name">{{bookInfo.bookName}}</div>
        <div class="progress">Progress {{bookInfo.recentlyProgress}}</div>
    </div>
</template>
<script>
import { formatSpace } from "@/core/js/common.js";
export default{
    props: [
        'canEdit',
        'bookInfo',
    ],
    data () {
        return {
            isSelected: false
        }
    },
    methods: {
        handleClickSelect(){
            if(this.canEdit){
                this.isSelected = !this.isSelected
                this.$emit('getShelfBookIdList', this.bookInfo.id, this.isSelected)
            }else{
                this.$router.push(`/book_info/${this.bookInfo.bookId}/${formatSpace(this.bookInfo.typeTwoNames && this.bookInfo.typeTwoNames[0] || 'null')}/${formatSpace(this.bookInfo.bookName)}`)
            }
        }
    }
}
</script>
<style lang='scss' scoped>
.library-book-item{
    width: 192px;
    min-height: 256px;
    display: inline-block;
    margin-right: 30px;
    margin-bottom: 40px;
    overflow: hidden;
    cursor: pointer;
    &:nth-of-type(5n+5){
        margin-right: 0;
    }
    .book-img{
        width: 100%;
        height: 256px;
        position: relative;
        .book-shadow{
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 6px;
        }
        img{
            width: 100%;
            height: 100%;
            border-radius: 6px;
        }
        .book-select{
            position: absolute;
            width: 32px;
            height: 32px;
            background: url('../../assets/images/shelf/shelf_unselect.png') no-repeat center center/100% 100%;
            right: 12px;
            bottom: 12px;
            &.active{
                background-image: url('../../assets/images/shelf/shelf_selected.png');
            }
        }
    }
    .book-name{
        display: -webkit-box;/* autoprefixer: ignore next */
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        font-weight:bold;
        color:rgba(58,74,90,1);
        line-height:28px;
        font-size: 20px;
        word-break: break-all;
        margin-top: 10px;
        min-height: 50px;
    }
    .progress{
        color:rgba(58,74,90,0.6);
        line-height:22px;
        font-size: 14px;
        margin-top: 6px;
    }
}
</style>
