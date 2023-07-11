module.exports = {
  apps: [{
    name: 'wangshuo',
    script: 'npm run next:start', // Next.js 脚本路径
    log_file: './logs/app.log', // 日志文件路径
    env: {
      NODE_ENV: 'production',
    },
  }]
}