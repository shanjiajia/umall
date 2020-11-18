<template>
  <div>
    <el-container class="con">
      <el-aside width="200px">
        <!-- 侧边栏导航 
        background-color 背景色
        text-color 字体颜色
        active-text-color 激活的文字的颜色
        unique-opened 只有一个子菜单展开
        router 路由模式
        -->
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <div v-for="item in userInfo.menus" :key="item.id">
            <!-- 目录 -->
            <el-submenu :index="item.id+''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item 
                    v-for="i in item.children" 
                     :key="i.id" :index="i.url"
                >{{i.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- 菜单 -->
            <el-menu-item v-else :index="item.url">{{item.title}}</el-menu-item>
          </div> 
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span>{{userInfo.username}}</span>
          <el-button type="danger" @click='logout'>退出</el-button>
        </el-header>
        <el-main>
          <!-- 面包屑 -->
          <el-breadcrumb separator-class="el-icon-arrow-right" v-if="$route.name">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>

          <router-view class="main"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    ...mapActions({
      changeUser:'changeUser',
    }),
    logout(){
      this.changeUser({});
      this.$router.push('/login')
    }
  },
  mounted() {
  },
};
</script>

<style>
.el-aside {
  background-color: #20222A;
  height: 100vh;
}
.el-header {
  height: 60px;
  background-color: #B3C0D1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.main {
  margin-top: 20px;
}
span{
  margin-right: 10px;
}
</style>