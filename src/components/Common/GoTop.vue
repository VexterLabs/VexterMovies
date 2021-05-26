<!--
 * @Description: 
 * @FilePath: \webfic_pc_ssr\src\components\Common\GoTop.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2020-12-23 19:14:36
 * @LastEditors: CuiGang
 * @LastEditTime: 2021-01-04 15:35:02
-->
<template>
    <transition name="fade">
        <div v-if="isShow" class="go-top"
        :class="[{active: isActive}]"
        @mouseover="handleMouseover"
        @mouseleave="handleMouseleave"
        @click="handleGoTop">
            <!-- <img v-if="isActive" src="../../assets/images/common/go_top_active.png" alt="go top arrow"> -->
            <img src="../../assets/images/common/go_top.png" alt="go top arrow">
        </div>
    </transition>
</template>
<script>
export default{
    data () {
        return {
            isActive: false,
            isShow: false
        }
    },
    mounted(){
        window.addEventListener('scroll', this.pageInit)
    },
    methods: {
        // 这个是监听滚动条滚动时调用的函数
        pageInit(){
            let top = document.body.scrollTop || document.documentElement.scrollTop
            let clientHeight = document.body.clientHeight || document.documentElement.clientHeight
            if(top >= clientHeight){
                this.isShow = true
            }else{
                this.isShow = false
            }
        },
        handleMouseover(){
            this.isActive = true
        },
        handleMouseleave(){
            this.isActive = false
        },
        // 点击回到顶部
        handleGoTop(){
            window.scrollTo(0,0)
        }
    }
}
</script>
<style lang='scss' scoped>
.go-top{
    position: fixed;
    z-index: 99;
    background:rgba(0,0,0,0.5);
    box-shadow:0px 8px 6px 0px rgba(0,0,0,0.1);
    border-radius:8px;
    width: 48px;
    height: 48px;
    right: 12px;
    bottom: 100px;
    text-align: center;
    line-height: 48px;
    cursor: pointer;
    transition: all 0.5s ease;
    &.active{
        background:rgba(0,0,0,0.8);
    }
    img{
        width: 48px;
        height: 48px;
        position: relative;
    }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
