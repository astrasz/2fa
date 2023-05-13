FROM node:18.12-alpine


WORKDIR /app

COPY ../app/package.json .
COPY ../app/package-lock.json .

RUN npm install

COPY ../app/ .

EXPOSE 5000

CMD [ "npm", "run", "dev" ]