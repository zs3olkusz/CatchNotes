FROM node:lts-alpine

WORKDIR /usr/src/web

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

RUN npm run build

# RUN rm -rf !(dist/)
RUN npm install -g serve

CMD [ "serve" "-s" "dist" ]
