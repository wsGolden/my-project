const withBundleAnalyzer = require('next-bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = {
  // ...
  async headers() {
    console.log(7654)
    return [
      {
        // 匹配所有 .js 文件
        source: '/:path*',
        // 设置 Cache-Control 和 Expires 标头
        headers: [
          {
            key: 'x-custom-header',
            value: 'my custom header value',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Expires',
            value: new Date(Date.now() + 31536000000).toUTCString(),
          },
        ],
      },
    ];
  },
}