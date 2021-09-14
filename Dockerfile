FROM node:14-alpine

WORKDIR /usr/api/authentication

COPY package.json ./

RUN npm install

EXPOSE 3333

CMD ["npm", "run", "dev"]
