webpackJsonp([11],{N9Ei:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("gyMJ"),o=(a("Y4TK"),{data:()=>({userMac:""}),mounted(){window.outsideScanToBind=this.outsideScanToBind,window.mediaCloudCallback=this.mediaCloudCallback},methods:{getBind(t){const e=t.data.data.id,a=t.data.data.id,o=t.data.data.nickname;localStorage.setItem("userAccount",e),localStorage.setItem("changyanUserId",a),localStorage.setItem("nickname",o),n.a.c2mList.getUserInfo(e).then(t=>{if(null!==t.data&&t.data.hasOwnProperty("userMac")){const e=t.data.iptvAccount,a=t.data.iptvOperator;localStorage.setItem("iptvAccount",e),localStorage.setItem("iptvOperator",a),setTimeout(window.location.href="http://res.cjyun.org/t/common/app/iptv/#/userInfo",3e3)}if(null==t.data){const t=localStorage.getItem("userAccount"),e=this.userMac,a={cjyUserAccount:localStorage.getItem("changyanUserId"),cjyUserName:localStorage.getItem("nickname")};n.a.c2mList.getBindUser(t,e,a).then(t=>{200==t.code?setTimeout(window.location.href="http://res.cjyun.org/t/common/app/iptv/#/userInfo",3e3):this.$toast(t.message)}).catch(t=>{console.log(t)})}}).catch(t=>{console.log(t)})},outsideScanToBind(t){this.userMac=t.split("userMac=")[1],mc.userGetInfo(function(t){})},mediaCloudCallback(t){"outsideScanToBind"==t.method?(this.userMac=t.data.result.split("userMac=")[1],mc.userGetInfo(function(t){})):"userGetInfo"==t.method?t.data.state?this.getBind(t):mc.userLogin(function(t){}):"userLogin"==t.method?0==t.data.state?mc.nativeGoBackjs(function(t){}):this.getBind(t):"loginBack"==t.method&&mc.nativeGoBackjs(function(t){})}}}),c={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{staticClass:"binding"},[this._v("\r\n        正在绑定，请稍后\r\n    ")])])}]};var s=a("VU/8")(o,c,!1,function(t){a("dSpL")},"data-v-b5137466",null);e.default=s.exports},dSpL:function(t,e){}});