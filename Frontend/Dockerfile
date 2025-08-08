# Stage 1: Build Angular app
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.23.0-alpine

# Install envsubst to substitute env variables in nginx config
RUN apk add --no-cache bash gettext

# Copy the nginx config template
COPY nginx.conf.template /etc/nginx/nginx.conf.template

# Copy built Angular app
COPY --from=build /app/dist/ /usr/share/nginx/html/

# Expose port 8080 to match Cloud Run PORT
EXPOSE 8080

# Use envsubst to replace $PORT in nginx config and start nginx
CMD envsubst '$PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'
