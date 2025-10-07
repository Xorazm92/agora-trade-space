module.exports = {
  apps: [
    {
      name: 'inbola-server',
      cwd: './src/server',
      script: 'npm',
      args: 'start',
      instances: 2,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    },
    {
      name: 'inbola-client',
      cwd: './src/client', 
      script: 'npm',
      args: 'start',
      instances: 2,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
