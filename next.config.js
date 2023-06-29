const path = require('path');

const withLess = require('next-with-less');
const withTM = require('next-transpile-modules')(['antd']);
module.exports = withTM(withLess({
  /* 这里是其他的配置选项 */
  lessLoaderOptions: {
    /* 这里是你的 less-loader 选项 */
  },
  webpack: (config, options) => {
    
    config.resolve.alias['@'] = path.resolve(__dirname, 'app/view');
    config.resolve.alias['@pages'] = path.resolve(__dirname, 'app/view/pages/*');
    config.resolve.alias['@view/utils'] = path.resolve(__dirname, 'app/view/common/utils');
    return config
  }
}))