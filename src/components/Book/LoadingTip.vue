<template>
    <div class="loading-tip">
        <div class="loading-next loading-tip-item">加載下一章…</div>
    </div>
</template>
<script>
export default{
     data () {
        return {
        
        }
    }
}
</script>
<style lang='scss' scoped>
.loading-tip{
    width: 746px;
    text-align: center;
    position: fixed;
    bottom: 14px;
    margin: 0 auto;
    .loading-tip-item{
        width: 100%;
        text-align: center;
        color:rgba(58,74,90,0.3);
        font-size: 20px;
        font-weight: bold;
    }
}
</style>
