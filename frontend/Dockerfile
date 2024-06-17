FROM node:alpine
WORKDIR /front
ADD package*.json ./
RUN npm i
ADD . .
EXPOSE 8080
CMD npm run dev