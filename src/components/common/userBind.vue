<template>
   <div>
       <Header></Header>
        <div class="bind-box" v-if="userflag">
            <div class="iptv-title">
               <span>打开长江云TV(湖北IPTV)，从首页右上角<em>“我的”</em>确定进入，找到<em>“互动绑定”</em>确定进入，点击下方<em>[绑定]</em>按钮扫描电视上的二维码，即可完成绑定。返回电视首页，使用双屏互动功能。</span>    
            </div>   
            <div class="iptv-bg">
                <img src="../../assets/images/iptvBg.png" alt="">
            </div>
            <div class="btn" @click="getBind()"><i></i>绑定</div>
            <div class="tips">
                <p><em style="color:#f9a71a;font-size:1rem;font-weight:bold;">长江云TV(湖北IPTV)</em>是面向湖北全省家庭宽带用户的新兴视听业务，用户在家中通过宽带网即可收看直播、点播等电视视频业务。</p>
                <p>关注“IPTV湖北”公众号，输入关键词“投屏”，教你如何用手机与电视互动</p>
                <p><em>湖北长江云新媒体集团有限公司</em></p>
            </div>
        </div>
        <div v-else>
            <div class="ctitle">当前绑定的设备</div>
            <div class="userAccount">{{iptvAccount}}</div>   
            <div class="btn cancelBtn"  @click="getUnBind()"><i></i>解除绑定</div>
        </div>
   </div>

</template>

<script>
import Header from './header.vue'
import $list from '../../api/index'
import MC from '../../config/mc.js'
  export default {
    name: "userBind",
    components:{
        Header
    },
    data(){
      return{
          iptvAccount:"",
          userMac:"",
          userflag:true
      }
    },
    created(){
        this.getInit();
    },
    methods:{
        getInit(){
            const userAccount =  localStorage.getItem("userAccount");
            $list.c2mList.getUserInfo(userAccount).then(res=>{
                if(res.data !== null && res.data.hasOwnProperty('userMac')){
                    this.iptvAccount = res.data.iptvAccount;
                    const iptvOperator = res.data.iptvOperator;
                    localStorage.setItem("iptvAccount",this.iptvAccount)
                    localStorage.setItem("iptvOperator",iptvOperator)
                    this.userflag = false;
                }
                if(res.data == null){
                    localStorage.removeItem("iptvAccount");
                    localStorage.removeItem("iptvOperator");
                    this.userflag = true
                }
                }).catch(error=>{       
                    console.log(error);
            }); 
        },
        // 用户绑定
        getBind(){
            //扫一扫
            const that = this;
            mc.qrcodeScan(function(data) {
                const userMac = data.result.split("userMac=")[1];
                const userAccount =  localStorage.getItem("userAccount");
                const changyanUserId =  localStorage.getItem("userAccount");
                const nickname =  localStorage.getItem("nickname");
                const oparams = {
                    "cjyUserAccount": changyanUserId,
                    "cjyUserName": nickname,
                }
                $list.c2mList.getBindUser(userAccount,userMac,oparams).then(res=>{
                    if(res.code == 200){
                        $list.c2mList.getUserInfo(userAccount).then(res=>{
                        that.iptvAccount = res.data.iptvAccount;
                        const iptvOperator = res.data.iptvOperator;
                        localStorage.setItem("iptvAccount",that.iptvAccount)
                        localStorage.setItem("iptvOperator",iptvOperator)
                        that.userflag = false;
                        }).catch(error=>{       
                            console.log(error);
                        });
                    }else{
                        that.$toast(res.message);
                    }
                }).catch(error=>{   
                    console.log(error);
                });
            });
            
        },
        // 用户解绑
        getUnBind(){
            const userAccount =  localStorage.getItem("userAccount");
            if(userAccount){
                $list.c2mList.getUnBindUser(userAccount).then(res=>{
                    localStorage.removeItem("iptvAccount")
                    localStorage.removeItem("iptvOperator");
                    this.userflag = true
                }).catch(error=>{
                    console.log(error);
                });
            }
        },
    }, 
  }
</script>

<style lang="less" scoped>
.bind-box{
    width: 100%;
    height: -webkit-fill-available;
    overflow-y:scroll ; 
    -webkit-overflow-scrolling: touch;
}
.iptv-title{
    text-align: center;
    font-size: 1rem;
    width: 86%;
    margin: 0 auto;
    margin-top: 4rem;
    margin-bottom: .6rem;
    color: #444;
    text-indent: 2em;
    letter-spacing: 2px;
    text-align: left;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    span{
        em{
            color: #f9a71a;
        }
    }
}
.iptv-bg{
    width: 80%;
    height: 12rem;
    margin: 0 auto;
    margin-bottom: .8rem;
    overflow: hidden;
    img{
        width: 100%;
    }
}
.ctitle{
    text-align: center;
    font-size: 1.2rem;
    margin:6rem auto 2rem auto;
    color: #808080;
}
.userAccount{
    text-align: center;
    font-size: 1.2rem;
    color: #808080;
    margin-bottom: 6rem;
}
.btn{
    width: 90%;
    height: 2.6rem;
    line-height: 2.6rem;  
    margin: 0 auto;
    background: #f9a71a;
    border-radius: 3px;
    text-align: center;
    font-size: 1rem;
    color: #fff;
    position: relative;
    padding-left: 1rem;
    i{
        position: absolute;
        right: 0;
        top: 0.6rem;
        left: -4rem;
        margin: 0 auto;
        width: 1.33rem;
        height: 1.33rem;
        background: url(../../assets/images/bindBtn.png) no-repeat center center;
        background-size: cover;
    }
}
.tips{
    width: 86%;
    height: auto;
    border: 2px dashed #999;
    margin:.8rem auto;
    color: #808080;
    background-color:#f4f4f4; 
    border-radius: 5px;
    font-size: .9rem;
    padding: 10px;
    p{
        text-indent: 2em;
        letter-spacing: 2px;
        margin-bottom: 4px;
        em{
            font-style:oblique
        }
    }
    p:last-child{
        text-align: right;
    }
    
}
.cancelBtn{
    background:#fff;
    border: 1px solid red;
    box-sizing: border-box;
    color: red;
    position: relative;
    i{
        position: absolute;
        right: 0;
        top: 0.6rem;
        left: -6.1rem;
        margin: 0 auto;
        width: 1.33rem;
        height: 1.33rem;
        background: url(../../assets/images/unBindBtn.png) no-repeat center center;
        background-size: cover;
    }
}
</style>
