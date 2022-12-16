FROM node:16

RUN mkdir /app
WORKDIR /app

COPY --chown=node:node . . 

RUN npm ci

USER node

CMD npm start