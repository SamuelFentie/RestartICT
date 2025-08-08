# Stage 1: Build Angular app with Node 18 Alpine
FROM node:18-alpine as build

WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY ./package*.json ./

# Install dependencies
RUN npm ci

# Copy all source files
COPY . .

# Build the Angular app
RUN npm run build

# List dist folder for debug (optional)
RUN ls -la dist/

# Stage 2: Serve with nginx
FROM nginx:1.23.0-alpine

# Expose port 8080
EXPOSE 8080

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built Angular app from build stage to nginx html directory
COPY --from=build /app/dist/browser/ /usr/share/nginx/html/
