module.exports = {
  apps: [
    {
      name: 'atk-giat-backend',
      script: './backend/index.js',
      watch: false,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
