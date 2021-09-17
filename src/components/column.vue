<template>
    <div>
        <div class="header" v-show="isLianbo == '1'">
            <div class="goBack" @click="goBack()">
                <img src="../assets/images/goBack.png" alt="">
            </div>
            <span style="margin-left:16%;font-weight: bold;">{{$route.query.titleName}}</span>
            <div class="goCancel">
                <div class="s-btn" @click="getShare()">
                    <img src="../assets/images/iconShare.png" alt="">
                </div>
                <div class="c-btn" @click="getApp()">
                    <img src="../assets/images/iconCancel.png" alt="">
                </div>
            </div>
        </div>
    <!-- <div class="video-main"></div> -->
        <div class="column-box">
            <div class="h211" v-if="videoState">
                <div class="column-pic" >
                    <i></i>
                </div>
            </div>
            <div class="h211" v-else>
<!--                <video-player-->
<!--                    ref="videoPlayer"-->
<!--                    class="video-player vjs-custom-skin"-->
<!--                    :playsinline="true"-->
<!--                    :options="playerOptions"-->
<!--                    >-->
<!--                </video-player>-->
                    <iframe width="100vw" :src="iptvlive"></iframe>
            </div>
            <ul class="main">
                <li
                v-for="item in tvShowList"
                :key="item.id"
                >
                <div class="column-time">{{item.startime.slice(10,16)}}</div>
                <div class="drog"></div>
                <div class="name">{{item.name}}</div>
                <!-- <div class="play">回看</div> -->
                </li>
            </ul>
        </div>
        <div class="float-contr" id="float-contr" v-show="isLianbo == '1'">
            <float-page></float-page>
        </div>
        <div class="live-btn"  @click="getPlayLive()" v-show="isLianbo == '1'">
             <span>直播投屏</span>
        </div>

    </div>
</template>
<script>
// import Header from './common/header.vue'
import $list from '../api/index';
import MC from '../config/mc.js';
import floatPage from './common/floating.vue';
import qs from 'qs';
import '../assets/css/custom-theme.css'
import { Dialog } from 'vant'
export default {
    components:{
        floatPage
        // Header
    },
    data () {
        return {
            tvShowList:'',
            isLianbo:'',
            videoState:true,
            iptvlive: `http://m.hbtv.com.cn/iptv_live?channelid=${this.$route.query.CHANNELID}&t=${new Date()}`,
            playerOptions: {
                autoplay: false, // 如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                flash: { hls: { withCredentials: false }},
                html5: { hls: { withCredentials: false }},
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [
                    {
                    withCredentials: false,
                    type: 'application/x-mpegURL', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                    src: '' // url地址
                    }
                ],
                poster: '', // 你的封面地址
                width: document.documentElement.clientWidth, // 播放器宽度
                notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                // controlBar: {
                //     timeDivider: true,
                //     durationDisplay: true,
                //     remainingTimeDisplay: false,
                //     fullscreenToggle: true // 全屏按钮
                // }
            }

        }
    },
    created() {
        this.getInit();
        this.getQueryValue();
    },
    computed: {
        player() {
        return this.$refs.videoPlayer.player//自定义播放
        },
    },
    methods: {
        getInit() {
             //获取分类列表
            const userAccount =  localStorage.getItem("userAccount");
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
            const newData = tempDate.year + '-' + tempDate.month + '-' + tempDate.date;
            const oparams = {
                    "channelId": this.$route.query.CHANNELID,
                    "date": newData,
                }
            $list.c2mList.getLiveShow(userAccount,{params:oparams}).then(res=>{
                this.tvShowList = res.data;
            }).catch(error=>{
                console.log(error);
            });
            this.getPlayVideo();
        },
        // 直播
        getPlayVideo(){
            if(this.$route.query.playLive != ''){
                this.videoState = false;
                this.playerOptions['sources'][0]['src'] = this.$route.query.playLive;
            }
        },
        //投屏
        getPlayLive(){
            const iptvAccount =  localStorage.getItem("iptvAccount")
            if(iptvAccount){
                const userAccount =  localStorage.getItem("userAccount");
                const oparams = {
                        "type":'live',
                        "CHANNELINDEX":this.$route.query.CHANNELINDEX,
                        "ctccChannelIndex":this.$route.query.ctccChannelIndex,
                        "cuccChannelId":this.$route.query.cuccChannelId,
                }
                $list.c2mList.getUserKey(userAccount,{params: oparams}).then(res=>{
                    if(res.code == 200){
                        this.$toast.success('投屏成功');
                    }else if(res.code == 509){
                        this.$toast('电视已断开链接，或该页面不支持远程遥控');
                    }else{
                        this.$toast(res.message);
                    }
                }).catch(error=>{
                    console.log(error);
                });
            }else{
                Dialog.confirm({
                    title: '您尚未绑定长江云TV',
                    message: '请先绑定后，再进行操作'
                        }).then(() => {
                            this.$router.push({
                            path:'/userBind'
                        })
                    }).catch(() => {
                    // on cancel
                 });
            }
        },
        goBack(){
            if (this.$route.name === 'index' && this.$store.getters.getBackType === '2') {
                 //退出
                mc.nativeGoBackjs(function(data) {});
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
        getQueryValue() {
            // var query = decodeURI(window.location.hash.substring(1));
            // var vars = query.split("&");
            // for (var i = 0; i < vars.length; i++) {
            //     var pair = vars[i].split("=");
            //     if (pair[0] == queryName) { return pair[1]; }
            // }

            var url = decodeURIComponent(location.hash)
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.split("?")[1];
                var strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
                }
            }
            this.isLianbo = theRequest.isLianbo;
        }
    },
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
.column-box{
    width: 100%;
    height: 100%;
    margin-top: 3rem;
    overflow: hidden;
    .h211{
        height: 13.2rem;
    }
    .column-pic{
        width: 100%;
        height: 13.2rem;
        i{
            display: inline-block;
            width: 100%;
            height: 13.2rem;
            background: url(http://img.cjyun.org/a/10008/202009/7c67e796c963e33e25183bed0de8b7d7.jpg) no-repeat;
            background-size: 100% 100%;
            position: fixed;
            top: 3rem;
            left: 0;
        }
    }
    .main{
        padding: .5rem 1.5rem;
        height: calc(100vh - 20rem);
        padding-bottom: 3.5rem;
        overflow-y:scroll;
        -webkit-overflow-scrolling: touch;
        li{
            height: 2rem;
            line-height: 2rem;
            padding-bottom:1.5rem;
            overflow: hidden;
            .column-time{
                float: left;
                width:3rem;
                border-right: 2px dashed #ddd;
                padding: 1rem 2rem 1rem 1rem;
            }
            .drog{
                float: left;
                width: 0.6rem;
                height: 0.6rem;
                border :1px solid #f9a71a;
                border-radius: 50%;
                margin-right: 2rem;
                margin-left: -0.45rem;
                margin-top: 1.5rem;
                background: #fff;
            }
            .name{
                float: left;
                margin-top: 0.8rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 10rem;
            }
            .play{
                float: right;
                right: 0;
                margin-top: 0.8rem;
            }
        }
    }
}

</style>
