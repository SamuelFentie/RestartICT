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
COPY --from=build /app/dist/ /usr/share/nginx/html/
EXPOSE 8080
# Render config with PORT, print it, validate, then run
CMD sh -c "envsubst '\$PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf \
  && echo '--- Rendered /etc/nginx/nginx.conf ---' \
  && cat /etc/nginx/nginx.conf \
  && echo '--------------------------------------' \
  && nginx -t \
  && nginx -g 'daemon off;'"
