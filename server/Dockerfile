# Use official Node.js image instead of installing manually

FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]

