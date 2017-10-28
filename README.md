# angular-start

基于angular-cli的Angular 4.x 起步项目，欢迎下载使用，持续维护中...

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
npm install -g @angular-cli

npm install

npm start
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

## angular-cli配置

[.angular-cli](https://github.com/angular/angular-cli/wiki/angular-cli)
