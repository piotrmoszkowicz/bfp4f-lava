FROM node:8
WORKDIR /bfp4f-lava
COPY . /bfp4f-lava

RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]