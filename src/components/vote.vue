<template>
<div>
    <div class="header">
        <div class="goBack" @click="goBack()">
            <img src="../assets/images/goBack.png" alt="">
        </div>
        <span style="margin-left:2.5rem;font-weight: bold;font-size:1.1rem">客厅影视节 投票赢豪礼</span>
        <div class="goCancel">
            <div class="s-btn" @click="getShare()">
                <img src="../assets/images/iconShare.png" alt="">
            </div>
            <div class="c-btn" @click="getApp()">
                <img src="../assets/images/iconCancel.png" alt="">
            </div>
        </div>
    </div>
    <div class="scroll-box">
        <div class="vote-box">
            <div class="active-btns">
                <ul>
                    <li @click="getRulePage()">
                        <img src="../assets/images/active/tipsBtn.png" alt="">
                    </li>
                    <li @click="getTpPage()">
                        <img src="../assets/images/active/findBtn.png" alt="">
                    </li>
                    <li @click="getBindLive()">
                        <img src="../assets/images/active/bindBtn.png" alt="">
                    </li>
                </ul>
            </div>
            <div class="vote">
                <ul class="tab-head" >
                    <li 
                    v-for="item in categoryList"
                    :key="item.id" 
                    @click="getMeidaData(item.id,item.categoryType,item.name,item.description,)"
                    :class="{actived: item.id == activeId}"
                    >{{item.name}}</li>
                </ul>
                <div class="tp">
                    <span>您今天还可以投 <em>{{tpcount}}</em> 票</span>
                </div>
                <div class="v-title">
                ———&nbsp;&nbsp;{{name}}&nbsp;&nbsp;———
                </div>
                <div class="categorites">
                        <ul class="list" v-if="1==showTag">
                            <li 
                            v-for="(item,index) in mobileVideoList" 
                            :key="item.id"  
                            >   
                                <div class="media-pic" @click="getPlayVideo(item.mediaId)">
                                <!-- <img v-lazy="'https://iptv.hbtv.com.cn/static/'+mobileVideoList[index].avatar?'https://iptv.hbtv.com.cn/static/'+mobileVideoList[index].avatar:defaultUrl" :onerror="defaultUrl"> -->
                                <img v-lazy="mobileVideoList[index].avatar?mobileVideoList[index].avatar:defaultUrl" :onerror="defaultUrl">
                                <i></i>
                                </div>
                                <p class="m-name">{{mobileVideoList[index].name}}</p>
                                <div class="btns">
                                    <div class="vote-btn">
                                        <span class="fb" @click="handleVote(item.id,item)">投票</span>
                                        <span class="fs">已投{{mobileVideoList[index].votes}}票</span>
                                    </div>
                                </div>   
                            </li>
                        </ul>
                        <ul class="star-list" v-if="0==showTag">
                            <li 
                            v-for="(item,index) in starList" 
                            :key="item.id"
                            >
                            <div class="left-side">
                                <img v-lazy="'https://iptv.hbtv.com.cn/static'+starList[index].avatar?'https://iptv.hbtv.com.cn/static'+starList[index].avatar:defaultUrl" :onerror="defaultUrl">
                                    <div class="vote-btn">
                                    <span class="fb" @click="handleVote(item.id,item)">投票</span>
                                    <span class="fs">已投{{starList[index].votes}}票</span>
                                </div>
                            </div>
                            <div class="right-side">
                                <p class="name">{{starList[index].name}}</p>
                                <p class="des">{{starList[index].description}}</p>
                                <p class="zp-list"  @click="getCollectionData(item.id,index)">
                                    <img v-lazy='selectArr.includes(item.id)?require("../assets/images/hideBtn.png"):require("../assets/images/openBtn.png")'/>查看{{starList[index].name}}代表作</p>
                            </div>
                            <div class="video-list" :class="selectArr.includes(item.id)?'active':''">
                                <div class="v-fl" 
                                    v-for="(item,index) in videosList" 
                                    :key="item.id"
                                >
                                    <div class="videoPic">
                                        <img @click="getPlayVideo(item.mediaId)" v-lazy="'https://iptv.hbtv.com.cn/static/'+videosList[index].thumbnail?'https://iptv.hbtv.com.cn/static'+videosList[index].thumbnail:defaultUrl" :onerror="defaultUrl"/>
                                    </div>
                                    <p class="video-name">{{videosList[index].videoName}}</p>
                                    <div class="vote-btn" @click="getPlayVideo(item.mediaId)">
                                        <span class="fb">播放</span>
                                        <span class="fs" @click="getPlayMovie(videosList[index].id,videosList[index].mediaType,videosList[index].videoCode)">打开长江云TV</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="footer-tips">
                    <span>2019年长江云TV{{navTitle}}播放TOP6</span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import $list from '../api/index'
