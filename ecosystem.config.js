module.exports = {
  apps: [
    {
      name: 'portfolio-next',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/portfolio', // 서버 내의 실제 프로젝트 경로로 변경 필요
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
