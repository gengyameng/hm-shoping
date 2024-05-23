module.exports = {
  plugins: {
    // 项目中的 vm 适配 自动将 px 转换为 vm
    'postcss-px-to-viewport': {
      // vm 适配的标准屏的宽度 iPhone X
      // 设计图 750， 调成 1倍 =》适配 375 标准屏幕
      // 设计图 640 调成 1倍 =》适配 320 标准屏幕
      viewportWidth: 375
    }
  }
}
