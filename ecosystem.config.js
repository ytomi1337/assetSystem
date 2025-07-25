module.exports = {
  apps: [
    {
      name: 'backend-api',
      cwd: './backend',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
       name: 'vue-frontend',
        cwd: './frontend',
        script: 'npm',
        args: 'run start:prod',
        env: {
          NODE_ENV: 'production'
        }
    },
  ],
};