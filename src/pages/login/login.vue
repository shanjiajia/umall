<template>
  <div class="login">
    <div class="box">
      <h2>登录</h2>
      <div>
        <el-input placeholder="请输入内容" v-model="user.username"></el-input>
        <el-input placeholder="请输入密码" show-password v-model="user.password"></el-input>
      </div>
      <div><el-button type='primary' @click='toIndex' >登录</el-button></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert } from '../../utils/alert';
import{reqLogin} from '../../utils/hppts';
export default {
  data() {
    return {
      user:{
        username:'',
        password:''
      }
    };
  },
  components: {
    ...mapGetters({
      
    }),
  },
  methods: {
    ...mapActions({
      "changeUser":'changeUser'
    }),
    toIndex(){
        reqLogin(this.user).then(res=>{
          if(res.data.code===200){
            successAlert('登录成功');
            this.changeUser(res.data.list);
            this.$router.push('/')
          }
          
        })
    }
  },
  mounted() {
    
  },
};
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-color: aqua;
  background: linear-gradient(to right, #553444, #46384F, #313D60);
}
.login .box {
  width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  text-align: center;
  background-color: #fff;
  border-radius: 20px;
}
.el-input{
    padding: 15px 0;
}
</style>