<template>
  <div>
    <el-button type="primary" @click="addWill">添加</el-button>
    <v-list></v-list>
    <v-form :info='info'></v-form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import vList from "./components/list";
import vForm from "./components/form";
export default {
    data(){
        return{
            info:{
                title:'添加限时秒杀',
                isshow:false
            }
        }
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
    addWill(){
         this.info={
                title:'添加限时秒杀',
                isshow:true
            }
    }
  },
  mounted() {},
};
</script>
<style>
</style>