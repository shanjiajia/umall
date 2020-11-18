<template>
  <div>
    <el-table
      :data="cateList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="分类编号" sortable width="180"></el-table-column>
      <el-table-column prop="catename" label="分类名称" sortable width="180"></el-table-column>

      <el-table-column prop="img" label="图片" sortable>
          <template slot-scope="scope">
              <img :src="$imgPre+scope.row.img" class="picture">
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
import {reqCateDel} from '../../../utils/hppts';
import {successAlert} from '../../../utils/alert'
export default {
  computed: {
    ...mapGetters({
        cateList:'cate/list'
    }),
  },
  methods: {
    ...mapActions({
        reqList:'cate/reqList'
    }),
    del(id){
        reqCateDel(id).then(res=>{
            successAlert('删除成功')
            this.reqList();
        })
    },
    edit(id){
        this.$emit('edit',id)
    }
  },
  mounted() {
      this.reqList()
  },
};
</script>
<style>
.picture{
    width: 80px;
    height: 80px;
}
</style>