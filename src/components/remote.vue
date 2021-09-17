<template>
<div class="wrap">
  <Header></Header>
  <div class="remote">
        <div class="remote-top">
            <div class="remote-remote" v-if="checked">
                <div class="quartercircle divLeft" @click="getConfirm(37)">
                    <a href="#"></a>
                </div>
                <div class="quartercircle divTop" @click="getConfirm(38)">
                    <a href="#"></a>
                </div>
                <div class="quartercircle divRight" @click="getConfirm(39)">
                    <a href="#"></a>
                </div>
                <div class="quartercircle divBottom" @click="getConfirm(40)">
                    <a href="#"></a>
                </div>
                <div class="circle" @click="getConfirm(13)">
                    <span>OK</span>
                </div>
            </div>
            <div class="remote-count" v-else>
                <ul class="count-list">
                    <li @click="getConfirm(49)">1</li>
                    <li @click="getConfirm(50)">2</li>
                    <li @click="getConfirm(51)">3</li>
                    <li @click="getConfirm(52)">4</li>
                    <li @click="getConfirm(53)">5</li>
                    <li @click="getConfirm(54)">6</li>
                    <li @click="getConfirm(55)">7</li>
                    <li @click="getConfirm(56)">8</li>
                    <li @click="getConfirm(57)">9</li>
                    <li @click="getConfirm(106)">*</li>
                    <li @click="getConfirm(48)">0</li>
                    <li @click="getConfirm(105)">#</li>
                </ul>
            </div>
        </div>
        <div class="remote-bottom">
            <div class="remote-nav">
                <div>
                    <ul class="remote-tag">
                        <li v-for="item in wpList" :key="item.name" 
                            :class="{active : active == item.name}"  
                             @click="toggleChecked(item.name)"
                        >{{item.name}}</li>
                    </ul>
                </div>
            </div>
            <div class="voice-list">
                <ul>
                    <li class="menu" @click="getConfirm(272)"><i></i><p>首页</p></li>
                    <li class="ok" @click="getConfirm(263)"><i></i><p>播放/暂停</p></li>
                    <li class="back" @click="getConfirm(8)"><i></i><p>返回</p></li>
                    <li class="plus" @click="getConfirm(259)"><i></i><p>音量-</p></li>
                    <li class="voice-ico" @click="getConfirm(261)"><i></i><p>静音</p></li>
                    <li class="miles" @click="getConfirm(260)"><i></i><p>音量+</p></li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Header from './common/header.vue'
import $list from '../api/index'

export default {
  name: 'remote',
  components:{
        Header
    },
  data () {
    return {
        msg: '',
        wpList: [
            {
            name: '按键'
            },
            {
            name: '数字'
            }
        ],
        active:'按键',
        checked:true,
        }
    },

    methods: {
        toggleChecked(name){
            this.active = name;
            this.checked = !this.checked;
        },
        // 指令
        getConfirm(value){
            //手机震动
            mc.pressShake(function(data) {});
            const userAccount =  localStorage.getItem("userAccount");
            const oparams = {
                "type": "key",
                "keyCode": value,
            }
            $list.c2mList.getUserKey(userAccount,{params: oparams}).then(res=>{
                if(res.code == 200){
                    // this.$toast.success('投屏成功');
                }else if(res.code == 509){
                    this.$toast('电视已断开链接，或该页面不支持远程遥控');
                }else{
                    this.$toast(res.message);
                }
            });   
        },
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
