/* axios的统一配置 */
import axios from 'axios'
/* import qs from 'qs' */
import store from '../store'
import router from '../router'
import { Notification } from 'element-ui'

axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// response拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      const errorMessage = error.response.data.message;
      const errorCode = error.response.status;
      switch (error.response.status) {
        // 请求错误  拒绝访问  请求地址错误 请求超时 参数转换失败 服务器内部错误 服务未实现 网关错误 服务不可用 网关超时 http版本不支持
        case 400:
        case 403:
        case 404:
        case 408:
        case 415:
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
        case 505:
          Notification({
            title: errorCode + '错误',
            message: errorMessage
          });
          break;
        case 401: // token未授权或token授权失败
          router.push({
            path: '/',
            query: {
              redirect: router.currentRouter.fullPath
            }
          });
          break;
        default:
      }
    }
    return Promise.reject(error.response.data);
  }
);

/* export default {
  post (url, data, headers) {
    // 默认formdata
    debugger
    if (!headers) {
      headers = {
        content_type: 'application/x-www-form-undercoded;charset=UTF-8'
      };
      data = qs.stringify(data);
    }
    return axios({
      methods: 'post',
      url,
      data: data,
      headers: {
        'Content-type': headers['content_type']
        // multipart/form-data;charset=UTF-8
        // text/html;charset=UTF-8
        // application/X-www-form-unlencoded;charset=UTF-8
        // application/json;charset=UTF-8
      }
    })
  },
  get (url, params, headers) {
    // 默认json
    debugger
    if (!headers) {
      headers = {
        content_type: 'application/json;charset=UTF-8'
      }
    }
    return axios({
      method: 'get',
      url,
      params,
      headers: {
        'Content-type': headers.content_type
      }
    })
  }
} */

export default axios;
