// 地址相关

import request from '@/utils/request'

// 获取收获地址列表
export const getAddressList = () => {
  return request.get('/address/list')
}

// 添加收获地址
/*
form: {
  name: '',
  phone: '',
  region: [{value:'',label: ''}],
  detail: ''
}
*/
export const addAddress = (params) => {
  return request.post('/address/add', {
    form: { ...params }
  })
}
