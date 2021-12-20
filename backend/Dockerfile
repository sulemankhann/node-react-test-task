FROM node:14.18.1-alpine

WORKDIR /app

COPY /backend/package*.json ./

RUN npm install

COPY /backend .

EXPOSE 3030

CMD [ "npm", "run", "start" ]
