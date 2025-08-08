# Frontend Configuration

## Backend URL Configuration

The frontend now supports dynamic backend URL configuration through environment variables. This allows the frontend to connect to the backend service when deployed to Cloud Run.

### How it works:

1. **Build Time**: The `build-inject-env.js` script reads the `BACKEND_URL` environment variable and injects it into the HTML.

2. **Runtime**: The `ConfigService` reads the backend URL from either:
   - A meta tag in the HTML head
   - A global window variable
   - Falls back to relative path `/api` if neither is available

3. **API Calls**: All API calls use the configured backend URL through the `AdminService`.

### Environment Variables:

- `BACKEND_URL`: The full URL of the backend service (e.g., `https://rict-backend-abc123-uc.a.run.app`)

### Local Development:

For local development, the frontend will use the relative path `/api` which works with the nginx proxy configuration.

### Cloud Run Deployment:

When deployed to Cloud Run, the deployment script automatically:
1. Deploys the backend first
2. Gets the backend URL
3. Passes the backend URL to the frontend build process
4. Deploys the frontend with the correct backend URL

### Fallback Behavior:

If no backend URL is configured, the frontend will use relative paths (`/api`) which works for:
- Local development with nginx proxy
- Single-container deployments
- Cases where the backend URL is not available
