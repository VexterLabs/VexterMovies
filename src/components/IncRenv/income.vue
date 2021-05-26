<template>
  <div class="income">
    <div class="date-pick">
      <el-date-picker
        v-model="date"
        value-format="yyyy-MM"
        type="month"
        placeholder=""
        @change="handleChangeMonth"
        :clearable="false"
      ></el-date-picker>
      <div class="month">{{dealDate}}</div>
      <div class="tips">
        <span class="mr">Month Revenue</span>
        <span class="mm">$ {{generalData.monthIncome || '0.00'}}</span>
        <span class="mstatus">{{showResume(generalData.remunerationStatus)}}</span>
        <span class="mtime">Latest Update At {{generalData.lastUpdateDt}}
          <i
            class="tip_contain"
            @mouseover="showMaskFlag = true"
            @mouseout="showMaskFlag = false"
          >
            <tip-mask
              class="tip_mask"
              v-if="showMaskFlag"
              :title="''"
              :content="`1. UTC+08:00 Singapore <br>2. Data Process Time T+2`"
            ></tip-mask>
          </i>
        </span>
      </div>
    </div>
    <div class="pie-echart" ref="pieEchart"></div>
  </div>
</template>
<script>
import echarts from "echarts";
import { mapState } from "vuex";
import { judgeFromNow } from "@/core/js/common.js";
import TipMask from "@/components/Common/TipMask.vue";

