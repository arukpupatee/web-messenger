FROM node:8

WORKDIR /usr/src

RUN npm install --global nodemon

ADD package.json /usr/src/package.json
RUN npm install

CMD ["nodemon","--legacy-watch"]