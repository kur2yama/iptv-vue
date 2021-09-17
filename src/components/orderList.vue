<template>
<div>
    <Header></Header>
    <!-- 我的收藏 -->
    <div class="video-list">
        <div class="video-top" 
             v-for="(item,index) in orderDateList"
             :key="item.id" 
             >
            <div v-show="selectShow">
                <div class="select-btn"  
                    @click="getSelect(item.mediaId)">
                    <img :src="selectArr.includes(item.mediaId)?require('../assets/images/selected.png'):require('../assets/images/unSelected.png')"  alt="">
                </div>
            </div>
            <div class="video-img">
                <!-- <img v-lazy="'https://iptv.hbtv.com.cn/static/'+orderDateList[index].mediaInfo.thumbnail?'https://iptv.hbtv.com.cn/static/'+orderDateList[index].mediaInfo.thumbnail:defaultUrl" :onerror="defaultUrl"/> -->
                <img v-lazy="orderDateList[index].mediaInfo.thumbnail?orderDateList[index].mediaInfo.thumbnail:defaultUrl" :onerror="defaultUrl"/>
            </div> 
            <div class="video-info" @click="getDetailsData(item.mediaId)">
                <h2>{{orderDateList[index].mediaInfo.name}}</h2> 
                <p>{{orderDateList[index].mediaInfo.releaseLanguage}}/{{orderDateList[index].mediaInfo.releasePlace}}/{{orderDateList[index].mediaInfo.duration}}分钟</p> 
                <p>{{orderDateList[index].mediaInfo.releaseDate}}/上映</p>
            </div>
        </div>
        <div class="unOrder" v-show="isOrder">{{isOrder?'暂无预约':''}}</div>
    </div>
    <!-- <div class="unOrder" v-show="isOrder">{{isOrder?'暂无预约':''}}</div> -->
    <div class="edit" v-if="selectHide" @click="getEdit()" v-show="bjShow">
        编辑
    </div>
    <div class="select" v-else>
        <span class="cancel-btn" @click="getCancel()">取消</span>
        <span class="all-btn" @click="chooseCheck()">{{isCheckAll?'清空':'全选'}}</span>
        <span class="del-btn" @click="getDel()">删除</span>
    </div>
</div>
    
</template>

<script>
import Header from './common/header.vue'
import $list from '../api/index'
import MC from '../config/mc.js'
import { Dialog } from 'vant' 
export default {
    components:{
        Header
    },
    data(){
      return{
        selectHide:true,
        bjShow:false,
        selectShow:false,
        orderDateList:[{}],
        selectArr:[],
        isOrder:false,
        show: false,
        defaultUrl:'this.src="' + require("../assets/images/08.png") +'";this.onerror=null',
      }
    },
    created(){
        this.getInit();
    },
    computed:{
        isCheckAll(){
            if(this.selectArr.length == this.orderDateList.length){
                return true;
            }
            return false;
        }
    },
    methods:{ 
         getInit(){
            mc.hiddenNativeBackBtnjs(function(data) {});
            const userAccount =  localStorage.getItem("userAccount");
            const oparams = "page="+1+'&'+"pageSize="+15;
            $list.c2mList.getOrderList(userAccount,oparams).then(res=>{
                if(res.code==200){
                    this.bjShow = true;
                    this.showHide = false;
                    this.orderDateList = res.data.list;
                    if(this.orderDateList.length == 0){
                        this.isOrder = true;
                    }else{
                        this.isOrder = false;
                    }

                }
                
            }).catch(error=>{
                console.log(error);
            });
        },
        // 一键分享
        getShare(){
           const shareUrl = window.location.href.replace(/[|\#|]/g,""); 
            mc.sharePanel({ 
                "title": this.name,
                "content": this.description,
                "image": this.thumbnail,
                "url": shareUrl
            })
        },
        getApp(){
             //退出
            mc.nativeGoBackjs(function(data) {})
        },
        getBack(){
            this.bjShow = false;
            this.showHide = true;
        },
        //编辑
        getEdit(){
            this.selectHide = false;
            this.selectShow = true;
        },
         // 选中框
        getSelect(i){
            let idx = this.selectArr.indexOf(i);
            if(idx>-1){
                this.selectArr.splice(idx,1);
            }else{
                this.selectArr.push(i);
            }
        },
        //取消
        getCancel(){
            this.selectHide = true;
            this.selectShow = false;
            this.selectArr = []
        },
        //全选
        chooseCheck(){
            if(this.isCheckAll){
                this.clearCheckbox();
            }else{
                this.getAll();
            }
        },
        getAll(){
            this.orderDateList.forEach((item)=>{
                 this.selectArr.push(item.mediaId)
            });
        },
        clearCheckbox(){
            this.selectArr = [];
        },
        //删除
        getDel(){
            Dialog.confirm({
                    title: '确定删除?',
                    }).then(() => {
                    this.selectArr.forEach(item =>{
                    const userAccount =  localStorage.getItem("userAccount");
                    const oparams = "mediaId="+ item;
                    $list.c2mList.getCancelOrderList(userAccount,oparams).then(res=>{
                        if(res.code==200){
                                this.getInit()
                                this.$toast('删除成功');
                                mc.removeSubscribeNotice({ 
                                    'mId':item
                                })
                            }else{
                                this.$toast(res.message);
                            }
                        }).catch(error=>{
                            console.log('错误信息');
                            console.log(error);
                        });
                    });
                }).catch(() => {
                // on cancel
            });
        },
        // 媒资详情页
        getDetailsData(id){
            this.$router.push({
                path:'/details',
                query:{
                    id:id
                }
            })
        },
    }
  }
</script>

<style scoped lang="less">
.video-list{
    padding-bottom: 3rem;
    padding-top: 2rem;
    height: -webkit-fill-available;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .video-top{
        width: calc(100% - 3.53rem);
        margin: 1rem auto;
        overflow: hidden;
        .select-btn{
            float: left;
            width: 10%;
            img{
                width: 1.4rem;
                height: 1.4rem;
                margin-top: 3.5rem;
            }
            .actived-pic{
                display: none;
            }
            .unActived{
                display: none!important;
            }
            .actived{
                display: block!important;
            }
        }
        .video-img {
            float: left;
            width: 30%;
            img {
                width: 100%;
            }
        }
        .video-info {
            float: left;
            width: calc(62% - 1.6rem);
            padding-left: 1rem;
            padding-bottom: 1.65rem;
            h2 {
                color: #222;
                font-size: 1.1rem;
                margin-bottom: 0.7rem;
                font-weight: bold;
            }
            p {
                color: #999;
                font-size: 0.9rem;
                line-height: 1.7rem;
            }
        }
    }
    .unOrder{
        width: 100%;
        height: 2rem;
        color: #999;
        font-size: 1.1rem;
        margin-top: 10rem;
        text-align: center;
    }
}
.edit{
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    overflow: hidden;
    box-sizing: border-box;
    border-top: 1px solid #ddd;
    position: fixed;
    left: 0;
    bottom:0;
    z-index: 99;
    background: #fff;
}
.select{
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    overflow: hidden;
    box-sizing: border-box;
    border-top: 1px solid #ddd;
    position: fixed;
    left: 0;
    bottom:0;
    z-index: 99;
    display: flex;
    background: #fff;
    .del-btn{
        color: red;
    }
    span{
        display:inline-block;
        flex-grow: 1; 
    }
}

</style>
