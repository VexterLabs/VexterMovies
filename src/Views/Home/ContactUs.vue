<template>
    <div class="special-page">
        <div class="top-title">
            Contact Us
        </div>
        <div class="content">
            <div class="item-tip">
                <div class="article">Contact Us</div>
                <div class="article">GENERAL:</div>
                <div class="article">If you want to join our Signed Writer Program, please contact: <span>writers@goodnovel.com</span>.</div>
                <div class="article">For business cooperation, please contact: <span>business@goodnovel.com</span> .</div>
                <div class="article">As a reader, if you encounter bugs, difficulties unlocking episodes or any other problems, please contact: <span>contact@goodnovel.com</span>.</div>
            </div>
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
            font-size:32px;
            font-family:SourceHanSansCN-Bold,SourceHanSansCN;
            font-weight:bold;
            color:rgba(67,83,102,1);
            line-height: 40px;
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
            .article{
                margin-bottom: 20px;
                font-size:18px;
                color:rgba(58,74,90,1);
                span{
                    color: #EE3799;
                    font-size:18px;
                }
            }
        }
    }
}
</style>
