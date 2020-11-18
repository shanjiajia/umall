import {reqgoodsList,reqgoodsCount} from '../../../utils/hppts';
const state={
    list:[],
    total:0,
    page:1,
    size:2
};
const mutations={
    changeList(state,arr){
        state.list=arr;
    },
    changeTotal(state,num){
        state.total=num;
    },
    changePage(state,page){
        state.page=page
    }
};
const actions={
    reqList(context){
        reqgoodsList({page:context.state.page,size:context.state.size}).then(res=>{
            let list = res.data.list?res.data.list:[];
            if(list.length==0&&context.state.page>1){
                context.commit('changePage',context.state.page-1);
                context.dispatch('reqList')
            }
            // list.forEach(item=>{
            //     item.attrs=JSON.parse(item.attrs)
            // })
            context.commit('changeList',list)
        })
    },
    reqCount(context){
        reqgoodsCount().then(res=>{
            context.commit('changeTotal',res.data.list[0].total)
        })
    },
    Page(context,page){
        context.commit('changePage',page)
        context.dispatch('reqList')
        
    }

};
const getters={
    list(state){
        return state.list;
    },
    Count(state){
        return state.total;
    },
    size(state){
        return state.size;
    },
};
export default{
    state,mutations,actions,getters,
    namespaced: true
}