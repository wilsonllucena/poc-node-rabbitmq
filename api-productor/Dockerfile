FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install -g 

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]