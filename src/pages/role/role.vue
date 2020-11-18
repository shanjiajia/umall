<template>
  <div>
    <el-button type="primary" @click="willadd">添加</el-button>
    <v-list @init="init" :list='list' @edit='edit'></v-list>
    <v-form :info="role" @init='init' ref="tree"></v-form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqRoleList } from "../../utils/hppts";
import vForm from "../role/components/form";
import vList from "../role/components/list";
export default {
  data() {
    return {
      role: {
        isshow: false,
        title: "添加角色",
      },
      list:[]
      
    };
  },
  components: {
    vForm,
    vList,
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    willadd() {
      this.role={
        isshow:true,
        title:"添加角色"
      }
    },
    init() {
      reqRoleList().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    edit(id){
        this.role.isshow=true;
        this.role.title='编辑角色';
        this.$refs.tree.getOne(id);
    }
  },
  mounted() {
      this.init();
  },
};
</script>
<style>
</style>