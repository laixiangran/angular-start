# angular-start

This is an angular project.

## 本地环境

```shell
Node >= 6.x
NPM >= 3.10.x
```

[下载node（npm已包含在node中）](https://nodejs.org/zh-cn/)

## 根据实际项目修改配置项

- 修改`environments`文件夹下三个环境配置文件

- 修改`package.json`中`scripts`下`build-test`及`build-prod`的`--base-href`值，该值用来修改`index.html`中`base`标签的`href`值

## 安装及启动（开发环境）

```shell
npm install -g @angular-cli

npm install

npm start
```

## 请求代理

通过配置`ng serve`的`--proxy-config`进行请求代理 [参考这里](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md)

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

## 编译配置

[.angular-cli](https://github.com/angular/angular-cli/wiki/angular-cli)
