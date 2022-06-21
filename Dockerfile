FROM node:16.14.0

WORKDIR /usr/app
COPY package.json .

COPY . .

