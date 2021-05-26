<template>
    <div class="null-story">
        <div class="null-img"></div>
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
        background: url('../../assets/images/common/null_story.png') no-repeat center center/100% 100%;
        margin: 0 auto;
    }
    @media screen and (min-device-width: 1680px) {
        .null-img{
            background: url('../../assets/images/common/null_story2x.png') no-repeat center center/100% 100%;
        }
    }
}
</style>
