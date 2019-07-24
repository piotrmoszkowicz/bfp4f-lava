FROM node:10.16.0-slim
WORKDIR /bfp4f-lava
COPY . /bfp4f-lava

RUN npm install --unsafe-perm

EXPOSE 3000
CMD [ "npm", "start" ]
