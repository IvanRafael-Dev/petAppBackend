FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4682

ENTRYPOINT [ "npm", "run"]

CMD [ "start" ]
