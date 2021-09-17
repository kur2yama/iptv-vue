<template>
<div>
    <Header></Header>
    <keep-alive>
        <div class="main-content">
        <div class="bill">
            <ul class="bill-list">
                <li v-for="(item,index) in classifyList"
                   :key="item.name"
                   :class="{active: index == actived}"
                   :data-id = item.TYPE_ID
                   @click="handleClassify(item.TYPE_ID,index)"
                >{{item.TYPE_NAME}}</li>
            </ul>
            <ul class="pindao-list">
                 <li v-for="item in channelList"
                     :key="item.id"
                     @click="getColumn(item.CHANNELID,item.CHANNELINDEX,item.ctccChannelIndex,item.cuccChannelId,item.CHANNELNAME)"
                >
                {{item.CHANNELNAME}}
                </li>
            </ul>
        </div>
    </div>
    </keep-alive>
    <div class="float-contr" id="float-contr">
        <float-page></float-page>
    </div>
    <div class="foot">
        <ul>
            <li class="home" @click="getHomePage()"><p><i></i></p></li>
            <li class="live active"><p><i></i></p></li>
            <li class="myCenter" @click="getActivePage()"><p><i></i></p><p style="color:rgb(195,195,195);font-size:0.7rem;">活动</p></li>
        </ul>
    </div>
</div>
</template>

<script>
import Header from './common/header.vue'
import $list from '../api/index'
import floatPage from './common/floating.vue'
import MC from '../config/mc.js'
export default {
    name: 'Index',
    components:{
        floatPage,
        Header,
    },
    data () {
    return {
            actived: 1,
            classifyList:'',
            channelList:'',
            vedioSrc:'',
            iptvOperator:''
        }
    },
    created() {
        this.getInit();
    },
    methods: {
        async getInit() {
            //获取分类列表
            const userAccount =  localStorage.getItem("userAccount");
            const iptvOperator = localStorage.getItem("iptvOperator");
            if(iptvOperator=='cucc'){
                this.iptvOperator = iptvOperator;
            }else if(iptvOperator=='ctcc'){
                this.iptvOperator = iptvOperator;
                this.actived = 2;
            }else{
                this.iptvOperator='cucc';
            }
            const oparams = {
                    "operator": this.iptvOperator,
                }
            $list.c2mList.getLiveClassify(userAccount,{params:oparams}).then(res=>{
                this.classifyList = res.data;
            }).catch(error=>{
                console.log(error);
            });
            //获取频道列表
            const params = {
                    "operator": this.iptvOperator,
                }
            $list.c2mList.getLiveChannel(userAccount,{params:params}).then(res=>{
                const localChannelList = res.data;
                localStorage.setItem('localChannelList',JSON.stringify(localChannelList));
                if(this.iptvOperator=='cucc'){
                    const initKey = Object.keys(localChannelList)[0];
                    if(localChannelList.hasOwnProperty(initKey)){
                        this.channelList = localChannelList[initKey].list;
                    }
                }else if(this.iptvOperator=='ctcc'){
                    const initKey = Object.keys(localChannelList)[2];
                    if(localChannelList.hasOwnProperty(initKey)){
                        this.channelList = localChannelList[initKey].list;
                    }
                }
            }).catch(error=>{
                console.log(error);
            });

        },
        //获取频道下的栏目列表
        getColumn(CHANNELID,CHANNELINDEX,ctccChannelIndex,cuccChannelId,name){
            if (CHANNELID == 204) {
                // 湖北卫视
                this.vedioSrc = "http://live.cjyun.org/hubeitv/s10008-live-hbws.m3u8";
            } else if (CHANNELID == 338) {
                // 湖北经视
                this.vedioSrc = "http://live.cjyun.org/hubeitv/s10008-live-hbjs.m3u8";
            }  else if (CHANNELID == 339) {
                // 湖北综合
                this.vedioSrc = "http://live.cjyun.org/hubeitv/s10008-live-hbzh.m3u8";
            } else if (CHANNELID == 178) {
                // 湖北影视
                this.vedioSrc = "http://live.cjyun.org/hubeitv/s10008-live-hbys.m3u8";
            } else if (CHANNELID == 180) {
                // 湖北教育
                this.vedioSrc = "http://live.cjyun.org/hubeitv/s10008-live-hbjy.m3u8";
            } else if (CHANNELID == 179) {
                // 湖北生活
                this.vedioSrc = "http://live.cjyun.org/hubeitv/s10008-live-hbsh.m3u8";
            } else if (CHANNELID == 176) {
                // 美嘉购物
                this.vedioSrc = "http://live.cjyun.org/hubeitv/s10008-live-mjgw.m3u8";
            }else if (CHANNELID == 340) {
                // 湖北垄上
                this.vedioSrc = "http://live.cjyun.org/hubeitv/s10008-live-hbls.m3u8";
            }
            else if (CHANNELID == 337) {
                // 湖北公共
                this.vedioSrc = "http://live.cjyun.org/hubeitv/s10008-live-hbgg.m3u8";
            }
            this.$router.push({
                path:'/column',
                query:{
                    CHANNELID:CHANNELID,
                    CHANNELINDEX:CHANNELINDEX,
                    ctccChannelIndex:ctccChannelIndex,
                    cuccChannelId:cuccChannelId,
                    playLive:this.vedioSrc,
                    titleName: name,
                    isLianbo:1
                }
            })
        },
        handleClassify(TYPE_ID,index){
            this.actived = index;
            const allChannels = JSON.parse(localStorage.getItem('localChannelList'));
            if(allChannels&&allChannels[TYPE_ID]){
                this.channelList = allChannels[TYPE_ID].list.slice(0,allChannels[TYPE_ID].COUNTTOTAL)
            }
        },
        // 首页
        getHomePage(){
            this.$router.push({
                path:'/',
            })
        },
        // 跳转活动
        getActivePage(){
            this.$router.push({
                path:'/active'
            });
        },
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
