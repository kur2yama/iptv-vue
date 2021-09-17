<template>
<div>
    <Header></Header>
    <div class="rule-content">
        <div class="prsize">
            <div class="t-left"></div>
            <div class="p-list">
                <div class="container-swiper">
                    <swiper :options="swiperOption">
                        <swiper-slide><img src="../assets/images/active/prize01.png" alt=""></swiper-slide>
                        <swiper-slide><img src="../assets/images/active/prize02.png" alt=""></swiper-slide>
                        <swiper-slide><img src="../assets/images/active/prize03.png" alt=""></swiper-slide>
                        <swiper-slide><img src="../assets/images/active/prize04.png" alt=""></swiper-slide>
                        <swiper-slide><img src="../assets/images/active/prize05.png" alt=""></swiper-slide>
                    </swiper>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div> 
                </div>
            </div>
            <div class="t-right"></div>
            <span>左右滑动查看所有奖品</span>
        </div>
        <div class="tips">
            <img src="../assets/images/active/tips.png" alt="">
        </div>
        <div class="rules">
            <p>
                1、本次评选共设有五个投票单元，分别是最佳影片、最佳电视剧、最受欢迎男演员、最受欢迎女演员和潜质新人；
            </p>
            <p>
                2、活动结束后，各单元对应所获票数最高的作品，将向所有用户全网免费一周；
            </p>
            <p>
                3、用户每天可在电视端、长江云APP和微信公众号分别参与投票，当日未投票数不累计到次日；
            </p>
            <p>
                4、长江云APP和微信公众号绑定的投票账号，最多不能超过6个，超过6个则无法继续使用APP和微信投票；
            </p>
            <p>
                5、累计投出票数最多的前100位用户，将获得重磅豪礼；
            </p>
            <p>
                6、活动排名依据用户投票数及最后一票投票时间排序，即票数相同者，以最后一票当天投票时间（精确到秒）先后排序；
            </p>
            <p>
                7、用户需在活动页面正确填写手机号码，如获奖，工作人员将在活动结束后10个工作日内根据手机号码进行联系；
            </p>
            <p>
                8、手机号码将作为活动领奖唯一凭证，漏填或错填则视为弃奖；
            </p>
            <p>
                9、本活动最终解释权归长江云TV所有。
            </p>
            <p style="text-align:right;margin-top:.5rem;">咨询电话:18717103005</p>
        </div>
    </div>
</div>
</template>

<script>
import Header from './common/header.vue'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    name: 'rule',
    components:{
        Header,
        swiper,
        swiperSlide
    },
    data () {
        return {
        swiperOption: {
            notNextTick: true,
			//循环
			loop:true,
			//设定初始化时slide的索引
			initialSlide:0,
			// 设置轮播
			fadeEffect: {
                crossFade: false,
            },
			//滑动速度
			speed:800,
			//滑动方向
			direction : 'horizontal',
			//小手掌抓取滑动
            grabCursor : true,
            autoplayDisableOnInteraction:true,
            //左右点击
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        },
        
        banner: []
        }
    },
    methods:{
        
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.rule-content{
    width: 100%;
    height: 100vh;
    overflow-y:scroll ; 
    -webkit-overflow-scrolling: touch;
    text-align: center;
    background: url(../assets/images/active/tpbg.png) no-repeat;
    background-size: cover;
    .prsize{
        width: 88%;
        height: 14rem;
        margin: 0 auto;
        overflow: hidden;
        clear: both;;
        padding-bottom: 1.5rem;
        position: relative;
        margin-top: 3rem;
        .swiper-button-prev{
            width: 1.8rem;
            height: 1.8rem;
            background: url(../assets/images/active/goLeft.png) no-repeat;
            background-size: contain;
            left: 4%;
            position: absolute;
            outline:none
        }
        .swiper-button-next{
            width: 1.8rem;
            height: 1.8rem;
            background: url(../assets/images/active/goRight.png) no-repeat;
            background-size: contain;
            right: 1%;
            position: absolute;
            outline:none
        }
        .t-left{
            width: 15%;
            height:100%;
            float: left;
            left: 0;
        }
        .p-list{
            width: 70%;
            height:100%;
            float: left;
            overflow: hidden;
            -webkit-box-shadow: 1px 2px 2px 2px rgba(0, 0, 0, .1);
            -moz-box-shadow: 1px 2px 2px 2px rgba(0, 0, 0, .1);
            box-shadow: 1px 2px 2px 2px rgba(0, 0, 0, .1);
            border-radius: 5px;
        }
        .t-right{
            width: 15%;
            height:100%;
            float: right;
            right: 0;
        }
        span{
            display: inline-block;
            width: 100%;
            height: 1.5rem;
            line-height: 1.5rem;
            color: #AEA499;
            text-align: center;
            font-size: .7rem;
            font-weight: bold;
            padding-top: .4rem;
        }
    }
    .tips{
        width: 88%;
        height: 2rem;
        margin: 0rem auto;
        padding-top: 1rem;
        margin-bottom: 1rem;
        text-align: left;
        padding-left: 2rem;
        img{
            width: 6rem;
            height: 2rem;
            background-size: contain;
        }
    }
    .rules{
        width: 80%;
        margin: 0 auto;
        color: gray;
        font-size: 0.9rem;
        letter-spacing: 0.1rem;
        text-align: left;
        text-indent: -0.4em;
        padding-bottom: 4rem;
        p{
            margin-bottom: 0.25rem;
        }
    }
}
.container-swiper{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.swiper-container{
  height: 100%;
  width: 100%;
  margin: 0px auto;
}
.swiper-slide a{
  display: block;
}

.swiper-slide a img{
  width: 100%;
  height: 100%;
}


</style>
