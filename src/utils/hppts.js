import Vue from 'vue'
import axios from 'axios'
import qs from 'qs';
import {errorAlert} from '../utils/alert';
import store from '../store/index';
import router from '../router/index'
//开发环境使用
let baseUrl = '/aa';
Vue.prototype.$imgPre='http://localhost:3000'
//生产环境使用
// let baseUrl = '';
// Vue.prototype.$imgPre=''
//请求拦截
axios.interceptors.request.use(req=>{
    if(req.url!=baseUrl+'/api/userlogin'){
        req.headers.authorization=store.state.userInfo.token;
    }
    return req;
})
//响应拦截
axios.interceptors.response.use(res=>{
    console.log('本次请求的地址是:'+res.config.url);
    console.log(res);
    if(res.data.code!=200){
        errorAlert(res.data.msg)
    }
    if(res.data.msg==='登录已过期或访问权限受限'){
        store.dispatch('changeUser',{})
        router.push('/login')
    }
    return res;
})

//================================menu=================================
//菜单管理页添加数据
export const reqMenuAdd=(form)=>{
    return axios({
        url:baseUrl+"/api/menuadd",
        method:"post",
        data:qs.stringify(form)
    })
}
//请求菜单管理页的数据
export const reqMenuList =()=>{
    return axios({
        url:baseUrl+'/api/menulist',
        method:'get',
        params:{
            istree:true
        }
    })
}
//删除数据库中的数据
export const reqMenuDel = (id) =>{
    return axios({
        url:baseUrl+'/api/menudelete',
        method:'post',
        data:qs.stringify({
            id:id
        })
    })
}
//获取一条数据
export const reqMenuDetail=(id)=>{
    return axios({
        url:baseUrl+'/api/menuinfo',
        method:'get',
        params:{id:id}
    })
}
//修改数据
export const reqMenuUpdate = (form)=>{
    return axios({
        url:baseUrl+'/api/menuedit',
        method:'post',
        data:form
    })
}


//================================role=================================
//请求数据库中角色列表数据
export const reqRoleList = () =>{
    return axios({
        url:baseUrl+'/api/rolelist',
        method:'get',
    })
}
//向数据库中添加数据
export const reqRoleAdd=(form)=>{
    return axios({
        url:baseUrl+'/api/roleadd',
        method:'post',
        data:qs.stringify(form)
    })
}
//获取一条数据
export const reqRoleDetail = id => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: {
            id: id
        }
    })
}
//角色修改
export const reqRoleUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(user)
    })
}
//角色删除
export const reqRoleDel=(id)=>{
    return axios({
        url:baseUrl+'/api/roledelete',
        method:'post',
        data:qs.stringify({
            id:id
        })
    })
}

//================================manage=================================
//请求数据库中管理员列表数据
export const reqUserList = (p) =>{
    return axios({
        url:baseUrl+'/api/userlist',
        method:'get',
        params:p
    })
}
//向数据库中添加数据
export const reqUserAdd=(form)=>{
    return axios({
        url:baseUrl+'/api/useradd',
        method:'post',
        data:qs.stringify(form)
    })
}
//获取一条数据
export const reqUserDetail = uid => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: {
            uid: uid
        }
    })
}
//管理员修改
export const reqUserUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(user)
    })
}
//管理员删除
export const reqUserDel=(uid)=>{
    return axios({
        url:baseUrl+'/api/userdelete',
        method:'post',
        data:qs.stringify({
            uid:uid
        })
    })
}
//管理员分页的总数
export const reqUserCount =()=>{
    return axios({
        url:baseUrl+'/api/usercount',
        method:'get',
    })
}

//===========================login================================
//登录
export const reqLogin=(user)=>{
    return axios({
        url:baseUrl+'/api/userlogin',
        method:'post',
        data:qs.stringify(user)
    })
}

//===========================vip================================
//获取会员的数据
export const reqVipList = () =>{
    return axios({
        url:baseUrl+'/api/memberlist',
        method:'get',
    })
}
//获取一条数据
export const reqVipDetail=(uid)=>{
    return axios({
        url:baseUrl+'/api/memberinfo',
        method:'get',
        params:{
            uid:uid
        }
    })
}
//修改
export const reqVipUpdate = (user)=>{
    return axios({
        url:baseUrl+'/api/memberedit',
        method:'post',
        data:qs.stringify(user)
    })
}

//===========================商品分类================================
//商品分类添加
export const reqCateAdd=(user)=>{
    let d = new FormData();
    for(let i in user){
        console.log(i,user[i])
        d.append(i,user[i])
    }
    return axios({
        url:baseUrl+'/api/cateadd',
        method:'post',
        data:d
    })
}
//查询商品分类列表
export const reqCateList =(p) =>{
    return axios({
        url:baseUrl+'/api/catelist',
        method:'get',
        params:p
    })
}
//删除
export const reqCateDel = (id) =>{
    return axios({
        url:baseUrl+'/api/catedelete',
        method:'post',
        data:qs.stringify({
            id:id
        })
    })
}
//获取一条详情
export const reqCateDetail = (id)=>{
    return axios({
        url:baseUrl+'/api/cateinfo',
        method:'get',
        params:{
            id:id
        }
    })
}
//修改
export const reqCateUpdate = (user)=>{
    let data = new FormData();
    for(let i in user){
        data.append(i,user[i])
    }
    return axios({
        url:baseUrl+'/api/cateedit',
        method:'post',
        data:data
    })
}

