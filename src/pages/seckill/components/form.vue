<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
  <el-form :model="form">
    <el-form-item label="活动名称" label-width="80px">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" >
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="info.isshow = false">取 消</el-button>
    <el-button type="primary" @click="info.isshow = false">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  data(){
      return{
          form:[]
      }
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
  },
  mounted() {},
};
</script>
<style>
</style>