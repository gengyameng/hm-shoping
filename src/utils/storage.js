// 本地存储 数据持久化

const INFO_KEY = 'hm_shopping_info' // 个人信息key
const PRO_HISTORY_KEY = 'hm_search_history_key' // 搜索历史

// 获取个人信息
export const getInfo = () => {
  const defaultResult = { userId: '', token: '' }
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultResult
}

// 设置个人信息
export const setInfo = (info) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(info))
}

// 移除个人信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 获取商品搜索历史
export const getProSearchHistory = () => {
  const result = localStorage.getItem(PRO_HISTORY_KEY)
  return result ? JSON.parse(result) : []
}

// 设置商品搜索历史
export const setProSearchHistory = (arr) => {
  localStorage.setItem(PRO_HISTORY_KEY, JSON.stringify(arr))
}
