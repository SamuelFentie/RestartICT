FROM node:16-alpine3.16 as build

WORKDIR /app

# Copy package.json and package-lock.json files to working directory
COPY ./package*.json ./ 

# Install dependencies
RUN npm ci

# Copy all other source files
COPY . .

# Build the Angular app
RUN npm run build

FROM nginx:1.23.0-alpine

# Expose port 8080
EXPOSE 8080

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built app from build stage
COPY --from=build /app/dist/tester/ /usr/share/nginx/html/
