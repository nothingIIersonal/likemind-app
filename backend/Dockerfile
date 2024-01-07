FROM node:18.15.0

WORKDIR /backend

ENV PATH /backend/node_modules/.bin:$PATH

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install --silent
RUN npm install @nestjs/cli

COPY . ./

CMD ["npm", "start"]