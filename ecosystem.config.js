module.exports = {
  apps: [
    {
      name: 'portfolio',
      script: 'node_modules/next/dist/bin/next',
      args: 'start --port 3000',
      cwd: '/var/www/portfolio',  // 서버의 실제 경로로 변경
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
}
