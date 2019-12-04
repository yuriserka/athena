FROM node:12.13
# mkdir /app && cd /app -> dentro do container
RUN mkdir /app
WORKDIR /app
#COPY <dir> <docker_dir>
COPY . .
RUN yarn install
