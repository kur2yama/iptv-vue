<template>
  <div class="ys-float-btn" 
       :style="{'width':itemWidth+'px','height':itemHeight+'px','left':left+'px','top':top+'px'}"
       ref="div"
       @click ="onBtnClicked">
       <i></i>
  </div>
</template>

<script>
import MC from '../../config/mc.js'
import { Dialog } from 'vant' 
  export default {
    name: "FloatImgBtn",
    props:{
      text:{
        type:String,
        default:"默认文字"
      },
      itemWidth:{
        type:Number,
        default:66
      },
      itemHeight:{
        type:Number,
        default:66
      },
      gapWidth:{
        type:Number,
        default:15
      },
      coefficientHeight:{
        type:Number,
        default:0.75
      }
    },
    created(){
      this.clientWidth = document.documentElement.clientWidth;
      this.clientHeight = document.documentElement.clientHeight;
      this.left = this.clientWidth - this.itemWidth - this.gapWidth;
      this.top = this.clientHeight*this.coefficientHeight;
    },
    mounted(){
      window.addEventListener('scroll', this.handleScrollStart);
      this.$nextTick(()=>{
        const div = this.$refs.div;
        div.addEventListener("touchstart",()=>{
          div.style.transition = 'none';
        });
        div.addEventListener("touchmove",(e)=>{
          event.preventDefault();
          if (e.targetTouches.length === 1) {
            let touch = event.targetTouches[0];
            this.left = touch.clientX - this.itemWidth/2;
            this.top = touch.clientY - this.itemHeight/2;
          }
        });
        div.addEventListener("touchend",()=>{
          div.style.transition = 'all 0.3s';
          if(this.left>this.clientWidth/2){
            this.left = this.clientWidth - this.itemWidth - this.gapWidth;
          }else{
            this.left = this.gapWidth;
          }
          if(this.top>this.clientHeight*this.coefficientHeight||this.top<15){
             this.top = this.clientHeight*this.coefficientHeight;
          }
        });

      });
    },
    beforeDestroy(){
      window.removeEventListener('scroll', this.handleScrollStart);
    },
    methods:{
      onBtnClicked(){
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
                const iptvAccount =  localStorage.getItem("iptvAccount");
                if(iptvAccount){
                      that.$router.push({
                        path:'/remote',
                      })
                }else{
                  Dialog.confirm({
                    title: '您尚未绑定长江云TV',
                    message: '请先绑定后，再进行操作'
                        }).then(() => {
                            that.$router.push({
                            path:'/userBind'
                        })
                    }).catch(() => {
                    // on cancel
                 });
                }
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
      handleScrollStart(){
        this.timer&&clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
          this.handleScrollEnd();
        },300);
        this.currentTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(this.left>this.clientWidth/2){
          this.left = this.clientWidth - this.itemWidth/2;
        }else{
          this.left = -this.itemWidth/2;
        }
      },
      handleScrollEnd(){
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop === this.currentTop){
          if(this.left>this.clientWidth/2){
            this.left = this.clientWidth - this.itemWidth - this.gapWidth;
          }else{
            this.left = this.gapWidth;
          }
          clearTimeout(this.timer);
        }
      },
    },
    data(){
      return{
        timer:null,
        currentTop:0,
        clientWidth:0,
        clientHeight:0,
        left:0,
        top:0,
      }
    }
  }
</script>

<style scoped>
</style>
