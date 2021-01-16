# ql_admin(后台管理demo)

> umi + react + ts + dva + antd + egg (有待优化)

## 基础
- umi install(https://umijs.org/)
    - node -v >= v10.13.0
    - 国内源: npm i yarn tyarn -g
    - mkdir file && cd file
    - yarn create @umijs/umi-app || npx @umijs/create-umi-app
        - err: umi文件名、目录名或卷标语法不正确
            - 获取 global bin 的路径: yarn global bin
            - 去到目录下找到： create-umi-app.cmd
                - 修改： @"%~dp0\D:\yarn\node_modules\.bin\create-umi-app.cmd"   %*
                    - 去除: %~dp0\, 改为
                    - @"D:\yarn\node_modules\.bin\create-umi-app.cmd"   %*
    - 安装依赖库：tyarn
        - 使用yarn 安装包, 会报错找不到部分库，可能是部分库私有
    - 启动：tyarn start | yarn start

- umi setting
```
    - 端口配置：
        "start": "set PORT=5211&&umi dev", // window下运行
        "start-l": "PORT=5211 umi dev",    // linux下运行

        or

        .env 文件中定义
            PORT=5211
            BABEL_CACHE=none
        启动：umi dev 即可（以5211 端口启动 dev server，并且禁用 babel 的缓存）
```

## client

### 插件

- dva
```
配置开启: .umirc.ts
export default defineConfig({
  dva: {
    immer: true, // 是否启用immer以方便修改reducer
    hmr: false,  // 启用dva model的热更新
  }
});

err: "export 'connect' was not found in 'umi' 
解决：src/models下面需要有匹配的model文件，才会开启dva的功能
```

- 请求：@umijs/plugin-request

## server (Eggjs)

### 开始

```
装包： yarn
启动： yarn dev
访问： http://localhost:7001
```

### 插件

- egg-mysql
```
安装：yarn add egg-mysql --save
```

### 连接数据库：

```
config/config.${env}.js:
  exports.mysql = {
      // 单数据库信息配置
      client: {
          host: 'localhost',
          port: '3306',
          user: 'user',
          password: 'password',
          database: 'test', // 数据库名
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
      // 开启日志sql
      debug: true
  };

config/plugin.js:
  mysql: {
    enable: true,
    package: 'egg-mysql',
  }
```

### err

- Cannot read property 'get' of undefined
```
const result = await app.mysql.get('users', { id })

插件没有配置 egg-mysql
```

> 记得启动 mysql 服务，单表见根目录下：users.sql