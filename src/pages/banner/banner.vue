<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list @edit="edit"></v-list>
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
        title: "添加轮播图",
        isshow: false,
      },
    };
  },
  components: {
    vList,
    vForm,
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    willAdd() {
      this.info = {
        title: "添加轮播图",
        isshow: true,
      };
    },
    edit(id) {
      this.info = {
        title: "编辑轮播图",
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