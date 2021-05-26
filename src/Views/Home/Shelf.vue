<template>
    <div class="shelf">
        <div class="shelf-top">
            <div class="shelf-top-box">
                <div class="shelf-title">MY Library</div>
                <div :class="['shelf-change-item',{'active':currentTarget=='library'}]"
                @click="handleToggleColumn('library')">Library</div>
                <div :class="['shelf-change-item',{'active':currentTarget=='history'}]"
                @click="handleToggleColumn('history')">History</div>
                <template v-if="currentTarget == 'library'">
                    <div class="shelf-edit" v-if="!canEdit"
                    @click="handleEdit">EDIT</div>
                    <template v-else>
                        <div class="shelf-cancel" @click="handleEdit">CANCEL</div>
                        <div class="shelf-delete" @click="handleRemoveBooks">REMOVE</div>
                    </template>
                </template>
            </div>
        </div>
        <div class="container">
            <div class="library" v-show="currentTarget == 'library'">
                <template v-if="shelfBooks.length > 0">
                    <shelf-book v-for="item in shelfBooks" 
                    :key="item.bookId"
                    :canEdit='canEdit'
                    :bookInfo='item'
                    @getShelfBookIdList='getShelfBookIdList'></shelf-book>
                    <v-pagiation
                    v-if="!isNull && totals > 1"
                    :totals='totals'
                    :pageNo='pageNo'
                    @handleClickPrev='handleClickPrev'
                    @handleClickNext='handleClickNext'
                    @handlePageNumItem='handlePageNumItem'></v-pagiation>
                </template>
                <null-shelf v-else></null-shelf>
            </div>
            <div class="history" v-show="currentTarget == 'history'">
                <template v-if="historyBooks.length > 0">
                    <history-book v-for="item in historyBooks" 
                    :key="item.bookId"
                    :bookInfo='item'
                    @removeHistoryItem='removeHistoryItem'></history-book>
                    <v-pagiation
                    v-if="!historyIsNull && historyTotals > 1"
                    :totals='historyTotals'
                    :pageNo='historyPageNo'
                    @handleClickPrev='handleHistoryClickPrev'
                    @handleClickNext='handleHistoryClickNext'
                    @handlePageNumItem='handleHistoryPageNumItem'></v-pagiation>
                </template>
                <null-shelf v-else></null-shelf>
            </div>
        </div>
    </div>
