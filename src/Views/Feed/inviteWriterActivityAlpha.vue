<!--
 * @Description:
 * @FilePath: \haiwai_pc\src\Views\Feed\inviteWriterActivity.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2020-07-30 11:21:55
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-09-03 11:57:59
-->
<template>
<div>
  <div class="share_facebook">
    <!-- 顶部 -->
    <div class="top_banner">
      <img src="../../assets/images/alpha/banner.jpg" />
    </div>
    <!-- 模块 -->
    <div class="center_cont">
      <!-- 版心 -->
      <div class="center" id="center">
        <!-- pro1 -->
        <div class="program">
          <div class="title">
            <img class="t_img" src="../../assets/images/alpha/title_left.png" />
            <h2>GOODNOVEL PACK</h2>
            <img
              class="t_img"
              src="../../assets/images/alpha/title_right.png"
            />
          </div>

          <div class="tip_pack1">
            What kind of an alpha attracts you the most? This is the question we
            want answered by you writers participating in this contest.
          </div>

          <div class="tip_pack2">
            You can throw out the story in a mysterious forest or in the
            metropolis; you have the freedom to play around the plot. The story
            itself can be comic or tragic; the character can be possessive and
            dominant, sweet or cold-blooded.
            <br />Come on to this stage, a stage that only you alphas deserve!
          </div>

          <div class="join_now">
            <img
              class="btn"
              src="../../assets/images/alpha/join.png"
              @click="handleCreate"
            />
            <img
              class="hand"
              src="../../assets/images/alpha/hand1.png"
              alt=""
            />
          </div>

          <img class="dot dot1" src="../../assets/images/alpha/dot.png" />
          <img class="dot dot2" src="../../assets/images/alpha/dot.png" />
          <img class="dot dot3" src="../../assets/images/alpha/dot.png" />
          <img class="dot dot4" src="../../assets/images/alpha/dot.png" />
        </div>

        <!-- pro2 -->
        <div class="program">
          <div class="title pro2_title">
            <img class="t_img" src="../../assets/images/alpha/title_left.png" />
            <h2>OUR PREY</h2>
            <img
              class="t_img"
              src="../../assets/images/alpha/title_right.png"
            />
          </div>

          <div class="pro2_cards">
            <div class="pro2_card_items c1">
              <div class="left">
                <p>MOST</p>
                <p>POPULAR MATES</p>
              </div>
              <div class="right">
                <h3>$1000</h3>
                <span class="star">*</span>
                <span class="db">2</span>
              </div>
            </div>
            <div class="pro2_card_items c2">
              <div class="left">
                <p class="vm">BEST STORY</p>
              </div>
              <div class="right">
                <h3>$1000</h3>
              </div>
            </div>
            <div class="pro2_card_items c3">
              <div class="left">
                <p class="vm">BEST NEW BORN</p>
              </div>
              <div class="right">
                <h3>$1000</h3>
              </div>
            </div>
            <div class="pro2_card_items c4">
              <div class="left">
                <p class="vm">BEST HERO</p>
              </div>
              <div class="right">
                <h3>$500</h3>
              </div>
            </div>
            <div class="pro2_card_items c5">
              <div class="left">
                <p class="vm">BEST HEROINE</p>
              </div>
              <div class="right">
                <h3>$500</h3>
              </div>
            </div>
          </div>

          <div class="pro2_part">
            <img src="../../assets/images/alpha/partic.png" />
          </div>

          <!-- 实时总数统计 -->
          <div class="pro2_total">
            <div class="fill"   :style="'width:'+handleWidth(totalViewCount) + '%'">
              <div class="flag">
                {{ totalViewCount > 50000 ? totalViewCount && dealSosen(totalViewCount) : ''}}
                <img src="../../assets/images/alpha/total_icon.png" alt="">
              </div>
            </div>
            <div class="txt">Current Total Views</div>
          </div>

          <div class="pro2_tips">
            When total views of all books signed in this contest reaching
            <span class="bd">150,000 views, </span>participation awards will be
            distributed to EVERY AUTHOR who has made contribution to achieve
            this goal.
          </div>

          <div class="pro2_tips2">
            *Current total views will be displayed once the total views reach
            50,000 views.
          </div>

          <img class="dot dot1" src="../../assets/images/alpha/dot.png" />
          <img class="dot dot2" src="../../assets/images/alpha/dot.png" />
          <img class="dot dot3" src="../../assets/images/alpha/dot.png" />
          <img class="dot dot4" src="../../assets/images/alpha/dot.png" />

          <img src="../../assets/images/alpha/chain.png" class="chain chain1" />
          <img src="../../assets/images/alpha/chain.png" class="chain chain2" />
        </div>

        <!-- pro3 -->
        <div class="program">
          <div class="title pro3_title">
            <img class="t_img" src="../../assets/images/alpha/title_left.png" />
            <h2>PACK RULES</h2>
            <img
              class="t_img"
              src="../../assets/images/alpha/title_right.png"
            />
          </div>

          <div class="pro3_mate">
            <h2 class="mate">MATE</h2>
            <p class="p1">
              Once mate, love for life. Mate is the most loyal pledge among
              werewolves and we invite you to find your own mate in this game,
              to share glory, insights, and your fate! For ONLY Alphas with mate
              is eligible to compete for the ‘Most Popular Mates’ in the final
              fight! And during four months of the contest, your pack and ALL
              readers will be able to see your mate's book when they see your
              book. Have someone in mind that deserves to be your mate? Hit the
              button and ask for their hands!
            </p>
            <div>
              <p class="p2">Luna's Words:</p>
              <p class="p2">
                * Both the alpha AND the mate's books have to be signed before
                they can be nominated for the ‘Most Popular Mates’ ;
              </p>
              <p class="p2">
                * You can ONLY link one writer as your mate so think on the
                decision;
              </p>
              <p class="p2">
                * You can ONLY mate with someone registered through the link.
              </p>
            </div>

            <div class="btn">
              <span class="dot"></span>
              <img
                src="../../assets/images/alpha/mate.png"
                @click="doCopy('mate')"
              />
              <img
                class="hand"
                src="../../assets/images/alpha/hand1.png"
                alt=""
                @click="doCopy('mate')"
              />
              <span class="dot"></span>
            </div>
          </div>

          <div class="pro3_mate">
            <h2 class="pack">PACK</h2>
            <p class="p1 pp">
              Everyone is a born alpha, only without their pack. THIS is your
              chance to get your own pack. Hit the button and you will be able
              to open doors for anyone and everyone you would like to welcome
              into your pack! They will be under your name for now and forever!
              They will be your faithful fans to support you to your throne!
            </p>
            <div class="btn">
              <span class="dot"></span>
              <img
                src="../../assets/images/alpha/pack.png"
                alt=""
                @click="doCopy('pack')"
              />
              <img
                class="hand"
                src="../../assets/images/alpha/hand1.png"
                alt=""
                @click="doCopy('pack')"
              />
              <span class="dot"></span>
            </div>
          </div>

          <div class="pro3_confir">
            <div class="con_item">
              <img src="../../assets/images/alpha/confirm.png" />
              <p class="y h">
                Only one rule to enter our pack: tell us a story about an Alpha,
                the story genre is limited to werewolf;
              </p>
            </div>
            <div class="con_item">
              <img src="../../assets/images/alpha/confirm.png" />
              <p>
                You could submit multiple entries;
              </p>
            </div>
            <div class="con_item">
              <img src="../../assets/images/alpha/confirm.png" />
              <p>
                All stories reaching 40,000 words will be eligible for the
                contest;
              </p>
            </div>
            <div class="con_item">
              <img src="../../assets/images/alpha/confirm.png" />
              <p class="h">
                As we’re recruiting new pack stories, already-signed works on
                our site will not be included in this contest;
              </p>
            </div>
            <div class="con_item">
              <img src="../../assets/images/alpha/confirm.png" />
              <p>
                Poems, fan-fiction and non-English stories will not be accepted
                this time;
              </p>
            </div>
            <div class="con_item">
              <img src="../../assets/images/alpha/confirm.png" />
              <p>
                Every member in our pack is unique, plagiarism won’t be
                tolerated.
              </p>
            </div>
          </div>

          <img class="dot dot1" src="../../assets/images/alpha/dot.png" />
          <img class="dot dot2" src="../../assets/images/alpha/dot.png" />
          <img class="dot dot3" src="../../assets/images/alpha/dot.png" />
          <img class="dot dot4" src="../../assets/images/alpha/dot.png" />

          <img src="../../assets/images/alpha/chain.png" class="chain chain1" />
          <img src="../../assets/images/alpha/chain.png" class="chain chain2" />
        </div>

        <!-- pro4 -->
        <div class="program">
          <div class="title pro3_title">
            <img class="t_img" src="../../assets/images/alpha/title_left.png" />
            <h2>FEATURED BOOKS</h2>
            <img
              class="t_img"
              src="../../assets/images/alpha/title_right.png"
            />
          </div>

          <div class="pro4_books">
            <div
              class="book_item"
              v-for="(item, index) in rankBooks"
              :key="index"
              @click="handleOpenBook(item, index + 1)"
            >
              <img :src="item.cover" alt="bookName" />
              <div class="book_right">
                <h3>{{ item.bookName }}</h3>
                <div class="author">{{ item.pseudonym }}</div>
                <div class="line"></div>
                <div class="desc">{{ item.introduction }}</div>
              </div>
              <router-link v-if="item.actionType == 'BOOK'" :to="{path: `/book_info/${item.bookId}/${formatSpace((item.typeTwoNames && item.typeTwoNames[0]) || 'null')}/${formatSpace(item.bookName || 'null')}`}"></router-link>
              <router-link v-else :to="{path: `'/book/'${item.bookId}`}"></router-link>
            </div>
          </div>

          <img class="dot dot1" src="../../assets/images/alpha/dot.png" />
          <img class="dot dot2" src="../../assets/images/alpha/dot.png" />
          <img class="dot dot3" src="../../assets/images/alpha/dot.png" />
          <img class="dot dot4" src="../../assets/images/alpha/dot.png" />

          <img src="../../assets/images/alpha/chain.png" class="chain chain1" />
          <img src="../../assets/images/alpha/chain.png" class="chain chain2" />
        </div>

        <!-- pro5 -->
        <div class="program">
          <div class="title pro5_title1">
            <img class="t_img" src="../../assets/images/alpha/title_left.png" />
            <h2>HOW TO JOIN</h2>
            <img
              class="t_img"
              src="../../assets/images/alpha/title_right.png"
            />
          </div>
          <div class="title pro5_title2">
            <h2>THE GOODNOVEL PACK</h2>
          </div>

          <div class="steps">
            <div class="left">
              <div class="s s1">STEP1</div>
              <div class="s s2">STEP2</div>
              <div class="s s3">STEP3</div>
            </div>
            <div class="middle">
              <img src="../../assets/images/alpha/linedot.png" alt="" />
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
            <div class="right">
              <div class="s s1">
                <div class="line"></div>
                <p class="content">
                  Go to <span class="y">https://www.goodnovel.com/</span><br />
                  Click “Create” to start your story
                </p>
              </div>
              <div class="s s2">
                <div class="line l2"></div>
                <p class="content c2">
                  When creating your new story, tick the box labelled <br />
                  <span class="y y2">“Mate The Alpha Writing Contest”</span> to
                  confirm your participa- <br />
                  ation to this contest.
                </p>
              </div>
              <div class="s s3">
                <div class="line l3"></div>
                <p class="content c3">
                  Once your story exceeds
                  <span class="y y3">15,000 words </span>, click <br />
                  <span class="y y3">“APPLY FOR CONTRACT”</span> to submit your
                  story for review.
                </p>
              </div>
            </div>
          </div>

          <img class="dot dot1" src="../../assets/images/alpha/dot.png" />
          <img class="dot dot2" src="../../assets/images/alpha/dot.png" />
          <img class="dot dot3" src="../../assets/images/alpha/dot.png" />
          <img class="dot dot4" src="../../assets/images/alpha/dot.png" />

          <img src="../../assets/images/alpha/chain.png" class="chain chain1" />
          <img src="../../assets/images/alpha/chain.png" class="chain chain2" />
        </div>

        <!-- pro6 -->
        <div class="program">
          <div class="title pro5_title1">
            <img class="t_img" src="../../assets/images/alpha/title_left.png" />
            <h2>MATE THE ALPHA</h2>
            <img
              class="t_img"
              src="../../assets/images/alpha/title_right.png"
            />
          </div>
          <div class="title pro5_title2">
            <h2>Q&A HUB</h2>
          </div>

          <div class="qas">
            <div class="qas_item">
              <div class="top clearfix">
                <img src="../../assets/images/alpha/qa.png" />
                <h4>How will the participation bonus be distributed?</h4>
              </div>
              <div class="bot">
                Basically, the participation award is distributed to authors according to their works’
                views, as our rules stated, if your story has 50,000 views, then it’s your turn to collect
                the bonus of 500 dollars.
              </div>
            </div>
            <div class="qas_item">
              <div class="top clearfix">
                <img src="../../assets/images/alpha/qa.png" />
                <h4>
                  Could we can go solo without any sort of trouble, right?
                </h4>
              </div>
              <div class="bot">
                Of course you can, you are eligible for all prizes except the ‘Most Popular Mates’.
              </div>
            </div>
            <div class="qas_item">
              <div class="top clearfix">
                <img src="../../assets/images/alpha/qa.png" />
                <h4>
                  Can the lead be a female who found her mate?
                </h4>
              </div>
              <div class="bot">
                Yep! Women could also be the alpha and invite her mate.
              </div>
            </div>
            <div class="qas_item">
              <div class="top clearfix">
                <img src="../../assets/images/alpha/qa.png" />
                <h4>Can you tell me the criteria of judgement?</h4>
              </div>
              <div class="bot">
                All books will be judged individually. A good novel usually has an appropriate theme,
                a clear plot structure, and well-developed characters. If you would like to know more
                about the writing techniques regarding these aspects, you could google them or join
                GoodNovel Academy for elaboration.
              </div>
            </div>
            <div class="qas_item">
              <div class="top clearfix">
                <img src="../../assets/images/alpha/qa.png" />
                <h4>Does it have to be a novel only about Alpha wolves? Are cross-breeds allowed, such as
                    a werewolf-vampire cross breed?</h4>
              </div>
              <div class="bot">
                Of course you can go cross-breeds! They make your story even more attractive.
              </div>
            </div>
            <div class="qas_item">
              <div class="top clearfix">
                <img src="../../assets/images/alpha/qa.png" />
                <h4>Does it mean that the posted stories on Goodnovel but not under any types of contacts
                    are still eligible for joining the contest?</h4>
              </div>
              <div class="bot">
                Correct! Already-posted but not signed works are eligible as well.
              </div>
            </div>
            <div class="qas_item">
              <div class="top clearfix">
                <img src="../../assets/images/alpha/qa.png" />
                <h4>I gave the link and copied for creating a pack to my friend but when she clicked on it,it just took her to the contest page. Could you please guide me through the process?</h4>
              </div>
              <div class="bot">
                Your friend will need to create an account first, then if your friend opens the link again,
                he/she will need to confirm to be your pack’s member, once done, then the pack’s
                number you will on your page.
              </div>
            </div>
          </div>

          <img class="dot dot1" src="../../assets/images/alpha/dot.png" />
          <img class="dot dot2" src="../../assets/images/alpha/dot.png" />
          <img class="dot dot3" src="../../assets/images/alpha/dot.png" />
          <img class="dot dot4" src="../../assets/images/alpha/dot.png" />

          <img src="../../assets/images/alpha/chain.png" class="chain chain1" />
          <img src="../../assets/images/alpha/chain.png" class="chain chain2" />
        </div>

        <div class="btm">
          <p class="p1">
            If you have any questions, concerns, suggestions, etc.,
          </p>
          <p class="p2">
            please message to
            <a href="mailto:contact@goodnovel.com" class="red"
              >contact@goodnovel.com</a
            >
          </p>
        </div>

        <!-- 右侧分享复制创建 -->
        <!-- :style="{'left':leftUpdate} -->
        <!-- <div class="end endfixed">
            <span class="facebook_share_icon">Share</span>
            <img
              class="create_img"
              @click="handleCreate"
              src="../../assets/images/invite/create.png"
              alt
            />
            <img
              @click="handleShareFacebook"
              src="../../assets/images/invite/share.png"
              alt
              class="facebook_share_icon"
            />
            <img
              class="copy_link_icon"
              @click="doCopy"
              src="../../assets/images/invite/copy_link.png"
              alt
            />
            <span class="copy_link_icon">Copy</span>
        </div>-->
      </div>
    </div>
  </div>

  <div class="mask_contain"  v-show="showMask" @click.self="showMask=false;">
    <div class="mask">
      <img src="../../assets/images/alpha/clss.png" alt=""  @click.self="showMask=false;">
      <p>{{maskInfo.message}}</p>
      <span @click="handleMaskBtnClk(maskInfo.confirmButtonText)">{{maskInfo.confirmButtonText}}</span>
    </div>
  </div>
