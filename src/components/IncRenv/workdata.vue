<!--
 * @Description:
 * @FilePath: \haiwai_pc\src\components\IncRenv\workdata.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2020-06-08 11:25:56
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-07-08 23:50:12
-->
<template >
  <div class="work_data">
    <div class="table_container">
      <table v-if="formatData.length > 0" border="1" cellpadding="4" cellspacing="0">
        <thead>
          <th class="t3">Book title</th>
          <th class="t4">Contract type</th>
          <th>Premium words</th>
          <th>Release days</th>
          <th>Attendance bonus</th>
          <th>Total premium words</th>
        </thead>
        <tbody>
          <tr v-for="(item, key) in formatData" :key="key">
            <td class="t3" style="textAlign:left;">
              <div>{{item.bookName}}</div>
            </td>
            <td>{{item.contractType}}</td>
            <td>{{item.wordCountPremium || 0}}</td>
            <td>{{item.publishDays || 0}}</td>

            <!-- 全勤奖的合并单元格 -->
            <td v-if="item.length" :rowspan="item.length">Estimate: $ {{item.attendanceBonus || 0}}</td>

            <!-- 无全勤奖的合并单元格 非合约或者没有满足20天的书籍 -->
            <td v-else-if="(item.contractType != 'EXCLUSIVE') || !item.attendance">0</td>

            <td>{{item.wordCountPremiumTotal || 0}}</td>
          </tr>
        </tbody>
      </table>

      <null-wallet v-if="formatData.length == 0" :content="content"></null-wallet>

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
              class="nbb t2"
            >A new-chapter-release frequency reaches or higher than 20 days per month.</td>

            <td class="num">＄400.00</td>
            <td rowspan="3" class="nrb nbb">
              No uploading days required for the 1st month's attendance bonus of newly signed exclusive books.
              If the number of updated words in the first month is less than 40,000 words:
              Attendance bonus will be (the number of exclusive words) ÷ (40,000 words) x (200 USD). The minimum amount paid is 6 USD.
              These premium words will not be calulated together with the existing books by the same author.
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
  </div>
</template>
<script>
import NullWallet from "@/components/Common/NullWalet.vue";
import { mapState } from "vuex";
export default {
  name: "workdata",
  data() {
    return {
      content: "You have no signed books yet.",
      date: "",
      formatData: [],
      attendlength: 0
    };
  },
  computed: {
    ...mapState({
      workDataList: state => state.moduleUserCenter.workDataList,
      attendanceBonus: state => state.moduleUserCenter.attendanceBonus
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
    },
    formatList(dataList) {
      if (dataList.length <= 0) return [];

      let tempDataListArr1 = [];
      let tempDataListArr2 = [];
      dataList.forEach((item, index) => {
        if (item.contractType == "EXCLUSIVE") {
          tempDataListArr1.push(item);
        } else {
          tempDataListArr2.push(item);
        }
      });
      dataList = tempDataListArr1.concat(tempDataListArr2);
      let excArr = [];
      let unExcArr = [];
      // 循环把相同type项处理金tempObj中
      dataList.forEach((item, index) => {
        if (item.contractType == "EXCLUSIVE" && item.attendance == true) {
          // && item.releaseDays >= 0
          excArr.push(item);
        } else {
          unExcArr.push(item);
        }
      });
      console.log(excArr);

      if (excArr.length > 0) {
        excArr[0].length = excArr.length;
        excArr[0].attendanceBonus = this.attendanceBonus;
      }

      return excArr.concat(unExcArr);
    }
  },
  watch: {
    workDataList(v2, v1) {
      this.formatData = this.formatList(v2);
      // console.log(this.formatData);
    }
  },
  components: {
    NullWallet
  }
};
</script>

<style lang="scss" scoped>
.work_data {
  width: 100%;

  .table_container {
    padding: 40px 2px 20px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    background: #fff;
    margin-top: 16px;
    table {
      width: 96%;
      margin: 0 auto;
      text-align: center;
      margin-bottom: 30px;
      border-radius: 4px;
      border: 0.5px solid rgba(0, 0, 0, 0.05);
      overflow: hidden;
      border-bottom: 2px solid rgba(0, 0, 0, 0.6);
      th,
      td {
        color: rgba(67, 83, 102, 1);
        font-size: 16px;
        font-weight: 500;
        border: 0.5px solid rgba(0, 0, 0, 0.05);
        height: 64px;
      }
      th {
        font-size: 14px;
        font-family: SourceHanSansSC-Bold, SourceHanSansSC;
        font-weight: bold;
        color: rgba(58, 74, 90, 1);
        background: rgba(0, 0, 0, 0.05);
        line-height: 16px;
      }
      td.num {
        font-size: 16px;
        font-family: SourceHanSansSC-Regular, SourceHanSansSC;
        font-weight: 400;
        color: rgba(67, 83, 102, 1);
        line-height: 28px;
      }
      .nrb {
        border-right: none;
      }
      .nbb {
        border-bottom: none;
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
      margin-top: 60px;
      background: rgba(242, 242, 242, 1);
      border-radius: 4px;
      caption {
        padding: 10px;
        text-align: left;
        font-family: SourceHanSansCN-Bold, SourceHanSansCN;
        font-weight: bold;
        color: #3a4a5a;
        font-size: 18px;
        height: 22px;
        line-height: 12px;
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
</style>
