# RICT Platform - Cloud Run Deployment

## Quick Start

1. **Set environment variables:**
```bash
export PROJECT_ID="your-project-id"
export MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/rict"
export TELEGRAM_TOKEN="your_bot_token"
export REGION="us-central1"
```

2. **Deploy using the script:**
```bash
chmod +x deploy-cloudrun.sh
./deploy-cloudrun.sh
```

## Manual Deployment

### Deploy Backend
```bash
gcloud run deploy rict-backend \
    --source Backend/nest-backend \
    --region $REGION \
    --platform managed \
    --allow-unauthenticated \
    --port 3000 \
    --memory 512Mi \
    --cpu 1 \
    --set-env-vars NODE_ENV=production,MONGODB_URI="$MONGODB_URI",TELEGRAM_TOKEN="$TELEGRAM_TOKEN"
```

### Deploy Frontend
```bash
BACKEND_URL=$(gcloud run services describe rict-backend --region=$REGION --format='value(status.url)')

gcloud run deploy rict-frontend \
    --source Frontend \
    --region $REGION \
    --platform managed \
    --allow-unauthenticated \
    --port 80 \
    --memory 256Mi \
    --cpu 1 \
    --set-env-vars BACKEND_URL="$BACKEND_URL"
```

## Prerequisites
- Google Cloud CLI installed and configured
- MongoDB Atlas cluster
- Telegram bot token
- Billing enabled on Google Cloud project
