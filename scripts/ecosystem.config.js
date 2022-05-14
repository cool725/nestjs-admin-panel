module.exports = {
  apps: [
    {
      name: 'api-auth',
      script: 'dist/apps/api/auth/main.js',
      watch: ['dist/apps/api/auth/**/*'],
      ignore_watch: '*.ts',
      watch_options: {
        usePolling: true,
        alwaysStat: true,
      },
    },
    {
      name: 'api-business',
      script: 'dist/apps/api/business/main.js',
      watch: ['dist/apps/api/business/**/*'],
      ignore_watch: '*.ts',
      watch_options: {
        usePolling: true,
        alwaysStat: true,
      },
    },
  ],
};
