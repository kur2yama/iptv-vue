<template>
<div>
    <div class="binding">
        正在绑定，请稍后
    </div>
</div>
</template>
<script>
import $list from '../api/index'
import MC from '../config/mc.js'
  export default {
    data(){
      return{
        userMac:'',
      }
    },
    mounted (){
        window.outsideScanToBind = this.outsideScanToBind;
        window.mediaCloudCallback = this.mediaCloudCallback;
    },
    methods:{ 
        getBind(params){
            const userAccount = params.data.data.id;
            const changyanUserId = params.data.data.id;
            const nickname = params.data.data.nickname;
            localStorage.setItem('userAccount',userAccount);
            localStorage.setItem('changyanUserId',changyanUserId);
            localStorage.setItem('nickname',nickname);
            $list.c2mList.getUserInfo(userAccount).then(res=>{
                if(res.data !== null && res.data.hasOwnProperty('userMac')){
                    const iptvAccount = res.data.iptvAccount;
                    const iptvOperator = res.data.iptvOperator;
                    localStorage.setItem("iptvAccount",iptvAccount);
                    localStorage.setItem("iptvOperator",iptvOperator);
                    setTimeout( window.location.href = 'http://res.cjyun.org/t/common/app/iptv/#/userInfo', 3000 );
                }
                if(res.data == null){
                    const userAccount =  localStorage.getItem('userAccount');
                    const userMac =  this.userMac;
                    const changyanUserId =  localStorage.getItem('changyanUserId');
                    const nickname =  localStorage.getItem('nickname');
                    const oparams = {
                        "cjyUserAccount": changyanUserId,
                        "cjyUserName": nickname,
                    }
                    $list.c2mList.getBindUser(userAccount,userMac,oparams).then(res=>{
                        if(res.code==200){
                            setTimeout( window.location.href = 'http://res.cjyun.org/t/common/app/iptv/#/userInfo', 3000 );  
                        }else{
                            this.$toast(res.message);
                            
                        }
                    }).catch(error=>{   
                        console.log(error);
                    });
                }
            }).catch(error=>{       
                console.log(error);
            });
        }, 

        outsideScanToBind(params){
            this.userMac = params.split("userMac=")[1];
            mc.userGetInfo(function(data) {});
        },
        mediaCloudCallback(params){
            // 处理返回数据
            if(params.method == "outsideScanToBind"){
                this.userMac = params.data.result.split("userMac=")[1];
                mc.userGetInfo(function(data) {});
            } else if(params.method == "userGetInfo"){
                if(params.data.state){
                    // window.MediaClient.getBindContent(params.data.state);
                    this.getBind(params);
                }else{
                    // window.MediaClient.getBindContent("ss="+params.data.state);
                    mc.userLogin(function(data) {});
                }
            } else if (params.method == "userLogin"){
                if(params.data.state == 0){
                     //退出
                    mc.nativeGoBackjs(function(data) {});
                }else{
                    this.getBind(params);
                }
            } else if (params.method == "loginBack"){
                //退出
                mc.nativeGoBackjs(function(data) {});
            }
        },

    },
  }
</script>

<style scoped lang="less">
.binding{
    width: 100%;
    margin-top:10rem;
    text-align: center;
    font-size: 1.1rem;
    color: #444; 
}
</style>