export default {
  components:{
    TipMask
  },
  data() {
    return {
      chart: null,
      date: "",
      showMaskFlag:false,
      colors: [
        "rgba(255, 118, 192, 1)",
        "rgba(255, 81, 81, 1)",
        "rgba(239, 173, 60, 1)",
        "rgba(81, 160, 255, 1)",
        "rgba(177, 66, 255, 1)",
        "#FF6565",
        "#5EA7FF",
        "#FFBC4A",
        "#ffcc66",
        "#ff9966",
        "#ff6666",
        "#FF5151",
        "#51A0FF",
        "#1ABC9C",
        "#2ECC71",
        "#3498DB",
        "#F1C40F",
        "#E67E22",
        "#E74C3C",
        "#9966ff",
        "#6666ff",
        "#6699ff",
        "#66ff99",
        "#FAEBD7",
        "#FFFAF0",
        "#FAFFF0"
      ],
      generalData:{},
    };
  },
  computed: {
    // ...mapState({
      // incomeList: state => state.moduleUserCenter.incomeList
      // workDataList: state=>state.moduleUserCenter.workDataList,
      // attendanceBonus: state=>state.moduleUserCenter.attendanceBonus,
    // }),
    dealDate() {
      if (this.date) {
        return `${this.date.split("-")[0]}.${this.date.split("-")[1]}`;
      } else {
        return "";
      }
    }
  },
  mounted() {
    // this.getTime(); //第一次请求时获取最新数据, 日期可不传
    this.getIncomeList();
  },
  methods: {
    showResume(resu){
      if(!resu){
        return '';
      }else if(resu == 'TRANSFER_SUCCESS'){
        return 'Payment Successful'
      }else if(resu == 'TRANSFER_OVER'){
        return 'Carry Over'
      }
    },
    getTime() {
      let date = new Date();
      let month =
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1);
      this.date = `${date.getFullYear()}-${month}`;
    },
    handleChangeMonth(val) {
      let mounthAllowed = judgeFromNow(val);
      if (!mounthAllowed) {
        this.$msg({
          content: "Date Invalid"
        });
        this.getTime();
        return;
      }

      $logClick({
        module: this.$route.name,
        zone: "incomexzyf", // income选择月份
        adid: "click-choose-income-month"
      });

      if (val) {
        this.date = val;
        this.getIncomeList();
      }
    },
    async getIncomeList() {
      let res = await this.$axios.post("/webfic/income/t2/list", {
        dateTime: this.date
      });
      if (res.data.status == 0) {
        // 提供假数据 用res.data.data替换

        let fakeData = {
            monthIncome:0.00,
            attendanceBonus:0.00,
            carriedOver:0.00,
            platformReward:0.00,
            totalBookIncome:0.00,
            totalPlatformAward:0.00,
            totalRevenue:0.00,
            totalIncome:0.00,
            remunerationStatus:"No Data",
            month:"No Data",
            lastUpdateDt:"No Data",
            bookName:'No Data',
            introduction:'No Data',
            bookCover:'',
            bookId:-1,
            bookIncomeList:[],
            bookReleaseInfoResponseList:[],
            platformAwardList:[],
        };

        fakeData = Object.assign( fakeData , res.data.data ) ;

        this.generalData = fakeData;

        this.date = fakeData.month; // 当前月

        // 全勤奖数据格式化
        if(fakeData.bookReleaseInfoResponseList&&fakeData.bookReleaseInfoResponseList.length && fakeData.bookReleaseInfoResponseList.length > 0){
          fakeData.bookReleaseInfoResponseList = this.formatList(fakeData.bookReleaseInfoResponseList , fakeData.attendanceBonus);
        }
        this.$store.dispatch(
          "moduleUserCenter/changeIncomeGeneralData" ,
          fakeData
        );

        this.$store.dispatch(
          "moduleUserCenter/changeIncomeList",
          res.data.data.bookIncomeList || []
        );
        this.$store.dispatch("moduleHome/changeLoadingStatus", true);

        let platformReward = res.data.data.totalBookIncome - 0 || 0.00;
        let attendanceBonus = res.data.data.attendanceBonus - 0 || 0.00;
        let carriedover = res.data.data.carriedOver - 0|| 0.00;
        let others = res.data.data.totalPlatformAward - 0|| 0.00;

        let totalRevenue = res.data.data.monthIncome - 0||0.00;
        let data = [
          {
            name: "Profit Share",
            value: platformReward
          },
          {
            name: "Attendance Bonus",
            value: attendanceBonus
          },
          {
            name: "Others",
            value: others
          }
          ,
          {
            name: "Carried Over",
            value: carriedover
          }
        ];

        let legendData = [
          {
            name: "Month Revenue",
            icon: "circle",
            textStyle: {
              fontSize: 14,
              color: "#3A4A5A"
            }
          },
          {
            name: "Platform Reward",
            icon: "circle",
            textStyle: {
              fontSize: 14,
              color: "#3A4A5A"
            }
          },
          {
            name: "Attendance Bonus",
            icon: "circle",
            textStyle: {
              fontSize: 14,
              color: "#3A4A5A"
            }
          }
        ];

        this.pageInit(totalRevenue, data);
      }else {
        this.$msg({
          content:"Network Error , please try again later"
        })
      }
    },
    pageInit(totalRevenue, data, legendData) {
      // const { data, legendData } = this.dealData();

      const totalMoney = totalRevenue || 0;
      if (data.length == 0) {
        if (this.chart) {
          this.chart.clear();
        }
        return;
      }
      this.chart = echarts.init(this.$refs.pieEchart);
      this.chart.setOption({
        tooltip: {
          trigger: "item",
          formatter: function(a, b) {
            return `<div style='padding: 8px 12px;'>
                            <div style='font-weight:600;font-size:14px;'><span style='display:inline-block;width:6px;height:6px;border-radius:3px;background-color:#FF5151;margin-right:6px;position:relative;top:-2px;'></span>${
                              a["name"]
                            }</div>
                            <div style='font-size:12px;'>${"$ " +
                              a["data"].value}</div>
                            </div>`;
          },
          backgroundColor: "#343255"
        },
        color: this.colors,
        legend: {
          show: true,
          bottom: "10%",
          right: "0%",
          orient: "vertical",
          itemWidth: 6,
          data: legendData
        },
        series: [
          {
            name: "Month Revenue",
            type: "pie",
            selectedMode: "single",
            center: ["20%", "center"],
            radius: ["30%", "80%"],
            hoverOffset: 0,
            hoverAnimation: false,
            tooltip: {
              show: false
            },
            itemStyle: {
              opacity: 0
            },
            label: {
              normal: {
                position: "center",
                formatter: "{per|{c}}{b|}\n{a|{b}}\n{hr|}",
                rich: {
                  per: {
                    color: "#3A4A5A",
                    fontSize: 20,
                    lineHeight: 20,
                    fontWeight: 600,
                    align: "center"
                  },
                  a: {
                    color: "#3A4A5A",
                    align: "center",
                    fontSize: 14
                  },
                  b: {
                    color: "#0abffd",
                    fontSize: 12,
                    lineHeight: 40,
                    align: "center"
                  },
                  hr: {
                    width: "100%",
                    height: 0,
                    align: "center"
                  }
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: "$" + totalMoney.toFixed(2),
                name: "Month Revenue"
              }
            ]
          },
          {
            name: "Month Revenue",
            type: "pie",
            center: ["20%", "center"],
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            color: this.colors,
            itemStyle: {
              normal: {}
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: "12",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: data
          }
        ]
      });
    },
    formatList(dataList , attendanceBonus) {
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
      // console.log(dataList);
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
      // console.log(excArr);

      if (excArr.length > 0) {
        excArr[0].length = excArr.length;
        excArr[0].attendanceBonus = attendanceBonus;
      }

      return excArr.concat(unExcArr);
    }
  },
  destroyed() {
    this.$store.dispatch("moduleHome/changeLoadingStatus", false);
  }
};
</script>
<style lang='scss'>
.el-date-editor.el-input input {
  background: rgba(0, 0, 0, 0.05);
  border: none;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 124px;
  input{
    font-size: 14px;
    font-family: Helvetica-Bold, Helvetica;
    font-weight: bold;
    color: rgb(142 ,152 ,163);
    line-height: 14px;
  }
}
.income {
  padding-top: 10px;
  .date-pick {
    float: left;
    .month {
      height: 28px;
      font-size: 28px;
      font-family: Helvetica;
      color: #3A4A5A;
      line-height: 28px;
      margin-top: 16px;
    }
    .tips {
      margin-top: 24px;
      width: 400px;
      span{
        display: block;
        font-weight: 600;
      }
      .mr{
        font-size: 14px;
        font-family: Helvetica;
        color: rgba(67, 83, 102, .6);
        line-height: 14px;
        margin-bottom: 16px;
      }
      .mm{
        font-size: 40px;
        font-family: Helvetica-Bold, Helvetica;
        font-weight: bold;
        color: #3A4A5A;
        line-height: 40px;
        margin-bottom: 16px;
      }
      .mstatus{
        height: 14px;
        font-size: 14px;
        font-family: Helvetica;
        color: #EE3799;
        line-height: 14px;
        margin-bottom: 42px;
      }
      .mtime{
        height: 14px;
        font-size: 14px;
        font-family: Helvetica;
        color: rgba(58, 74, 90, .6);
        line-height: 14px;
        img{
          margin-left: 8px;
          width: 18px;
          height: 18px;
          margin-bottom: -4px;
          cursor: pointer;
        }
      }
      .tip_contain {
        display: inline-block;
        cursor: pointer;
        margin-left: 8px;
        margin-top: -3px;
        width: 18px;
        height: 18px;
        background: url("../../assets/images/shelf/icon-info.png") no-repeat center
          center;
        background-size: 18px 18px;
        font-style: normal;
        position: relative;
        z-index: 20;
        vertical-align: top;
        .tip_mask {
          position: absolute;
          bottom: 30px;
          z-index: 20;
          img{
            display: none;
          }
        }
      }
    }
  }
  .pie-echart {
    display: inline-block;
    width: 600px;
    height: 300px;
  }
}
</style>
