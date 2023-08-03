FROM node:18-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .

ARG PORT=4000 
EXPOSE $PORT

CMD ["npm", "run", "start:prod"]