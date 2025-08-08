# Frontend Configuration

## Development Server Setup

The frontend runs using Angular's development server (`ng serve`) on port 3000.

### Current Configuration:

- **Backend URL**: `https://restartict-618223024788.europe-west1.run.app`
- **API Endpoint**: `https://restartict-618223024788.europe-west1.run.app/api`
- **Frontend Port**: 3000
- **Server**: Angular Development Server (ng serve)

### How it works:

1. **Development Server**: The frontend runs using `ng serve` with:
   - Host: `0.0.0.0` (accessible from outside the container)
   - Port: `3000`
   - Live reload enabled

2. **Static Configuration**: The backend URL is hardcoded in both:
   - `Frontend/src/environments/environment.ts`
   - `Frontend/src/app/services/config.service.ts`

3. **API Calls**: All API calls use the static backend URL through the `AdminService`.

### Docker Configuration:

- **Base Image**: `node:18-alpine`
- **Port**: 3000
- **Command**: `npm start -- --host 0.0.0.0 --port 3000`
- **Health Check**: `http://localhost:3000`

### Deployment:

The frontend is deployed as a development server, which means:
- No build step required
- Live reload capabilities
- Faster deployment
- Development-friendly setup

### To Deploy:

```bash
# Set your project ID
export PROJECT_ID="your-gcp-project-id"
export REGION="us-central1"

# Deploy frontend only
./deploy-frontend-only.sh
```

### To Change Backend URL:

If you need to change the backend URL, update it in:
1. `Frontend/src/environments/environment.ts`
2. `Frontend/src/app/services/config.service.ts`
