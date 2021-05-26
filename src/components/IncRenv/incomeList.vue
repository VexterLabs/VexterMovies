<template>
  <div>
    <div class="income">
      <div class="tip_title">
        <div class="right color_red">$ {{Number(incomeGeneralData.totalBookIncome || '0.00').toFixed(2)}}</div>
        <div class="left">
          <h2>Profit Share</h2>
          <span>{{incomeGeneralData.bookIncomeList && incomeGeneralData.bookIncomeList.length}} Work(s)</span>
        </div>
      </div>
      <div v-if="incomeGeneralData.bookIncomeList && incomeGeneralData.bookIncomeList.length > 0">
        <div v-for="(item,index) in incomeGeneralData.bookIncomeList" class="item" :key="index" :bookId="item.bookId">
          <img :src="item.bookCover" alt="">
          <span class="name">{{item.bookName}}</span>
          <span class="money">$ {{item.bookIncome}}</span>
        </div>
      </div>
      <!-- <null-wallet v-else :content="content1"></null-wallet> -->
    </div>
    <div class="work_data">
      <div class="table_container">
        <div class="tip_title n_b">
          <div class="right color_org"><span class="est">Estimated</span> $ {{Number(incomeGeneralData.attendanceBonus).toFixed(2)}}</div>
          <div class="left">
            <h2>
              Attendance Bonus
              <span class="lastupdt">Data concerned Words and Update days are from two days ago</span>
            </h2>
            <span>{{incomeGeneralData.bookReleaseInfoResponseList && incomeGeneralData.bookReleaseInfoResponseList.length}} Work(s)</span>
          </div>
        </div>
        <table v-if="incomeGeneralData.bookReleaseInfoResponseList && incomeGeneralData.bookReleaseInfoResponseList.length > 0" cellpadding="4" cellspacing="0">
          <thead>
            <th class="t3">Book title</th>
            <th class="t4">Contract type</th>
            <th>Premium words</th>
            <th>Release days</th>
            <th>Attendance bonus</th>
            <th>Total premium words</th>
          </thead>
          <tbody v-if="incomeGeneralData.bookReleaseInfoResponseList && incomeGeneralData.bookReleaseInfoResponseList.length > 0">
            <tr v-for="(item, key) in incomeGeneralData.bookReleaseInfoResponseList" :key="key" :class="{'bg_tr': (key%2==1)}">
              <td class="t3">
                <div>{{item.bookName}}</div>
              </td>
              <td>{{item.contractType}}</td>
              <td>{{item.premiumWords || 0}}</td>
              <td>{{item.releaseDays || 0}}</td>

              <!-- 全勤奖的合并单元格 -->
              <td v-if="item.length" :rowspan="item.length">Estimate: $ {{Number(item.attendanceBonus || 0.00).toFixed(2)}}</td>

              <!-- 无全勤奖的合并单元格 非合约或者没有满足20天的书籍 -->
              <td v-else-if="(item.contractType != 'EXCLUSIVE') || !item.attendance">0.00</td>

              <td>{{item.totalPremiumWords || 0}}</td>
            </tr>
          </tbody>
        </table>

        <!-- <null-wallet style="margin-bottom:24px;" v-if="incomeGeneralData.bookReleaseInfoResponseList.length == 0" :content="content2"></null-wallet> -->

        <table class="rule" cellpadding="8" cellspacing="0">
          <caption>Calculated attendance bonus：</caption>
          <thead>
            <th class="t1">Exclusive book's premium words</th>
            <th class="t2">Release frequency requirement</th>
            <th>Attendance bonus</th>
            <th class="nrb">Note</th>
          </thead>
          <tbody>
            <tr>
              <td class="num t1">>= 80,000</td>
              <td
                rowspan="3"
                class="nbb t2 req"
              > A new-chapter-release <br>
                frequency reaches or higher <br>
                than 20 days per month.
              </td>

              <td class="num">＄400.00</td>
              <td rowspan="3" class="note_td">
                1. No uploading days required for the 1st month's attendance bonus of newly signed exclusive books. If the number of updated words in the first month is less than 40,000 words: Attendance bonus will be (the number of exclusive words) ÷ (40,000 words) x (200 USD). The minimum amount paid is 6 USD. These premium words will not be calulated together with the existing books by the same author. <br>
                2. Attendance Bonus is offered only to Exclusive Contracts. <br>
                *Example <br>
                If new books are signed when you have old books on going, you will be eligible to multiple shares of attendance bonus: one for each of the new books of the month they are signed in, and one for ALL books that are in their second or later month combined.
              </td>
            </tr>
            <tr>
              <td class="num t1">>= 60,000</td>
              <td class="num">＄300.00</td>
            </tr>
            <tr>
              <td class="nbb num t1">>= 40,000</td>
              <td class="nbb num">＄200.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="table_container">
        <div class="tip_title n_b">
          <div class="right color_blue"> $ {{Number(incomeGeneralData.totalPlatformAward || '0.00').toFixed(2)}}</div>
          <div class="left">
            <h2 class="bt_h2">Others</h2>
          </div>
        </div>
      </div>

      <div class="table_container">
        <div class="tip_title n_b">
          <div class="right color_pur"> $ {{Number(incomeGeneralData.carriedOver || '0.00').toFixed(2)}}</div>
          <div class="left">
            <h2 class="bt_h2">Carried Over</h2>
          </div>
        </div>
      </div>

    </div>
    <div class="income_statement">
      <h3>Income statement:</h3>
      <h4>Definitions:</h4>
      <p>Total Revenue: Your full history income occured with GoodNovel.</p>
      <p>Month Revenue: Income occured in one perticular month.</p>
      <p>Attendance Bonus: This bonus offered to only Exclusive contracts ONLY occurs when your update in a natural month meets both the word count </p>
      <p>AND frequency requirements.</p>
      <p>Carry Over: Put your month revenue on hold till next month.</p>
      <p>*Note: Any month revenue less than $100 will be automatically carried over to the next month.</p>

      <h4>Payment Process:</h4>
      <p>Your month revenue will be paid to your account on 10th every month, provided that you have filled in your payment info before 1st of that month.</p>
      <p>*Note: International transactions take 10 work days to process.</p>
      <p>*If you have any questions, please contact your editor.</p>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import NullWallet from "@/components/Common/NullWalet.vue";
