# --- Installing stage
FROM node:10.16.3-slim AS installer

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --quiet

# ---

# Building stage
FROM installer AS builder

## Workdir is shared between the stage so let's reuse it as we neeed the packages
WORKDIR /usr/src/app

COPY ./src src
COPY tsconfig.json .
COPY tslint.json .
RUN npm run build

# ---

# Running code under slim image (production part mostly)
FROM node:10.16.3-slim

## Clean new directory
WORKDIR /app

## Setup production ENV
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

## We just need the build and package to execute the command
COPY --from=builder /usr/src/app/dist dist

EXPOSE 3000
CMD [ "npm", "start" ]
