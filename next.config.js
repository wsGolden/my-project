const path = require('path');


const withLess = require('next-with-less');
const withTM = require('next-transpile-modules')(['antd']);
module.exports = withTM({
  // /* 这里是其他的配置选项 */
  sassOptions: {
    includePaths: [path.join(__dirname, '/app/view/styles')],
    prependData: `@import "global.scss";`
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
  }
})