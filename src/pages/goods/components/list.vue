<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="商品编号" sortable width="130"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" sortable width="130"></el-table-column>
      <el-table-column prop="price" label="商品价格" sortable width="130"></el-table-column>
      <el-table-column prop="market_price" label="市场价格" sortable width="130"></el-table-column>
      <el-table-column prop="img" label="图片" width="130">
        <template slot-scope="scope">
          <img :src="$imgPre+scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column label="是否新品" width="120">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.isnew===1">是</el-button>
            <el-button type="danger" v-else>否</el-button>
          </template>
        </el-table-column>
        <el-table-column label="是否热卖" width="120">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.ishot===1">是</el-button>
            <el-button type="danger" v-else>否</el-button>
          </template>
        </el-table-column>
      <el-table-column prop="states" label="状态"  width="120">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启动</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @sure="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqgoodsDel } from "../../../utils/hppts";
import { successAlert } from "../../../utils/alert";
export default {
  computed: {
    ...mapGetters({
      list: "goods/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "goods/reqList",
      reqCount:'goods/reqCount',
    }),
    del(id) {
      reqgoodsDel(id).then((res) => {
        successAlert("删除成功");
        this.reqList();
        this.reqCount();
      });
    },
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
    this.reqList();
    this.reqCount();
  },
};
</script>
<style scoped>
.el-table{
    margin-top: 20px;
}
img {
  width: 80px;
  height: 80px;
}
</style>