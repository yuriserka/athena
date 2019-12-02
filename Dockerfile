FROM node:12
WORKDIR /app
COPY . /app
EXPOSE 8083

WORKDIR /app/front/
RUN yarn install
RUN yarn build

WORKDIR /app/api/
RUN yarn install
RUN yarn start
