module.exports = {
  apps: [
    {
      name: 'pavement',
      cwd: './server',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      user: 'root',
      host: ['droopy'],
      ref: 'origin/master',
      repo: 'https://github.com/james2mid/pavement.git',
      path: '/var/www/pavement',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
}
