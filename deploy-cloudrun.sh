#!/bin/bash

# Cloud Run Deployment Script for RICT Platform
set -e

# Configuration
PROJECT_ID=${PROJECT_ID:-"your-project-id"}
REGION=${REGION:-"us-central1"}
BACKEND_SERVICE_NAME="rict-backend"
FRONTEND_SERVICE_NAME="rict-frontend"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Deploying RICT Platform to Cloud Run${NC}"
echo "Project ID: $PROJECT_ID"
echo "Region: $REGION"
echo ""

# Check if required environment variables are set
if [ -z "$MONGODB_URI" ]; then
    echo -e "${RED}❌ MONGODB_URI environment variable is required${NC}"
    exit 1
fi

if [ -z "$TELEGRAM_TOKEN" ]; then
    echo -e "${RED}❌ TELEGRAM_TOKEN environment variable is required${NC}"
    exit 1
fi

# Set the project
echo -e "${YELLOW}📋 Setting project to $PROJECT_ID${NC}"
gcloud config set project $PROJECT_ID

# Enable required APIs
echo -e "${YELLOW}🔧 Enabling required APIs${NC}"
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Build and deploy backend
echo -e "${YELLOW}🔨 Building and deploying backend...${NC}"
gcloud run deploy $BACKEND_SERVICE_NAME \
    --source Backend/nest-backend \
    --region $REGION \
    --platform managed \
    --allow-unauthenticated \
    --port 3000 \
    --memory 512Mi \
    --cpu 1 \
    --max-instances 10 \
    --set-env-vars NODE_ENV=production,PORT=3000,MONGODB_URI="$MONGODB_URI",TELEGRAM_TOKEN="$TELEGRAM_TOKEN"

# Get the backend URL
BACKEND_URL=$(gcloud run services describe $BACKEND_SERVICE_NAME --region=$REGION --format='value(status.url)')
echo -e "${GREEN}✅ Backend deployed at: $BACKEND_URL${NC}"

# Build and deploy frontend
echo -e "${YELLOW}🔨 Building and deploying frontend...${NC}"
gcloud run deploy $FRONTEND_SERVICE_NAME \
    --source Frontend \
    --region $REGION \
    --platform managed \
    --allow-unauthenticated \
    --port 80 \
    --memory 256Mi \
    --cpu 1 \
    --max-instances 10 \
    --set-env-vars BACKEND_URL="$BACKEND_URL"

# Get the frontend URL
FRONTEND_URL=$(gcloud run services describe $FRONTEND_SERVICE_NAME --region=$REGION --format='value(status.url)')
echo -e "${GREEN}✅ Frontend deployed at: $FRONTEND_URL${NC}"

echo ""
echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo ""
echo -e "${YELLOW}📊 Service URLs:${NC}"
echo "Frontend: $FRONTEND_URL"
echo "Backend: $BACKEND_URL"
echo ""
echo -e "${YELLOW}🔧 Environment Variables:${NC}"
echo "MONGODB_URI: [Set]"
echo "TELEGRAM_TOKEN: [Set]"
echo "BACKEND_URL: $BACKEND_URL"
echo ""
echo -e "${YELLOW}📝 Next steps:${NC}"
echo "1. Test the frontend at: $FRONTEND_URL"
echo "2. Test the backend API at: $BACKEND_URL/api/health"
echo "3. Configure your Telegram bot with the token"
echo "4. Set up MongoDB Atlas connection"
