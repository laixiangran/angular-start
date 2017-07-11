# angular-start

This is an angular project.

## 本地环境

```shell
node -v

npm -v
```
Node >= 6.x
NPM >= 3.10.x

[下载node（npm已包含在node中）](https://nodejs.org/zh-cn/)

## 安装及启动

```shell
npm install -g @angular-cli@1.0.0

npm install

npm start
```

## index.html

在本应用中，将环境分成开发环境（dev），测试环境（test），生产环境（prod）三种，因此会有三种environment文件和index-xxx.html（xxx指代dev或者test或者prod）。

index.html是根据编译时的环境由index-xxx.html生成的。

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
