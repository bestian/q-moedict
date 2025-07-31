import { boot } from 'quasar/wrappers'

// 安全的 LocalStorage 操作
const safeStorage = {
  set(key, value) {
    try {
      const dataSize = JSON.stringify(value).length
      if (dataSize > 5000000) { // 5MB 限制
        console.warn(`數據太大 (${dataSize} bytes)，跳過存儲到 LocalStorage: ${key}`)
        return false
      }
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.warn(`LocalStorage 存儲失敗 (${key}):`, error)
      return false
    }
  },

  get(key) {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.warn(`LocalStorage 讀取失敗 (${key}):`, error)
      return null
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.warn(`LocalStorage 刪除失敗 (${key}):`, error)
      return false
    }
  }
}

export default boot(({ app }) => {
  // 將安全的存儲方法添加到 Vue 實例
  app.config.globalProperties.$safeStorage = safeStorage
})

export { safeStorage }
