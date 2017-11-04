# angular-start

基于[angular-cli](https://github.com/angular/angular-cli/wiki)的[Angular4.x](https://angular.cn/)起步项目，欢迎下载使用，持续维护中...

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)

[![GitHub forks](https://img.shields.io/github/forks/laixiangran/angular-start.svg?style=social&label=Fork)](https://github.com/laixiangran/angular-start/fork)
[![GitHub stars](https://img.shields.io/github/stars/laixiangran/angular-start.svg?style=social&label=Star)](https://github.com/laixiangran/angular-start)

## 实现功能

- 通过`ng build`的`--base-href`属性来设置`index.html`的`base路径`，[参考这里](https://github.com/angular/angular-cli/wiki/build#base-tag-handling-in-indexhtml)

- 开发环境下启用HMR（模块热更新），[参考这里）](https://github.com/angular/angular-cli/wiki/stories-configure-hmr)

- 使用三个对应`开发`、`测试`、`生产`的environment文件，npm命令分别对应`npm start`、`npm run build-test`、`npm run build-prod`

- 使用路由器实现功能模块惰性（lazy）加载，[参考这里](https://angular.cn/guide/ngmodule#用路由器实现惰性-lazy-加载)

- 通过`ng serve`的`--proxy-config`属性实现代理解决请求跨域问题（前后端开发分离），[参考这里](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md)

- ...

## 全局环境

```shell
Node >= 6.x
NPM >= 3.10.x
```

[下载node（npm已包含在node中）](https://nodejs.org/zh-cn/)

## 根据实际项目修改配置项

- 修改`environments`文件夹下三个环境配置文件

- 修改`package.json`中`scripts`下`build-test`及`build-prod`的`--base-href`值，该值用来修改`index.html`中`base`标签的`href`值

## 安装依赖并启动（开发环境）

本项目已启用[Hot Module Replacement（模块热更新）](https://github.com/angular/angular-cli/wiki/stories-configure-hmr)，帮助我们开发时更快的更新代码，然后查看页面效果。

```shell
npm install -g @angular-cli // 全局安装angular-cli

npm install // 安装依赖

npm start // 启动项目
```

## 请求代理

通过配置`ng serve`的`--proxy-config`属性进行请求代理 [参考这里](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md)

## 模拟请求

使用 [rap](http://rapapi.org/org/index.do) 模拟请求

## 构建

### 测试环境

```shell
npm run build-test
```

### 生产环境

```shell
npm run build-prod
```
