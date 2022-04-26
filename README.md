# Readme

### Configuration

#### Packages

1. `yarn install`

#### ENV Files

1. copy .env.example in the root of the project to .env
2. copy .env.example inside the apps/api/\*/src to .env

#### Docker

1. `npm run build && npm run docker:build`
2. `docker-compose up`

#### Local Domain

Setup two Local Domain entry

* Ubuntu and Macos:
  https://www.codegrepper.com/code-examples/shell/set+domain+name+for+localhost+ubuntu
* Windows:
  C:\Windows\System32\drivers\etc

Point the root folder to:

- auth.movit.local -> dist/apps/app/auth/
- business.movit.local -> dist/apps/app/business/

#### Restart

restart docker and check if the db migration has successfully been run

#### Login

navigate to auth.movit.local
press "Unternehmen"

- password: demo

---

### Development

#### Branch

create new Branch with your name as prefix.

---

### FileWatching

docs coming soon

---

### Known BUGS

##### Linux memory problem on serve:

echo fs.inotify.max_user_watches=65536 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
