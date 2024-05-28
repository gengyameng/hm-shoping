// 商品相关接口
import request from '@/utils/request'

// 商品搜索接口
export const getProList = (params) => {
  const defaultParams = {
    sortType: null,
    sortPrice: null,
    categoryId: null,
    goodsName: null,
    page: 1
  }
  // 更新default_params
  Object.assign(defaultParams, params)
  return request.get('/goods/list', {
    params: defaultParams
  })
}

// 获取商品详情
export const getProDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

// 获取评价信息
export const getProComments = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}
