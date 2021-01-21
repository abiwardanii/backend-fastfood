FROM node:14.15.4-slim
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 2000
CMD [ "node", "app.js" ]