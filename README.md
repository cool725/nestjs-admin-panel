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

#### Local Domain
Setup two Local Domain entry and point the root folder to:
- auth.movit.local ->
- business.movit.local ->

#### Login
navigate to auth.movit.local
- password: demo 


### Development / FileWatching
docs coming soon


---

####Known BUGS
##### Linux memory problem on serve:
echo fs.inotify.max_user_watches=65536 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
