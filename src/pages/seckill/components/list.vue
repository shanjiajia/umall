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
      <el-table-column prop="title" label="活动名称" sortable width="180"></el-table-column>
      <el-table-column prop="name" label="状态" sortable width="180">
          <template slot-scope="scope">
              <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
              <el-button type="info" v-else>禁用</el-button>
          </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
              <el-button type="primary" @click='edit(scope.row.id)'>编辑</el-button>
              <del-btn @sure='del(scope.row.id)'></del-btn>
          </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import {reqseckDel} from '../../../utils/hppts';
import {successAlert} from '../../../utils/alert';
export default {
  computed: {
    ...mapGetters({
        list:'seck/list'
    }),
  },
  methods: {
    ...mapActions({
        reqList:'seck/reqList'
    }),
    del(id){
        reqseckDel(id).then(res=>{
            successAlert('删除成功');
            this.reqList();
        })
    },
    edit(id){
        this.$emit('edit',id)
    }
  },
  mounted() {
      this.reqList();
  },
};
</script>
<style>
.el-table{
    margin-top: 20px;
}
</style>