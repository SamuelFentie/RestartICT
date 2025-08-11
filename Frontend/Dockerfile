# Stage 1: Build Angular app
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx (Cloud Run)
FROM nginx:1.23.0-alpine
RUN apk add --no-cache bash gettext
COPY nginx.conf.template /etc/nginx/nginx.conf.template

# Copy build output and ensure correct location
COPY --from=build /app/dist /tmp/dist
RUN rm -rf /usr/share/nginx/html/* \
  && if [ -f /tmp/dist/index.html ]; then cp -r /tmp/dist/* /usr/share/nginx/html/; \
     elif [ -f /tmp/dist/browser/index.html ]; then cp -r /tmp/dist/browser/* /usr/share/nginx/html/; \
     else echo 'ERROR: index.html not found in dist' && ls -R /tmp/dist && exit 1; fi

EXPOSE 8080
CMD sh -c "envsubst '\$PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"
