const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/mini-project/" : "/",
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/css/variables.scss";
         `,
      }
    }
  }
})
