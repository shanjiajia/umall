<template>
  <div>
    <!-- 5.绑定info.isshow到模板 -->
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="form" :rules="rules">
        <el-form-item label="菜单名称" label-width="120px" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="120px" prop="pid">
          <el-select v-model="form.pid" placeholder="请选择" @change="changePid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 23 list遍历 -->
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="120px">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <!-- 15.目录有图标，菜单有地址 -->
        <el-form-item label="菜单图标" v-if="form.type===1" label-width="120px" prop="icon">
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" v-else label-width="120px" prop="url">
          <el-select v-model="form.url" placeholder="请选择">
            <!-- 10.遍历routes -->
            <el-option
              v-for="item in routes"
              :key="item.path"
              :label="item.name+'--/'+item.path"
              :value="'/'+item.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title==='添加菜单'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { routes } from "../../../router";
import { reqMenuAdd, reqMenuDetail, reqMenuUpdate } from "../../../utils/hppts";
import { successAlert, errorAlert } from "../../../utils/alert";
export default {
  // 4.接受info
  //   22.接收list
  props: ["info", "list"],
  data() {
    return {
      //icon集合
      icons: [
        "el-icon-s-tools",
        "el-icon-user-solid",
        "el-icon-s-help",
        "el-icon-s-operation",
      ],
      //9.定义routes
      routes: routes,
      //11.初始化form,并通过v-model绑定数据到模板
      form: {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1,
      },
      rules: {
        pid: [{ required: true, message: "请输入上级菜单", trigger: "change" }],
        title: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        icon: [{ required: true, message: "请输入菜单图标", trigger: "blur" }],
        url: [
          { required: true, message: "请输入商品菜单地址", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    //6.点击了取消
    cancel() {
      this.info.isshow = false;
    },
    //27.上级菜单发生了修改
    changePid() {
      // 如果上级菜单是 顶级菜单，那么 form.type=1;否则是2
      if (this.form.pid === 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    // 13.form置空
    empty() {
      this.form = {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1,
      };
    },
    check() {
      return new Promise((resolve, reject) => {
        //验证

        if (this.form.title === "") {
          errorAlert("菜单名称不能为空");
          return;
        }
        if (this.form.pid === "") {
          errorAlert("上级菜单不能为空");
          return;
        }
        // if (this.form.icon) {
        //   if (this.form.icon === "") {
        //     errorAlert("菜单图标不能为空");
        //     return;
        //   }
        // }
        // if (this.form.url) {
        //   if (this.form.url === "") {
        //     errorAlert("菜单地址不能为空");
        //     return;
        //   }
        // }

        resolve();
      });
    },
    //12.点击了添加按钮
    add() {
      //发起添加的请求
      this.check().then(() => {
        reqMenuAdd(this.form).then((res) => {
          if (res.data.code === 200) {
            successAlert("添加成功");
            //弹框消失
            this.cancel();
            //form置空
            this.empty();
            //24.通知menu刷新列表数据
            this.$emit("init");
          } else {
            errorAlert(res.data.msg);
          }
        });
      });
    },
    //36.获取一条数据
    getOne(id) {
      reqMenuDetail(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    //37 点了修改
    update() {
      reqMenuUpdate(this.form).then((res) => {
        if (res.data.code === 200) {
          successAlert("修改成功");
          //弹框消失
          this.cancel();
          //form重置
          this.empty();
          //列表刷新
          this.$emit("init");
        } else {
          errorAlert(res.data.msg);
        }
      });
    },
    //38.弹框消失
    closed() {
      // 如果是添加出现，点击了取消，此时，什么都不做
      // 如果是编辑出现，点击了取消，此时，form置空
      if (this.info.title === "编辑菜单") {
        this.empty();
      }
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>