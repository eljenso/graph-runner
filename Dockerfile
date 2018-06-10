FROM node:10-alpine

WORKDIR /graphRunner

COPY package.json package-lock.json ./
RUN npm ci --production

COPY netrunner-cards-json netrunner-cards-json
COPY cards.js resolvers.js server.js types.js ./

CMD ["node", "server.js"]
EXPOSE 3000
