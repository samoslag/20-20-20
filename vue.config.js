const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/20-20-20/' : '/',
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";'
      }
    }
  }
})
