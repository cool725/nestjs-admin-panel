# Movit

### Configuration
#### Packages
1. `yarn install`
#### ENV Files
1. copy .env.example in the root of the project to .env
2. copy .env.example inside the apps/api/*/src to .env
#### Docker 
1. `npm run build && npm run docker:build`
2. `docker-compose up`

####BUGS
##### Linux memory problem:
echo fs.inotify.max_user_watches=65536 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