//===========================商品规格================================
//添加商品规格信息
export const reqSpecsAdd =(user)=>{
    return axios({
        url:baseUrl+'/api/specsadd',
        method:'post',
        data:qs.stringify(user)
    })
}
//获取规格列表
export const reqSpecsList = (p)=>{
    return axios({
        url:baseUrl+'/api/specslist',
        method:'get',
        params:p
    })
}
//删除
export const reqSpescDel =(id)=>{
    return axios({
        url:baseUrl+'/api/specsdelete',
        method:'post',
        data:qs.stringify({
            id:id
        })
    })
}
//获取一条数据
export const reqSpecsDetail=(id)=>{
    return axios({
        url:baseUrl+'/api/specsinfo',
        method:'get',
        params:{
            id:id
        }

    })
}
//修改
export const reqSpecsUpdate =(user)=>{
    return axios({
        url:baseUrl+'/api/specsedit',
        method:'post',
        data:qs.stringify(user)
    })
}
//获取总数
export const reqSpecsCount = ()=>{
    return axios({
        url:baseUrl+'/api/specscount',
        method:'get'
    })
}

//===========================轮播图管理================================
//添加轮播图信息
export const reqBannerAdd =(user)=>{
    let file = new FormData();
    for(let i in user){
        file.append(i,user[i])
    }
    return axios({
        url:baseUrl+'/api/banneradd',
        method:'post',
        data:file
    })
}
//获取规格列表
export const reqBannerList = ()=>{
    return axios({
        url:baseUrl+'/api/bannerlist',
        method:'get'
    })
}
//删除
export const reqBannerDel =(id)=>{
    return axios({
        url:baseUrl+'/api/bannerdelete',
        method:'post',
        data:qs.stringify({
            id:id
        })
    })
}
//获取一条数据
export const reqBannerDetail=(id)=>{
    return axios({
        url:baseUrl+'/api/bannerinfo',
        method:'get',
        params:{
            id:id
        }
    })
}
//修改
export const reqBannerUpdate =(user)=>{
    let file = new FormData();
    for(let i in user){
        file.append(i,user[i])
    }
    return axios({
        url:baseUrl+'/api/banneredit',
        method:'post',
        data:file
    })
}

//===========================商品管理================================
//添加商品管理信息
export const reqgoodsAdd =(user)=>{
    let file = new FormData();
    for(let i in user){
        file.append(i,user[i])
    }
    return axios({
        url:baseUrl+'/api/goodsadd',
        method:'post',
        data:file
    })
}
//获取管理列表
export const reqgoodsList = (p)=>{
    return axios({
        url:baseUrl+'/api/goodslist',
        method:'get',
        params:p
    })
}
//删除
export const reqgoodsDel =(id)=>{
    return axios({
        url:baseUrl+'/api/goodsdelete',
        method:'post',
        data:qs.stringify({
            id:id
        })
    })
}
//获取一条数据
export const reqgoodsDetail=(id)=>{
    return axios({
        url:baseUrl+'/api/goodsinfo',
        method:'get',
        params:{
            id:id
        }

    })
}
//修改
export const reqgoodsUpdate =(user)=>{
    let file = new FormData();
    for(let i in user){
        file.append(i,user[i])
    }
    return axios({
        url:baseUrl+'/api/goodsedit',
        method:'post',
        data:file
    })
}
//获取总数
export const reqgoodsCount = ()=>{
    return axios({
        url:baseUrl+'/api/goodscount',
        method:'get'
    })
}

//===========================限时秒杀================================
//添加限时秒杀信息
export const reqseckAdd =(user)=>{
    return axios({
        url:baseUrl+'/api/seckadd',
        method:'post',
        data:qs.stringify(user)
    })
}
//获取限时秒杀列表
export const reqseckList = (p)=>{
    return axios({
        url:baseUrl+'/api/secklist',
        method:'get',
        params:p
    })
}
//删除
export const reqseckDel =(id)=>{
    return axios({
        url:baseUrl+'/api/seckdelete',
        method:'post',
        data:qs.stringify({
            id:id
        })
    })
}
//获取一条数据
export const reqseckDetail=(id)=>{
    return axios({
        url:baseUrl+'/api/seckinfo',
        method:'get',
        params:{
            id:id
        }

    })
}
//修改
export const reqseckUpdate =(user)=>{
    return axios({
        url:baseUrl+'/api/seckedit',
        method:'post',
        data:qs.stringify(user)
    })
}
