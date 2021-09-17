<template>
<div>
   <Header></Header>
   <div style="height:100vh;overflow:scroll;-webkit-overflow-scrolling: touch;" ref="pageScroll">
        <div class="detail-top">
            <div class="detail-img">
                <!-- <img v-lazy='"https://iptv.hbtv.com.cn/static/"+thumbnail?"https://iptv.hbtv.com.cn/static/"+thumbnail:defaultUrl' :onerror="defaultUrl"/> -->
                <img v-lazy='thumbnail?thumbnail:defaultUrl' :onerror="defaultUrl"/>
            </div>
            <div class="detail-info">
                <h2>{{name}}</h2>
                <p>{{releaseLanguage}}/{{releasePlace}}/{{duration}}分钟</p>
                <p>{{releaseDate}}/上映</p>
            </div>
        </div>
        <div class="share-btn">
            <div v-if="colletState==1">
                <span @click="handleAddCollect()"><i class="collect"></i>收藏</span><em style="color:#999;">|</em>
                <span @click="handleShare()"><i class="share"></i>分享</span>
            </div>
            <div v-if="colletState==2">
                <span @click="handleCancelCollect()"><i class="actived"></i>已收藏</span><em style="color:#999;">|</em>
                <span @click="handleShare()"><i class="share"></i>分享</span>
            </div>
        </div>
        <div class="movie-info">
            <h2>影片介绍</h2>
            <p :class="{ actived: isActive }" @click="toggleDispaly()">{{description}}</p>
            <div class="open-tips" @click="toggleDispaly()">
                <img v-lazy='showHide?require("../assets/images/showMy.png"):require("../assets/images/hideMy.png")'/>
            </div>
        </div>
        <div class="actor-list" v-show="yzShowHide">
            <h2>演职人员</h2>
            <ul>
                <li v-for="item in staffsList"
                :key="item.index" >
                    <p>{{item.name}}</p>
                    <span>{{item.profession}}</span>
                </li>
            </ul>
        </div>
        <div class="synopsis" v-show="qjShowHide">
            <!-- <h2>剧集</h2> -->
            <van-cell is-link @click="showPopup">剧集</van-cell>
            <van-popup 
                v-model="show"  
                position="bottom"   
                closeable
                :style="{ height: 'auto' }">
                <div class="s-list">
                    <h2>剧集</h2>
                    <li v-for="(item,index) in mediaNum" 
                        :key="item.index"
                        :class="{actived: index == actived}"
                        @click="getPlayVod(index)"
                        >{{ index+1>9?index+1:index+1 }}
                    </li>
                </div>
            </van-popup>
            <div class="synopsis-list">
                <ul>
                    <li v-for="(item,index) in mediaNum" 
                        :key="item.index"
                        :class="{actived: index == actived}"
                        @click="getPlayVod(index)"
                        >{{ index+1>9?index+1:index+1 }}</li>
                </ul>
            </div>
        </div>
        <div class="relevant">
            <h2>相关推荐</h2>
            <ul class="hot-list">
                <li 
                v-for="(item,index) in recommendList" 
                :key="item.index" 
                @click="getDetailsData(item.id)" 
                >
                    <!-- <img v-lazy='"https://iptv.hbtv.com.cn/static/"+recommendList[index].thumbnail?"https://iptv.hbtv.com.cn/static/"+recommendList[index].thumbnail:defaultUrl' :onerror="defaultUrl"/> -->
                    <img v-lazy='recommendList[index].thumbnail?recommendList[index].thumbnail:defaultUrl' :onerror="defaultUrl"/>
                    <p>{{recommendList[index].name}}</p>
                </li> 
            </ul>
        </div>
    </div>
    <div v-if="movieflag==0">
            <div class="see-btn" 
                @click="getPlayMovie()" 
                v-show="dsjShowHide">
                电视播放
            </div>
        </div>
        <div v-if="movieflag==1">
            <div class="see-btn" 
                @click="getAddOrder()" 
                >
                预约
            </div>
        </div>
        <div v-if="movieflag==2">
            <div class="see-btn" 
                @click="getCancelOrder()" 
                >
                已预约
            </div>
        </div>
    <div class="float-contr" id="float-contr">
        <float-page></float-page>
    </div>
