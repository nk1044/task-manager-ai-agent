FROM node:18-slim

WORKDIR /app

COPY package*.json .

RUN npm install

COPY src /app/src
COPY index.js /app/index.js
COPY app.js /app/app.js

EXPOSE 8001

CMD ["npm", "run", "start"]