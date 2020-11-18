<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="规格名称" label-width="120px">
          <el-input v-model="user.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" label-width="120px" v-for="(item,ind) of attrarr" :key="ind">
          <div class="box">
            <el-input v-model="item.value" autocomplete="off" class="inp"></el-input>
            <el-button type="primary" class="btn" v-if="ind===0" @click="addAttr">新增规格属性</el-button>
            <el-button type="danger" class="btn" v-else @click="delAttr(ind)">删除</el-button>
          </div>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title==='添加规格'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import {reqSpecsAdd,reqSpecsDetail,reqSpecsUpdate} from '../../../utils/hppts';
import {successAlert} from '../../../utils/alert';
export default {
  props: ["info"],
  data() {
    return {
      user: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      attrarr:[{value:''}]
    };
  },
  components: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
        reqList:'specs/reqList',
        reqCount:'specs/reqCount',
    }),
    cancel() {
      this.info.isshow = false;
    },
    closed() {
      if ((this.info.title == "编辑规格")) {
        this.empty()
      }
    },
    //点击向数组中添加数据，循环绑定到form表单上
    addAttr(){
        this.attrarr.push({value:''})
    },
    //点击删除数据，循环绑定到form表单上
    delAttr(i){
        this.attrarr.splice(i,1)
    },
    empty(){
        this.user={
        specsname: "",
        attrs: "",
        status: 1,
      },
      this.attrarr=[{value:''}]
    },
    add(){
        let arr = this.attrarr.map(item=>{
            return item.value
        });
        this.user.attrs=JSON.stringify(arr);
        reqSpecsAdd(this.user).then(res=>{
            successAlert("添加成功");
            this.cancel();
            this.empty();
            this.reqList(),
            this.reqCount()
        })
    },
    getOne(id){
        reqSpecsDetail(id).then(res=>[
            this.user=res.data.list[0],
            this.attrarr=JSON.parse(this.user.attrs).map(item=>{
                return {value:item}
            }),
            this.user.id=id,
            console.log(this.user)
        ])
    },
    update() {
        this.user.attrs=JSON.stringify(this.attrarr.map(item=>{
            return item.value
        }))
        reqSpecsUpdate(this.user).then(res=>{
            successAlert('修改成功 ')
            this.reqList(),
            this.cancel();
            this.empty();
        })
    },
  },
  mounted() {},
};
</script>
<style>
.box {
  display: flex;
}
.box .btn {
  width: auto;
}
.box .inp {
  flex: 1;
}
</style>