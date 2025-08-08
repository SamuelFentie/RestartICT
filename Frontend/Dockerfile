# Build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Install envsubst for environment variable substitution
RUN apk add --no-cache bash

# Copy built application from build stage
COPY --from=build /app/dist/rict/browser /usr/share/nginx/html

# Copy custom nginx configuration template
COPY nginx.conf /etc/nginx/nginx.conf.template

# Create startup script
RUN echo '#!/bin/bash\n\
envsubst < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf\n\
nginx -g "daemon off;"' > /docker-entrypoint.sh && \
chmod +x /docker-entrypoint.sh

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/health || exit 1

# Start nginx with environment variable substitution
CMD ["/docker-entrypoint.sh"]
