<template>
  <div>
    <el-button type="primary" @click="willadd">添加</el-button>
    <v-list :rolelist="rolelist" @init="newInit" @edit="edit"></v-list>

    <el-pagination background 
    @current-change="changePage"
    layout="prev, pager, next" 
    :total="total" :page-size="size" ></el-pagination>

    <v-form :info="info" @init="newInit" ref="form"></v-form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import vList from "./components/list";
import vForm from "./components/form";
import { reqUserList ,reqUserCount} from "../../utils/hppts";
export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "添加管理员",
      },
      rolelist: [],
      total:0,
      size:2,
      page:1
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
    willadd() {
      this.info = {
        title: "添加管理员",
        isshow: true,
      };
    },
    init() {
      reqUserList({page:this.page,size:this.size}).then((res) => {
          let list = res.data.list?res.data.list:[];
          if(list.length===0&&this.page>1){
              this.page--;
              this.init();
              return;
          }
        this.rolelist = res.data.list?res.data.list:[];
      });
    },
    edit(uid) {
      this.info = {
        isshow: true,
        title: "编辑管理员",
      };
      this.$refs.form.getOne(uid);
    },
    getCount(){
        reqUserCount().then(res=>{
            this.total=res.data.list[0].total;
        })
    },
    //点击页面是触发
    changePage(page){
        this.page=page;
        this.init();
    },
    //当删除或者添加时触发
    newInit(){
        this.init();
        this.getCount();
    }
  },
  mounted() {
    this.init();
    this.getCount();
  },
};
</script>
<style>
</style>