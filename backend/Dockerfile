FROM --platform=linux/arm64 node:18

WORKDIR /backend

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

CMD [ "yarn", "start:dev" ]