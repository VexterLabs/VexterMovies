<!--
 * @Description:
 * @FilePath: \haiwai_pc\src\components\IncRenv\vworkdata.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2020-06-17 15:38:15
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-07-30 10:19:23
-->
<template>
  <div class="income">
    <div class="date-pick">
      <el-date-picker
        v-model="date"
        value-format="yyyy-MM"
        type="month"
        placeholder="Choose Month"
        @change="handleChangeMonth"
        :clearable="false"
      ></el-date-picker>
      <div class="month">{{dealDate}}</div>
      <div class="tips">
        <span class="works">{{workDataList.length}} Works</span>
        <span>Settled</span>
      </div>
    </div>
    <!-- <div class="pie-echart" ref="pieEchart2"></div> -->
  </div>
</template>
<script>
// import echarts from "echarts";
import { mapState } from "vuex";
import { judgeFromNow } from "@/core/js/common.js";
export default {
  data() {
    return {
      chart: null,
      date: "",
      colors: [
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
      ]
    };
  },
  computed: {
    ...mapState({
      workDataList: state => state.moduleUserCenter.workDataList,
      attendanceBonus: state => state.moduleUserCenter.attendanceBonus,
      loadingFinished: state => state.moduleHome.loadingFinished
    }),
    dealDate() {
      if (this.date) {
        return `${this.date.split("-")[0]}.${this.date.split("-")[1]}`;
      } else {
        return "";
      }
    }
  },
  mounted() {
    this.getTime();
    this.getWorkDataList();
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
        zone: "workdataexzyf", // workdata选择月份
        adid: "click-choose-workdata-month"
      });

      if (val) {
        this.date = val;
        this.getWorkDataList();
      }
    },
    async getWorkDataList() {
      let that = this;

      let res = await this.$axios.post("/xsdq/user/work/data", {
        month: that.date
      });
      this.$store.dispatch("moduleHome/changeLoadingStatus", false);

      if (res.data.status == 0) {
        this.$store.dispatch(
          "moduleUserCenter/changeWorkDataList",
          res.data.data.list || []
        );
        this.$store.dispatch(
          "moduleUserCenter/changeAttend",
          res.data.data.attendanceBonus || 0
        );
        // this.pageInit();
      } else {
        this.$msg({
          content: "Error Status: " + res.data.status
        });
      }
    },
    pageInit() {
      const { totalMoney, data, legendData } = this.dealData();
      // console.log(totalMoney, data , legendData);

      if (data.length == 0) {
        if (this.chart) {
          this.chart.clear();
        }
        return;
      }
      this.chart = echarts.init(this.$refs.pieEchart2);

      this.chart.setOption({
        tooltip: {
          trigger: "item",
          formatter: function(a, b) {
            return `<div style='padding: 8px 12px;'>
                            <div style='font-weight:600;font-size:14px;'><span style='display:inline-block;width:6px;height:6px;border-radius:3px;background-color:#FF5151;margin-right:6px;position:relative;top:-2px;'></span>${ a["name"] }</div>
                            <div style='font-size:12px;'><span style='font-size:12px;display:inline-block;width: 122px;'>PublishDays</span> ${a["data"].publishDays}</div>
                            <div style='font-size:12px;'><span style='font-size:12px;display:inline-block;width: 122px;'>WordCountPremium</span> ${a["data"].wordCountPremium}</div>
                            <div style='font-size:12px;line-height:12px;'><span style='font-size:12px;display:inline-block;width: 122px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'>TotalWordCountPremium</span> ${a["data"].wordCountPremiumTotal}</div>
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
            name: "Total Income",
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
                name: "Total Income"
              }
            ]
          },
          {
            name: "Total Income",
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
    dealData() {
      let totalMoney = this.attendanceBonus;
      let data = [];
      let legendData = [];

      if (this.workDataList && this.workDataList.length > 0) {
        let workDataContract = []
        this.workDataList.filter((item, index) => {
          if(item.contractType == "EXCLUSIVE"){
            workDataContract.push(item)
          };
        });
        // let workDataContract = this.workDataList;
        workDataContract.map((item, index) => {
          totalMoney += item.wordCountPremium;
          data.push({
            value: `${item.wordCountPremium}`,
            name: `《${item.bookName}》`,
            publishDays: `${item.publishDays || 0}`,
            wordCountPremium: `${item.wordCountPremium || 0}`,
            wordCountPremiumTotal: `${item.wordCountPremiumTotal || 0}`
          });
          // console.log("data",data);

          legendData.push({
            name: `《${item.bookName}》`,
            icon: "circle",
            textStyle: {
              fontSize: 14,
              color: "#3A4A5A"
            }
          });
          // console.log("legendData",legendData);

        });
      }
      return {
        totalMoney,
        data,
        legendData
      };
    }
  },
  destroyed() {
    this.$store.dispatch("moduleHome/changeLoadingStatus", false);
  }
};
</script>
<style lang='scss'>
.el-date-editor.el-input input {
  border-radius: 40px;
  background: rgba(0, 0, 0, 0.05);
  border: none;
}
.income {
  padding-top: 10px;
  .date-pick {
    float: left;
    height: 314px;
    .month {
      color: #3a4a5a;
      font-size: 56px;
      font-weight: bold;
      padding: 20px 0;
    }
    .tips {
      span {
        color: #3a4a5a;
        font-size: 20px;
        font-weight: 400;
        &.works {
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
