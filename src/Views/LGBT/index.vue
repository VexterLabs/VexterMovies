<!--
 * @Description:
 * @FilePath: \haiwai_pc\src\Views\LGBT\index.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2020-05-27 13:45:54
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-08-17 17:04:55
-->
<template>
  <div class="lgbt">
    <a
      href="https://forum.goodnovel.com/index.php?p=/discussion/53/%E2%80%8D-i-want-my-love-story-to-begin-writing-contest"
      target="_blank"
      class="banner"
    >
      <img src="../../assets/images/banner/LGBTbanner.png" alt="LGBT" title="GoodNovel" />
      <p class="lgbanner_wd">
        GoodNovel Pride Month Contest
        <br />Up to 1000 USD
      </p>
      <a
        href="https://forum.goodnovel.com/index.php?p=/discussion/53/%E2%80%8D-i-want-my-love-story-to-begin-writing-contest"
        class="lgbt_start"
      >Start Now</a>
    </a>
    <div class="forum">
      <div class="left">
        <div class="sp">
          <h3>LGBTQ+ stands for</h3>
          <span class="info_item">
            <span class="font">LESBIAN</span>
            <span class="bg b1"></span>
          </span>
          <br />
          <span class="info_item">
            <span class="font">GAY</span>
            <span class="bg b2"></span>
          </span>
          <br />
          <span class="info_item">
            <span class="font">BISEXUAL</span>
            <span class="bg b3"></span>
          </span>
          <br />
          <span class="info_item">
            <span class="font">TRANSGENDER</span>
            <span class="bg b4"></span>
          </span>
          <br />
          <span class="info_item">
            <span class="font">QUEER/QUESTIONING</span>
            <span class="bg b5"></span>
          </span>
          <br />
          <p class="detail">
            The“+”stands for anyone else who’s not included, such as asexual, non-binary, pansexual, and many other
            terms.
            <br />
            <br />Let’s celebrate Pride Month this June with GoodNovel!
            <br />
            <br />Come, explore a special collection of stories, films, series that explore the LGBTQ experience around
            the world!
          </p>
        </div>
      </div>

      <div class="right">
        <a
          href="javascript:;"
          @click="forumLogClick(forumActions[index])"
          target="_blank"
          class="item"
          v-for="(item,index) in forumInfo"
          :key="index"
        >
          <div class="item_right">
            <img :src="item.cover" :alt="item.title" />
          </div>

          <div class="item_left">
            <h2>🏳‍🌈{{item.title}}</h2>
            <p class="item_detail">{{item.detail}}</p>
            <!-- <p class="item_date">2020-05-26</p> -->
          </div>
        </a>
      </div>
    </div>
    <!-- _lbgt -->
    <div class="container_lbgt">
      <div class="books_lbgt">
        <h2>🔥LGBTQ+ Coming Out</h2>

        <div class="book_content_lbgt">
          <ul class="itsl_ul_lbgt">
            <li v-for="(item, index) in items" :key="index" @click.prevent="logClick(item)">
              <div class="itslu_a_lbgt" :to="{ path: item.url, query: item.search }">
                <div class="itslu_img_lbgt">
                  <img v-lazy="item.cover" :alt="item.bname" />
                </div>

                <div class="itslu_main_lbgt">
                  <h3>{{ item.bname }}</h3>
                  <div class="itslum_other_lbgt">
                    <strong>{{ item.bauthor }}</strong>
                    <!-- <span>{{ item.bviews }} views</span> -->
                  </div>
                  <p>{{ item.introduction }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatSpace } from "@/core/js/common.js";
