/* axios封装 */
import axios from 'axios';

//基本配置
const Util = {
  imgPath: 'http://127.0.0.1:8011/img/',
  apiPath: 'http://127.0.0.1:8010/',
};



//Ajax通用配置
Util.ajax = axios.create({
  baseURL: Util.apiPath
});
//添加响应拦截器
Util.ajax.interceptors.response.use(res => {
  return res.data;
});

export default Util;
