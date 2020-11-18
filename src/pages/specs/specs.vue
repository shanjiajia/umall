<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list @edit="edit"></v-list>
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="size" @current-change='changePage'></el-pagination>
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
        title: "添加规格",
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
        total:'specs/Count',
        size:'specs/size'
    }),
  },
  methods: {
    ...mapActions({
        reqList:'specs/reqList',
        changePage:'specs/Page'
    }),
    willAdd() {
      this.info = {
        title: "添加规格",
        isshow: true,
      };
    },
    edit(id) {
      this.info = {
        title: "编辑规格",
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