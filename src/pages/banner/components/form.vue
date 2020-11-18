<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed='closed'>
      <el-form :model="banner">
        <el-form-item label="标题" label-width="120px">
          <el-input v-model="banner.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px">
          <div class="impupload">
            <h3>+</h3>
            <img :src="imgUrl" class="img" v-if="imgUrl" />
            <input v-if="info.isshow" type="file" class="inp" @change="changeFile" />
          </div>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="banner.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title==='编辑轮播图'" @click='updated'>修改</el-button>
        <el-button type="primary" @click="add" v-else>添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import path from "path";
import { errorAlert, successAlert } from "../../../utils/alert";
import { reqBannerAdd,reqBannerDetail,reqBannerUpdate } from "../../../utils/hppts";
export default {
  data() {
    return {
      banner: {
        title: "",
        img: null,
        status: 1,
      },
      imgUrl: "",
    };
  },
  props: ["info"],
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqList: "banner/reqList",
    }),
    empty() {
      (this.banner = {
        title: "",
        img: null,
        status: 1,
      }),
        (this.imgUrl = "");
    },
    cancel() {
      this.info.isshow = false;
    },
    changeFile(e) {
      let file = e.target.files[0];
      let name = path.extname(file.name);
      console.log(name);
      let arr = [".jpg", ".peg", ".jpeg", ".gif"];
      if (!arr.includes(name)) {
        errorAlert("请上传正确的图片格式");
        return;
      }
      this.banner.img = file;
      this.imgUrl = URL.createObjectURL(file);
    },
    add() {
      reqBannerAdd(this.banner).then((res) => {
        successAlert("添加成功");
        this.cancel();
        this.reqList();
        this.empty();
      });
    },
    getOne(id){
        reqBannerDetail(id).then(res=>{
            this.banner=res.data.list;
            this.imgUrl=this.$imgPre+res.data.list.img;
            this.banner.id=id;
        })
    },
    updated(){
        reqBannerUpdate(this.banner).then(res=>{
            successAlert('修改成功')
            this.reqList();
            this.empty();
            this.cancel();
        })
    },
    closed(){
        if(this.info.title=='编辑轮播图'){
            this.empty();
        }
    }
  },
  mounted() {},
};
</script>
<style>
.impupload {
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px dashed #999;
}
.impupload h3 {
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 25px;
}
.impupload .inp {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.impupload .img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>