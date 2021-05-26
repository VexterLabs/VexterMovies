<template>
<div id="Hub">
    <div class="center">
        <template v-if="books.length > 0">
            <VhubItem v-for="(item , index) in books" :key="index" :bookInfo="item"></VhubItem>

            <v-pagiation :totals='totals' :pageNo='pageNo' 
                @handleClickPrev='handleClickPrev' 
                @handleClickNext='handleClickNext' 
                @handlePageNumItem='handlePageNumItem'>
            </v-pagiation>
        </template>
        <null-verify-password v-else :resultFlag='false' :isShowText='false'></null-verify-password>
    </div>
</div>
</template>

<script>
import VhubItem from "@/components/Home/imgTitHub.vue"
import VPagiation from '@/components/Common/Pagiation.vue'
import NullVerifyPassword from '@/components/Common/NullVerifyPassword.vue'
import { mapState, mapMutations } from "vuex";

const pageSize = 4;
export default {
    name: "Hub",
    async asyncData({store}){
        await store.dispatch('HubDataModule/getHubList',{pageSize, pageNo: 1 });
    },
    data() {
        return {
            pageSize,
            pageNo: 1
        }
    },
    computed: {
        // ...mapState({
        //     keyword: state => state.moduleHub.keyword,
        //     pageSize: state => state.moduleHub.pageSize,
        //     pageNo: state => state.moduleHub.pageNo,
        //     totals: state => state.moduleHub.totals,
        //     books: state => state.moduleHub.books,
        //     allBookCount: state => state.moduleHub.allBookCount,
        //     isNull: state => state.moduleHub.isNull,
        // })
        ...mapState('HubDataModule',['books','totals'])
    },
    components: {
        VhubItem,
        VPagiation,
        NullVerifyPassword
    },
    methods: {
        pageInit() {
            // this.$store.dispatch('moduleHub/changeSearchResult', {
            //     vm: this
            // })
        },
        handleClickPrev() {
            this.pageNo = this.pageNo -1;
            this.$store.dispatch('HubDataModule/getHubList',{pageSize, pageNo: this.pageNo});
        },

        handleClickNext() {
            this.pageNo = this.pageNo + 1;
           this.$store.dispatch('HubDataModule/getHubList',{pageSize, pageNo: this.pageNo });
        },

        handlePageNumItem(target) {
            this.pageNo = target;
            this.$store.dispatch('HubDataModule/getHubList',{pageSize, pageNo: target });
        },
    },
    mounted() {
        // this.pageInit()
    }
}
</script>

<style lang="scss" scoped>
#Hub {
    padding: 40px 0;

    .center {
        width: 768px;
        min-height: 600px;
        background: #FFFFFF;
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0.05);
        margin: 0 auto;
        padding: 0 42px;
    }

}
</style>
