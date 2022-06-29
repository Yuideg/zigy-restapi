FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install nodemon --save
RUN npm install casbin --save
RUN npm install jsonwebtoken
RUN npm install dotenv
RUN npm install body-parser
RUN npm i bcrypt
RUN npm install casbin@3 casbin-express-authz@2 --save
COPY . .
EXPOSE 9090
CMD ["node", "server.js"]