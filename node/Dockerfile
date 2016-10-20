FROM node:argon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Clone source code
RUN git clone -b kappaServer https://github.com/mugroma3/BioOrtoStar.git ./node/code

# Install app dependencies
COPY ./node/code/package.json /usr/src/app/
RUN npm install

COPY ./node/code /usr/src/app
EXPOSE 3000
CMD [ "bash","-c", "npm start" ]