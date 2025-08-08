# Frontend Configuration

## Backend URL Configuration

The frontend is configured with a static backend URL that points to the deployed backend service.

### Current Configuration:

- **Backend URL**: `https://restartict-618223024788.europe-west1.run.app`
- **API Endpoint**: `https://restartict-618223024788.europe-west1.run.app/api`

### How it works:

1. **Static Configuration**: The backend URL is hardcoded in both:
   - `Frontend/src/environments/environment.ts`
   - `Frontend/src/app/services/config.service.ts`

2. **API Calls**: All API calls use the static backend URL through the `AdminService`.

3. **No Environment Variables**: No need to pass backend URL as environment variables during deployment.

### Files Modified:

- `Frontend/src/environments/environment.ts` - Static API URL
- `Frontend/src/app/services/config.service.ts` - Static backend URL
- `deploy-cloudrun.sh` - Removed dynamic backend URL logic

### Deployment:

The frontend can now be deployed independently without needing to know the backend URL at build time. The backend URL is statically configured in the source code.

### To Change Backend URL:

If you need to change the backend URL, update it in:
1. `Frontend/src/environments/environment.ts`
2. `Frontend/src/app/services/config.service.ts`
3. `deploy-cloudrun.sh` (if you want to update the display message)
