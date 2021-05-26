<template>
    <div class="null-comment">
        <div class="null-img"></div>
        <div class="title">No Comments</div>
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
.null-comment{
    width: 100%;
    height: 320px;
    text-align: center;
    padding: 20px 0;
    .null-img{
        width: 320px;
        height: 320px;
        background: url('../../assets/images/common/null_comment.png') no-repeat center center/100% 100%;
        margin: 0 auto;
    }
    @media screen and (min-device-width: 1680px) {
        .null-img{
            background: url('../../assets/images/common/null_comment2x.png') no-repeat center center/100% 100%;
        }
    }
    .title{
        font-family:SourceHanSansCN-Bold,SourceHanSansCN;
        font-weight:bold;
        color:rgba(58,74,90,0.6);
        font-size: 18px;
    }
}
</style>
