FROM node:8

WORKDIR /usr/src

ENV PATH /usr/src/node_modules/.bin:$PATH

ADD package.json /usr/src/package.json
RUN npm install
RUN npm install react-scripts@1.1.1 -g

CMD ["npm", "start"]