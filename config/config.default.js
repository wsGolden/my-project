/* eslint valid-jsdoc: "off" */
'use strict';

const fs = require('fs');
const path = require('path');
const dyConfig = require('../scripts/index');
// const moment = require('moment');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});



  // monogodb 连接配置
  const zkConfig = dyConfig.getData();
  console.log('[config.default] zk配置：', zkConfig);

  // monogodb 连接配置
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/wsMongo', // 本地数据禁止改名字
      // url: zkConfig.connection,
      options: {
        useUnifiedTopology: true,
        // useCreateIndex: true
      }
      // mongoose global plugins, expected a function or an array of function and options
      // plugins: [createdPlugin, [updatedPlugin, pluginOptions]],
    }
  };


  // 上传文件配置
  config.upload = {
    dir: 'public/upload' // 本地环境
  };

  // 设置cors配置
  config.cors = {
    origin: process.env.EGG_SERVER_ENV === 'dev' ? 'http://localhost:3000' : 'http://123.57.88.38',
    allowMethods: 'GET,POST',
    credentials: true,
  };
  // add your user config here
  const userConfig = {
    prefix: '/next',

    host: {
      serviceBaseUrl: 'http://127.0.0.1:7001'
    },
    site: {
      dir: path.join(__dirname, '../preview')
    },
    tempCachePath: path.join(__dirname, '../.temp'),
  };

  // 静态文件目录
  config.static = {
    // prefix: '/',
    dir: [
      {
        prefix: '/',
        dir: path.join(__dirname, '../app/public')
      },
      {
        prefix: '/preview',
        dir: userConfig.site.dir,
      },
    ]
    // maxAge: 31536000,
  };

  // 用户安全配置
  config.security = {
    csrf: {
      ignoreJSON: true,
      enable: false
    }
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks'
    }
  };
  // 日志配置
  config.logger = {
    level: 'INFO',
    appLogName: `${appInfo.name}-web.log`,
    coreLogName: 'egg-web.log',
    agentLogName: 'egg-agent.log',
    errorLogName: 'common-error.log',
    coreLogger: {
      consoleLevel: 'INFO'
    }
  };


  // aes key
  // config.aesKey = '1Zt1Hwsecgi8flg9ESI29xFz7WLvur';

  return {
    ...config,
    userConfig
  };
};

exports.development = {
  watchDirs: ['app', 'config'], // 监视的目录
  overrideDefault: true, // 覆盖默认配置
};