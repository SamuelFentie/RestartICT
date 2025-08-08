# Stage 1: Build Angular app
FROM node:18-alpine AS build

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the project files
COPY . .

# Build Angular app with production config
RUN npm run build -- --configuration=production

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy your custom nginx config (adjust path as needed)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built Angular app from build stage to nginx html folder
COPY --from=build /usr/src/app/dist/browser/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
