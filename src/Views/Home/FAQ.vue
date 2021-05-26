<!--
 * @Description:
 * @FilePath: \haiwai_pc\src\Views\Home\FAQ.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2019-12-31 12:03:26
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-06-02 12:09:57
 -->
<template>
    <div class="special-page">
        <div class="top-title">
            FAQ
        </div>
        <div class="content">
            <div class="title">Why can’t I receive the email verification code?</div>
            <div class="item-tip">
                Please check your junk mail. If there is nothing, please send your User ID and Email address that you use to login
                <span class="special-span">service@goodnovel.com</span> .
                We will handle it as soon as possible.
            </div>
            <div class="title">
                How do I change passwords?
            </div>
            <div class="item-tip">
                In order to ensure the safety of your account, GoodNovel does not provide you with the functionality to change passwords. However, you can reset a new password. You can do so by going to the Login page->Forgot Password? To reset your password.
            </div>
            <div class="title">Why do I encounter locked chapters while reading?</div>
            <div class="item-tip">Most chapters are unlocked but authors and translators require to exert a great deal of effort to produce the content for you. In order to better support the translators and authors, we will lock certain portions of the works. You can support your favorite works by spending Coins or by watching advertisements (different works have different unlocking mechanisms).</div>
            <div class="title">Why am I unable to unlock the chapter after expending my Coins?</div>
            <div class="item-tip">
                If you encounter such a problem, please send your User ID, book title, the specific chapter and the estimated time of your unlock to
                <span class="special-span">service@goodnovel.com</span>. We will handle it as soon as possible.
            </div>
            <div class="title">Why didn’t I Receive Coins after my Purchase?</div>
            <div class="item-tip">
                Under normal circumstances, Coins will be credited immediately to your account after the order is completed. If you do not receive the Coins 1 hours after your purchase, please send your User ID, User Name, Time of Payment, GooglePlay/AppStore/PayPal invoice to
                <span class="special-span">service@goodnovel.com</span>, we'll check it for you. We will inform you of the investigation result ASAP by email.
            </div>
            <div class="title">How do I win a contract with GoodNovel?</div>
            <div class="item-tip">
                First, you need a certain number of words and ensure consistent release rates and quality. If you have more than 50,000 words and met the aforementioned criteria, you can send an email to
                <span class="special-span">writers@goodnovel.com</span> to request to sign a contract. Also, a GoodNovel Editor might also take the initiative to contact you through your email to negotiate a contract.
            </div>
            <div class="title">How can I find the work I published?</div>
            <div class="item-tip">After posting the novel, it will appear on GoodNovel. You can search for it through the search bar.</div>
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
        }
    }
}
</style>
