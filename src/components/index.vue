<template>
<div>
    <Header></Header>
    <div class="scroll-box">
        <div class="search-box">
            <div class="s-left">
                <i class="search-icon"></i>
                <form  @submit.prevent="formSubmit" action="javascript:void 0">
                    <input id="media-input"  
                    type="search"  
                    v-model="mediaName" 
                    placeholder="搜索"
                    @keypress="inputFunc" 
                    > 
                </form>
            </div>
            <div class="s-right" @click="getBind()">
                <i class="qcode-icon"></i>
            </div>
        </div>
        <div class="nav">
            <ul class="tab-head" >
                <li :class="{active: activeId == 'recommed'}"  @click="getMeidaData('recommed')">推荐</li>
                <li 
                v-for="item in categoryList"
                :key="item.id" 
                :class="{active: item.id == activeId}"
                @click="getMeidaData(item.id)"
                >{{item.name}}</li>
            </ul>
        </div>
        <div class="banners-box" v-show="showHide && showBanner">
            <div class="container-swiper">
                <swiper :options="swiperOption">
                <swiper-slide v-for="(item, index) of banner" :key="index">
                    <a href="javascript:void(0);" @click="goActive(item.link)" target="_blank" rel="noopener noreferrer">
                        <img class="swiper-img" v-lazy="item.image_url"/>
                    </a>
                </swiper-slide>
                </swiper>
            </div>
        </div>
        <div class="tuijian">
            <div class="live-hot" v-show="showHide">
                <h2 style="margin-top:1rem;">{{hotTitle1}}</h2>
                <ul class="hot-list">
                    <li 
                    v-for="(item,index) in mediasList1" 
                    :key="item.id" 
                    @click="getDetailsData(item.id)" 
                    >
                        <!-- <img v-lazy="'https://iptv.hbtv.com.cn/static/'+mediasList1[index].thumbnail?'https://iptv.hbtv.com.cn/static/'+mediasList1[index].thumbnail:defaultUrl" :onerror="defaultUrl"/>
                        <p>{{mediasList1[index].name}}</p> -->
                        <img v-lazy="mediasList1[index].thumbnail?mediasList1[index].thumbnail:defaultUrl" :onerror="defaultUrl"/>
                        <p>{{mediasList1[index].name}}</p>
                    </li> 
                </ul>
            </div>
            <div class="live-hot" v-show="showHide">
                <h2>{{hotTitle2}}</h2>
                <ul class="hot-list">
                    <li 
                    v-for="(item,index) in mediasList2" 
                    :key="item.id" 
                    @click="getDetailsData(item.id)" 
                    >
                        <!-- <img v-lazy="'https://iptv.hbtv.com.cn/static/'+mediasList2[index].thumbnail?'https://iptv.hbtv.com.cn/static/'+mediasList2[index].thumbnail:defaultUrl" :onerror="defaultUrl"/>
                        <p>{{mediasList2[index].name}}</p> -->
                        <img v-lazy="mediasList2[index].thumbnail?mediasList2[index].thumbnail:defaultUrl" :onerror="defaultUrl"/>
                        <p>{{mediasList2[index].name}}</p>
                    </li> 
                </ul>
            </div>
            <div class="live-hot">
                <h2 v-show="showHide">{{hotTitle3}}</h2>
                <ul class="hot-list">
                    <li 
                    v-for="(item,index) in mediasList3" 
                    :key="item.id" 
                    @click="getDetailsData(item.id)" 
                    >
                        <!-- <img v-lazy="'https://iptv.hbtv.com.cn/static/'+mediasList3[index].thumbnail?'https://iptv.hbtv.com.cn/static/'+mediasList3[index].thumbnail:defaultUrl" :onerror="defaultUrl"/>
                        <p>{{mediasList3[index].name}}</p> -->
                        <img v-lazy="mediasList3[index].thumbnail?mediasList3[index].thumbnail:defaultUrl" :onerror="defaultUrl"/>
                        <p>{{mediasList3[index].name}}</p>
                    </li> 
                </ul>
            </div>
            <div class="myBottom">
                <span>———— 我是有底线的~ ————</span>
            </div>
        </div>
    </div>
    <div class="float-contr" id="float-contr">
        <float-page></float-page>
    </div>
    <Footer></Footer>

</div>
</template>

