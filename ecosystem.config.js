module.exports = {
  apps : [{
    name: 'todo-api',
    script: 'src/app.js',
    instances: 1, // 启动实例的个数
    autorestart: true, // 程序异常error stop 自动重启
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],

};