</div>
</template>

<script>
import Header from './common/header.vue'
import $list from '../api/index'
import floatPage from './common/floating.vue'
import qs from 'qs'
import MC from '../config/mc.js'
import { Dialog } from 'vant' 
export default {
    components:{
        floatPage,
        Header,
    },
    data () {
        return {
        mId:'',
        code:'',
        name: '',
        thumbnail:'',//图片 
        releaseDate:'',
        releasePlace:'',
        releaseLanguage:'',
        duration:'',
        description:'',//简介
        staffsList:'',//演职人员
        recommendList:'',//相关推荐
        mediaNum:'',//集数
        mediaId:'',
        mediaType:'',
        qjShowHide:true,
        yzShowHide:true,
        dsjShowHide:true,
        isActive:false,
        showHide:true,
        colletState:1,
        movieflag:0,
        actived:null,
        show: false,
        defaultUrl:'this.src="' + require("../assets/images/08.png") +'";this.onerror=null'
        }
    },
    created() {
        this.getInit();
    },
    methods: {
        getInit() {
            $list.c2mList.getDetails(this.$route.query.id).then(res=>{
                this.mId = res.data.id;
                this.code = res.data.code;
                this.name = res.data.name;
                this.thumbnail = res.data.thumbnail;
                this.releaseDate = res.data.releaseDate;
                this.releasePlace = res.data.releasePlace;
                this.duration = res.data.duration;
                this.releaseLanguage = res.data.releaseLanguage;
                this.description = res.data.description;
                this.staffsList = res.data.staffs; 
                this.mediaId = res.data.id;  
                this.mediaType = res.data.mediaType;   
                this.mediaNum = res.data.mediaNum;  
                if(this.staffsList==''){
                    this.yzShowHide = false;
                }else{
                    this.yzShowHide = true;
                }
                if(this.mediaNum<=1){
                    this.qjShowHide = false;
                    this.dsjShowHide = true;
                    const d1 = this.releaseDate;
                    // const d1 = '2020-12-31';
                    const nowDate = new Date();
                    const tempDate = {
                        year: nowDate.getFullYear(),
                        month: nowDate.getMonth() + 1,
                        date: nowDate.getDate(),
                    }
                    if ( tempDate.month < 10){
                        tempDate.month = "0" + tempDate.month;
                    }
                    if ( tempDate.date < 10){
                        tempDate.date = "0" + tempDate.date;
                    }
                    const d2 = tempDate.year + '-' + tempDate.month + '-' + tempDate.date;
                    const reg = new RegExp('-', 'g');
                    const orderState =(new Date(d1.replace(reg, '/')))>(new Date(d2.replace(reg, '/')));
                    if(orderState){
                        this.movieflag = 1;
                        this.handleCheckOrder();
                    }
                }else{
                    this.qjShowHide = true;
                    this.dsjShowHide = false;
                }        
                this.recommendList = res.data.recommendList;   
                this.handleCheckCollect();
                
            }).catch(error=>{
                console.log(error);
            });
        },
        toggleDispaly(){
            this.showHide = !this.showHide;
            this.isActive = !this.isActive;
        },
        getDetailsData(id){ 
            $list.c2mList.getDetails(id).then(res=>{ 
                const  _self = this;
                _self.mId = res.data.id;
                _self.code = res.data.code;
                _self.name = res.data.name;
                _self.thumbnail = res.data.thumbnail;
                _self.releaseDate = res.data.releaseDate;
                _self.releasePlace = res.data.releasePlace;
                _self.duration = res.data.duration;
                _self.releaseLanguage = res.data.releaseLanguage;
                _self.description = res.data.description;
                _self.staffsList = res.data.staffs; 
                _self.mediaId = res.data.id;  
                _self.mediaType = res.data.mediaType;   
                _self.mediaNum = res.data.mediaNum;  
                if(_self.staffsList==''){
                    _self.yzShowHide = false;
                }else{
                    _self.yzShowHide = true;
                }
                if(_self.mediaNum<=1){
                    _self.qjShowHide = false;
                    _self.dsjShowHide = true;
                    const d1 = _self.releaseDate;
                    // const d1 = '2020-12-31';
                    const nowDate = new Date();
                    const tempDate = {
                        year: nowDate.getFullYear(),
                        month: nowDate.getMonth() + 1,
                        date: nowDate.getDate(),
                    }
                    if ( tempDate.month < 10){
                        tempDate.month = "0" + tempDate.month;
                    }
                    if ( tempDate.date < 10){
                        tempDate.date = "0" + tempDate.date;
                    }
                    const d2 = tempDate.year + '-' + tempDate.month + '-' + tempDate.date;
                    const reg = new RegExp('-', 'g');
                    const orderState =(new Date(d1.replace(reg, '/')))>(new Date(d2.replace(reg, '/')));
                    if(orderState){
                        _self.movieflag = 1;
                        _self.handleCheckOrder();
                    }
                }else{
                    _self.qjShowHide = true;
                    _self.dsjShowHide = false;
                }        
                _self.recommendList = res.data.recommendList;  
                _self.$refs.pageScroll.scrollTop  = 0; 
                _self.handleCheckCollect();
            }).catch(error=>{
                console.log(error);
            });
           
        },
        // 收藏媒资
        handleAddCollect(){
            const that = this;
            mc.userGetInfo(function(data) {
                if(data.state==1){
                    const userAccount = data.data.id;
                    const changyanUserId = data.data.changyanUserId;
                    const nickname = data.data.nickname;
                    localStorage.setItem('userAccount',userAccount)
                    localStorage.setItem('changyanUserId',changyanUserId)
                    localStorage.setItem('nickname',nickname)
                    if(userAccount){
                        const oparams = "mediaId="+ that.mediaId+'&'+"mediaType="+ that.mediaType;
                        $list.c2mList.getAddCollect(userAccount,oparams).then(res=>{
                            if(res.code == 200){
                                that.colletState = 2;
                                that.$toast('收藏成功');
                            }else{
                                that.$toast(res.message);
                            }
                        }).catch(error=>{
                            console.log(error);
                        });
                    }
                }else if(data.state == 0){
                    Dialog.confirm({
                        title: '请先登录',
                        message: '登录后记得在设备页面绑定哦'
                            }).then(() => {
                            mc.userLogin(function(data) {
                            })
                        }).catch(() => {
                        // on cancel
                     });
                }
            });
        },
        // 取消收藏媒资
        handleCancelCollect(){
            const that = this;
            mc.userGetInfo(function(data) {
                if(data.state==1){
                    const userAccount = data.data.id;
                    const changyanUserId = data.data.changyanUserId;
                    const nickname = data.data.nickname;
                    localStorage.setItem('userAccount',userAccount)
                    localStorage.setItem('changyanUserId',changyanUserId)
                    localStorage.setItem('nickname',nickname)
                    if(userAccount){
                        const oparams = "mediaId="+ that.mediaId;
                        $list.c2mList.getCancelCollect(userAccount,oparams).then(res=>{
                            that.colletState = 1;
                            that.$toast('取消成功');
                        }).catch(error=>{
                            console.log(error);
                        });
                    }
                }else if(data.state == 0){
                    Dialog.confirm({
                        title: '请先登录',
                        message: '登录后记得在设备页面绑定哦'
                            }).then(() => {
                            mc.userLogin(function(data) {
                            })
                        }).catch(() => {
                        // on cancel
                     });
                }
            });
        },
        // 检查是否收藏媒资
        handleCheckCollect(){
            const userAccount =  localStorage.getItem("userAccount");
            const oparams = "mediaId="+ this.mediaId+'&'+"mediaType="+ this.mediaType;
            $list.c2mList.getCheckCollect(userAccount,oparams).then(res=>{
                if(res.data){
                    this.colletState = 2;
                }else{
                    this.colletState = 1;
                }
            }).catch(error=>{
                console.log(error);
            });
        },
        // 新片预约
        getAddOrder(){
            const that = this;
            mc.userGetInfo(function(data) {
                if(data.state==1){
                    const userAccount = data.data.id;
                    const changyanUserId = data.data.changyanUserId;
                    const nickname = data.data.nickname;
                    localStorage.setItem('userAccount',userAccount)
                    localStorage.setItem('changyanUserId',changyanUserId)
                    localStorage.setItem('nickname',nickname)
                    if(userAccount){
                        const oparams = "mediaId="+ that.mediaId+'&'+"mediaType="+ that.mediaType+'&'+"mediaName="+ that.name;
                            $list.c2mList.getAddOrderList(userAccount,oparams).then(res=>{
                                if(res.code == 200){
                                    that.movieflag = 2;
                                    const shareUrl = window.location.href;
                                    // const orderTime = '2020-01-02 10:27:00'
                                    const orderTime = that.releaseDate+'\xa0'+'19:00:00'
                                    mc.addSubscribeNotice({ 
                                        "tv_program_name": that.name,
                                        "time": orderTime,
                                        "h5": shareUrl,
                                        'mId':that.mId
                                    })
                                    that.$toast.success('预约成功');
                                }else{
                                    that.$toast(res.message);
                                }
                            }).catch(error=>{
                                console.log('错误信息');
                                console.log(error);
                        });
                    }
                }else if(data.state == 0){
                    Dialog.confirm({
                        title: '请先登录',
                        message: '登录后记得在设备页面绑定哦'
                            }).then(() => {
                            mc.userLogin(function(data) {
                            })
                        }).catch(() => {
                        // on cancel
                     });
                }
            });
        },
        // 取消预约
        getCancelOrder(){
            const that = this;
            mc.userGetInfo(function(data) {
                if(data.state==1){
                    const userAccount = data.data.id;
                    const changyanUserId = data.data.changyanUserId;
                    const nickname = data.data.nickname;
                    localStorage.setItem('userAccount',userAccount)
                    localStorage.setItem('changyanUserId',changyanUserId)
                    localStorage.setItem('nickname',nickname)
                    if(userAccount){
                        const oparams = "mediaId="+ that.mediaId+'&'+"mediaType="+ that.mediaType;
                            $list.c2mList.getCancelOrderList(userAccount,oparams).then(res=>{
                                that.movieflag = 1;
                                mc.removeSubscribeNotice({ 
                                    'mId':that.mId
                                })
                                that.$toast.success('取消成功');
                            }).catch(error=>{
                                console.log('错误信息');
                                console.log(error);
                            });
                    }
                }else if(data.state == 0){
                    Dialog.confirm({
                        title: '请先登录',
                        message: '登录后记得在设备页面绑定哦'
                            }).then(() => {
                            mc.userLogin(function(data) {
                            })
                        }).catch(() => {
                        // on cancel
                     });
                }
            });
        },
         // 检查是否预约媒资
        handleCheckOrder(){
            const userAccount =  localStorage.getItem("userAccount");
            const oparams = "mediaId="+ this.mediaId+'&'+"mediaType="+ this.mediaType;
            $list.c2mList.getCheckOrder(userAccount,oparams).then(res=>{
                if(res.data){
                    this.movieflag = 2;
                    this.dyShowHide = false;
                }else{
                    this.movieflag = 1;
                    this.dyShowHide = false;
                }
            }).catch(error=>{
                console.log(error);
            });
        },
        //单集点播(电视剧)
        getPlayVod(index){
            this.actived = index;
            const that = this;
            mc.userGetInfo(function(data) {
                if(data.state==1){
                    const userAccount = data.data.id;
                    const changyanUserId = data.data.changyanUserId;
                    const nickname = data.data.nickname;
                    localStorage.setItem('userAccount',userAccount)
                    localStorage.setItem('changyanUserId',changyanUserId)
                    localStorage.setItem('nickname',nickname)
                    if(userAccount){
                        const iptvAccount =  localStorage.getItem("iptvAccount");
                        if(iptvAccount){
                            const code = that.code;
                            const oparams = {
                                    "type":'series',
                                    "code": code,
                                    "index": index
                            }
                            $list.c2mList.getUserKey(userAccount,{params: oparams}).then(res=>{
                                if(res.code == 200){
                                    that.$toast.success('投屏成功');
                                }else if(res.code == 509){
                                    that.$toast('电视已断开链接，或该页面不支持远程遥控');
                                }else{
                                    that.$toast(res.message);
                                }
                            }).catch(error=>{
                                console.log(error);
                            });
                        }else{
                            Dialog.confirm({
                                title: '您尚未绑定长江云TV',
                                message: '请先绑定后，再进行操作'
                                    }).then(() => {
                                        that.$router.push({
                                        path:'/userBind'
                                    })
                                }).catch(() => {
                                // on cancel
                             });
                        }
                    }
                }else if(data.state == 0){
                    Dialog.confirm({
                        title: '请先登录',
                        message: '登录后记得在设备页面绑定哦'
                            }).then(() => {
                            mc.userLogin(function(data) {
                            })
                        }).catch(() => {
                        // on cancel
                     });
                }
            });
        },
        //点播(电影)
        getPlayMovie(){
            const that = this;
            mc.userGetInfo(function(data) {
                if(data.state==1){
                    const userAccount = data.data.id;
                    const changyanUserId = data.data.changyanUserId;
                    const nickname = data.data.nickname;
                    localStorage.setItem('userAccount',userAccount)
                    localStorage.setItem('changyanUserId',changyanUserId)
                    localStorage.setItem('nickname',nickname)
                    if(userAccount){
                        const iptvAccount =  localStorage.getItem("iptvAccount")
                        if(iptvAccount){
                            const code = that.code;
                            const oparams = {
                                    "type":'vod',
                                    "code": code,
                            }
                            $list.c2mList.getUserKey(userAccount,{params: oparams}).then(res=>{
                                if(res.code == 200){
                                    that.$toast.success('投屏成功');
                                }else if(res.code == 509){
                                    that.$toast('电视已断开链接，或该页面不支持远程遥控');
                                }else{
                                    that.$toast(res.message);
                                }
                            }).catch(error=>{
                                console.log(error);
                            });
                        }else{
                            Dialog.confirm({
                                title: '您尚未绑定长江云TV',
                                message: '请先绑定后，再进行操作'
                                    }).then(() => {
                                        that.$router.push({
                                        path:'/userBind'
                                    })
                                }).catch(() => {
                                // on cancel
                             });
                        }
                    }
                }else if(data.state == 0){
                    Dialog.confirm({
                        title: '请先登录',
                        message: '登录后记得在设备页面绑定哦'
                            }).then(() => {
                            mc.userLogin(function(data) {
                            })
                        }).catch(() => {
                        // on cancel
                     });
                }
            });
        },
        // 一键分享
        handleShare(){ 
            const shareUrl = window.location.href.replace(/[|\#|]/g,""); 
            mc.sharePanel({ 
                "title": this.name,
                "content": this.description,
                "image": this.thumbnail,
                "url": shareUrl
            })
        },
        showPopup() {
            this.show = true;
        },
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
