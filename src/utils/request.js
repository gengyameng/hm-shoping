// 封装 axios
import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'

const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000
})

/*
添加 Toast.loading效果
防止用户一次请求还没有回来前多次点击，发送无效请求
友好提示：用户体验会好
*/

// 配置拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 请求前打开loading，禁止背景点击（节流处理，防止多次无效触发）
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
  })
  // 如果存在token， 就在请求时携带，便于请求需要授权的接口
  const token = store.getters.userToken
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么, 默认 axios会多包装一层data,需要响应拦截器中处理
  // 处理异常情况
  const res = response.data
  if (res.status !== 200) {
    // 提示异常
    Toast(res.message)
    // 抛出异常，await只会接受成功的promise
    return Promise.reject(res.message)
  } else {
    // 关闭提示 Toast
    // Toast 默认采用单例模式，即同一时间只会存在一个 Toast
    Toast.clear()
  }
  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出
export default instance
