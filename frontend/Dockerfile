FROM node:16-alpine as build-stage

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

FROM nginx:1.15

COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf