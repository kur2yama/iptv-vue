import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/components/index'],resolve)
    },
    {
      path: '/details',
      name: 'details',
      component: resolve => require(['@/components/details'],resolve)
    },
    {
      path: '/live',
      name: 'live',
      component: resolve => require(['@/components/live'],resolve)
    },
    {
      path: '/column',
      name: 'column',
      component: resolve => require(['@/components/column'],resolve)
    },
    {
      path: '/remote',
      name: 'remote',
      component: resolve => require(['@/components/remote'],resolve)
    },
    {
      path: '/userBind',
      name: 'userBind',
      component: resolve => require(['@/components/common/userBind'],resolve)
    },
    {
      path: '/active',
      name: 'active',
      component: resolve => require(['@/components/active'],resolve)
    },
    {
      path: '/rule',
      name: 'rule',
      component: resolve => require(['@/components/rule'],resolve)
    },
    {
      path: '/vote',
      name: 'vote',
      component: resolve => require(['@/components/vote'],resolve)
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: resolve => require(['@/components/userInfo'],resolve)
    },
    {
      path: '/collectList',
      name: 'collectList',
      component: resolve => require(['@/components/collectList'],resolve)
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: resolve => require(['@/components/orderList'],resolve)
    },
    {
      path: '/binding',
      name: 'binding',
      component: resolve => require(['@/components/binding'],resolve)
    },
    {
      path: '/searchList',
      name: 'searchList',
      component: resolve => require(['@/components/common/searchList'],resolve)
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: resolve => require(['@/components/ranking'],resolve)
    }
  ],
  scrollBehavior(to,from,saveTop){ if(saveTop){ return saveTop; }else{ return {x:0,y:0} } },
})
