webpackJsonp([15],{"1sCW":function(t,e){},ozlk:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("Mitt"),s=i("gyMJ"),c=(i("Y4TK"),i("Fd2+")),n={name:"active",components:{Header:a.a},data:()=>({votesList:[{}]}),created(){this.getInit()},methods:{getInit(){s.a.c2mList.getActivityVotes(this.activityId).then(t=>{this.votesList=t.data.list}).catch(t=>{console.log(t)})},getActiveInfo(t){this.$router.push({path:"/vote",query:{id:t}})},getHomePage(){this.$router.push({path:"/"})},getLivePage(){const t=this;mc.userGetInfo(function(e){if(1==e.state){const i=e.data.id,a=e.data.changyanUserId,s=e.data.nickname;localStorage.setItem("userAccount",i),localStorage.setItem("changyanUserId",a),localStorage.setItem("nickname",s),i&&t.$router.push({path:"/live"})}else 0==e.state&&c.b.confirm({title:"请先登录",message:"登录后记得在设备页面绑定哦"}).then(()=>{mc.userLogin(function(t){})}).catch(()=>{})})}}},o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("Header"),t._v(" "),i("div",{staticClass:"active-content"},[i("ul",t._l(t.votesList,function(e){return i("li",{key:e.index,on:{click:function(i){return t.getActiveInfo(e.id)}}},[i("img",{attrs:{src:"https://iptv.hbtv.com.cn/static//zodiac-wechat/ca/caf676796f7c40d2a62517ca44acd780.jpg"}})])}),0)]),t._v(" "),i("div",{staticClass:"foot"},[i("ul",[i("li",{staticClass:"home",on:{click:function(e){return t.getHomePage()}}},[t._m(0)]),t._v(" "),i("li",{staticClass:"live",on:{click:function(e){return t.getLivePage()}}},[t._m(1)]),t._v(" "),t._m(2)])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("i")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("i")])},function(){var t=this.$createElement,e=this._self._c||t;return e("li",{staticClass:"myCenter"},[e("p",[e("i",{staticClass:"actived"})]),e("p",{staticStyle:{color:"rgb(195,195,195)","font-size":"0.7rem"}},[this._v("活动")])])}]};var r=i("VU/8")(n,o,!1,function(t){i("1sCW")},"data-v-182743e8",null);e.default=r.exports}});