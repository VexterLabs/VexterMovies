webpackJsonp([8],{369:function(e,t,a){var s=a(445);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);var n=a(5).default;n("5f43890f",s,!0,{})},444:function(e,t,a){"use strict";var s=a(369),n=a.n(s);n.a},445:function(e,t,a){t=e.exports=a(4)(void 0),t.push([e.i,".verify[data-v-045c71c3]{min-height:800px;-webkit-box-sizing:border-box;box-sizing:border-box;background:#fff}.verify.backgroundClass[data-v-045c71c3]{background:#f4f6f8}.verify .success[data-v-045c71c3]{width:460px;height:660px;margin:60px auto 0;background:url("+a(338)+") no-repeat top/460px 254px;background-color:#fff;-webkit-box-shadow:0 20px 16px 0 rgba(0,0,0,.1);box-shadow:0 20px 16px 0 rgba(0,0,0,.1);border-radius:8px}.verify .success .title[data-v-045c71c3]{font-size:32px;font-family:SourceHanSansCN-Bold,SourceHanSansCN;font-weight:700;color:#435366;text-align:center;padding-top:262px}.verify .success .tip[data-v-045c71c3]{width:100%;padding:0 80px;font-size:14px;font-family:SourceHanSansCN-Regular,SourceHanSansCN;font-weight:400;color:rgba(67,83,102,.6);line-height:22px;margin-top:10px}.verify .success .btn[data-v-045c71c3],.verify .success .tip[data-v-045c71c3]{-webkit-box-sizing:border-box;box-sizing:border-box;text-align:center}.verify .success .btn[data-v-045c71c3]{width:300px;height:44px;margin:40px auto 0;background:#ee3799;color:#fff;line-height:44px;border-radius:4px;font-size:20px;font-family:SourceHanSansCN-Medium,SourceHanSansCN;font-weight:500;cursor:pointer}",""])},509:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"verify",class:[{backgroundClass:e.resultFlag}]},[a("null-verify-password",{directives:[{name:"show",rawName:"v-show",value:e.isLoadFinshed,expression:"isLoadFinshed"}],attrs:{resultFlag:e.resultFlag}},[a("template",{slot:"title"},[e._v("\n            Registration "),a("br"),e._v("\n            Success\n        ")]),a("template",{slot:"tip"},[e._v("\n            You have successfully registered, Please log in with your account and password.\n        ")])],2)],1)},n=[],i=a(2),o=a.n(i),r=a(3),c=a.n(r),u=a(148),l={components:{NullVerifyPassword:u.a},data:function(){return{resultFlag:!0,isLoadFinshed:!1}},mounted:function(){this.getPageInit()},methods:{getPageInit:function(){function e(){return t.apply(this,arguments)}var t=c()(o.a.mark(function e(){var t,a;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.$route.query,e.next=3,this.$axios.post("/hwyc/user/email/verify",{token:t.token});case 3:a=e.sent,0==a.data.status?this.resultFlag=!0:this.resultFlag=!1,this.isLoadFinshed=!0;case 6:case"end":return e.stop()}},e,this)}));return e}(),handleLogin:function(){this.$store.dispatch("moduleHome/changeLoginShow",{isShow:!0})}}},d=l,f=(a(444),a(0)),p=Object(f.a)(d,s,n,!1,null,"045c71c3",null);p.options.__file="EmailVerify.vue";t.default=p.exports}});