export default {
  name: "lgbtPage",
  data() {
    return {
      forumActions: [
        "https://forum.goodnovel.com/index.php?p=/discussion/77/i-like-women-and-then-men-and-now-both/p1?new=1",
        "https://forum.goodnovel.com/index.php?p=/discussion/72/south-africa-our-country-may-be-dangerous-but-the-lgbt-live-freely",
        "https://forum.goodnovel.com/index.php?p=/discussion/71/have-you-ever-fell-in-love-with-your-same-sex-teacher/p1?new=1",
        "https://forum.goodnovel.com/index.php?p=/discussion/85/sida-jiang-i-had-dinner-with-7-hiv-positive-carriers/p1?new=1"
      ],
      forumInfo: [

        // TODO:以上假数据
        {
          title: 'I like women and then men...and now both',
          detail:
            "He never thought himself as odd, as he had watched porn and even had his first girlfriend during high school. Hanging out with the basketball team created a completely new sensation in him: the physique, the masculinity it set off emotions that he never knew he had.",
          cover: require("../../assets/images/lgbt/1.png")
        },
        {
          title:
            "South Africa –“Our country may be dangerous but the LGBT live freely”",
          detail:
            "South Africa may be seen by some as a violent country, yet the LGBT have lots of legal protection and the country has the most progressive LGBT laws in all of Africa.",
          cover: require("../../assets/images/lgbt/2.png")
        },
        {
          title: "Have you ever fell in love with your same-sex teacher?",
          detail:
            "This is the time when my dream will come true, though I know the request I'm gonna make is so very humiliating. I told the teacher that I'm going to her home to sleep with her! My face was burning up even ...",
          cover: require("../../assets/images/lgbt/3.png")
        },
        {
          title: "Sida Jiang: I had dinner with 7 HIV positive carriers",
          detail:
            "An HIV-infected person is likely to be refused employment, to lose friends, and to suffer all kinds of stigma, ostracism whether its in the school, the community, or the workplace.",
          cover: require("../../assets/images/lgbt/4.png")
        }
      ],
      items: [
        {
          bookId: 21000001800,
          cover: "https://res.goodnovel.com/books/800/21000001800/cover-PXev9ftfKa.jpg",
          bname: "Free Me",
          bauthor: "Kat",
          bviews: 11,
          introduction: "Josh has never been able to come out, his fear controls him and keeps him in the closet. Fear of cruelty and ridicule being taken out on him and his family keeps him trapped.↵Zayne owns who he is, but at a price. He faces pain and beatings and verbal abuse daily at the cost of being true to himself, and in turn has buried himself in pain and self loathing.↵What happens when these two come together? Can they break down the walls that keep them trapped? Can they save each other? Can they ever be free?"

        },
        {
          bookId: 21000001462,
          cover: "https://res.goodnovel.com/books/462/21000001462/cover-C0mjUSgQDm.jpg",
          bname: "The billionaire's son",
          bauthor: "littleotter23",
          bviews: 549,
          introduction: "Mateo is a normal boy living a normal life. He's gay but is perfectly in peace with himself, thanks to a supportive family. Very outgoing, frank and happy, he hides some scars behind his confidence. Liam is the son of a very rich man who is the CEO of a huge hotel company. He's rich and gorgeous, but social and familial pressures make him uncomfortable with his life. What will happen when the two of them meet?"
        },
        {
          bookId: 21000001642,
          cover: "https://res.goodnovel.com/books/642/21000001642/cover-Cp17k37NzB.jpg",
          bname: "Falling, Fallen. ",
          bauthor: "expastelline_",
          bviews: 8,
          introduction: "Roy Blanche dosen't do love and cares less about how others view him. But a chance encounter with a freshman of his college, Jeremy Dahl, changes everything. Jeremy can evoke the long dormant emotions in Roy and hence Roy has started thinking otherwise. You know it, the feeling of being in love, just beautiful."

        },
        {
          bookId: 21000001437,
          cover: "https://res.goodnovel.com/books/437/21000001437/cover-gwcx8U1Izx.jpg",
          bname: "You can't lie",
          bauthor: "Faith Odulesi",
          bviews: 14,
          introduction: "A liar gas has invaded the world permanently. Nobody can lie, else an instant death. Ariyah has commited herself to remaining silent for the rest of her life. Her family thinks it is just because she is afraid of death, but how can she hide the fact that she is bisexual now that she can't lie? ↵↵Will she come out to everyone and move on with life or will she let the liar gas rule her world and make her a mute, till she actually dies?↵↵You can't lie! "

        },

        {
          bookId: 21000001385,
          cover: "https://res.goodnovel.com/books/385/21000001385/cover-xg90MIiIyw.jpg",
          bname: "He Didn't Say a Word",
          bauthor: "Matthew Lee Bandy",
          bviews: 34,
          introduction: "Killian Flinn finds himself breaking his own silence pact for the boy who used to live next door. Blaine Marston still thinks he is a killer, but finds the sad truth about why they call Killian 'Blue'."
        },
        {
          bookId: 21000001706,
          cover: "https://res.goodnovel.com/books/706/21000001706/cover-OponZT7EcA.jpg",
          bname: "Theory Of The Constant Melody",
          bauthor: "Hosea Paisley",
          bviews: 24,
          introduction: "Cyan Clarkson is considered to be a life and love consultant. After having a breakup with his ex-girlfriend, Acherous Miller gradually gets over him with the help of his bestfriend Cyan. They are comrade and living under the same roof in the apartment on Sunrise Boulevard. Not wanting to discover his feeling towards Acherous, Cyan acts normally whever he's around. Furthermore, he never shows his homosexual appearance as he's afraid—not of judgment—rather of Acherous will leave him behind. ↵↵Moreover, as a vocalist, Cyan actually regards music as his haven; meanwhile Acherous takes in charge with the strumming of the guitar to create melody. ↵↵With their friendship, is there a chance that Acherous has a special feeling too for his best friend? Or will it be just the constant melody—as friendship... only?  "

        },

        {
          bookId: 21000001735,
          cover: "https://res.goodnovel.com/books/735/21000001735/cover-8fPm2srJiL.jpg",
          bname: "Impossible mixtures",
          bauthor: "Purple lily",
          bviews: 77,
          introduction: "In a school where vampires dominate and klaus a single human surfaces by mistake  which makes everything f*cked up for him and everyone "
        },
        {
          bookId: 21000001699,
          cover: "https://res.goodnovel.com/books/699/21000001699/cover-wKXGzvvVmv.jpg",
          bname: "Together, We Conquer",
          bauthor: "Nathan Frost",
          bviews: 9,
          introduction: "SINGTO PETERSON is a quiet, polite teenager and has many secrets. KRIST ROBINSON is a short-tempered, bad-mouthed teenager with serious trust issues. Both teens have experienced hardships within their family dynamics, which ended up bringing them closer together. Life works in the most mysterious of ways and often times allows us to learn through experiences and people. The only question is, are we willing to open up both of our eyes and heart and accept them?↵↵Will the two unlikely duos find a way to fill the void they feel within their hearts or will they remain nothing more than roommates?"

        },
        {
          bookId: 21000001618,
          cover: "https://res.goodnovel.com/books/618/21000001618/cover-DnotelJmWP.jpg",
          bname: "Tears of a sad Goodbye",
          bauthor: "Hueghin",
          bviews: 38,
          introduction: 'The ocean is quiet, the smell of the fresh air and the coldness of the wind that makes my heart float from mid-air. The sound of the waves that is splashing on the shore, the warm water from the ocean that gently touched my toes. I stared at the sky to prevent the tears from crawling down to my lashes. " I`m ready Dilan" " phew" I released a heavy sigh " this is it" I stood up and walked slowly near the shore. " hey stop!! Stop" I heard someone shouted, but I don`t care at all, right now all I need is to remove all the pain that I am feeling right now, I need to end this suffering, I need to follow him I loved him. " Hey what do you think you are doing, " the man wearing a black polo shirt said as he pulled me back to the shore " I... I want to end this," I said as I cry like a baby " Hey mung, don`t do that.. think of your family, friends," he said I don`t even know this person and why the heck is he invading my life I stared at him and I was shocked when I saw his face, am I dreaming? Is this real? What the hell? There are things that science can`t explain. Is this a blessing from up above? Or did Dilan gave me this man because he knows that I will be lonely without him? I find something interesting, Dilan gave me something to treasure, to love and to trust.'

        }
      ]
    };
  },
  methods: {
    logClick(item) {
      $logClick({
        module: "LGBT_page_books",
        zone: "djsj", // 点击书籍
        adid: "click_lgbt_book" // 点击书籍条目
      });
      this.$router.push("/book_info/" + item.bookId +'/lgbt/'+formatSpace(item.bname));
    },
    forumLogClick(url) {
      window.location.href = url;

      $logClick({
        module: "LGBT_page_books",
        zone: "djlttz", // 点击论坛跳转
        adid: "click_forum_item" // 点击论坛条目
      });
    }
  }
};
</script>
<style lang="scss">
.lgbt {
  min-width: 1360px;
  background-color: #fff;
  .banner {
    display: block;
    width: 100%;
    font-size: 0;
    margin-bottom: 0.09rem;
    position: relative;
    img {
      width: 100%;
      min-height: 600px;
    }
    .lgbanner_wd {
      position: absolute;
      bottom: 140px;
      left: 16.4%;
      width: 400px;
      height: 67px;
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(34, 34, 34, 1);
      line-height: 36px;
    }
    .lgbt_start {
      position: absolute;
      bottom: 36px;
      left: 16.4%;
      width: 238px;
      height: 71px;
      background: rgba(238, 55, 153, 1);
      box-shadow: 0px 10px 12px 0px rgba(252, 37, 187, 0.2);
      border-radius: 10px;
      font-size: 24px;
      font-family: HiraginoSansGB-W6, HiraginoSansGB;
      font-weight: normal;
      color: rgba(255, 255, 255, 1);
      line-height: 71px;
      text-align: center;
    }
  }

  .forum {
    width: 1300px;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 56px;
    .left {
      width: 36%;
      float: left;
      .sp {
        margin-bottom: 0.1rem;

        h3 {
          height: 44px;
          font-size: 32px;
          font-family: HiraginoSansGB-W6, HiraginoSansGB;
          font-weight: normal;
          color: rgba(34, 34, 34, 1);
          line-height: 48px;
          margin-bottom: 24px;
          font-weight: bold;
        }
        .info_item {
          position: relative;
          margin-bottom: 10px;

          .font {
            position: relative;
            left: 0;
            top: 0;
            z-index: 10;
            height: 44px;
            font-size: 18px;
            font-family: HiraginoSansGB-W6, HiraginoSansGB;
            font-weight: normal;
            color: rgba(34, 34, 34, 1);
            line-height: 44px;
            font-weight: bold;
          }

          .bg {
            position: absolute;
            z-index: 5;
            width: 100%;
            height: 14px;
            border-radius: 4px;
            bottom: 0;
            left: 10px;

            &.b1 {
              background-color: rgba(254, 144, 95, 1);
            }

            &.b2 {
              background-color: rgba(255, 236, 124, 1);
            }

            &.b3 {
              background-color: rgba(160, 255, 182, 1);
            }

            &.b4 {
              background-color: rgba(145, 220, 255, 1);
            }

            &.b5 {
              background-color: rgba(174, 151, 255, 1);
            }
          }
        }
      }

      .detail {
        margin-top: 20px;
        width: 360px;
        height: 240px;
        font-size: 16px;
        font-family: SourceHanSansSC-Normal, SourceHanSansSC;
        font-weight: 400;
        color: rgba(34, 34, 34, 1);
        line-height: 24px;
      }
    }
    .right {
      float: right;
      width: 63%;
      .item {
        display: inline-block;
        width: 100%;
        margin-bottom: 24px;
        overflow: hidden;
        .item_left {
          float: left;
          width: 559px;
          height: 140px;
          position: relative;
          h2 {
            // height: 32px;
            font-size: 20px;
            font-family: SourceHanSansSC-Normal, SourceHanSansSC;
            color: rgba(34, 34, 34, 1);
            line-height: 32px;
            margin-bottom: 8px;
            // overflow: hidden;
            // text-overflow: ellipsis;
            // white-space: nowrap;
          }
          .item_detail {
            height: 54px;
            font-size: 16px;
            font-family: SourceHanSansSC-Normal, SourceHanSansSC;
            font-weight: 400;
            color: rgba(34, 34, 34, 1);
            line-height: 23px;
          }
          .item_date {
            position: absolute;
            bottom: 0px;
            left: 0px;
            height: 17px;
            font-size: 12px;
            font-family: SourceHanSansSC-Normal, SourceHanSansSC;
            font-weight: 400;
            color: rgba(34, 34, 34, 0.6);
            line-height: 18px;
          }
        }
        .item_right {
          float: left;
          width: 240px;
          height: 140px;
          background: rgba(58, 74, 90, 0.05);
          border-radius: 4px;
          overflow: hidden;
          margin-right: 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

  .container_lbgt {
    width: 100%;
    padding-top: 56px;
    background: rgba(244, 246, 248, 1);

    .books_lbgt {
      width: 1300px;
      margin: 0 auto;

      h2 {
        height: 60px;
        font-size: 32px;
        font-family: HiraginoSansGB-W6, HiraginoSansGB;
        font-weight: normal;
        color: rgba(34, 34, 34, 1);
        line-height: 48px;
        font-weight: bold;
        margin-bottom: 33px;
      }
    }
  }
}

.itsl_ul_lbgt {
  overflow: hidden;
  margin: 0 0 16px -30px;
}
.itsl_ul_lbgt li {
  float: left;
  margin: 0 0 57px 24px;
}
.itslu_a_lbgt {
  display: block;
  cursor: pointer;
}
.itslu_img_lbgt {
  float: left;
  overflow: hidden;
  width: 114px;
  height: 152px;
  border-radius: 4px;
  box-shadow: 0px 6px 10px 0 rgba(0, 0, 0, 0.08);
  background: rgba(58, 74, 90, 0.05);
  border: 1px solid rgba(58, 74, 90, 0.1);
  border-radius: 4px;
  margin-right: 20px;
}
.itslu_img_lbgt img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 4px;
}
.itslu_main_lbgt {
  overflow: hidden;
  margin-left: 136px;
  width: 280px;
}
.itslu_main_lbgt h3 {
  overflow: hidden;
  margin-bottom: 5px;
  max-height: 56px;
  height: 33px;
  font-size: 19px;
  font-family: SourceHanSansSC-Bold, SourceHanSansSC;
  font-weight: bold;
  color: rgba(34, 34, 34, 1);
  line-height: 33px;
  font-weight: bold;
  display: -webkit-box;/* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  word-break: break-word;
  -webkit-line-clamp: 1;
}
.itslum_other_lbgt {
  margin-bottom: 5px;
  overflow: hidden;
  height: 26px;
  font-size: 17px;
  font-family: SourceHanSansSC-Regular, SourceHanSansSC;
  font-weight: 400;
  color: rgba(34, 34, 34, 0.6);
  line-height: 26px;
}
.itslum_other_lbgt strong {
  overflow: hidden;
  float: left;
  width: 50%;
  height: 26px;
  font-size: 17px;
  font-family: SourceHanSansSC-Regular, SourceHanSansSC;
  font-weight: 400;
  color: rgba(34, 34, 34, 0.6);
  line-height: 26px;
  text-align: left;
  display: -webkit-box;/* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.itslum_other_lbgt span {
  overflow: hidden;
  float: left;
  height: 26px;
  font-size: 17px;
  font-family: SourceHanSansSC-Regular, SourceHanSansSC;
  font-weight: 400;
  color: rgba(34, 34, 34, 0.6);
  line-height: 26px;
  font-weight: normal;
  text-align: right;
  display: -webkit-box;/* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.itslu_main_lbgt p {
  overflow: hidden;
  display: -webkit-box;/* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  height: 86px;
  font-size: 19px;
  font-family: SourceHanSansSC-Regular, SourceHanSansSC;
  font-weight: 400;
  color: rgba(34, 34, 34, 1);
  line-height: 29px;
}
</style>
