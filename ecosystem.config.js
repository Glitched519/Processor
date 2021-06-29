module.exports = {
  apps: [{
    name: 'processor',
    script: './src/processor.js',
    watch: false,
    time: true,
  }
  ],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': '',
      'pre-setup': ''
    }
  }
};
