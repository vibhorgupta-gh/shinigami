FROM node:8

#Working directory for the app
WORKDIR /app

#Copy package and package-lock and install dependencies
COPY package*.json app/

RUN cd app/ && npm install

#Copy source code to image
COPY . /app

#Expose server port
EXPOSE 4000

#Starting command
CMD [ "npm", "start"]