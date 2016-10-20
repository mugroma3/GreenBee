FROM node:argon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY ./node/code/package.json /usr/src/app/
RUN npm install

COPY ./node/code /usr/src/app
EXPOSE 3000
CMD [ "bash","-c", "npm start" ]