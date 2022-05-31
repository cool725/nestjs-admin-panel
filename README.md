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

If you are getting an ngcc error:
remove the postinstall skript from package.json
run (Docker) 1 & 2 again. After the build has finished.
add the postinstall skript again.

#### Local Domain

Setup two Local Domain entry

- Ubuntu and Macos:
  https://www.codegrepper.com/code-examples/shell/set+domain+name+for+localhost+ubuntu
- Windows (Till step 4):
  https://ecompile.io/blog/localhost-custom-domain-name
  C:\Windows\System32\drivers\etc

`auth.movit.local`
`business.movit.local`

#### Restart

restart docker and check if the db migration has successfully been run

#### Login

navigate to auth.movit.local
press "Unternehmen"

- password: demo

#### Migrations

When the database has been initialised run:

`npm run typeorm:run`

If you get an error, 
It means the database has not been
initialised. 
Restart the docker api, login into the database, verify if tables have been created and repeat this step again. 


#### Locales

To generate Locales data run:
`node scripts/locales.json.generator.js`

---

### Deployment

#### Branch

create new Branch with your name as prefix.

---

### FileWatching

Frontend: `npm run app:start:api-business`
Backend: `npm run api:start:api-business`

---

### Known BUGS

##### Linux memory problem on serve:

echo fs.inotify.max_user_watches=65536 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
