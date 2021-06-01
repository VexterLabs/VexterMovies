<template>
    <div class="book-read-status">
        <template v-if="bookInfo.read">
            <router-link :to="{path: `/book/${bookInfo.bookId}`}">
                閱 讀
            </router-link>
        </template>
        <template v-else>
            <router-link :to="{path: `/book/${bookInfo.bookId}`}">
                閱 讀
            </router-link>
        </template>
    </div>
</template>
<script>
export default{
    props: [
        'bookInfo',
        'type'
    ],
    data () {
        return {

        }
    },
    methods: {
        handleGoBook(){
            this.$router.push(`/book/${this.bookInfo.bookId}`)
            // if(this.type == 'detail'){
            // console.log(`/book/${this.bookInfo.bookId}`);
            //     this.$router.push(`/book/${this.bookInfo.bookId}`)
            //     return
            // }
            // if(this.bookInfo.read){
            //     this.$router.push(`/book/${this.bookInfo.bookId}`)
            // }else{
            //     this.$router.push(`/book_info/${this.bookInfo.bookId}`)
            // }
        }
    }
}
</script>
<style lang='scss' scoped>
.book-read-status a{
    display: inline-block;
    width: 120px;
    height: 40px;
    background: #FF7E42;
    line-height: 40px;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    color:rgba(255,255,255,1);
    font-size: 20px;
    font-weight: 400;
}
</style>
