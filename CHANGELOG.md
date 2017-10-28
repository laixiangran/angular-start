# 2.0.0 (2017-10-28)

- 通过`ng build`的`--base-href`属性来设置`index.html`的`base路径`，[参考这里](https://github.com/angular/angular-cli/wiki/build#base-tag-handling-in-indexhtml)

- 开发环境下启用HMR（模块热更新），[参考这里）](https://github.com/angular/angular-cli/wiki/stories-configure-hmr)

- 使用三个对应`开发`、`测试`、`生产`的environment文件，npm命令分别对应`npm start`、`npm run build-test`、`npm run build-prod`

- 使用路由器实现功能模块惰性（lazy）加载，[参考这里](https://angular.cn/guide/ngmodule#用路由器实现惰性-lazy-加载)

- 通过`ng serve`的`--proxy-config`属性实现代理解决请求跨域问题（前后端开发分离），[参考这里](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md)

# 1.0.0 (2017-08-27)

- 发布初始版版本
