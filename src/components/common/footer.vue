<template>
    <div class="foot">
        <ul>
            <li class="home active" @click="getHomePage()"><p><i></i></p></li>
            <li class="live" @click="getLivePage()"><p><i></i></p></li>
            <li class="myCenter" @click="getActivePage()">
                <p><i></i></p>
                <p style="color:rgb(195,195,195);font-size:0.7rem;">活动</p>
            </li>
        </ul>
    </div>
</template>

<script>
import MC from '../../config/mc.js'
import { Dialog } from 'vant' 
  export default {
    methods:{  
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
                    that.$router.push({
                        path:'/live'
                    })
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
        // 跳转活动
        getActivePage(){
            this.$router.push({
                path:'/active'
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

</style>
