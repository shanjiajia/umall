<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="上级分类" label-width="120px">
          <el-select v-model="user.pid" placeholder="请选择角色">
            <el-option :value="0" label="顶级分类">顶级分类</el-option>
            <el-option v-for='item in cateList' :key="item.id" :value="item.id" :label='item.catename'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="user.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px" v-if="user.pid!==0">

          <div class="myupload">
            <h3>+</h3>
            <img :src="imgUrl" class="img" v-if="imgUrl" />
            <input v-if='info.isshow' type="file" class="inp" @change="changeFile" />
          </div>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title==='添加分类'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import {reqCateAdd,reqCateDetail,reqCateUpdate} from '../../../utils/hppts';
import{successAlert,errorAlert} from '../../../utils/alert';
import path from 'path';
export default {
  props: ["info"],
  data(){
      return{
          user:{
             pid:'',
             catename:'' ,
             img:null,
             status:1
          },
          imgUrl:'',
      }
  },
  computed: {
    ...mapGetters({
        cateList:'cate/list'
    }),
  },
  methods: {
    ...mapActions({
        reqList:'cate/reqList'
    }),
    //上传图片
    changeFile(e){
        //获取img文件
        let file = e.target.files[0];
        if(file.size>2*1024*1024){
            errorAlert('文件大小不能超过2M');
            return;
        }
        //获取上传文件的后缀名
        let extname = path.extname(file.name);
        //如果文件没arr数组里面的后缀名则提示出错
        let arr = ['.jpg','.peg','.jpeg','.gif']
        if(!arr.includes(extname)){
            errorAlert('请上传正确的图片格式');
            return;
        };
        //将file转为img的地址
        this.imgUrl=URL.createObjectURL(file);
        this.user.img=file;
    },
    cancel(){
        this.info.isshow=false;
    },
    empty(){
        this.user={
            pid:'',
            catename:'',
            img:null,
            status:1
        },
        this.imgUrl="" 
    },
    add(){
        reqCateAdd(this.user).then(res=>{
            successAlert('添加成功');
            this.empty();
            this.cancel();
            this.reqList();
        })
    },
    closed(){
        if(this.info.title==='添加分类'){
            this.empty();
        }
    },
    getOne(id){
        reqCateDetail(id).then(res=>{
            this.user=res.data.list;
            this.imgUrl=this.$imgPre+res.data.list.img;
            this.user.id=id
        })
    },
    update(){
        console.log(this.user)
        reqCateUpdate(this.user).then(res=>{
            successAlert('修改成功'),
            this.cancel(),
            this.empty(),
            this.reqList()
        })
    }
    
  },
  mounted() {
    
  },
};
</script>
<style>
.myupload {
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px dashed #999;
}
.myupload h3 {
  width: 100%;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
}
.myupload .inp {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
.myupload .img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100px;
  height: 100px;
}
</style>