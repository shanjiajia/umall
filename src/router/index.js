import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
// import { state } from '../store/mutations'
function checkEnter(path,next){
    if(store.state.userInfo.menus_url.includes(path)){
        next();
    }else{
        next('/')
    }
}
Vue.use(Router)
export let routes = [
    {
        path:'menu',
        component:()=>import('../pages/menu/menu'),
        name:'菜单管理',
        beforeEnter: (to, from, next) => {
            checkEnter('/menu',next)
        }
    },
    {
        path:'role',
        component:()=>import('../pages/role/role'),
        name:'角色管理',
        beforeEnter: (to, from, next) => {
            checkEnter('/role',next)
        }
    },
    {
        path:'manage',
        component:()=>import('../pages/manage/manage'),
        name:'管理员管理',
        beforeEnter: (to, from, next) => {
            checkEnter('/manage',next)
        }
    },
    {
        path:'cate',
        component:()=>import('../pages/cate/cate'),
        name:'商品分类',
        beforeEnter: (to, from, next) => {
            checkEnter('/cate',next)
        }
    },
    {
        path:'specs',
        component:()=>import('../pages/specs/specs'),
        name:'商品规格',
        beforeEnter: (to, from, next) => {
            checkEnter('/specs',next)
        }
    },
    {
        path:'goods',
        component:()=>import('../pages/goods/goods'),
        name:'商品管理',
        beforeEnter: (to, from, next) => {
            checkEnter('/goods',next)
        }
    },
    {
        path:'vip',
        component:()=>import('../pages/vip/vip'),
        name:'会员管理',
        beforeEnter: (to, from, next) => {
            checkEnter('/vip',next)
        }
    },
    {
        path:'banner',
        component:()=>import('../pages/banner/banner'),
        name:'轮播图管理',
        beforeEnter: (to, from, next) => {
            checkEnter('/banner',next)
        }
    },
    {
        path:'seckill',
        component:()=>import('../pages/seckill/seckill'),
        name:'秒杀活动',
        beforeEnter: (to, from, next) => {
            checkEnter('/seckill',next)
        }
    },
]
let router =  new Router({
 routes:[
    {
        path:'/',
        component:()=>import('../pages/index/index'),
        children:[
            {
                path:'',
                component:()=>import('../pages/home/home')
            },
            ...routes,

        ]
    },
    {
        path:'/login',
        component:()=>import('../pages/login/login')
    }
 ]
});
router.beforeEach((to, from, next) => {
    if(to.fullPath=='/login'){
        next();
        return;
    }
    if(store.state.userInfo.token){
        next();
        return;
    };
    next('/login')
})
export default router;

