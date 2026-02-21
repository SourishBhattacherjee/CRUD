FROM node:18-alpine

WORKDIR /usr/src/app

# install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# copy source
COPY . .

EXPOSE 5000

ENV PORT=5000

CMD ["node", "app.js"]
