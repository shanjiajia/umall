<template>
  <div>
    <el-button type="primary" @click="willadd">添加</el-button>
    <v-list :list='list' @init='init' @edit='edit($event)'></v-list>
    <v-form :info="info" :list='list' @init='init' ref='forms' ></v-form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import vList from './components/list';
import vForm from './components/form';
import {reqMenuList} from '../../utils/hppts';
export default {
  data(){
    return{
      info:{
          isshow:false,
          title:'添加菜单',
      },
      list:[]
    }
  },
  components:{
        vList,vForm
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    willadd(){
      this.info.isshow=true;
    },
    init(){
      reqMenuList().then(res=>{
        this.list=res.data.list;
      });
    },
    edit(id){
        this.info.isshow=true;
        this.info.title='编辑菜单';
        this.$refs.forms.getOne(id)
    }
  },
  mounted() {
    this.init();
  },
};
</script>
<style>
</style>