<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed" @opened="open">
      <el-form :model="user" :rules="rules">
        <el-form-item label="一级分类" label-width="120px" prop="first_cateid">
          <el-select v-model="user.first_cateid" placeholder="请选择角色" @change="changeFirst">
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px" prop="second_cateid">
          <el-select v-model="user.second_cateid" placeholder="请选择角色">
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="120px" prop="goodsname">
          <el-input v-model="user.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="120px" prop="price">
          <el-input v-model="user.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="120px" prop="market_price">
          <el-input v-model="user.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px">
          <div class="impupload">
            <h3>+</h3>
            <img :src="imgUrl" class="img" v-if="imgUrl" />
            <input v-if="info.isshow" type="file" class="inp" @change="changeFile" />
          </div>
        </el-form-item>
        <el-form-item label="商品规格" label-width="120px" prop="specsid">
          <el-select v-model="user.specsid" placeholder="请选择角色" @change="changeRole">
            <el-option
              v-for="item in specslist"
              :key="item.id"
              :value="item.id"
              :label="item.specsname"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="120px" prop="specsattr">
          <el-select v-model="user.specsattr" placeholder="请选择角色" multiple>
            <el-option v-for="item in specsList" :key="item" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="120px">
          <el-radio v-model="user.isnew" :label="1">是</el-radio>
          <el-radio v-model="user.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="120px">
          <el-radio v-model="user.ishot" :label="1">是</el-radio>
          <el-radio v-model="user.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" label-width="120px">
          <div id="textarea" v-if="info.isshow">
            <!-- 富文本编辑器 -->
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title==='编辑商品管理'" @click="updated">修改</el-button>
        <el-button type="primary" @click="add" v-else>添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import path from "path";
import { errorAlert, successAlert } from "../../../utils/alert";

import {
  reqCateList,
  reqgoodsAdd,
  reqgoodsDetail,
  reqgoodsUpdate,
} from "../../../utils/hppts";
import E from "wangeditor";
export default {
  data() {
    return {
      rules: {
        first_cateid: [
          { required: true, message: "请输入一级分类", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请输入二级分类", trigger: "change" },
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        market_price: [
          { required: true, message: "请输入商品市场价格", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请输入商品规格", trigger: "change" },
        ],
        specsattr: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个规格属性",
            trigger: "change",
          },
        ],
      },
      user: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 2,
        status: 1,
      },
      imgUrl: "",
      secondCateList: [],
      specsList: [],
    };
  },
  props: ["info"],
  computed: {
    ...mapGetters({
      catelist: "cate/list",
      specslist: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList",
      reqSpecsList: "specs/reqList",
      reqList: "goods/reqList",
      reqCount: "goods/reqCount",
    }),
    //根据一级分类id拿到二级分类
    changeFirst() {
      this.user.second_cateid = "";
      this.getSecondList();
    },
    getSecondList() {
      reqCateList({ pid: this.user.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
      });
    },
    getAttrs() {
      let obj = this.specslist.find((item) => {
        return item.id === this.user.specsid;
      });
      this.specsList = obj.attrs;
    },
    changeFile(e) {
      let file = e.target.files[0];
      let name = path.extname(file.name);
      let arr = [".jpg", ".peg", ".jpeg", ".gif"];
      if (!arr.includes(name)) {
        errorAlert("请上传正确的图片格式");
        return;
      }
      this.user.img = file;
      this.imgUrl = URL.createObjectURL(file);
    },
    changeRole() {
      this.user.specsattr = [];
      this.getAttrs();
    },
    open() {
      this.editor = new E("#textarea");
      this.editor.create();
      this.editor.txt.html(this.user.description);
    },
    empty() {
      (this.user = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 2,
        status: 1,
      }),
        (this.secondCateList = "");
      this.imgUrl = "";
      this.specsList = [];
    },
    cancel() {
      this.info.isshow = false;
    },
    check() {
      return new Promise((resolve, reject) => {
        //验证
        if (this.user.first_cateid === "") {
          errorAlert("一级分类不能为空");
          return;
        }
        if (this.user.second_cateid === "") {
          errorAlert("二级分类不能为空");
          return;
        }
        if (this.user.goodsname === "") {
          errorAlert("商品名称为空");
          return;
        }
        if (this.user.price === "") {
          errorAlert("商品价格为空");
          return;
        }
        if (this.user.market_price === "") {
          errorAlert("商品市场价格为空");
          return;
        }
        if (!this.user.img) {
          errorAlert("请选择图片");
          return;
        }
        if (this.user.specsid === "") {
          errorAlert("请选择商品规格");
          return;
        }
        if (this.user.specsattr.length === 0) {
          errorAlert("请选择商品属性");
          return;
        }
        if (this.editor.txt.html() === "") {
          errorAlert("请输入商品描述");
          return;
        }
        resolve();
      });
    },
    add() {
      this.check().then(() => {
        this.user.description = this.editor.txt.html();
        let d = { ...this.user };
        d.specsattr = JSON.stringify(d.specsattr);

        reqgoodsAdd(d).then((res) => {
          successAlert("添加成功");
          this.cancel();
          this.empty();
          this.reqList();
          this.reqCount();
        });
      });
    },
    closed() {
      if (this.info.title == "编辑商品管理") {
        this.empty();
      }
    },
    getOne(id) {
      reqgoodsDetail(id).then((res) => {
        this.user = res.data.list;
        this.imgUrl = this.$imgPre + res.data.list.img;
        this.user.id = id;
        this.getSecondList();
        this.getAttrs();
        this.user.specsattr = JSON.parse(this.user.specsattr);
        if (this.editor) {
          this.editor.txt.html(this.user.description);
        }
      });
    },
    updated() {
      this.user.description = this.editor.txt.html();
      let d = { ...this.user };
      d.specsattr = JSON.stringify(d.specsattr);
      reqgoodsUpdate(d).then((res) => {
        successAlert("修改成功");
        this.reqList();
        this.empty();
        this.cancel();
      });
    },
  },
  mounted() {
    this.reqCateList();
    this.reqSpecsList(true);
  },
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