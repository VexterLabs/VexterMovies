<!--
 * @Description:
 * @FilePath: \webfic_pc_ssr\src\Views\Home\webmap.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2020-04-03 15:35:40
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-12-31 17:56:43
 -->
<template>
    <div class="special-page">
        <div class="top-title">
            Web Map
        </div>
        <div class="content">
            <a href="/" class="title link" style="font-size: 22px;">Home </a>
            <a href="/more/rankings" class="title link" style="font-size: 22px;">Browse </a>
            <a href="/more/1195/popular" class="title link" style="font-size: 22px;">Popular </a>
            <a href="/create_book" class="title link" style="font-size: 22px;">Create </a>
            <a href="/writer_benefit" class="title link" style="font-size: 22px;">Writer Benefit </a>
            <a href="/about_us" class="title link" style="font-size: 22px;">About Us </a>
            <a href="/hub/articles/is-goodnovel-legit" class="title link" style="font-size: 22px;">Webfic Legit </a>
        </div>
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
a{
  font-size: 18px;
  color:#EE3799;
}
.special-page{
    width: 856px;
    margin: 0 auto 60px;
    .top-title{
        font-size:32px;
        font-family:SourceHanSansCN-Bold,SourceHanSansCN;
        font-weight:bold;
        color:rgba(87,103,127,1);
        padding: 20px 0;
    }
    .content{
        width: 100%;
        min-height: 800px;
        background: #fff;
        border:1px solid rgba(0,0,0,0.05);
        box-sizing: border-box;
        padding: 40px 50px;
        .title{
          display: block;
            font-size:32px;
            font-family:SourceHanSansCN-Bold,SourceHanSansCN;
            font-weight:bold;
            color:#EE3799;
            line-height: 104px;
        }
        .item-tip{
            padding: 16px 0 32px;
            font-size:18px;
            font-family:SourceHanSansCN-Regular,SourceHanSansCN;
            font-weight:400;
            color:rgba(58,74,90,1);
            line-height:32px;
            .special-span{
                color: #EE3799;
                font-size:18px;
            }
        }
        .p0{
          padding-bottom: 0;
        }
    }
}
</style>
