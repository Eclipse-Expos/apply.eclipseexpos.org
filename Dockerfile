FROM node:lts-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000


ENV TZ=${TZ:-America/Toronto}
RUN apk add -U tzdata
RUN cp /usr/share/zoneinfo/${TZ} /etc/localtime


RUN npm i -g prisma

RUN prisma generate

RUN npm run build

CMD ["npm", "start"]
