#!/bin/bash

# Frontend-only Cloud Run Deployment Script
set -e

# Configuration
PROJECT_ID=${PROJECT_ID:-"your-project-id"}
REGION=${REGION:-"us-central1"}
FRONTEND_SERVICE_NAME="rict-frontend"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Deploying Frontend to Cloud Run${NC}"
echo "Project ID: $PROJECT_ID"
echo "Region: $REGION"
echo ""

# Check if package.json exists
if [ ! -f "Frontend/package.json" ]; then
    echo -e "${RED}❌ Frontend/package.json not found. Please check the Frontend directory.${NC}"
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

# Deploy frontend
echo -e "${YELLOW}🔨 Deploying frontend...${NC}"
gcloud run deploy $FRONTEND_SERVICE_NAME \
    --source Frontend \
    --region $REGION \
    --platform managed \
    --allow-unauthenticated \
    --port 3000 \
    --memory 512Mi \
    --cpu 1 \
    --max-instances 10

# Get the frontend URL
FRONTEND_URL=$(gcloud run services describe $FRONTEND_SERVICE_NAME --region=$REGION --format='value(status.url)')

echo ""
echo -e "${GREEN}🎉 Frontend deployment completed successfully!${NC}"
echo ""
echo -e "${YELLOW}📊 Service URL:${NC}"
echo "Frontend: $FRONTEND_URL"
echo ""
echo -e "${YELLOW}🔧 Backend Configuration:${NC}"
echo "Backend URL: https://restartict-618223024788.europe-west1.run.app"
echo ""
echo -e "${YELLOW}📝 Next steps:${NC}"
echo "1. Test the frontend at: $FRONTEND_URL"
echo "2. Verify backend connection at: https://restartict-618223024788.europe-west1.run.app/api/health"
