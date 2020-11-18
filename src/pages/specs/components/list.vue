<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="用户编号" sortable width="180"></el-table-column>
      <el-table-column prop="specsname" label="用户名" sortable width="180"></el-table-column>

      <el-table-column prop="rolename" label="所属角色" >
        <template slot-scope="scope">
          <el-tag v-for="(item,ind) in scope.row.attrs" :key="ind">{{item}}</el-tag>
        </template>
        
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @sure="del(scope.row.id)">删除</del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import {reqSpescDel} from '../../../utils/hppts';
import {successAlert} from '../../../utils/alert'
export default {
  props:['info'],
  computed: {
    ...mapGetters({
      list:'specs/list'
    }),
  },
  methods: {
    ...mapActions({
      reqList:'specs/reqList',
      reqCount:'specs/reqCount',
     
    }),
    del(id){
      reqSpescDel(id).then(res=>{
        if(res.data.code===200){
          successAlert('删除成功')
          this.reqList();
          this.reqCount();
        }
      })
    },
    edit(id){
      this.$emit('edit',id)
    }
  },
  mounted() {
    this.reqList(),
    this.reqCount();
  }
};
</script>
<style>
</style>