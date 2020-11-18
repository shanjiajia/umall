<template>
  <div>
    <v-list :viplist='viplist' @edit='edit'></v-list>
    <v-form ref="tree" :info='info' @init='init'></v-form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import vList from "./compontens/list";
import vForm from "./compontens/form";
import {reqVipList} from '../../utils/hppts';
import {successAlert,errorAlert} from '../../utils/alert';
export default {
    data(){
        return{
            info:{
                isshow:false,
                title:'修改会员信息'
            },
            viplist:[]
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
    init(){
        reqVipList().then(res=>{
            if(res.data.code===200){
                this.viplist=res.data.list;
                console.log(this.viplist,222222222222)
            }
            
        })
    },
    edit(uid){
        this.info={
            isshow:true,
            title:'修改会员信息'
        }
        this.$refs.tree.getOne(uid)
    }
  },
  mounted() {
      this.init();
  },
};
</script>
<style>
</style>