export default {
  mounted(){
  },
  components: {
    NullWallet
  },
  data() {
    return {
      content1:"You have no income from subscription yet.",
      content2: "You have no signed books yet.",
      date: "",
      formatData: [],
      attendlength: 0
    };
  },
  computed: {
    ...mapState({
      // incomeList: state => state.moduleUserCenter.incomeList,
      // workDataList: state => state.moduleUserCenter.workDataList,
      attendanceBonus: state => state.moduleUserCenter.attendanceBonus,
      incomeGeneralData: state=>state.moduleUserCenter.incomeGeneralData, // 收入数据总览
    }),
    dealDate() {
      if (this.date) {
        return `${this.date.split("-")[0]}.${this.date.split("-")[1]}`;
      } else {
        return "";
      }
    }
  },
  methods: {
    getTime() {
      let date = new Date();
      let month =
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1);
      this.date = `${date.getFullYear()}-${month}`;
    }
  },
};
</script>
<style lang='scss' scoped>
.work_data {
  width: 100%;

  .table_container {
    padding: 0px 20px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    background: #fff;
    margin-top: 16px;
    table {
      width: 100%;
      text-align: center;
      margin-bottom: 36px;
      border-radius: 4px;
      border: 0.5px solid rgba(0, 0, 0, 0.05);
      overflow: hidden;
      tr.bg_tr{
        background:rgba(245, 246, 250, 1);
      }
      th,
      td {
        font-family: Helvetica;
        color: rgba(67, 83, 102, 1);
        font-size: 16px;
        font-weight: 500;
        height: 64px;
        text-align: center;
      }
      th {
        font-size: 16px;
        font-family: Helvetica-Bold, Helvetica;
        font-weight: bold;
        color: #435366;
        line-height: 16px;
        background:rgba(245, 246, 250, 1);
      }
      td.num {
        font-size: 16px;
        font-family: SourceHanSansSC-Regular, SourceHanSansSC;
        font-weight: 400;
        color: rgba(67, 83, 102, 1);
        line-height: 28px;
      }
      .t3 {
        width: 32.36%;
        max-width: 32.36%;
        div {
          padding-left: 12px;
          display: -webkit-box;/* autoprefixer: ignore next */
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
      }
      .t4 {
        width: 12.13%;
      }
    }
    .rule {
      background: rgba(245, 246, 250, 1);
      border-radius: 4px;
      margin-bottom: 24px;
      caption {
        padding: 16px 2px ;
        text-align: left;
        height: 18px;
        font-size: 18px;
        font-weight: bold;
        font-family: Helvetica;
        color: #435366;
        line-height: 18px;
      }
      th{
        width: 119px;
        height: 78px;
        font-size: 14px;
        font-family: Helvetica-Bold, Helvetica;
        font-weight: bold;
        color: #3A4A5A;
        line-height: 14px;
        border-right: 1px solid rgba(239, 240, 243, 1);
        &:last-child{
          border:none;
        }
      }
      tr{
        height: 80px;
      }
      td{
        font-size: 16px;
        font-family: Helvetica;
        color: rgba(67, 83, 102, 1);
        line-height: 16px;
        border-right: 1px solid rgba(239, 240, 243, 1);
        border-top: 1px solid rgba(239, 240, 243, 1);
        &.note_td{
          font-size: 12px;
          font-family: Helvetica;
          color: #3A4A5A;
          line-height: 16px;
          text-align: left;
          padding:0 4px;
          border-right:none;
        }
        &.req{
          font-size: 12px;
          font-family: Helvetica;
          color: #3A4A5A;
          line-height: 20px;
        }
      }
      .t1 {
        width: 16.6%;
      }
      .t2 {
        width: 33.33%;
      }
    }
  }
}

.income {
  padding: 0px 24px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background: #fff;
  margin-top: 16px;
  .item {
    overflow: hidden;
    padding: 0 8px;
    margin-bottom: 40px;
    img{
      width: 48px;
      height: 64px;
      border-radius: 4px;
      border: 1px solid rgba(58, 74, 90, 0.1);
      background:rgba(58, 74, 90, 0.1);
      margin-right: 20px;
      vertical-align: middle;
    }
    .name{
      display: inline-block;
      box-sizing: border-box;
      width: 800px;
      font-size: 20px;
      font-family: Helvetica-Bold, Helvetica;
      font-weight: bold;
      color: #3A4A5A;
      line-height: 20px;
      vertical-align: middle;
      padding-right:20px;
    }
    .money{
      height: 20px;
      font-size: 20px;
      font-family: Helvetica-Bold, Helvetica;
      font-weight: bold;
      color: #3A4A5A;
      line-height: 20px;
      text-align:right;
      margin-top: 22px;
      float: right;
    }



    .left {
      width: 66px;
      height: 88px;
      float: left;
      margin-right: 25px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
    }
    .right {
      float: left;
      width: 930px;
      box-sizing: border-box;
      .top {
        overflow: hidden;
        margin-bottom: 10px;
        .book-name {
          float: left;
          font-family: SourceHanSansCN-Bold, SourceHanSansCN;
          font-weight: bold;
          color: rgba(58, 74, 90, 1);
          font-size: 20px;
        }
        .settled {
          font-size: 14px;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: rgba(58, 74, 90, 0.6);
          float: right;
        }
      }
      .bottom {
        width: 100%;
        height: 72px;
        box-sizing: border-box;
        padding: 20px 30px;
        // background: rgba(0, 0, 0, 0.05);
        border-radius: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
        .inner-item {
          float: left;
          width: 80%;
          font-size: 20px;
          font-family: SourceHanSansSC-Bold, SourceHanSansSC;
          font-weight: bold;
          color: rgba(58, 74, 90, 1);
          line-height: 29px;
          // margin-right: 80px;
          .title {
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: rgba(58, 74, 90, 0.6);
            font-size: 12px;
            // text-align: center;
          }
          .money {
            font-family: SourceHanSansCN-Bold, SourceHanSansCN;
            font-weight: bold;
            color: rgba(58, 74, 90, 1);
            font-size: 16px;
            margin-top: 2px;
            text-align: center;
          }
        }
        .total-money {
          float: right;
          text-align: center;
          margin-top:-12px;
          .topl {
            height: 22px;
            font-size: 14px;
            font-family: SourceHanSansSC-Regular, SourceHanSansSC;
            font-weight: 400;
            color: rgba(58, 74, 90, 0.6);
            line-height: 22px;
          }
          .mo {
            line-height: 40px;
            color: #334455;
            font-size: 32px;
            font-weight: bold;
          }
        }
      }
    }
  }

}

.tip_title{
  height: 96px;
  background: #FFFFFF;
  border-bottom: 1px solid rgba(238, 238, 238, 1);
  margin-bottom: 24px;
  &.n_b{
    border-bottom: none;
    margin-bottom: 0px;
  }
  .left{
    padding-top: 24px;
    h2{
      height: 24px;
      font-size: 24px;
      font-family: Helvetica-Bold, Helvetica;
      font-weight: bold;
      color: rgba(58, 74, 90, 1);
      line-height: 24px;
      margin-bottom: 8px;
      &.bt_h2{
        line-height: 50px;
      }
      .lastupdt{
        // position: relative;
        // top:9px;
        // left:20px;
        color: rgb(255, 81, 81);
      }
    }
    span{
      height: 16px;
      font-size: 16px;
      font-family: Helvetica;
      color: rgba(58, 74, 90, .6);
      line-height: 16px;
    }
  }
  .right{
    float: right;
    line-height: 96px;
    font-size: 32px;
    font-family: Helvetica-Bold, Helvetica;
    font-weight: bold;
    overflow: hidden;
    &.color_red{
      color: #FF5151;
    }
    &.color_org{
      color: rgba(239, 173, 60, 1);
    }
    &.color_blue{
      color: rgba(81, 160, 255, 1);
    }
    &.color_pur{
      color: rgba(177, 66, 255, 1);
    }
    .est{
      font-size: 16px;
      font-family: Helvetica;
      color: rgba(58, 74, 90, .6);
      margin-right: 16px;
      float: left;
    }
  }

}


.income_statement {
  padding: 40px 34px;


  h3 {
    font-size: 16px;
    font-family: Roboto-Bold, Roboto;
    font-weight: bold;
    color: #3A4A5A;
    line-height: 16px;
  }
  h4{
    color:rgba(58, 74, 90, 1);
    font-family: Roboto-Bold, Roboto;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    margin-top: 18px;
  }
  p {
    font-size: 14px;
    font-family: Roboto-Bold, Roboto;
    color: #3A4A5A;
    line-height: 20px;
  }
}

</style>
