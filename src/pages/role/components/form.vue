<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user" :rules="rules">
        <el-form-item label="角色名称" label-width="120px" prop="rolename">
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="120px">
          <div>
            <!--
                  data:数据
                  children  用来判断有没有子节点，
                  label  展示在页面的字段
                  node-keys  点击节点以后得到的内容 
            -->
            <el-tree
              :data="menuList"
              show-checkbox
              node-key="id"
              ref="tree"
              :props="{children:'children',label:'title'}"
            ></el-tree>
          </div>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title==='添加角色'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { errorAlert, successAlert } from "../../../utils/alert";
import {
  reqMenuList,
  reqRoleAdd,
  reqRoleDetail,
  reqRoleUpdate,
} from "../../../utils/hppts";
export default {
  props: ["info"],
  data() {
    return {
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
      },
      user: {
        rolename: "",
        menus: "",
        status: 1,
      },
      menuList: [],
    };
  },

  components: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    empty() {
      this.user = {
        rolename: "",
        menus: "",
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    closed() {
      if (this.info.title == "编辑角色") {
        this.empty();
      }
    },
    cancel() {
      this.info.isshow = false;
    },
    add() {
      return new Promise((resolve, reject) => {
        //验证
        if (this.user.rolename === "") {
          errorAlert("角色名称不能为空");
          return;
        }
        if (this.$refs.tree.getCheckedKeys().length===0) {
          errorAlert("角色权限不能为空");
          return;
        }
        resolve();
      }).then(() => {
        console.log(this.$refs.tree.getCheckedKeys())
        this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        reqRoleAdd(this.user).then((res) => {
          if (res.data.code === 200) {
            successAlert("添加成功");
            this.empty();
            this.cancel();
            this.$emit("init");
          }
        });
      });
    },
    getOne(id) {
      reqRoleDetail(id).then((res) => {
        console.log(res);
        this.user = res.data.list;
        this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus));
        this.user.id = id;
      });
    },
    update() {
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleUpdate(this.user).then((res) => {
        if (res.data.code === 200) {
          successAlert("修改成功");
          this.empty();
          this.cancel();
          this.$emit("init");
        }
      });
    },
  },
  mounted() {
    reqMenuList().then((res) => {
      if (res.data.code === 200) {
        this.menuList = res.data.list;
      }
    });
  },
};
</script>
<style>
</style>