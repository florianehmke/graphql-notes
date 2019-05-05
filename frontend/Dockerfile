# Step 1: Build the app in image 'builder'
FROM node:11-alpine AS builder

WORKDIR /usr/src/app
COPY . .
RUN yarn install --registry https://registry.npmjs.org && yarn run build-prod

# Step 2: Use build output from 'builder'
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY --from=builder /usr/src/app/dist/graphql-notes-frontend/ .