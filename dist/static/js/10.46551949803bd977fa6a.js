webpackJsonp([10],{"4fCx":function(t,e){},"9DQr":function(t,e){},K07i:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("gyMJ"),s=(a("Y4TK"),a("+yxM")),n=(a("mw3O"),a("9DQr"),a("Fd2+")),o={components:{floatPage:s.a},data(){return{tvShowList:"",isLianbo:"",videoState:!0,iptvlive:`http://m.hbtv.com.cn/iptv_live?channelid=${this.$route.query.CHANNELID}&t=${new Date}`,playerOptions:{autoplay:!1,muted:!1,loop:!1,preload:"auto",language:"zh-CN",flash:{hls:{withCredentials:!1}},html5:{hls:{withCredentials:!1}},aspectRatio:"16:9",fluid:!0,sources:[{withCredentials:!1,type:"application/x-mpegURL",src:""}],poster:"",width:document.documentElement.clientWidth,notSupportedMessage:"此视频暂无法播放，请稍后再试"}}},created(){this.getInit(),this.getQueryValue()},computed:{player(){return this.$refs.videoPlayer.player}},methods:{getInit(){const t=localStorage.getItem("userAccount"),e=new Date,a={year:e.getFullYear(),month:e.getMonth()+1,date:e.getDate()};a.month<10&&(a.month="0"+a.month),a.date<10&&(a.date="0"+a.date);const s=a.year+"-"+a.month+"-"+a.date,n={channelId:this.$route.query.CHANNELID,date:s};i.a.c2mList.getLiveShow(t,{params:n}).then(t=>{this.tvShowList=t.data}).catch(t=>{console.log(t)}),this.getPlayVideo()},getPlayVideo(){""!=this.$route.query.playLive&&(this.videoState=!1,this.playerOptions.sources[0].src=this.$route.query.playLive)},getPlayLive(){if(localStorage.getItem("iptvAccount")){const t=localStorage.getItem("userAccount"),e={type:"live",CHANNELINDEX:this.$route.query.CHANNELINDEX,ctccChannelIndex:this.$route.query.ctccChannelIndex,cuccChannelId:this.$route.query.cuccChannelId};i.a.c2mList.getUserKey(t,{params:e}).then(t=>{200==t.code?this.$toast.success("投屏成功"):509==t.code?this.$toast("电视已断开链接，或该页面不支持远程遥控"):this.$toast(t.message)}).catch(t=>{console.log(t)})}else n.b.confirm({title:"您尚未绑定长江云TV",message:"请先绑定后，再进行操作"}).then(()=>{this.$router.push({path:"/userBind"})}).catch(()=>{})},goBack(){"index"===this.$route.name&&"2"===this.$store.getters.getBackType?mc.nativeGoBackjs(function(t){}):this.$router.go(-1)},getShare(){const t=window.location.href.replace(/[|\#|]/g,"");mc.sharePanel({title:"长江云TV双屏互动",content:"绑定长江云TV，手机与电视互动投屏新看法，更有丰富的有奖活动等您参加。",image:"http://img.cjyun.org/a/10008/201912/500af49f81b41b98a71e1f3cb195afac.png",url:t})},getApp(){mc.nativeGoBackjs(function(t){})},getQueryValue(){var t=decodeURIComponent(location.hash),e=new Object;if(-1!=t.indexOf("?"))for(var a=t.split("?")[1].split("&"),i=0;i<a.length;i++)e[a[i].split("=")[0]]=unescape(a[i].split("=")[1]);this.isLianbo=e.isLianbo}}},c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{directives:[{name:"show",rawName:"v-show",value:"1"==t.isLianbo,expression:"isLianbo == '1'"}],staticClass:"header"},[i("div",{staticClass:"goBack",on:{click:function(e){return t.goBack()}}},[i("img",{attrs:{src:a("fRSK"),alt:""}})]),t._v(" "),i("span",{staticStyle:{"margin-left":"16%","font-weight":"bold"}},[t._v(t._s(t.$route.query.titleName))]),t._v(" "),i("div",{staticClass:"goCancel"},[i("div",{staticClass:"s-btn",on:{click:function(e){return t.getShare()}}},[i("img",{attrs:{src:a("N8H6"),alt:""}})]),t._v(" "),i("div",{staticClass:"c-btn",on:{click:function(e){return t.getApp()}}},[i("img",{attrs:{src:a("kd/H"),alt:""}})])])]),t._v(" "),i("div",{staticClass:"column-box"},[t.videoState?i("div",{staticClass:"h211"},[t._m(0)]):i("div",{staticClass:"h211"},[i("iframe",{attrs:{width:"100vw",src:t.iptvlive}})]),t._v(" "),i("ul",{staticClass:"main"},t._l(t.tvShowList,function(e){return i("li",{key:e.id},[i("div",{staticClass:"column-time"},[t._v(t._s(e.startime.slice(10,16)))]),t._v(" "),i("div",{staticClass:"drog"}),t._v(" "),i("div",{staticClass:"name"},[t._v(t._s(e.name))])])}),0)]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:"1"==t.isLianbo,expression:"isLianbo == '1'"}],staticClass:"float-contr",attrs:{id:"float-contr"}},[i("float-page")],1),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:"1"==t.isLianbo,expression:"isLianbo == '1'"}],staticClass:"live-btn",on:{click:function(e){return t.getPlayLive()}}},[i("span",[t._v("直播投屏")])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"column-pic"},[e("i")])}]};var r=a("VU/8")(o,c,!1,function(t){a("4fCx")},"data-v-142a4910",null);e.default=r.exports}});