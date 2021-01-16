/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1609395078600_5246';

  // add your middleware config here
  config.middleware = [];

  // 关闭csrf验证
  config.security = {
    csrf: {
      enable: false
    }
  }

  // 配置模板引擎
  // config.view = {
  //   mapping: {
  //     '.html': 'ejs',  // .html后缀，会自动渲染.html文件
  //   },
  // };

  // 配置公共api
  config.api = 'http://www.phonegap100.com/'

  config.mysql = {
    // 单数据库信息配置
    client: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'Aa10241026',
        // 数据库名
        database: 'demo'
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
