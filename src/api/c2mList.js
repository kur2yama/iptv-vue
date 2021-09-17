import {axios,instance} from '../config/ajaxConfig'
// import axios from 'axios'
import Api from './apiUrl'  // 写入后台接口url文件路径
export default {
    // 获取轮播图列表
    getBannersList (params) {
        return new Promise((resolve, reject) => {
            axios.get(Api.BannersList,params,{emulateJSON:true}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    // 获取栏目列表
    getC2mList (params) {
        return new Promise((resolve, reject) => {
            axios.get(Api.C2mList,params,{emulateJSON:true}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    // 获取推荐列表
    getTipList (params) {
        return new Promise((resolve, reject) => {
            axios.get(Api.TipList,params,{emulateJSON:true}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    // 获取栏目详情下的资源列表
    getMeidaList (params) {
        return new Promise((resolve, reject) => {
            axios.get(Api.CatagoryList,params,{emulateJSON:true}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    //首页搜索
    getSearchList(params) {
        return new Promise((resolve, reject) => {
            axios.get(Api.searchList,params,{emulateJSON:true}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    // 添加收藏
    getAddCollect (userAccount,params) {
        return new Promise((resolve, reject) => {
            axios.get(Api.AddCollect+"/"+userAccount+"/mark?"+params,{emulateJSON:true}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    // 检查媒资是否收藏
    getCheckCollect (userAccount,params) {
        return new Promise((resolve, reject) => {
            axios.get(Api.AddCollect+"/"+userAccount+"/check?"+params,{emulateJSON:true}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    // 取消收藏
    getCancelCollect (userAccount,params) {
        return new Promise((resolve, reject) => {
            axios.post(Api.CancelCollect+"/"+userAccount+"/cancel?"+params,{emulateJSON:true}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    // 获取收藏预约列表
    getAddCollectList(userAccount) {
        return new Promise((resolve, reject) => {
            axios.get(Api.AddCollect+"/"+userAccount+"/list",{emulateJSON:true}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    //  获取用户预约列表
    getOrderList(userAccount,params) {
        return new Promise((resolve, reject) => {
            axios.get(Api.OrderList+"/"+userAccount+"/list?"+params,{emulateJSON:true}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    //  添加用户预约
    getAddOrderList(userAccount,params) {
        return new Promise((resolve, reject) => {
            axios.get(Api.AddOrderList+"/"+userAccount+"/sub?"+params,{emulateJSON:true}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    // 检查媒资是否预约
    getCheckOrder(userAccount,params) {
        return new Promise((resolve, reject) => {
            axios.get(Api.OrderList+"/"+userAccount+"/check?"+params,{emulateJSON:true}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    //  取消用户预约
    getCancelOrderList(userAccount,params) {
        return new Promise((resolve, reject) => {
            axios.get(Api.CancelOrderList+"/"+userAccount+"/cancel?"+params,{emulateJSON:true}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    // 获取媒资详情
    getDetails(id) {
        return new Promise((resolve, reject) => {
            axios.get(Api.Details+"/"+id,{emulateJSON:true}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    // 用户绑定
    getBindUser(userAccount,userMac,params) {
        return new Promise((resolve, reject) => {
            axios.post(Api.BindUser+"/"+userAccount+"/binding"+"/"+userMac,params,{emulateJSON:true}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    // 查询绑定信息
    getUserInfo(userAccount,userMac) {
        return new Promise((resolve, reject) => {
            axios.get(Api.checkUserInfo+"/"+userAccount+"/tv",{emulateJSON:true}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    //  用户解绑
    getUnBindUser(userAccount) {
        return new Promise((resolve, reject) => {
            axios.get(Api.UnBindUser+"/"+userAccount+"/unbind",{emulateJSON:true}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    //  发送电视遥控命令
    getUserKey(userAccount,params) {
        return new Promise((resolve, reject) => {
            axios.get(Api.UserKey+"/"+userAccount+"/remote",params,{emulateJSON:true}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    //  获取直播分类
    getLiveClassify(userAccount,params) {
        return new Promise((resolve, reject) => {
            axios.get(Api.LiveList+"/"+userAccount+"/type",params,{emulateJSON:true}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
     //  获取所有频道列表
     getLiveChannel(userAccount,params) {
        return new Promise((resolve, reject) => {
            axios.get(Api.LiveList+"/"+userAccount+"/channel",params,{emulateJSON:true}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
     // 获取所有节目列表
     getLiveShow(userAccount,params) {
        return new Promise((resolve, reject) => {
            axios.get(Api.LiveList+"/"+userAccount+"/show",params,{emulateJSON:true}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },



    // 获取活动列表/api/cjy/activity/{activityId}/getActivityVotes
    getActivityVotes(activityId) {
        return new Promise((resolve, reject) => {
            instance.get(Api.activePage+"/"+activityId+"/getActivityVotes",{emulateJSON:true}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    // 根据长江云账户获取iptv用户信息和剩余票数
    getActivePage(activityId,cjyUserAccount) {
        return new Promise((resolve, reject) => {
            instance.get(Api.activePage+"/"+activityId+"/user-details"+"/"+cjyUserAccount,{emulateJSON:true}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    // 根据活动id获取活动的子分类
    getVoteShow(activityId) {
        return new Promise((resolve, reject) => {
            instance.get(Api.activePage+"/"+activityId,{emulateJSON:true}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    // 获取活动下的选手
    getCandidatesList(activityId,params) {
        return new Promise((resolve, reject) => {
            instance.get(Api.activePage+"/"+activityId+"/candidates",params,{emulateJSON:true}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    // 获取选手详情
    getcandidateDetails(activityId,candidateId) {
        return new Promise((resolve, reject) => {
            instance.get(Api.activePage+"/"+activityId+"/candidate"+"/"+candidateId,{emulateJSON:true}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    //为选手投票
    getcandidateVote(activityId,candidateId,params) {
        return new Promise((resolve, reject) => {
            instance.post(Api.activePage+"/"+activityId+"/candidate"+"/"+candidateId+"/vote",params,{emulateJSON:true},{headers:{'Content-Type':'application/json'}}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    //获取用户投票排名/api/cjy/activity/{activityId}/rankList/{iptvUserId}
    getUserRanking(activityId,iptvUserId) {
        return new Promise((resolve, reject) => {
            instance.get(Api.userRanking+"/"+activityId+"/rankList"+"/"+iptvUserId,{emulateJSON:true}).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
}