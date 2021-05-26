<!--
 * @Description:
 * @FilePath: \haiwai_pc\src\Views\Home\DMCA.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2020-04-03 15:35:40
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-06-02 16:27:48
 -->
<template>
    <div class="special-page">
        <h4 class="top-title">
            DMCA
        </h4>
        <div class="content">
            <p class="item-tip">
              Webfic protects the copyrights and respects the efforts of all authors, to offer a community with no material that violates the copyrights of others, which is the highest priority to our team.
            </p>
            <p class="item-tip">
              Uploading other authors' copyrighted novels without their legal authorization is seriously forbidden. Webfic has the obligation to dispose the copyright infringement
            </p>
            <p class="item-tip">
              complying with the Digital Millennium Copyright Act (“DMCA”).
            </p>

            <h5 class="title">File a DMCA Take-down Notice</h5><br>
            <h5 class="title"></h5><br>

            <h6 class="title" style="font-size: 22px;">NOTICE</h6>

            <p class="item-tip">
              To protect your legal rights and financial costs, make sure your copyright has been infringed by some certain material from Webfic Platform or Community before you send the e-mail to file a DMCA Take-down Notice.
            </p>
            <p class="item-tip">
              You can notify us by email at: <a href="mailto:webficread@gmail.com" class="red">webficread@gmail.com</a> with “Notice of Infringement” in the subject line, which contains:
            </p>
            <p class="item-tip p0">
              1. An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright (or other intellectual property) interest;
            </p>
            <p class="item-tip p0">
              2. A description of the copyrighted work (or other intellectual property interest) that you claim has been infringed and a URL to the work;
            </p>
            <p class="item-tip p0">
              3. A description containing the location on the Platform of the material that you claim is infringing;
            </p>
            <p class="item-tip p0">
              4. Your email address and your mailing address and/or telephone number;
            </p>
            <p class="item-tip p0">
              5. A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright (or other intellectual property) owner, its agent, or the law;
            </p>
            <p class="item-tip p0">
              6. A statement by you made under penalty of perjury, that the information in your notice is accurate and that you are the copyright (or other intellectual property) owner or authorized to act on the copyright (or other intellectual property) owner’s behalf.
            </p>

            <h5 class="title" style="font-size: 22px;">Repeat Infringers</h5>
            <p class="item-tip">
              Webfic will terminate the users who are defined as Repeat Infringers by Webfic without pre-notice. Users confirmed by Webfic that have repeatedly infringed others' copyrights are Repeat Infringers.
            </p>

            <h5 class="title" style="font-size: 22px;">Protect Your Works Infringed Outside Webfic</h5>
            <p class="item-tip">
              If you find that your novel had been uploaded by others without your legal authorization, you are entitled to protect your copyright
            </p>
            <p class="item-tip">
              The steps of filing a DMCA Take-down Notice on other website are similar to the method above. Find the Help, Contact, Support, Terms of Service/Use buttons on the target website and to know the specific requirements.
            </p>
            <h5 class="title">
              File a DMCA Counter-Notice
            </h5>
            <p class="item-tip">
                If you believe that a notice of copyright infringement has been improperly submitted against you, you may submit a “Counter-Notice of Infringement” to Webfic, which contains:
            </p>
            <p class="item-tip p0">
              1. Your physical or electronic signature;
            </p>
            <p class="item-tip p0">
              2. Your full name, your email address, your mailing address;
              </p>
            <p class="item-tip p0">
              3. Identification of the material removed or to which access has been disabled;
            </p>
             <p class="item-tip p0">
               4. A statement under penalty of perjury that you have a good faith belief that removal or disablement of the material was a mistake or that the material was misidentified;
            </p>
             <p class="item-tip p0">
               5. A statement that you consent to the jurisdiction of the court (a) in the judicial district where your address is located if the address is in Singapore, or (b) located in Singapore, if your address is located outside Singapore, and that you will accept service of process from the complainant submitting the notice or his/her authorized agent.
            </p>
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
        .p0{
          padding-bottom: 0;
        }
    }
    .red{
      color: rgba(255, 126, 66, 1);
    }
}
</style>