import qs from 'qs'
import MC from '../config/mc.js'
import { _throttle } from "../config/public";
import { Dialog } from 'vant' 
export default {
    name: 'vote',
    data () {
        return {
            categoryList:'',
            activeId:'',
            tpcount:0,
            name:'',
            showTag:1,
            mobileVideoList:[{}],
            starList:[{}],
            videosList:[{}],
            categoryType:'',
            defaultUrl:'this.src="' + require("../assets/images/08.png") +'";this.onerror=null',
            videoId:'',
            activityId:'',
            voteId:'',
            navTitle:'最佳影片',
            selectArr:[],
            templateVideosList:[],
        }
    },
    created(){
       this.getInit();
    },
    methods: {
        getInit(){
             //获取活动投票
            this.activityId = this.$route.query.id;
            const cjyUserAccount =  localStorage.getItem("userAccount");
            $list.c2mList.getActivePage(this.activityId,cjyUserAccount).then(res=>{
                if(res.code == 200){
                    this.tpcount = res.data.cjyCountLeft;
                    this.voteId = res.data.iptvUser.id;
                }
                }).catch(error=>{
                    console.log(error);
                    this.tpcount = 0;
                })
            if(this.tpcount<1){
                this.tpcount = 0;
                
            }
            $list.c2mList.getVoteShow(this.activityId).then(res=>{
                this.categoryList = res.data.categories;
                this.name = res.data.categories[0].description;
                this.activeId = res.data.categories[0].id;
                const oParams = {
                    categoryId : res.data.categories[0].id,
                    page : 1,
                    pageSize: 10
                }
                $list.c2mList.getCandidatesList(this.activityId,{params:oParams}).then(res=>{
                    this.mobileVideoList = res.data.list;
                }).catch(error=>{
                    console.log(error);
                });
                
            }).catch(error=>{
                console.log(error);
            });
        },
         goBack(){
            if (window.history.length <= 1) {
                this.$router.replace({
                    path:'/',
                })
            }
            else{
                this.$router.go(-1);
            }
        },
        // 一键分享
        getShare(){
            const shareUrl = window.location.href.replace(/[|\#|]/g,""); 
            mc.sharePanel({ 
                "title": '长江云TV双屏互动',
                "content": '绑定长江云TV，手机与电视互动投屏新看法，更有丰富的有奖活动等您参加。',
                "image": 'http://img.cjyun.org/a/10008/201912/500af49f81b41b98a71e1f3cb195afac.png',
                "url": shareUrl
            })
        
        },
        getApp(){
            //退出
            mc.nativeGoBackjs(function(data) {});
            
        },
         // 了解规则
        getRulePage(){
            this.$router.push({
                path:'/rule'
            })
        },
        // 查看排行
        getTpPage(){
            const that = this;
            mc.userGetInfo(function(data) {
                if(data.state==1){
                    const userAccount = data.data.id;
                    const changyanUserId = data.data.changyanUserId;
                    const nickname = data.data.nickname;
                    const avatar = data.data.avatar;
                    localStorage.setItem('userAccount',userAccount);
                    localStorage.setItem('changyanUserId',changyanUserId);
                    localStorage.setItem('nickname',nickname);
                    localStorage.setItem('avatar',avatar);
                    if(userAccount){
                        const iptvAccount = localStorage.getItem("iptvAccount");
                        if(iptvAccount){
                            that.$router.push({
                                path:'/ranking',
                                query:{
                                    id:that.voteId
                                }
                            })
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
        // 绑定电视
        getBindLive(){
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
                        that.$router.push({
                            path:'/userBind'
                        })
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
        getMeidaData(id,categoryType,name,description){
           this.navTitle = name;
            const oparams = {
                categoryId : id,
                page : 1,
                pageSize: 10
            }
            $list.c2mList.getCandidatesList(this.activityId,{params:oparams}).then(res=>{
                this.activeId = id;
                this.name = description;
                this.mobileVideoList = res.data.list;
                if(categoryType != 1){
                    this.showTag = 1;
                    this.mobileVideoList = res.data.list;
                }else{
                    this.showTag = 0;
                    this.starList = res.data.list;
                }
            }).catch(error=>{
                console.log(error);
            });
        },
        // 获取明星代表作
        getCollectionData(id,index){
            $list.c2mList.getcandidateDetails(this.activityId,id).then(res=>{
                this.videoId = id;
                let idx = this.selectArr.indexOf(id);
                this.selectArr.length = 1;
                if(idx>-1){
                    this.selectArr=[];
                }else{
                    this.selectArr.push(id);
                }
                this.videosList = res.data.videosList;
            }).catch(error=>{
                console.log(error);
            });
        },
        // 投票
        handleVote: _throttle(function(id,item) {
            const that = this;
            mc.userGetInfo(function(data) {
                if(data.state==1){
                    const userAccount = data.data.id;
                    const changyanUserId = data.data.changyanUserId;
                    const nickname = data.data.nickname;
                    const avatar = data.data.avatar;
                    localStorage.setItem('userAccount',userAccount);
                    localStorage.setItem('changyanUserId',changyanUserId);
                    localStorage.setItem('nickname',nickname);
                    localStorage.setItem('avatar',avatar);
                    const iptvAccount = localStorage.getItem("iptvAccount");
                    if(iptvAccount){
                        const params = {
                            "id": that.voteId,
                        }
                        if(that.tpcount<1){
                            Dialog.confirm({
                                title: '您今天的投票机会已全部用完',
                                message: '通过长江云TV或IPTV湖北微信号可获得更多投票机会',
                                cancelButtonText:'查看当前排名',
                                    }).then(() => {
                                    
                                }).catch((event) => {
                                    that.$router.push({
                                        path:'/ranking',
                                        query:{
                                            id:that.voteId
                                        }
                                    })
                                });
                        }else{
                            $list.c2mList.getcandidateVote(that.activityId,id,params).then(res=>{
                                that.tpcount = res.data
                                if(res.code == 200){
                                    item.votes = item.votes + 1;
                                }
                            }).catch(error=>{
                                console.log(error);
                                Dialog.confirm({
                                title: '您今天的投票机会已全部用完',
                                message: '通过长江云TV或IPTV湖北微信号可获得更多投票机会',
                                cancelButtonText:'查看当前排名',
                                    }).then(() => {
                                    
                                }).catch((event) => {
                                    that.$router.push({
                                        path:'/ranking',
                                        query:{
                                            id:that.voteId
                                        }
                                    })
                              });
                            });
                        }
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
        }, 200),
        // 投屏
        getPlayVideo(mediaId){
             this.$router.push({
                path:'/details',
                query:{
                    id:mediaId
                }
            })
            
        },
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
   .header{
       width: 100%;
       height:3rem;
       line-height: 3rem;
       overflow: hidden;
       position: fixed;
       top: 0;
       background: #fff;
       text-align: center;
       z-index: 99;
       .goBack{
            float: left;
            margin-left: .7rem;
            img{
                width: 1.3rem;
                height: 1.3rem;
                vertical-align: middle;
            }
       }
       .goCancel{
            float: right;
            width: 5rem;
            height: 1.8rem;
            border: 0.05rem solid #dbdbdb;
            border-radius: 1rem;
            margin-top: .5rem;
            margin-right: .7rem;
            .s-btn{
                width: 2.4rem;
                height: 1.4rem;
                line-height: 1.4rem;
                float: left;
                margin-top: .2rem;
                border-right: 0.05rem solid #ddd;
                img{
                    width: 1.2rem;
                    height: 1.2rem;
                    margin-top: .1rem;
                }
            }
            .c-btn{
                width: 2.4rem;
                height: 1.4rem;
                line-height: 1.4rem;
                float: left;
                margin-top: .2rem;
                img{
                    width: 1.2rem;
                    height: 1.2rem;
                    margin-top: .1rem;
                }   
            }
       }
   }
.vote-box{
    width: 100%;
    // height: -webkit-fill-available;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}
.active-btns{
    width: 100%;
    height: auto;
    background: #f8f8f8;
    margin-top: 3rem;
    padding-top: .5rem;
    ul{
        width: 92%;
        height: auto;
        margin:0 auto;
        overflow: hidden;
        li{
            width: 30%;
            height: 2.5rem;
            float: left;
            img{
                width: 100%;
                height: 100%;
                background-size: contain;
            }
        }
        li:nth-child(2){
            margin:0 5%; 
        }
    }
}
.vote{
    width: 100%;
    height: 100%;
    background: #f8f8f8;
    color: #818181;
    .tab-head{
        padding: 0 0.6rem;
        height: 2.93rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow-x: scroll;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        li{
            float: left;
            line-height: 2.93rem;
            font-size: .9rem;
            padding: 0 0.5rem;
            
        }
        li.actived{
            color: #f9a71a;
            font-size: 1.1rem;
        }
    }
    .tp{
        width: 94%;
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        margin: 0.5rem auto;
        background: #fff;
        span{
            em{
                color: red;
            }
        }
    }
    .v-title{
        width: 94%;
        text-align: center;
        margin: 0 auto;
        margin-top: 0.8rem;
        overflow: hidden;
        font-size: 0.9rem;
    }
    .categorites{
        width: 86%;
        margin: 0 auto;
        margin-top: .3rem;
        .list{
            overflow: hidden;
            margin-bottom: 1.6rem;
            li:nth-child(2n){
                margin-left: 4%;
            }
            li{
                float: left;
                width: 48%;
                height: auto;
                margin-top: .5rem;
                margin-bottom: 0.5rem;
                background: #fff;
                padding-bottom: .8rem;
                .media-pic{
                    position: relative;
                    height: 14rem;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 5px 5px 0 5px;
                    }
                    i{
                        width: 5.5rem;
                        height: 3.5rem;
                        background: url(../assets/images/active/palyBtn.png) no-repeat;
                        background-size: contain;
                        position:absolute;
                        right: 0;
                        bottom: -0.01rem;
                    }
                }
                .m-name{
                    color: #444;
                    font-size: 1rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin: .3rem 0 .3rem .3rem;
                }
                .btns{
                    width: 100%;
                    height: 2.5rem;
                    .vote-btn{
                        width: 60%;
                        height: 2.5rem;
                        background-image: linear-gradient(75deg,#f9a71a 0%,#f9731a 100%);
                        background-blend-mode: normal;
                        border-radius: 35px;
                        margin: 0 auto;
                        text-align: center;
                        position: relative;
                        span{
                            display: inline-block;
                            color: #fff;
                        }
                        .fb{
                            font-size: .9rem;
                            letter-spacing: 0.5rem;
                            position: absolute;
                            left: 32%;
                            margin-top: .2rem;
                        }
                        .fs{
                            width: 90%;
                            font-size: 0.6rem;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            margin-top: 1.3rem;
                        }
                    }
                }
            }
        }
        .star-list{
            overflow: hidden;
            margin-top: 1rem;
            margin-bottom: 1.6rem;
            li:last-child{
                padding-bottom: 2rem;
            }
            li{
                float: left;
                width: 100%;
                height: auto;
                background: #fff;
                position: relative;
                padding-bottom: 1rem;
                .left-side{
                    width: 36%;
                    height: 10rem;
                    padding:0.5rem 0 0 0.5rem; 
                    float: left;
                    img{
                        width: 100%;
                        height: 10rem;
                        border-radius: 5px;
                    }
                    .vote-btn{
                        width: 77%;
                        height: 2.3rem;
                        background-image: linear-gradient(75deg,#f9a71a 0%,#f9731a 100%);
                        background-blend-mode: normal;
                        border-radius: 30px; 
                        color: #fff;
                        margin: 0 auto;
                        margin-top: -1.3rem;
                        position: relative;
                        text-align: center;
                        .fb{
                            width: 90%;
                            display: inline-block;
                            font-size: .9rem;
                            letter-spacing: .5rem;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            position: absolute;
                            margin-top: .1rem;
                            margin-left: .2rem;
                        }
                        .fs{
                            width: 90%;
                            display: inline-block;
                            font-size: .6rem;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            margin-top: 1.2rem;
                        }
                    }
                }
                .right-side{
                    width: 55%;
                    height:100%;
                    float: left;
                    padding:1rem .5rem 0 3%; 
                    .name{
                        color: #000;
                        font-size: 1.2rem;
                        margin-top: 1rem;
                        margin-bottom: .5rem;
                    }
                    .des{
                        text-align: left;
                        text-indent: 0;
                        overflow:hidden;
                        display:-webkit-box;
                        -webkit-box-orient:vertical;
                        -webkit-line-clamp:3;
                        margin-bottom: 10%;
                    }
                    .zp-list{
                        text-align: right;
                        margin-right: .5rem;
                        color:#0FA6FF;
                        background-blend-mode: normal;
                        font-size: 0.9rem;
                        width: 100%;
                        white-space:nowrap;/*规定段落中的文本不进行换行*/
                        overflow:hidden;/*内容会被修剪，并且其余内容是不可见的。*/
                        text-overflow:ellipsis;/*显示省略号来代表被修剪的文本*/
                        margin-top: 1.5rem;
                        img{
                            width: 1rem;
                            height: 1rem;
                            margin-top: .1rem;
                            margin-right: .3rem;
                            
                        }
                    }
                }
                .active{
                    display: block!important;
                }
                .video-list{
                    width:100%;
                    margin: 0 auto;
                    background: #f8f8f8;
                    overflow: hidden;
                    display: none;
                    .v-fl{
                        width: 30%;
                        float: left;
                        margin: 1rem auto;
                        margin-top: 1.2rem;
                        .videoPic{
                            img{
                                width: 100%;
                                height:100%;
                                border-radius: 5px;
                            }
                        }
                        .video-name{
                            text-align: center;
                            color: #000;
                            margin: .3rem auto;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            width: 90%;
                        }
                        .vote-btn{
                            width: 88%;
                            height: 2.3rem;
                            background-image: linear-gradient(75deg, #8a70ff 0%, #6972f1 100%);
                            background-blend-mode: normal;
                            border-radius: 30px;
                            color: #fff;
                            margin: 0 auto;
                            text-align: center;
                            position: relative;
                            .fb{
                                width: 90%;
                                display: inline-block;
                                font-size: .9rem;
                                letter-spacing: .5rem;
                                position: absolute;
                                margin-top: .1rem;
                                margin-left: .2rem;
                            }
                            .fs{
                                width: 90%;
                                display: inline-block;
                                font-size: .6rem;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                margin-top: 1.2rem;
                            }
                        }
                    }
                    .v-fl:nth-child(3n-1){
                        margin: 1.2rem 5% 0;
                    }
                }       
            }
        }
        
    }
    .footer-tips{
        width: 100%;
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        background: #fff;
        span{
            font-size:.8rem;
        }
    }
    /*去除移动端浏览器滚动条：*/
    .tab-head::-webkit-scrollbar{display:none}
}
</style>
