FROM node:12.7.0-alpine

WORKDIR '/app/backend'

RUN npm install -g nodemon

COPY package.json /back

RUN npm install

COPY . /back

EXPOSE 8080

CMD nodemon bin/server
