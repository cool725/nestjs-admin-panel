FROM node:16.14-alpine3.14 AS development
WORKDIR /usr/src/app/
COPY dist/apps/api/ .
COPY package.json .
COPY scripts/package.slicer.js .
COPY scripts/ecosystem.config.js ./scripts
RUN node package.slicer.js
#RUN npm i --production --ignore-scripts
RUN npm i --g nodemon
RUN npm i --g pm2
RUN npm i tslib