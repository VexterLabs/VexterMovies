<!--
 * @Description:
 * @FilePath: \haiwai_pc\src\components\Common\NullWalet.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2019-12-30 16:50:48
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-07-07 17:40:21
-->
<template>
    <div class="null-story">
        <div class="null-img"></div>
        <div class="tip">{{content}}</div>
    </div>
</template>
<script>
export default{
  props:['content'],
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
    padding: 20px 0 50px;
    .null-img{
        width: 320px;
        height: 320px;
        background: url('../../assets/images/common/null_wallet.png') no-repeat center center/100% 100%;
        margin: 0 auto;
    }
    @media screen and (min-device-width: 1680px) {
        .null-img{
            background: url('../../assets/images/common/null_wallet2x.png') no-repeat center center/100% 100%;
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