</div>

</template>
<script>
import { mapState } from "vuex";
import { Base64 } from "js-base64";
import { formatSpace } from "@/core/js/common.js";

export default {
  computed: {
    ...mapState({
      ishow: state => state.moduleHome.isShowLogin,
    }),
    ...mapState('AlphaDataModule', [
        'rankBooks', 'activityId', 'errStatus', 'initLoad', 'login', 'packShareInfo', 'mateShareInfo','totalViewCount'
    ])
  },
  async asyncData({store}){
      await store.dispatch('AlphaDataModule/getAlphaList');
  },
  data() {
    return {
      // rankBooks: [],
      formatSpace,
      aloneBook: {
        actionType: "BOOK",
        bookId: "21000003014",
        bookName: "The Author's Handbook",
        cover:
          "https://res.goodnovel.com/books/014/21000003014/cover-hYdXwIdjZF.jpg",
        pseudonym: "GoodNovel Writers",
        introduction:
          // "LOVE ALL, BELIEVE A FEW.This is where you get all the help you need to be a writer~Starts today and write with us, the dream of being a success is within one book's reach!",
          "You can learn different writing techniques in this book. Sections 1-5 will guide you to clear your mind and make decisive choices before you start writing. Sections 6-7 are some suggestions for writing.  We recommend that authors take these 7 sections as reference before and during writing. Sections 8 – 9 describe how the author can attract relevant readers through tags and synopsis of the story. Sections 10-11 are instruction to the most exciting part of submission"
      },
      message: false, // 复制链接
      shareCode: false, // 当前用户的分享码
      // activityId: "", //活动id
      timer: null,
      // login: false, // 用户是否登录
      // mateShareInfo: {}, // mate邀请码信息  code为0 才有sharecode, 其余情况个根据code进行提示
      mateCopyLink: "", // mate分享链接
      // packShareInfo: {}, // pack邀请吗信息
      packCopyLink: "", // pack分享链接
      // 狼人活动提示数组
      shareTips:[
        { // （1）作者是alpha，并没有mate
          confirmButtonText:'copy link',
          message: 'You got the link! Now you can invite someone to become your mate!',
        },
        { // （2）作者是mate，弹框提示
          title:' ',
          confirmButtonText:'ok',
          message: 'You can’t invite anyone else, you belong to [alpha名字] :)',
        },
        { // 3）作者是alpha，并已经有mate了，弹框提示
          confirmButtonText:'ok',
          message: 'You’ve already found your mate dude',
        },
        { // 4）作者还不是alpha或mate
          title:' ',
          confirmButtonText:'create',
          message: 'You will need to create your story first dude.',
        },
        { // 1）已成为alpha或者mate，点击分享pack链接，弹框提示
          title:' ',
          confirmButtonText:'copy link',
          message: 'Great! Now you can gather your pack with the link!',
        },
        { // （2）未成为alpha或者mate，点击分享pack链接，弹框提示
          title:' ',
          confirmButtonText:'create',
          message: 'You’ll need to join this contest or become someone’s mate first.',
        },
        { // 3502
          title:' ',
          confirmButtonText:'ok',
          message: "You're not eligible for this stage :(",
        },
        { // 3503
          title:' ',
          confirmButtonText:'ok',
          message: "Sorry, we’re inviting new members, think on someone new?",
        },
        { // 3504
          title:' ',
          confirmButtonText:'ok',
          message: "Alpha can’t be someone’s mate :(",
        },
        { // 3504
          title:' ',
          confirmButtonText:'ok',
          message: " Activity expired :(",
        }
        
      ],
      maskIndex:-1,
      showMask:false,
      maskInfo:{ 
        confirmButtonText:'',
        message: '',
      },
    };
  },
  mounted() {
        // 校验页面是否是有分享参数
        this.judgeIsShareIncome();

        // TODO: 请求书籍数据
        this.getBookInfo();
        //跳转位置
        this.jumpPoint();
  },
  methods: {
    handleMaskBtnClk(btn){
      if(btn == "copy link"){
        this.handleCopyLink(this.maskInfo.type, this.maskInfo.context);
      }else if(btn == 'create'){
        this.handleCreate();
      }else if(btn == 'Copy'){
        this.$copyText(this.copyLinkCreate).then(
          function (e) {
            andrfn("logEvent", {
              module: "invite_alpha_activity",
              event: "copy_alpha_join_link_suc", // 复制链接成功
            });
            andrfn("toastAlone", {
              msg: "Copy and paste the link to your browser~",
            });
          },
          function (e) {
            // 不支持复制
            andrfn("logEvent", {
              module: "invite_alpha_activity",
              event: "copy_alpha_join_link_fail", // 复制链接失败
            });
            andrfn("toastAlone", {
              msg: "Oops! something is wrong , please try again later.",
            });
          }
        );
      }
      this.showMask = false;
    },

    // 处理千位
    dealSosen: function (num) {
        num = num.toString().split("."); // 分隔小数点
        var arr = num[0].split("").reverse(); // 转换成字符数组并且倒序排列
        var res = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            if (i % 3 === 0 && i !== 0) {
                res.push(","); // 添加分隔符
            }
            res.push(arr[i]);
        }
        res.reverse(); // 再次倒序成为正确的顺序
        if (num[1]) {
            // 如果有小数的话添加小数部分
            res = res.join("").concat("." + num[1]);
        } else {
            res = res.join("");
        }
        return res;
    },

    handleWidth(num){
      console.log(num)
      let percent = (num/150000).toFixed(2)*100;
      console.log(percent)
      return  percent > 100 ? 100 : percent;
    },

    //指定跳转
    jumpPoint: function() {
      let hash = window.location.hash;
      let index = hash.lastIndexOf("#");
      if (index != -1) {
        let id = hash.substring(index + 1, hash.length + 1);
        let div = document.getElementById(id);
        let top_banner = document.getElementsByClassName("top_banner")[0];
        if (div) {
          let t = 0;
          clearTimeout(this.timer);
          this.timer = setInterval(() => {
            t = t + 25;
            if (t >= div.offsetTop + top_banner.clientHeight) {
              t = t - 90;
              clearTimeout(this.timer);
            }
            window.scrollTo(0, t);
          }, 5);
        }
      }
    },
    
    // 初始化校验: 是否由分享进入本页
    async judgeIsShareIncome() {
      let share = this.$route.query.share; // 分享码
      let type = this.$route.query.type; // 分享链接类型

      // 展示绑定弹窗
      if (!type || !share) {
        return;
      }

      //打点各用户分享链接的点击量
      $logEvent({
        event: "click_share_alpha_link" + type // 访问分享链接成功
      });

      // 如果是pack 直接进行绑定, 绑定成功提示, 绑定失败 除未登录情况下不做处理,未登录时添加session,在登录时获取并上传. 在userInfo中查看绑定状态
      if (type == "pack") {
        this.bindPack(type, share);
      } else if (type == "mate") {
        // 绑定mate
        this.bindMate(type, share);
      }
    },

    // 绑定pack
    async bindPack(type, share) {
      $logEvent({
        event: "fqglfxmqq" // 发起关联分享码请求
      });

      let res = await this.$axios.post("/webfic/activity/alpha/user/binding", {
        shareCode: share
      });

      if (res.data.status == 0) {
        $logEvent({
          event: "fqglfxmcg" // 关联分享码成功
        });
        this.$msg({
          content: "Congratulations! Now you're one of our pack members!"
        });
      } else if (res.data.status == 6) {
        window.localStorage.setItem("packcode", share);
      }
    },

    // 绑定mate请求userInfo
    async bindMate(type, share) {
      // 请求邀请人信息(用户名, ID等)
      let res = await this.$axios.post("/webfic/activity/alpha/info", {
        shareCode: share
      });
      // TODO 展示邀请人信息
      if (res.data.status == 0) {
        let that = this;
        this.sharer = res.data.data.pseudonym;
        this.sharerRole = res.data.data.role;
        this.shareCode = res.data.data.shareCode;
        // 展示弹窗
        this.$msgBox({
          type: "alpha",
          content: `Would you like to become ${that.sharer}’s ${type}?`,
          title: "Warning",
          closeMask: false
        }).then(val => {
          if (val) {
            let tip = `Hey! You’ve mated to the ${that.sharer}!`;
            that.confirmBindMate(tip, share);
          }
        });
      } else if (res.data.status == 3500) {
        // 还不是alpha或mate
        $logEvent({
          event: "hqfxmsb", // 获取分享码失败
          map: {
            module: res.data.status
          }
        });
        this.$msg({
          content: "You will need to create your story first dude."
          // content:type == 'mate' ? `You can’t invite anyone else, you belong to ${res.data.message} :)` : "You’ll need to join this contest or become someone’s mate first."
        });
      } else if (res.data.status == 3501) {
        // 您还不是alpha或者meta
        $logEvent({
          event: "hqfxmsb", // 获取分享码失败
          map: {
            module: "3501"
          }
        });
        this.$msg({
          content:
            "You’ll need to join this contest or become someone’s mate first."
        });
      } else if (res.data.status == 3502) {
        // 分享码不正确
        $logEvent({
          event: "fqglfxmsb",
          map: {
            module: "3502" // 失败错误码
          }
        });
        this.$msg({
          content: " You're not eligible for this stage :("
        });
      } else if (res.data.status == 3503) {
        // 不是新用户
        $logEvent({
          event: "fqglfxmsb",
          map: {
            module: "3503" // 失败错误码
          }
        });
        this.$msg({
          content: "Sorry, we’re inviting new members, think on someone new?"
        });
      } else if (res.data.status == 3504) {
        // 已经是alpha
        $logEvent({
          event: "fqglfxmsb",
          map: {
            module: "3504" // 失败错误码
          }
        });
        this.$msg({
          content: "Alpha can’t be someone’s mate :("
        });
      } else if (res.data.status == 3505) {
        // 已经是mate
        $logEvent({
          event: "fqglfxmsb",
          map: {
            module: "3505" // 失败错误码
          }
        });
        this.$msg({
          content: `You can’t invite anyone else, you belong to ${res.data
            .message || "your alpha"} :)`
        });
      } else if (res.data.status == 3507) {
        $logEvent({
          event: "fqglfxmsb",
          map: {
            module: "3509" // 失败错误码
          }
        });
        this.$msg({
          content: " Activity expired :("
        });
      } else if (res.data.status == 3508 || res.data.status == 171011) {
        // 邀请人已有mate
        $logEvent({
          event: "fqglfxmsb",
          map: {
            module: "3508" // 失败错误码
          }
        });
        this.$msg({
          content: "You’ve already found your mate dude"
        });
      } else {
        this.$msg({
          content: "Network Error , status:" + res.data.status
        });
      }
    },

    // 确认绑定
    async confirmBindMate(tip, share) {
      // console.log(2);
      $logEvent({
        event: "fqglfxmqq" // 发起关联分享码请求
      });

      let res = await this.$axios.post("/webfic/activity/alpha/user/binding", {
        shareCode: share
      });
      // console.log(3);
      if (res.data.status == 0) {
        $logEvent({
          event: "fqglfxmcg" // 关联分享码成功
        });

        this.$msgBox({
          type: "alpha_suc",
          title: "Warning",
          content: tip
        }).then(val => {
          if (val) {
            // console.log(val);
          }
        });
      } else if (res.data.status == 6) {
        // 拉起登录TODO
        $logEvent({
          event: "fqglfxmsb", // 关联分享码成功
          map: {
            module: "unlogin:6" // 失败错误码
          }
        });

        this.$store.dispatch("moduleHome/changeLoginShow", {
          isShow: true,
          callBackObj: {
            callback: this.confirmBindMate,
            callbackParam: [tip, share]
          }
        });
      } else if (res.data.status == 3500) {
        // 还不是alpha或mate
        $logEvent({
          event: "hqfxmsb", // 获取分享码失败
          map: {
            module: res.data.status
          }
        });
        this.$msg({
          content: "You will need to create your story first dude."
          // content:type == 'mate' ? `You can’t invite anyone else, you belong to ${res.data.message} :)` : "You’ll need to join this contest or become someone’s mate first."
        });
      } else if (res.data.status == 3501) {
        // 您还不是alpha或者meta
        $logEvent({
          event: "hqfxmsb", // 获取分享码失败
          map: {
            module: "3501"
          }
        });
        this.$msg({
          content:
            "You’ll need to join this contest or become someone’s mate first."
        });
      } else if (res.data.status == 3502) {
        // 分享码不正确
        $logEvent({
          event: "fqglfxmsb",
          map: {
            module: "3502" // 失败错误码
          }
        });
        this.$msg({
          content: " You're not eligible for this stage :("
        });
      } else if (res.data.status == 3503) {
        // 不是新用户
        $logEvent({
          event: "fqglfxmsb",
          map: {
            module: "3503" // 失败错误码
          }
        });
        this.$msg({
          content: "Sorry, we’re inviting new members, think on someone new?"
        });
      } else if (res.data.status == 3504) {
        // 已经是alpha
        $logEvent({
          event: "fqglfxmsb",
          map: {
            module: "3504" // 失败错误码
          }
        });
        this.$msg({
          content: "Alpha can’t be someone’s mate :("
        });
      } else if (res.data.status == 3505) {
        // 已经是mate
        $logEvent({
          event: "fqglfxmsb",
          map: {
            module: "3505" // 失败错误码
          }
        });
        this.$msg({
          content: `You can’t invite anyone else, you belong to ${ this.aplhaName || "your alpha"} :)`
        });
      } else if (res.data.status == 3507) {
        $logEvent({
          event: "fqglfxmsb",
          map: {
            module: "3509" // 失败错误码
          }
        });
        this.$msg({
          content: " Activity expired :("
        });
      } else if (res.data.status == 3508 || res.data.status == 171011) {
        // 邀请人已有mate
        $logEvent({
          event: "fqglfxmsb",
          map: {
            module: "3508" // 失败错误码
          }
        });
        this.$msg({
          content: "You’ve already found your mate dude"
        });
      } else {
        $logEvent({
          event: "fqglfxmsb", // 关联分享码成功
          map: {
            module: "status:" + res.data.status // 失败错误码
          }
        });
        this.$msgBox({
          type: "alpha_suc",
          content: "Network error , status: " + res.data.status,
          title: "Warning"
        }).then(val => {
          if (val) {
            // console.log(val);
          }
        });
      }
    },

    // 初始化复制链接的 复制内容
    handleCopyContentInit() {
      let isLogin = window.localStorage.getItem('userInfo') ;

      if (isLogin && this.mateShareInfo && this.mateShareInfo.code == 0) {
        this.mateCopyLink =
          window.location.href.split("?")[0] +
          "?type=mate" +
          "&share=" +
          this.mateShareInfo.shareCode;
      }
      if (isLogin && this.packShareInfo && this.packShareInfo.code == 0) {
        this.packCopyLink =
          window.location.href.split("?")[0] +
          "?type=pack" +
          "&share=" +
          this.packShareInfo.shareCode;
      }
    },

    //! 复制链接
    doCopy(type) {

      $logClick({
        module: "alpha_copylink", // facebook分享约稿
        zone: "djfzfxlj", // 点击赋值分享链接
        adid: "click_copy_alpha_link" // 打开分享页
      });

      // 校验用户是否登录, 未登录拉起登录
      let isLogin = window.localStorage.getItem("userInfo") ? true : false;
      console.log(isLogin)
      if (!isLogin) {
        this.$store.dispatch("moduleHome/changeLoginShow", {
          isShow: true,
          callBackObj: { callback: this.getBookInfo2, callbackParam: [] }
        });
      }else{
        // 用户已登录, 根据type校验对应的mateInfo和packInfo, 依据code进行toast提示
        this.judgeShareInfoCode(type);
      }
    },

    // 判断code给出提示
    judgeShareInfoCode(type) {
      let that = this;
      let judgeShareInfo =
        type == "mate" ? this.mateShareInfo : this.packShareInfo;
      let message = type == "mate" ? this.mateCopyLink : this.packCopyLink;
      console.log(type)
      console.log(judgeShareInfo)
      switch (judgeShareInfo.code) {
        case 0:
          that.maskIndex = type == "mate" ? 0 : 4;
          that.maskInfo = that.shareTips[that.maskIndex];
          that.maskInfo.type = type;
          that.maskInfo.context = message;
          that.showMask = true;
          break;
        case 3500: // 还不是alpha或mate
          $logEvent({
            event: "hqfxmsb", // 获取分享码失败
            map: {
              module: 3500
            }
          });
          that.showMask = true;
          that.maskInfo = that.shareTips[3];
          break;
        case 3501:
          $logEvent({
            event: "hqfxmsb", // 获取分享码失败
            map: {
              module: 3501
            }
          });
          that.showMask = true;
          that.maskInfo = that.shareTips[5];
          break;
        case 3502:
          $logEvent({
            event: "hqfxmsb", // 获取分享码失败
            map: {
              module: 3502
            }
          });
          that.showMask = true;
          that.maskInfo = that.shareTips[6];
          break;
        case 3503:
          $logEvent({
            event: "hqfxmsb", // 获取分享码失败
            map: {
              module: 3503
            }
          });
          that.showMask = true;
          that.maskInfo = that.shareTips[7];
          break;
        case 3504:
          $logEvent({
            event: "hqfxmsb", // 获取分享码失败
            map: {
              module: 3504
            }
          });
          that.showMask = true;
          that.maskInfo = that.shareTips[8];
          break;
        case 3505:
          // 已经是mate
          $logEvent({
            event: "fqglfxmsb",
            map: {
              module: "3505" // 失败错误码
            }
          });
          that.showMask = true;
          that.maskInfo = that.shareTips[1];
          that.maskInfo.message = `You can’t invite anyone else, you belong to ${judgeShareInfo.alphaMateName} :)`
          break;
        case 3507:
          $logEvent({
            event: "fqglfxmsb",
            map: {
              module: "3507" // 失败错误码
            }
          });
          that.showMask = true;
          that.maskInfo = that.shareTips[9];
          break;
        case 3508:
          // 邀请人已有mate
          $logEvent({
            event: "fqglfxmsb",
            map: {
              module: "3508" // 失败错误码
            }
          });
          that.showMask = true;
          that.maskInfo = that.shareTips[2];
          break;
        case 171011:
          // 邀请人已有mate
          $logEvent({
            event: "fqglfxmsb",
            map: {
              module: "171011" // 失败错误码
            }
          });
          that.showMask = true;
          that.maskInfo = that.shareTips[2];
          break;
        default:
          $logEvent({
            event: "fqglfxmsb",
            map: {
              module: "171011" // 失败错误码
            }
          });
          this.$msg({
            content: "Network error , please try again. status:" + judgeShareInfo.code
          });
          break;
      }
    },

    // 对应按钮的code为0 存在shareCode值
    handleCopyLink(type, message) {

      console.log(message);

      this.$copyText(message).then(
        e => {
          $logEvent({
            event: "from_alpha_join_" + type, // 复制分享链接成功
            map: {
              module: 0 // 分享码
            }
          });

          this.$msg({
            content:
              type == "pack"
                ? "Great! Now you can gather your pack with the link!"
                : "You got the link! Now you can invite someone to become your mate!"
          });
        },

        e => {
          $logEvent({
            event: "fzfxljsb", // 复制分享链接失败
            map: {
              module: 0 // 分享码
            }
          });

          this.$msg({
            content: "Oops! something is wrong , please try again later."
          });
        }
      );
    },

    
    async getBookInfo2(){
      let res = await this.$axios.post("/webfic/activity/alpha/contest");
      if (res.data.status == 0) {
        this.$store.dispatch('AlphaDataModule/initAlphaData' , {
          rankBooks :res.data.data.rankList,
          activityId :res.data.data.activityId,
          login:res.data.data.login || false,
          mateShareInfo:res.data.data.mateShareInfo || {},
          packShareInfo:res.data.data.packShareInfo || {},
        })
        // 如果ShareInfo的code为0,进行复制地址传值
        this.handleCopyContentInit();

        $logEvent({
          event: "hqshujcg" // 获取书籍数据成功
        });
      } else if (this.errStatus == 3507) {
        $logEvent({
          event: "hqshujsb",
          map: {
            module: "3507" // 失败错误码
          }
        });
        this.$msg({
          content: " Activity expired :("
        });
      } else {
        $logEvent({
          event: "hqshujsb", // 获取书籍数据失败
        });
      }
    },


    // 获取书籍数据
    async getBookInfo() {
      if(this.initLoad) {
        $logEvent({
          event: "fqsjsjqq" // 发起书籍数据请求
        });
      }
      // let res = await this.$axios.post("/webfic/activity/alpha/contest");
      if (this.errStatus == 0) {
        // this.rankBooks = res.data.data.rankList;
        // this.activityId = res.data.data.activityId;
        // this.login = res.data.data.login || false;
        // this.mateShareInfo = res.data.data.mateShareInfo || {};
        // this.packShareInfo = res.data.data.packShareInfo || {};

        // 如果ShareInfo的code为0,进行复制地址传值
        this.handleCopyContentInit();

        $logEvent({
          event: "hqshujcg" // 获取书籍数据成功
        });
      } else if (this.errStatus == 3507) {
        $logEvent({
          event: "hqshujsb",
          map: {
            module: "3507" // 失败错误码
          }
        });
        this.$msg({
          content: " Activity expired :("
        });
      } else {
        $logEvent({
          event: "hqshujsb", // 获取书籍数据失败
        });
      }
    },

    // 写书
    handleCreate() {
      $logClick({
        module: "alpha_share", // facebook分享约稿
        zone: "djcjsj", // 点击创建书籍
        adid: "open_create_book" // 打开书籍详情
      });

      this.$router.push("/create_book?alphaId=" + this.activityId);
    },

    // 打开书籍
    handleOpenBook(item, position) {
      let bookId = item.bookId;
      let pos = "single";
      if (position) {
        pos = position;
      }

      $logClick({
        module: "alpha_share", // facebook分享约稿
        zone: "alphadksjxq",
        adid: "open_book_detail", // 打开书籍详情
        map: {
          bookId: bookId, // 打开的书籍ID
          position: pos // 打开的书籍位置: 第几本书
        }
      });

      if (item.actionType == "BOOK") {
        this.$router.push(
          `/book_info/${bookId}/${formatSpace((item.typeTwoNames && item.typeTwoNames[0]) || "null")}/${formatSpace(item.bookName || "null")}`
        );
      } else {
        this.$router.push("/book/" + bookId);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
  font-family: Source Sans Pro;
}
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
html,
body {
  width: 100%;
  height: 100%;
}

.share_facebook {
  width: 100%;
  min-height: 100%;
  background: url(../../assets/images/alpha/bg_al.jpg) repeat-y top center;
  background-size: 100% 100%;
  .top_banner {
    width: 100%;
    img {
      width: 100%;
    }
    // height: 1000px;
    // background: url(../../assets/images/alpha/alpha_bg.png) no-repeat top center;
    // background-size: 100%;
  }
  .center_cont {
    width: 100%;
    margin: 0 auto;
    // background: url(../../assets/images/alpha/alpha_bg.png) no-repeat top center;
    // background-size: 100%;
    // background-position: 0px -1000px;
    .center {
      width: 1080px;
      margin: 0 auto;
    }
    .program {
      width: 100%;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 9px 35px 0px rgba(0, 118, 220, 0.75),
        0px 0px 59px 0px rgba(0, 149, 255, 0.49) inset;
      border-radius: 20px;
      position: relative;
      margin-bottom: 38px;
      border: 1px solid #000;

      // pro1
      .tip_pack1 {
        width: 916px;
        height: 90px;
        margin: 0 auto;
        background: rgba(0, 76, 131, 0.5);
        opacity: 0.5;
        border-radius: 45px;
        font-size: 22px;
        font-family: Source Sans Pro;
        font-weight: 500;
        color: #ffffff;
        line-height: 30px;
        text-align: center;
        padding: 23px 30px 20px;
        margin-bottom: 32px;
      }

      .tip_pack2 {
        width: 902px;
        margin: 0 auto;
        font-size: 22px;
        font-family: Source Sans Pro;
        font-weight: 400;
        color: #020d14;
        line-height: 31px;
        text-align: left;
        margin-bottom: 60px;
      }

      .join_now {
        width: 100%;
        height: 78px;
        text-align: center;
        margin-bottom: 96px;
        position: relative;
        img.btn {
          width: 290px;
          height: 78px;
          cursor: pointer;
        }
        img.hand {
          position: absolute;
          width: 62px;
          height: 56px;
          top: 56px;
          right: 360px;
        }
      }

      // pro2
      .title.pro2_title {
        margin-bottom: 65px;
      }
      .pro2_cards {
        width: 916px;
        margin: 0 auto;
        margin-bottom: 50px;
        .pro2_card_items {
          width: 100%;
          height: 112px;
          background: url(../../assets/images/alpha/yellow_card.png) no-repeat
            top center;
          background-size: 100% 100%;
          margin-bottom: 28px;
          overflow: hidden;
          &.c2 {
            background-image: url(../../assets/images/alpha/orange_card.png);
          }
          &.c3 {
            background-image: url(../../assets/images/alpha/red_card.png);
          }
          &.c4 {
            background-image: url(../../assets/images/alpha/sky_card.png);
            .left {
              margin-right: 162px;
            }
          }
          &.c5 {
            background-image: url(../../assets/images/alpha/bulu_card.png);
            .left {
              margin-right: 162px;
            }
          }
          .left {
            float: left;
            margin-top: 22px;
            margin-left: 220px;
            margin-right: 136px;
            width: 200px;
            height: 50px;
            p {
              font-size: 24px;
              font-family: Source Sans Pro;
              font-weight: 400;
              color: #020d14;
              line-height: 31px;
              margin-bottom: 4px;
              &.vm {
                line-height: 60px;
              }
              &.sm {
                font-size: 12px;
                line-height: 14px;
              }
            }
          }
          .right {
            float: left;
            width: 320px;
            height: 100px;
            margin-top: 8px;
            h3 {
              float: left;
              height: 100px;
              font-size: 82px;
              font-family: Source Sans Pro;
              font-weight: 800;
              color: #ffffff;
              line-height: 100px;
            }
            span.db {
              float: left;
              height: 30px;
              font-size: 34px;
              font-family: Source Sans Pro;
              font-weight: 800;
              color: #ffffff;
              line-height: 31px;
            }
            span.star {
              float: left;
              width: 24px;
              height: 23px;
              font-size: 52px;
              font-family: Source Sans Pro;
              font-weight: 800;
              color: #ffffff;
              line-height: 49px;
            }
          }
        }
      }

      .pro2_part {
        text-align: center;
        width: 100%;
        margin-bottom: 170px;
        img {
          width: 496px;
          height: 126px;
        }
      }

      .pro2_total{
        width: 913px;
        margin:0 auto;
        height: 80px;
        background: #D8D8D8;
        border-radius: 40px;
        position: relative;
        margin-bottom: 50px;

        .fill{
          width: 60%;
          height: 80px;
          background: #FDC701;
          border-radius: 40px;
          position: relative;

          .flag{
            position: absolute;
            text-align: right;
            top:-42px;
            right: 0;
            margin-left:-100px;
            font-size: 28px;
            font-family: Source Han Sans SC;
            font-weight: bold;
            color: #2D61B1;
            img{
              position: absolute;
              right:-40px;
              top:-68px;
              width: 70px;
              height: 112px;
              vertical-align: bottom;
            }
          }
        }

        .txt{
          position: absolute;
          left:0;
          top:0;
          width: 100%;
          text-align: center;
          line-height: 80px;
          font-size: 36px;
          font-family: Source Han Sans SC;
          font-weight: 400;
          color: rgba(52, 52, 52, .5);
        }
        
      }

      .pro2_tips {
        width: 913px;
        margin: 0 auto;
        font-size: 22px;
        font-family: Source Sans Pro;
        font-weight: 400;
        color: #020d14;
        line-height: 31px;
        margin-bottom: 11px;
        span.bd {
          font-weight: bold;
          font-size: 22px;
          line-height: 31px;
        }
      }

      .pro2_tips2 {
        width: 913px;
        margin: 0 auto;
        height: 16px;
        font-size: 15px;
        font-family: Source Sans Pro;
        font-weight: 400;
        color: #525252;
        line-height: 31px;
        margin-bottom: 134px;
      }

      // pro3
      .pro3_mate {
        padding: 32px 28px;
        width: 916px;
        margin: 0 auto;
        border: 1px solid #020d14;
        position: relative;
        margin-bottom: 120px;

        h2 {
          width: 123px;
          margin: 0 auto;
          height: 44px;
          border-radius: 22px;
          width: 130px;
          font-size: 30px;
          font-family: Source Sans Pro;
          font-weight: bold;
          line-height: 44px;
          margin-bottom: 18px;
          text-align: center;
          &.mate {
            border: 1px solid #f00d62;
            color: #f00d62;
          }
          &.pack {
            border: 1px solid rgba(0, 76, 131, 1);
            color: rgba(0, 76, 131, 1);
          }
        }
        p.p1 {
          font-size: 22px;
          font-family: Source Sans Pro;
          font-weight: 400;
          color: #020d14;
          line-height: 31px;
          margin-bottom: 13px;
          &.pp {
            margin-bottom: 88px;
          }
        }

        p.p2 {
          font-size: 15px;
          font-family: Source Sans Pro;
          font-weight: 400;
          color: #525252;
          line-height: 24px;
          &:last-child {
            margin-bottom: 76px;
          }
        }

        .btn {
          position: absolute;
          z-index: 999;
          width: 192px;
          height: 124px;
          left: 50%;
          margin-left: -96px;
          bottom: -62px;
          text-align: center;
          background: #fff;
          cursor: pointer;
          img {
            width: 122px;
            height: 122px;
            &.hand {
              width: 52px;
              height: 46px;
              position: absolute;
              right: 20px;
              bottom: -10px;
            }
          }
          span.dot {
            position: absolute;
            width: 9px;
            height: 9px;
            top: 50%;
            margin-top: -4.5px;
            background: #000;
            border-radius: 50%;
            &:first-child {
              left: -4px;
            }
            &:last-child {
              right: -4px;
            }
          }
        }
      }

      .pro3_confir {
        width: 916px;
        margin: 0 auto;
        margin-bottom: 139px;
        .con_item {
          overflow: hidden;
          width: 100%;
          margin-bottom: 20px;
          img {
            width: 35px;
            height: 35px;
            vertical-align: middle;
            margin-left: 13px;
          }
          p {
            display: inline-block;
            vertical-align: middle;
            width: 851px;
            padding: 0 32px;
            font-size: 20px;
            font-family: Source Sans Pro;
            font-weight: 400;
            color: #ffffff;
            line-height: 40px;
            background: rgba(0, 76, 131, 0.5);
            height: 40px;
            border-radius: 20px;
            &.y {
              color: #004c83;
              background: rgba(250, 213, 27, 0.8);
            }
            &.h {
              height: 61px;
              border-radius: 30px;
              line-height: 30px;
            }
          }
        }
      }

      //pro4
      .pro4_books {
        width: 916px;
        margin: 0 auto;
        margin-bottom: 72px;
        overflow: hidden;
        .book_item {
          float: left;
          overflow: hidden;
          margin-right: 39px;
          margin-bottom: 60px;
          cursor: pointer;
          &:nth-child(2n) {
            margin-right: 0;
          }

          img {
            float: left;
            width: 202px;
            height: 282px;
            margin-right: 20px;
          }
          .book_right {
            float: left;
            width: 212px;
            height: 282px;
            padding-top: 7px;
            h3 {
              height: 22px;
              font-size: 22px;
              font-family: Source Sans Pro;
              font-weight: 500;
              color: #020d14;
              line-height: 22px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .author {
              margin-top: 12px;
              margin-bottom: 12px;
              height: 18px;
              font-size: 16px;
              font-family: Source Sans Pro;
              font-weight: 400;
              color: #7fa5c1;
              line-height: 18px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .line {
              width: 26px;
              height: 0;
              border-bottom: 2px solid #5e5e5e;
              margin-bottom: 14px;
            }

            .desc {
              height: 190px;
              font-size: 16px;
              font-family: Source Sans Pro;
              font-weight: 300;
              color: #525252;
              line-height: 21.5px;
              overflow: hidden;
              // text-align: justify;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 9;
              -webkit-box-orient: vertical;
            }
          }
          a {
            width: 0;
            height: 0;
            opacity: 0;
          }
        }
      }

      // pro5
      .title.pro5_title1 {
        margin-bottom: 0;
      }
      .title.pro5_title2 {
        margin-top: 30px;
      }
      .steps {
        width: 916px;
        margin: 0 auto;
        margin-bottom: 72px;
        overflow: hidden;
        .left {
          width: 110px;
          float: left;
          margin-right: 24px;
          .s {
            width: 110px;
            height: 96px;
            background: url(../../assets/images/alpha/yellow_dot.png) no-repeat
              top right;
            background-size: 100% 100%;
            text-align: center;
            line-height: 96px;
            font-size: 23px;
            font-family: Source Sans Pro;
            font-weight: 800;
            color: #ffffff;
            padding-right: 12px;
            &.s1 {
              margin-bottom: 63px;
            }
            &.s2 {
              background-image: url(../../assets/images/alpha/orange_dot.png);
              margin-bottom: 68px;
            }
            &.s3 {
              background-image: url(../../assets/images/alpha/red_dot.png);
            }
          }
        }
        .middle {
          float: left;
          padding-top: 27px;
          position: relative;
          img {
            width: 41px;
            height: 366px;
          }
          .dot {
            position: absolute;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            top: 36px;
            left: 10px;
            background: #fff;
            &:nth-child(3) {
              top: 196px;
            }
            &:nth-child(4) {
              top: 362px;
            }
          }
        }
        .right {
          float: left;
          overflow: hidden;
          .s {
            margin-bottom: 60px;
            .line {
              display: inline-block;
              width: 36px;
              height: 0;
              border: 1px solid rgba(250, 214, 29, 1);
              vertical-align: middle;
              &.l2 {
                border: 1px solid rgba(240, 135, 13, 1);
              }
              &.l3 {
                border: 1px solid rgba(240, 13, 98, 1);
              }
            }
            .content {
              vertical-align: middle;
              display: inline-block;
              width: 700px;
              height: 80px;
              background: url(../../assets/images/alpha/yellow_cir.png)
                no-repeat top center;
              background-size: 100% 100%;
              font-size: 22px;
              font-family: Source Sans Pro;
              font-weight: 500;
              color: #020d14;
              line-height: 36px;
              margin-top: 8px;
              margin-left: -6px;
              padding-left: 36px;
              padding-top: 5px;
              &.c2 {
                background-image: url(../../assets/images/alpha/orange_cir.png);
                height: 110px;
                line-height: 20px;
                padding-top: 16px;
              }
              &.c3 {
                background-image: url(../../assets/images/alpha/red_cir.png);
              }
              .y {
                color: rgba(250, 214, 29, 1);
                font-size: 22px;
                font-family: Source Sans Pro;
                font-weight: 500;
                line-height: 36px;
                &.y2 {
                  color: rgba(240, 135, 13, 1);
                }
                &.y3 {
                  color: rgba(240, 13, 98, 1);
                }
              }
            }
          }
        }
      }

      .qas {
        width: 916px;
        margin: 0 auto;
        margin-bottom: 80px;
        .qas_item {
          width: 100%;
          margin-bottom: 36px;

          .top {
            background-image: linear-gradient(
              90deg,
              rgba(253, 199, 1, 0.3),
              rgba(255, 255, 255, 0.3)
            );
            border-radius: 20px;
            margin-bottom: 13px;
            position: relative;
            padding-left: 56px;

            img {
              // float: left;
              width: 40px;
              height: 40px;
              margin-right: 16px;
              position: absolute;
              left: 0;
            }
            h4 {
              float: left;
              // height: 40px;
              line-height: 40px;
              font-size: 24px;
              font-family: Source Sans Pro;
              font-weight: 400;
              color: #004c83;
              line-height: 40px;
            }
          }
          .bot {
            padding-left: 57px;
            font-size: 22px;
            font-family: Source Sans Pro;
            font-weight: 400;
            color: #525252;
            line-height: 28px;
          }
        }
      }

      // public
      .title {
        margin-top: 100px;
        height: 46px;
        line-height: 46px;
        text-align: center;
        margin-bottom: 64px;
        .t_img,
        h2 {
          display: inline;
          vertical-align: top;
          font-size: 58px;
          font-family: Source Sans Pro;
          font-weight: 800;
          color: #004c83;
          margin-right: 12px;
        }
        .t_img {
          width: 80px;
          height: 40px;
        }
      }

      img.dot {
        width: 22px;
        height: 22px;
        position: absolute;
        &.dot1 {
          top: 34px;
          left: 40px;
        }
        &.dot2 {
          top: 34px;
          right: 40px;
        }
        &.dot3 {
          bottom: 37px;
          left: 40px;
        }
        &.dot4 {
          bottom: 37px;
          right: 40px;
        }
      }

      img.chain {
        width: 36px;
        height: 194px;
        position: absolute;
        &.chain1 {
          left: 118px;
          top: -116px;
        }
        &.chain2 {
          right: 118px;
          top: -116px;
        }
      }
    }

    .btm {
      margin-top: 80px;
      padding-bottom: 57px;
      background: rgba(0, 0, 0, 0);
      p {
        text-align: center;
        color: rgba(127, 127, 127, 1);
        line-height: 44px;
      }
      .p1 {
        font-size: 20px;
      }
      .p2 {
        font-size: 28px;
        a.red {
          line-height: 44px;
          font-size: 28px;
          color: rgba(240, 13, 98, 1);
          cursor: pointer;
        }
      }
    }
  }
}

.mask_contain {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  .mask {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 926px;
    min-height: 510px;
    margin-top: -255px;
    margin-left: -463px;
    background: url(../../assets/images/alpha/mask.png) no-repeat top center;
    background-size: 92%;
    padding-top: 134px;
    img {
      width: 52px;
      height: 52px;
      position: absolute;
      top: 66px;
      right: 135px;
    }
    p {
      margin: 0 auto;
      width: 403px;
      font-size: 30px;
      font-family: Source Han Sans SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 42px;
      text-align: center;
      margin-bottom: 100px;
    }
    span {
      display: block;
      margin: 0 auto;
      width: 234px;
      height: 78px;
      background: #F6D908;
      border-radius: 37px;
      line-height:78px;
      text-align: center;
      font-size: 27px;
      font-family: Source Han Sans SC;
      font-weight: bold;
      color: #003462;
      position: absolute;
      bottom:115px;
      left:50%;
      margin-left:-127px;
    }
  }
}
</style>
