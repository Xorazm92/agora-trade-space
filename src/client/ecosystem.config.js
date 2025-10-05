module.exports = {
  apps: [
    {
      name: 'inbola-server',
      script: './src/server/dist/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      error_file: './logs/server-error.log',
      out_file: './logs/server-out.log',
      log_file: './logs/server-combined.log',
      time: true,
      max_memory_restart: '1G'
    },
    {
      name: 'inbola-client',
      script: 'npm',
      args: 'start',
      cwd: './src/client',
      instances: 1,
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: './logs/client-error.log',
      out_file: './logs/client-out.log',
      log_file: './logs/client-combined.log',
      time: true
    }
  ]
};
