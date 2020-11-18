<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="所属角色" label-width="120px">
          <el-select v-model="user.roleid" placeholder="请选择角色">
              <el-option v-for='item in rolelist' :key="item.id" :value="item.id" :label='item.rolename'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title==='添加管理员'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import {reqRoleList,reqUserAdd,reqUserDetail,reqUserUpdate} from '../../../utils/hppts';
import{successAlert,errorAlert} from '../../../utils/alert'
export default {
  props: ["info"],
  data(){
      return{
          user:{
             roleid:'',
             username:'' ,
             password:'',
             status:1
          },
          rolelist:[]
      }
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    empty(){
        this.user={
            roleid:'',
             username:'' ,
             password:'',
             status:1
        }
    },
    closed(){
        if(this.info.title=='编辑管理员'){
            this.empty()
        }
    },
    cancel(){
        this.info.isshow=false;
    },
    getOne(uid){
        console.log(uid)
        reqUserDetail(uid).then(res=>{
            this.user=res.data.list;
            this.user.password=''
        })
    },
    update(){
        reqUserUpdate(this.user).then(res=>{
            successAlert('修改成功');
            this.empty();
            this.cancel();
            this.$emit('init')
        })
    },
    add(){
        reqUserAdd(this.user).then(res=>{
            successAlert('添加成功')
            this.cancel();
            this.empty();
            this.$emit('init')
        })
    }
  },
  mounted() {
      reqRoleList().then(res=>{
          this.rolelist=res.data.list;
      })
  },
};
</script>
<style>
</style>