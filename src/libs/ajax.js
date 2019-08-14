import axios from 'axios';
/* 通过新建一个axios对象来传递跨域请求 */
const baseURL = '/api';//统一接口地址前缀;


//使用axios跨域
const Ajax = axios.create({ // 使用create创建了一个实例对象
    //   timeout: 1000 * 600,    // 请求超时时间(毫秒)
    //   withCredentials: true,  // 是否携带cookie信息
      headers: {             
          'Content-Type' : 'application/json; charset=utf-8'
      },      
      baseURL: baseURL        // 请求的接口地址ip + 端口号
  });

  //添加响应拦截器
  Ajax.interceptors.response.use(res => {
    return res.data;
  });
/*     //开发和生产环境下api请求
  if(process.env.NODE_ENV === 'development') {
    // 开发环境
  } else if(process.env.NODE_ENV === 'production') {
    // 生产环境
    config.baseURL = "http://www.baidu.com";   //这里是线上api请求地址
  } */ 

  export default Ajax;