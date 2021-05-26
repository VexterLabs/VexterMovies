<template>
    <div class="loading-tip">
        <div class="loading-next loading-tip-item">Loading Prev Chapter…</div>
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
    margin-top: 10px;
    position: fixed;
    .loading-tip-item{
        width: 100%;
        text-align: center;
        color:rgba(58,74,90,0.3);
        font-size: 20px;
        font-weight: bold;
    }
}
</style>
