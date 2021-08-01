# --- Installing stage
FROM node:14-slim AS installer

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
FROM node:14-slim

## Clean new directory
WORKDIR /app

## Setup production ENV
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

## Copy config files
COPY config ./config

## Copy package jsons from installer
COPY --from=installer /usr/src/app/package*.json ./

## Copy built files from builder
COPY --from=builder /usr/src/app/dist dist

## Install only production dependencies
RUN npm install --quiet

EXPOSE 3000
CMD [ "node", "dist/app.js" ]
