<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list @edit="edit"></v-list>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    ></el-pagination>
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import vList from "./components/list";
import vForm from "./components/form";
export default {
  data() {
    return {
      info: {
        title: "添加商品管理",
        isshow: false,
      },
    };
  },
  components: {
    vList,
    vForm,
  },
  computed: {
    ...mapGetters({
      total: "goods/Count",
      size: "goods/size",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "goods/reqList",
      changePage: "goods/Page",
    }),
    willAdd() {
      this.info = {
        title: "添加商品管理",
        isshow: true,
      };
    },
    edit(id) {
      this.info = {
        title: "编辑商品管理",
        isshow: true,
      };
      this.$refs.form.getOne(id);
    },
  },
  mounted() {},
};
</script>
<style>
</style>