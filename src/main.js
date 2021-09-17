// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/css/base.css'
import { Tab, Tabs, Swipe, SwipeItem,Rate,Toast,TreeSelect,Dialog,Cell,Popup  } from 'vant';
import 'vant/lib/index.css';
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css';
// import 'vue-video-player/src/custom-theme.css';
import videojs from 'video.js';
import VueLazyLoad from 'vue-lazyload';
import 'swiper/dist/css/swiper.css';
import VueAweSomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAweSomeSwiper)
//使用懒加载插件,loading参数指定加载图片的gif地址,这个gif也要放在static文件夹里
Vue.use(VueLazyLoad,{
  loading:"./assets/images/08.png"
})
window.videojs = videojs;
require('videojs-contrib-hls/dist/videojs-contrib-hls.js');//本地启动的时候屏蔽_wk
Vue.use(VideoPlayer)
Vue.use(Swipe).use(SwipeItem);
Vue.use(Tab).use(Tabs);
Vue.use(Rate).use(Cell);
Vue.use(Toast).use(Popup);
Vue.use(TreeSelect).use(Dialog);
import fastClick from 'fastclick'
//初始化FastClick实例。在页面的DOM文档加载完成后
fastClick.attach(document.body)
/* eslint-disable no-new */
//在main.js设置全局的请求次数，请求的间隙
import axios from 'axios'
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    var config = err.config;
    // If config does not exist or the retry option is not set, reject
    if(!config || !config.retry) return Promise.reject(err);

    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;

    // Check if we've maxed out the total number of retries
    if(config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err);
    }

    // Increase the retry count
    config.__retryCount += 1;

    // Create new promise to handle exponential backoff
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });

    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
        return axios(config);
    });
});
/**
  * @param {EventTarget|Element} targetElement
  */
 fastClick.prototype.focus = function(targetElement) {
    var length;
    // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
    if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month' && targetElement.type !== 'email') {
        length = targetElement.value.length;
        targetElement.focus();// 加入这一句话
        targetElement.setSelectionRange(length, length);
    } else {
        targetElement.focus();
    }
  };
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
