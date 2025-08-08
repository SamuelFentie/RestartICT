# Simple nginx server for pre-built Angular app
FROM nginx:alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Copy the pre-built Angular app from dist folder
COPY dist/rict/browser /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
