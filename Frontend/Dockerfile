# Stage 1: Build Angular app
FROM node:18-alpine AS build

# Set working directory to root (since your files are here)
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy everything (including src and Dockerfile) to working directory
COPY . .

# Build the Angular app (outputs to dist/browser)
RUN npm run build

# Stage 2: Serve app with Nginx
FROM nginx:1.23.0-alpine

# Expose port 8080 (or 80 if you want)
EXPOSE 8080

# Copy your custom nginx config if you have one
COPY nginx.conf /etc/nginx/nginx.conf

# Copy Angular build output from the build stage to nginx html directory
COPY --from=build /app/dist/ /usr/share/nginx/html/

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
