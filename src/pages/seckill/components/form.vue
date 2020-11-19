<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="form" :rules="rules">
        <el-form-item label="活动名称" label-width="80px" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="80px" prop="time">
          <el-date-picker
            v-model="time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeTime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" label-width="80px" prop="first_cateid">
          <el-select v-model="form.first_cateid" placeholder="请选择分类" @change="changeFirst">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="80px" prop="second_cateid">
          <el-select v-model="form.second_cateid" placeholder="请选择分类" @change="changeSecond">
            <el-option
              v-for="(item,ind) of secondList"
              :key="ind"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="80px" prop="goodsid">
          <el-select v-model="form.goodsid" placeholder="请选择商品">
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title==='添加限时秒杀'">添加</el-button>
        <el-button type="primary" @click="updated" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert,errorAlert } from "../../../utils/alert";
import {
  reqCateList,
  reqseckAdd,
  reqseckDetail,
  reqseckUpdate,
} from "../../../utils/hppts";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      time: [],
      secondList: [],
      rules: {
        title: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        first_cateid: [
          { required: true, message: "请输入一级分类", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请输入二级分类", trigger: "change" },
        ],
        goodsid: [{ required: true, message: "请输入商品", trigger: "change" }],
      },
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      goodsList: "goods/list",
    }),
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList",
      reqGoodsList: "goods/reqList",
      reqSeckList: "seck/reqList",
    }),
    firstId() {
      reqCateList({ pid: this.form.first_cateid }).then((res) => {
        this.secondList = res.data.list;
      });
    },
    changeFirst() {
      this.form.second_cateid = "";
      this.form.goodsid = "";
      this.firstId();
    },
    secondId() {
      this.reqGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      });
    },
    changeSecond() {
      this.form.goodsid = "";
      this.secondId();
    },
    changeTime() {
      this.form.begintime = this.time[0].getTime();
      this.form.endtime = this.time[1].getTime();
    },
    empty() {
      (this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodid: "",
        status: 1,
      }),
        (this.time = []);
      this.secondList = [];
    },
    cancel() {
      this.info.isshow = false;
    },
    check() {
      return new Promise((resolve, reject) => {
        //验证
        if (this.form.title === "") {
          errorAlert("活动名称为空");
          return;
        }
         if (this.time.length==0) {
          errorAlert("活动期限不能为空");
          return;
        }
        if (this.form.first_cateid === "") {
          errorAlert("一级分类不能为空");
          return;
        }
        if (this.form.second_cateid === "") {
          errorAlert("二级分类不能为空");
          return;
        }
        if (this.form.goodsid === "") {
          errorAlert("商品不能为空");
          return;
        }
        resolve();
      });
    },
    add() {
      this.check().then(() => {
        reqseckAdd(this.form).then((res) => {
          successAlert("添加成功");
          this.empty();
          this.cancel();
          this.reqSeckList();
        });
      });
    },
    getOne(id) {
      reqseckDetail(id).then((res) => {
        this.form = res.data.list;
        this.time = [
          new Date(Number(res.data.list.begintime)),
          new Date(Number(res.data.list.endtime)),
        ];
        this.firstId();
        this.secondId();
        this.form.id = id;
      });
    },
    updated() {
      reqseckUpdate(this.form).then((res) => {
        successAlert("修改成功");
        this.cancel();
        this.empty();
        this.reqSeckList();
      });
    },
    closed() {
      if (this.info.title == "编辑限时秒杀") {
        this.empty();
      }
    },
  },
  mounted() {
    this.reqCateList();
  },
};
</script>
<style>
</style>