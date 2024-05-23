// 封装 axios
import axios from 'axios'
import { Toast } from 'vant'

const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000
})

// 配置拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
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
  console.log(res)
  if (res.status !== 200) {
    // 提示异常
    Toast(res.message)
    // 抛出异常，await只会接受成功的promise
    return Promise.reject(res.message)
  }
  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出
export default instance
