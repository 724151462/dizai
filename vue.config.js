var path = require("path")
module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // // 直接覆盖变量
          // 'tabbar-item-text-color': '#fff',
          // 'tabbar-item-active-color': 'bule',
          // 'text-color': '#111',
          // 'border-color': '#eee',
          hack: `true; @import "${path.join(__dirname, "./public/vant.less")}";`,
        },
      },
    },
  },
  configureWebpack: {
    externals: {
      'AMap': 'AMap' // 高德地图配置
    }
  }
};