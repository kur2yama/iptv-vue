<template>
<div>
    <div class="head-box">
        <div class="goBack"  @click="getApp()">
            <img src="../assets/images/goBack.png" alt="">
        </div>
        <span style="margin-left:-2rem;font-weight: bold;">湖北IPTV</span>
    </div>
    <div class="userInfo">
        <li @click="getIptv()">
            <img src="../assets/images/iptvPic.png" alt="" class="tvIcon">
            <div class="title">直播/投屏</div>
            <img src="../assets/images/iconNext.png" alt="" class="goNext">
        </li>
        <li @click="getMyTV()">
            <img src="../assets/images/iconTv.png" alt="" class="tvIcon">
            <div class="title">我的设备</div>
            <img src="../assets/images/iconNext.png" alt="" class="goNext">
        </li>
        <li @click="getMyCollect()">
            <img src="../assets/images/iconCollect.png" alt="" class="collectIcon">
            <div class="title">我的收藏</div>
            <img src="../assets/images/iconNext.png" alt="" class="goNext">
        </li>
        <li @click="getMyOrder()">
            <img src="../assets/images/iconOrder.png" alt="" class="orderIcon">
            <div class="title">我的预约</div>
            <img src="../assets/images/iconNext.png" alt="" class="goNext">
        </li>
    </div>
</div>

</template>

<script>
import MC from '../config/mc.js'
import { Dialog } from 'vant'
  export default {
    name: "userInfo",
    created(){
        this.getInit()
    },
    methods:{
         getInit(){
            //隐藏原生头部返回
            mc.hiddenNativeBackBtnjs(function(data) {});
        },
        getApp(){
             //退出
            mc.nativeGoBackjs(function(data) {});
        },
        getMyTV(){
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
        getIptv(){
            this.$router.push({
                path:'/',
            })
        },
        // 收藏列表
        getMyCollect(){
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
                            path:'/collectList'
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
        // 预约列表
        getMyOrder(){
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
                            path:'/orderList'
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
    },
    data(){
      return{
      }
    }
  }
</script>

<style scoped lang="less">
.head-box{
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
}
.goIptv{
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    margin-top: 3.5rem;
    margin-bottom: 1rem;
    text-align: center;
    color:#f9a71a;
    font-weight: bold;
    font-size: 1.2rem;
}
.userInfo{
    width: 100%;
    overflow: hidden;
    margin-top: 4.5rem;
    li{
        width: 100%;
        height:3rem;
        border-bottom: 1px solid #ddd;
        .tvIcon{
            float: left;
            margin:.6rem .9rem 0 2rem;
            width: 1.5rem;
            height:1.5rem;
        }
        .collectIcon{
            float: left;
            margin:.6rem .9rem 0 2rem;
            width: 1.5rem;
            height:1.5rem;
        }
        .orderIcon{
            float: left;
            margin:.6rem .9rem 0 2rem;
            width: 1.5rem;
            height:1.5rem;
        }
        .title{
            float: left;
            font-size: 1rem;
            margin-top: .7rem;
            color: #444;
        }
        .goNext{
            float: right;
            margin: .8rem 1rem 0 0;
            width: 1.2rem;
            height:1.2rem;
        }
    }
}

</style>
