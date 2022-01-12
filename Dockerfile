FROM node:12.13.0-alpine
WORKDIR /app
COPY package.json /app
run npm install
COPY . /app
CMD npm start
EXPOSE 8081

