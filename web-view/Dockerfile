FROM node:18.15.0

WORKDIR /web-view

ENV PATH /web-view/node_modules/.bin:$PATH

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts -g --silent

COPY . ./

CMD ["npm", "start"]
