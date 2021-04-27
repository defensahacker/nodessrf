FROM node:latest
WORKDIR /usr/src/app
COPY package.json .
RUN npm install --production --save
COPY server.js .
RUN ls -la
EXPOSE 8080
CMD [ "node", "server.js" ]
