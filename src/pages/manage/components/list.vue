<template>
  <div>
    <el-table
      :data="rolelist"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="用户编号" sortable width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" sortable width="180"></el-table-column>

      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <del-btn @sure="del(scope.row.uid)">删除</del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqUserDel } from "../../../utils/hppts";
import { errorAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["rolelist"],
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    del(uid) {
      reqUserDel(uid).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.$emit("init");
        } else {
          errorAlert(res.data.msg);
        }
      });
    },
    edit(uid){
        this.$emit('edit',uid)
    }
  },
  mounted() {
      
  },
};
</script>
<style>
.el-table {
  margin-top: 20px;
}
</style>