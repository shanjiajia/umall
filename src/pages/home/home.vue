<template>
  <div>
    <div class="box" id="main"></div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import echarts from 'echarts';
export default {
  computed: {
    ...mapGetters({
        list: "cate/list"
    }),
  },
  methods: {
    ...mapActions({
        reqList: "cate/reqList"
    }),
  },
  watch: {
    list: {
      handler() {
        if (this.list.length > 0) {
          
          //画图
          let myChart = echarts.init(document.getElementById("main"));

          // 指定图表的配置项和数据
          var option = {
            title: {
              text: "商品分类"
            },
            tooltip: {},
            legend: {
              data: ["子孩子数量"]
            },
            xAxis: {
              data: this.list.map(item=>item.catename),
            },
            yAxis: {},
            // series 数据
            series: [
              {
                name: "子孩子数量",
                type: "line",
                data:this.list.map(item=>item.children?item.children.length:0)
              },
            ]
          };

          myChart.setOption(option);
        }
      },
      deep: true
    }
  },
  mounted() {
      this.reqList();
  },
};
</script>
<style>
.box {
  width: 80%;
  margin: 20px auto;
  height: 500px;
}
</style>