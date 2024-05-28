// 分类接口
import request from '@/utils/request'

export const getCategoryData = () => {
  return request.get('/category/list')
}
