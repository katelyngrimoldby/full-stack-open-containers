FROM node:16

WORKDIR /usr/src/app

COPY . . 

RUN npm install

ENV SECRET=sdfghjkojhugftf

CMD ["npm", "run", "dev"]