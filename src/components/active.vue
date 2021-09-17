<template>
<div>
    <Header></Header>
    <div class="active-content">
        <ul>
            <li v-for="item in votesList"
                :key="item.index"
                @click="getActiveInfo(item.id)"
            >
                <img src="https://iptv.hbtv.com.cn/static//zodiac-wechat/ca/caf676796f7c40d2a62517ca44acd780.jpg"/>
            </li>
        </ul>
    </div>
    <div class="foot">
        <ul>
            <li class="home" @click="getHomePage()"><p><i></i></p></li>
            <li class="live" @click="getLivePage()"><p><i></i></p></li>
            <li class="myCenter"><p><i class="actived"></i></p><p style="color:rgb(195,195,195);font-size:0.7rem;">活动</p></li>
        </ul>
    </div>
</div>
</template>

<script>
import Header from './common/header.vue'
import $list from '../api/index'
import MC from '../config/mc.js'
import { Dialog } from 'vant'
export default {
    name: 'active',
    components:{
        Header
    },
    data () {
        return {
            votesList:[{}]
        }
    },
    created() {
        this.getInit();
    },
    methods: {
        getInit(){
             // 获取活动列表/api/cjy/activity/{activityId}/getActivityVotes
            $list.c2mList.getActivityVotes(this.activityId).then(res=>{
                this.votesList = res.data.list;
            }).catch(error=>{
                console.log(error);
            });
        },
        // 活动详情
        getActiveInfo(id){
            this.$router.push({
                path:'/vote',
                query:{
                    id:id
                }
            })
        },
        // 首页
        getHomePage(){
            this.$router.push({
                path:'/',
            })
        },
        // 直播
        getLivePage(){
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
                            path:'/live'
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
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.active-content{
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-top: 3.5rem;
    ul{
        width: calc(100% - 2rem);
        height: auto;
        margin: 0 auto;
        li{
            width: 100%;
            height: 10.7rem;
            -webkit-box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, .1);
            -moz-box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, .1);
            box-shadow:0px 2px 2px 2px rgba(0, 0, 0, .1);
            margin:.5rem auto;
            border-radius: 4px;
            img{
                width: 100%;
                height: 100%;
                border-radius: 4px;
                // background-size: contain;
                // background-repeat: no-repeat;
            }
        }
    }
}

</style>
