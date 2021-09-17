import axios from 'axios'
import qs from 'qs'

var root = process.env.API_ROOT;

// axios默认配置
axios.defaults.timeout = 30000; 
axios.defaults.baseURL = root+'/wxcms3/remote-wx';//正式环境
axios.defaults.headers['Authorization'] = 'RCilBnX20oXYuA2wQ0';
//投票活动调试环境
var instance = axios.create({
    baseURL: root+'/wxcms3/iptv-activity-vote',
    timeout: 30000,
    headers: {'Authorization': 'RCilBnX20oXYuA2wQ0'}
  });
//整理数据
axios.defaults.transformRequest = function (data) {
    data = qs.stringify(data);
    return data;
};

export  {axios,instance} ;
