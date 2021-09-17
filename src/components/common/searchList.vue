<template>
<div>
    <Header></Header>
    <!-- 我的搜索 -->
    <div class="video-list">
        <div class="video-top" 
             v-for="item in searchDateList"
             :key="item.id" 
             @click="getDetailsData(item.id)"
             >
            <div class="video-img">
                <!-- <img v-lazy="'https://iptv.hbtv.com.cn/static/'+item.thumbnail?'https://iptv.hbtv.com.cn/static/'+item.thumbnail:defaultUrl" :onerror="defaultUrl"/> -->
                <img v-lazy="item.thumbnail?item.thumbnail:defaultUrl" :onerror="defaultUrl"/>
            </div> 
            <div class="video-info">
                <h2>{{item.name}}</h2> 
                <p>{{item.releaseLanguage}}/{{item.releasePlace}}/{{item.duration}}分钟</p> 
                <p>{{item.releaseDate}}/上映</p>
            </div>
        </div>
        <div class="unSearch" v-show="isSearch">{{isSearch?'输入格式不匹配':''}}</div>
    </div>
</div>
    
</template>

<script>
import Header from './header.vue'
import $list from '../../api/index'
import MC from '../../config/mc.js'
export default {
    components:{
        Header
    },
    data(){
      return{
        searchDateList:'',
        isSearch:false,
        defaultUrl:'this.src="' + require("../../assets/images/08.png") +'";this.onerror=null',
      }
    },
    created(){
        this.getInit();
    },
    methods:{ 
        getInit(){
           const searchList = JSON.parse(localStorage.getItem('searchList'));
           if(searchList.length>0){
                this.isSearch = false;
                this.searchDateList = searchList;
            }else{
                this.isSearch = true;
            }
        },
        getDetailsData(id){
            this.$router.push({
                path:'/details',
                query:{
                    id:id
                }
            })
        }
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
        margin-top: 0;
        width: calc(100% - 3.53rem);
        margin: 1rem auto;
        overflow: hidden;
        .video-img {
            float: left;
            width: 30%;
            img {
                width: 100%;
            }
        }
        .video-info {
            float: left;
            width: calc(69% - 1.6rem);
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
    .unSearch{
        width: 100%;
        height: 2rem;
        color: #999;
        font-size: 1.1rem;
        margin-top: 10rem;
        text-align: center;
    }
}

</style>
