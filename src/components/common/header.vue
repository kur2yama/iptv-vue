<template>
    <div class="header">
        <div class="goBack" @click="goBack()">
            <img src="../../assets/images/goBack.png" alt="">
        </div>
        <span style="margin-left:16%;font-weight: bold;">湖北IPTV</span>
        <div class="goCancel">
            <div class="s-btn" @click="getShare()">
                <img src="../../assets/images/iconShare.png" alt="">
            </div>
            <div class="c-btn" @click="getApp()">
                <img src="../../assets/images/iconCancel.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import MC from '../../config/mc.js'
  export default {
    created(){
         mc.hiddenNativeBackBtnjs(function(data) {});
    },
    methods:{  
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
            
        }
    },
    data(){
      return{
      }
    }
  }
</script>

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
</style>
