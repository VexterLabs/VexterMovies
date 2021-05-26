<template>
    <div class="add-or-in">
        <div class="inlibrary" v-if="bookInfo.inLibrary" @click="handleRemoveLibrary">In library</div>
        <div class="book-add" v-else
        @click="handleAddLibrary(bookInfo)">Add to library</div>
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
            currentBookInfo: state => state.moduleHome.addCurrentBookInfo
        })
    },
    data () {
        return {
            
        }
    },
    mounted(){
        window.addLibaryEleReadNavFun = this.handleAddLibrary
    },
    methods: {
        async handleAddLibrary(target){
            this.$store.dispatch('moduleHome/changeAddCurrentBookInfo', target)
            if(!this.currentBookInfo.bookId){
                return
            }
            let res = await this.$axios.post('/webfic/shelf/add',{
                "bookId": target.bookId,
            })
            if(res.data.status == 0){
                target.inLibrary = true
                target.libraryId = res.data.data.id
            }
        },
        async handleRemoveLibrary(){
            let res = await this.$axios.post('/webfic/shelf/delete/batch',{
                idList: [this.bookInfo.libraryId || this.bookInfo.id ]
            })
            if(res.data.status == 0){
                this.bookInfo.inLibrary = false
            }
        }
    },
}
</script>
<style lang='scss' scoped>
.add-or-in{
    .book-add{
        color:rgba(238,55,153,1);
        font-size: 20px;
        cursor: pointer;
        background: url('../../assets/images/book/1.png') no-repeat left center/20px 20px;
        padding-left: 20px;
        white-space: nowrap;
        display: inline-block;
    }
    .inlibrary{
        color:rgba(238,55,153,1);
        font-size: 20px;
        cursor: pointer;
        background: url('../../assets/images/book/12.png') no-repeat left center/20px 20px;
        padding-left: 24px;
        white-space: nowrap;
        display: inline-block;
    }
}
</style>
