webpackJsonp([12],{"6SbC":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("Mitt"),i=(a("gyMJ"),a("Y4TK"),{components:{Header:s.a},data:()=>({searchDateList:"",isSearch:!1,defaultUrl:'this.src="'+a("11cb")+'";this.onerror=null'}),created(){this.getInit()},methods:{getInit(){const e=JSON.parse(localStorage.getItem("searchList"));e.length>0?(this.isSearch=!1,this.searchDateList=e):this.isSearch=!0},getDetailsData(e){this.$router.push({path:"/details",query:{id:e}})}}}),r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Header"),e._v(" "),a("div",{staticClass:"video-list"},[e._l(e.searchDateList,function(t){return a("div",{key:t.id,staticClass:"video-top",on:{click:function(a){return e.getDetailsData(t.id)}}},[a("div",{staticClass:"video-img"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.thumbnail?t.thumbnail:e.defaultUrl,expression:"item.thumbnail?item.thumbnail:defaultUrl"}],attrs:{onerror:e.defaultUrl}})]),e._v(" "),a("div",{staticClass:"video-info"},[a("h2",[e._v(e._s(t.name))]),e._v(" "),a("p",[e._v(e._s(t.releaseLanguage)+"/"+e._s(t.releasePlace)+"/"+e._s(t.duration)+"分钟")]),e._v(" "),a("p",[e._v(e._s(t.releaseDate)+"/上映")])])])}),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.isSearch,expression:"isSearch"}],staticClass:"unSearch"},[e._v(e._s(e.isSearch?"输入格式不匹配":""))])],2)],1)},staticRenderFns:[]};var l=a("VU/8")(i,r,!1,function(e){a("Zl8e")},"data-v-529340ba",null);t.default=l.exports},Zl8e:function(e,t){}});