<script>
import $list from '../api/index'
import floatPage from './common/floating.vue'
import Header from './common/header.vue'
import Footer from './common/footer.vue'
import MC from '../config/mc.js'
import { _throttle } from "../config/public";
import { Dialog } from 'vant' 
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    name: 'Index',
    components:{
        floatPage,
        Header,
        Footer,
        swiper,
        swiperSlide
    },
    data () {
        return {
        activeId: 'recommed',
        categoryList: [{}],//栏目列表
        hotTitle1:'',
        hotTitle2:'',
        hotTitle3:'',
        mediasList1:[{}],
        mediasList2:[{}],
        mediasList3:[{}],
        showHide:true,
        orderState:true,
        showBanner:false,
        mediaName:'',
        userMac:'',
        defaultUrl:'this.src="' + require("../assets/images/08.png") +'";this.onerror=null',
        swiperOption: {
            notNextTick: true,
            autoplay:0,
			//设定初始化时slide的索引
			initialSlide:0,
			// 设置轮播
			fadeEffect: {
                crossFade: false,
            },
			//滑动方向
			direction : 'horizontal',
			//小手掌抓取滑动
            grabCursor : true,
            autoplayDisableOnInteraction:true,
        },
        banner: [
            {
                image_url:'',
                link:''
            }
        ]
        }
    },
    created() {
        this.getInit();
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (!from.name) {
                vm.$store.commit('setBackType', '2')
            }
        });
    },
    methods: {
        async getInit() {
            //隐藏原生头部返回
            mc.hiddenNativeBackBtnjs(function(data) {});
            const params ={ 
            }
            //获取轮播图列表
            $list.c2mList.getBannersList(params).then(res=>{
                // console.log(res.data)
                if(res.data.length>0){
                    res.data.forEach((item,index)=>{
                        if(item.bannerType == "activity_vote"){
                            this.showBanner=false;
                            this.banner[index].image_url = 'https://iptv.hbtv.com.cn/static/'+item.bannerImg ;
                            this.banner[index].link = 'http://res.cjyun.org/t/common/app/iptv/#/vote'+"/?id="+item.voteId;
                            // console.log(this.banner)
                        }
                    });
                }else{
                    this.showBanner=false;
                }
                
                
            }).catch(error=>{
                console.log('错误信息');
                console.log(error);
            });
            //获取栏目列表
            $list.c2mList.getC2mList(params).then(res=>{
                this.categoryList = res.data;
            }).catch(error=>{
                console.log('错误信息');
                console.log(error);
            });
            //获取推荐列表
            $list.c2mList.getTipList(params).then(res=>{
                const tempDataList = res.data
                const _that = this;
                _that.hotTitle1 = tempDataList[0].title;
                _that.hotTitle2 = tempDataList[1].title;
                _that.hotTitle3 = tempDataList[2].title;
                _that.mediasList1 = tempDataList[0].medias;
                _that.mediasList2 = tempDataList[1].medias;
                _that.mediasList3 = tempDataList[2].medias;
            }).catch(error=>{
                console.log('错误信息');
                console.log(error);
            }); 
            const userAccount =  localStorage.getItem("userAccount");
            $list.c2mList.getUserInfo(userAccount).then(res=>{
                if(res.data !== null && res.data.hasOwnProperty('userMac')){
                    const iptvAccount = res.data.iptvAccount;
                    const iptvOperator = res.data.iptvOperator;
                    localStorage.setItem("iptvAccount",iptvAccount)
                    localStorage.setItem("iptvOperator",iptvOperator)
                }
                if(res.data == null){
                    localStorage.removeItem("iptvAccount");
                    localStorage.removeItem("iptvOperator");
                }
                }).catch(error=>{       
                    console.log(error);
            }); 
            this.swiperOption.autoplay = this.banner.length != 1 ? { //控制只有一张图片的时候不自动轮播
            delay: 1500,
            stopOnLastSlide: false,
            disableOnInteraction: false
            } : false; 
        },
        goActive(pageLink){
            window.location.href = pageLink;
        },
        inputFunc(){
            if (event.keyCode == 13) { //如果按的是enter键 13是enter 
                event.preventDefault(); //禁止默认事件（默认是换行） 
                const oparams = {
                    'searchName': this.mediaName,
                    'page':1,
                    'pageSize':10
                }
                $list.c2mList.getSearchList({params:oparams}).then(res=>{
                    if(res.code == 200){
                        const searchList = res.data.list;
                        localStorage.setItem('searchList',JSON.stringify(searchList));
                        this.$router.push({
                            path:'/searchList'
                        });
                    }else{
                        this.$toast(res.message);
                    }
                }).catch(error=>{
                    console.log(error);
                });
            }  
        },
        getMeidaData: _throttle(function(id) {
            //获取栏目详情
            const userAccount =  localStorage.getItem("userAccount");
            const oparams = {
                categoryIds : id,
                page : 1,
                pageSize: 50
                }
            $list.c2mList.getMeidaList({params:oparams}).then(res=>{
                if('recommed' == id){
                    const params ={ 
                    }
                    //获取推荐列表
                    $list.c2mList.getTipList(params).then(res=>{
                        this.activeId = id;
                        this.showHide = true;
                        const newTempDataList = res.data;
                        const _that = this;
                        _that.hotTitle1 = newTempDataList[0].title;
                        _that.hotTitle2 = newTempDataList[1].title;
                        _that.hotTitle3 = newTempDataList[2].title;
                        _that.mediasList1 = newTempDataList[0].medias;
                        _that.mediasList2 = newTempDataList[1].medias;
                        _that.mediasList3 = newTempDataList[2].medias;
                    }).catch(error=>{
                        console.log('错误信息');
                        console.log(error);
                    });
                }else{
                    this.mediasList3 = res.data.list;
                    this.showHide = false;
                    this.activeId = id;
                }
            }).catch(error=>{
                console.log('错误信息');
                console.log(error);
            });
        }, 200),
        getDetailsData: _throttle(function(id) {
            this.$router.push({
                path:'/details',
                query:{
                    id:id
                }
            })
        }, 200),
        // 用户绑定
        getBind(){
            //扫一扫
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
       background: #fff;
       text-align: center;
       position: fixed;
       top: 0;
       left: 0;
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
</style>
