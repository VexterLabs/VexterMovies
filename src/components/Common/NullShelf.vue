<template>
    <div class="null-story">
        <!-- <img src="../../assets/images/common/null_shelf_icon.png" alt=""> -->
        <div class="null-img"></div>
        <div class="tip">You have not purchased any stories yet.</div>
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
.null-story{
    width: 100%;
    height: 320px;
    text-align: center;
    padding: 20px 0;
    .null-img{
        width: 320px;
        height: 320px;
        background: url('../../assets/images/common/null_shelf_icon.png') no-repeat center center/100% 100%;
        margin: 0 auto;
    }
    @media screen and (min-device-width: 1680px) {
        .null-img{
            background: url('../../assets/images/common/null_shelf_icon2x.png') no-repeat center center/100% 100%;
        }
    }
    .tip{
        font-family:SourceHanSansCN-Bold,SourceHanSansCN;
        font-weight:bold;
        color:rgba(58,74,90,0.6);
        font-size: 18px;
    }
}
</style>
