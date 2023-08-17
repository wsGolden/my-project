const path = require('path');

const withLess = require('next-with-less');
const withTM = require('next-transpile-modules')(['antd']);
const isProd = process.env.NODE_ENV === 'production';
const env = {
  dev: {
    serverPort: '7001',
    serverUrl: 'http://127.0.0.1',
    serverServiceBaseUrl: 'http://127.0.0.1:7001',
    serviceBaseUrl: 'http://127.0.0.1:7001',
  },
  production: {
    serverUrl: 'http://101.43.185.170',
    serverServiceBaseUrl: 'http://101.43.185.170:7001',
    serviceBaseUrl: 'http://101.43.185.170:7001' // 域名
  }
};
const currentEnv = !isProd
  ? 'dev'
  : 'production'
module.exports = withTM({
  // /* 这里是其他的配置选项 */
  sassOptions: {
    includePaths: [path.join(__dirname, '/app/view/styles')],
    prependData: `@import "global.scss";`
  },
  env: {
    ...env[currentEnv],
    currentEnv
  },

  webpack: (config, options) => {
    config.module.rules.push({
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      loader: require.resolve('url-loader'),
      options: {
        // limit: 10000,
        name: 'static/media/[name].[hash:8].[ext]'
      }
    }, {
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config
  },
  images: {
    domains: ['101.43.185.170', 'localhost', '127.0.0.1'],
  },
  publicRuntimeConfig: {
    BaseUrl:
      process.env.NODE_ENV === "development"
        ? "http://127.0.0.1:7001"
        : "http://101.43.185.170:7001"
  }
})