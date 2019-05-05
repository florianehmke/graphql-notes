# BUILD
FROM node:11-alpine AS builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --network-timeout 100000
COPY . .
RUN yarn run build-prod

# RUN
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/dist/graphql-notes-frontend/ .