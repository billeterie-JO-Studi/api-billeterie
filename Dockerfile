FROM node:lts-alpine

WORKDIR /app

COPY . . 

RUN npm install --production --ignore-scripts

# change default user
RUN adduser -D studi
USER studi

EXPOSE 3000

CMD ["node", "bin/www"]

