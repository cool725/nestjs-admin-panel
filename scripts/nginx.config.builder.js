const path = require('path');
const fs = require('fs');

const serverBlock = ({ domain, fullPath, nginxPath }) => `
server {
          listen 80; 
          server_name  ${domain}.movit.local;
          root /${nginxPath};
          location / {
            try_files $uri $uri/ /index.html?$query_string;
          }
}
`;

const config = {
  configPath: path.resolve(__dirname, '..', 'config', 'local.webserver.conf'),
  distPath: 'dist/apps/app',
  apps: ['business', 'auth'],
};

const servers = config.apps.map((appName) => ({
  nginxPath: ['var/www', appName].join('/'),
  fullPath: path.resolve(__dirname, '..', config.distPath, appName),
  domain: appName,
}));

fs.writeFileSync(
  config.configPath,
  servers.map((config) => serverBlock(config)).join(''),
  'utf8'
);