</template>
<script>
import ShelfBook from '@/components/Common/ShelfBook.vue'
import HistoryBook from '@/components/Common/HistoryBook.vue'
import VPagiation from '@/components/Common/Pagiation.vue'
import NullShelf from '@/components/Common/NullShelf.vue'
export default{
    components: {
        ShelfBook,
        HistoryBook,
        VPagiation,
        NullShelf
    },
    data () {
        return {
            currentTarget: 'library',
            canEdit: false,
            pageNo: 1,
            pageSize: 10,
            totals: 1,
            shelfBooks: [],
            removeShelfBooksId: [],
            isNull: true,
            historyPageNo: 1,
            historyPageSizea: 10,
            historyTotals: 1,
            historyBooks: [],
            historyIsNull: true
        }
    },
    mounted () {
        this.getPageInit()  
    },
    methods: {
        async getPageInit(){
            await this.getLibraryList()
            
        },
        async getHisotryList(){
            let res = await this.$axios.post('/webfic/shelf/list/recently', {
                pageNo: this.historyPageNo,
                pageSize: this.historyPageSizea
            })
            if(res.data.status == 0){
                let result = res.data.data
                this.historyBooks = result.records
                this.historyTotals = result.pages
                this.historyIsNull = false
            }else{
                this.historyIsNull = true
            }
            window.scroll(0,0)
        },
        async removeHistoryItem(target){
            this.$msgBox({
                content: 'Delete this book or not'
            }).then(async val => {
                // 删除
                let res = await this.$axios.post('/webfic/shelf/delete/batch/recently', {
                    idList: [target.id]
                })
                if(res.data.status == 0){
                    this.pageNo = 1
                    this.historyIsNull = true
                    this.getHisotryList()
                }else{
                    this.$message({content: 'Delete failed'})
                }
                
            }).catch(err => {
                // 取消删除
            })
            
        },
        async getLibraryList(){
            // 获取书架的出事函数
            let res = await this.$axios.post('/webfic/shelf/list',{
                pageNo: this.pageNo,
                pageSize: this.pageSize
            })
            this.$store.dispatch('moduleHome/changeLoadingStatus', true)
            if(res.data.status == 0){
                let result = res.data.data
                this.shelfBooks = result.records
                this.totals = result.pages
                this.isNull = false
            }else{
                this.isNull = true
            }
            await this.$nextTick()
            window.scroll(0,0)
        },
        async handleRemoveBooks(){
            this.$msgBox({
                content: 'Delete this book or not'
            }).then(async val => {
                // 删除
                let res = await this.$axios.post('/webfic/shelf/delete/batch',{
                    idList: this.removeShelfBooksId
                })
                if(res.data.status == 0){
                    this.pageNo = 1
                    this.removeShelfBooksId = []
                    this.canEdit = false
                    this.getLibraryList()
                }else{
                    this.$message({content: 'Delete failed'})
                }
                
            })
            
        },
        getShelfBookIdList(bookId,isAdd){
            if(isAdd){
                this.removeShelfBooksId.push(bookId)
            }else{
                this.removeArrayItem(this.removeShelfBooksId, bookId)
            }
        },
        removeArrayItem(arr,target){
            const index = arr.indexOf(target)
            if(index > -1){
                arr.splice(index, 1)
            }
        },
        handleToggleColumn(target){
            if(this.currentTarget == target){
                return
            }
            this.currentTarget = target
            if(target == 'history'){
                this.getHisotryList()
            }else{
                this.getLibraryList()
            }
            
        },
        handleEdit(){
            this.canEdit = !this.canEdit
            // this.removeShelfBooksId = [] 
        },

        // 分页函数
        handleClickPrev(){
            this.pageNo = this.pageNo - 1
            this.getLibraryList()
        },
        handleClickNext(){
            this.pageNo = this.pageNo + 1
            this.getLibraryList()
        },
        handlePageNumItem(target){
            this.pageNo = target
            this.getLibraryList()
        },
        // 阅读记录
        // 分页函数
        handleHistoryClickPrev(){
            this.historyPageNo = this.historyPageNo - 1
            this.getHisotryList()
        },
        handleHistoryClickNext(){
            this.historyPageNo = this.historyPageNo + 1
            this.getHisotryList()
        },
        handleHistoryPageNumItem(target){
            this.historyPageNo = target
            this.getHisotryList()
        },
    },
    destroyed(){
        this.$store.dispatch('moduleHome/changeLoadingStatus', false)
    }
}
</script>
<style lang='scss' scoped>
.shelf{
    width: 100%;
    background: #fff;
    .shelf-top{
        width: 100%;
        background:rgba(244,246,248,1);
        box-sizing: border-box;
        height: 120px;
        .shelf-top-box{
            width: 1080px;
            margin: 0 auto;
            height: 60px;
            font-size: 0;
            padding-top: 48px;
            .shelf-title{
                font-weight:bold;
                color:rgba(67,83,102,1);
                font-size: 32px;
                margin-right: 32px;
                display: inline-block;
            }
            .shelf-change-item{
                color:rgba(58,74,90,0.6);
                font-size: 16px;
                margin-right: 20px;
                cursor: pointer;
                border-bottom: 2px solid transparent;
                padding-bottom: 4px;
                font-weight:bold;
                display: inline-block;
                &.active{
                    font-weight:bold;
                    color:rgba(58,74,90,1);
                    border-bottom-color: #FA52CA;
                }
                &:hover{
                    font-weight:bold;
                    color:rgba(58,74,90,1);
                    border-bottom-color: #FA52CA;
                }
            }
            .shelf-edit{
                float: right;
                height: 60px;
                line-height: 60px;
                color:rgba(238,55,153,1);
                font-size: 16px;
                background: url('../../assets/images/common/shelf_edit.png') no-repeat left center/32px 32px;
                padding-left: 40px;
                cursor: pointer;
            }
            .shelf-cancel{
                float: right;
                height: 60px;
                line-height: 60px;
                color:#3A4A5A;
                font-size: 16px;
                margin-left: 32px;
                cursor: pointer;
            }
            .shelf-delete{
                float: right;
                height: 60px;
                line-height: 60px;
                color:#F84545;
                font-size: 16px;
                background: url('../../assets/images/shelf/shelf_delete.png') no-repeat left center/32px 32px;
                padding-left: 40px;
                cursor: pointer;
            }
        }
    }
    .container{
        width: 1080px;
        margin: 0 auto;
        padding: 40px 0;
        min-height: 700px;
    }
}
</style>
