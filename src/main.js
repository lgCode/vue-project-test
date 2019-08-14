// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './css/style.css'
import axios from 'axios';

//通过更改axios配置来传递跨域请求
Vue.prototype.$axios = axios;
axios.defaults.baseURL = '/api';//在config->index设置了，/api === 数据接口的别名
axios.defaults.headers.post['Content-Type'] = 'application/json';

 //添加响应拦截器
axios.interceptors.response.use(res => {
  return res.data;
});


Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
