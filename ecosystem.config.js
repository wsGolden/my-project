module.exports = {
  apps: [{
    name: 'wangshuo',
    script: 'app/view/.next', // Next.js 脚本路径
    instances: 4,
    max_restarts: 7,
    args: 'start', // 启动参数
    exec_mode: 'cluster', // 使用集群模式
    instances: 'max', // 根据 CPU 核心数量启动相应数量的实例
    autorestart: true, // 自动重启进程
    env: {
      NODE_ENV: 'production',
      NODE_PORT: 8080,
      REACT_APP_ENV: 'test',
    },
  }]
}