FROM node:18-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .

ARG PORT=4000 
EXPOSE $PORT

RUN npm run build
CMD ["npm", "run", "start:prod"]