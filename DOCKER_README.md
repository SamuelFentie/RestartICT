# RICT Platform - Docker Setup (MongoDB Atlas)

This guide will help you run the RICT platform using Docker and Docker Compose with MongoDB Atlas.

## 🚀 Quick Start

### Prerequisites
- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)
- Telegram Bot Token
- MongoDB Atlas account and cluster

### 1. Set Up Environment
```bash
# Copy the environment template
cp env.example .env

# Edit the .env file and add your credentials
nano .env
```

### 2. Configure MongoDB Atlas
1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster (free tier is sufficient)
3. Create a database user with read/write permissions
4. Get your connection string from the Atlas dashboard
5. Update your `.env` file with the connection string

### 3. Initialize Database
```bash
# Navigate to backend directory
cd Backend/nest-backend

# Install dependencies (if not already done)
npm install

# Run the Atlas initialization script
node init-atlas.js
```

### 4. Start the Application
```bash
# Build and start all services
docker-compose up -d --build

# Or start with logs
docker-compose up --build
```

### 5. Access the Application
- **Frontend (Admin Panel)**: http://localhost
- **Backend API**: http://localhost:3000

## 📋 Services Overview

| Service | Port | Container | Description |
|---------|------|-----------|-------------|
| Frontend | 80 | rict-frontend | Angular admin dashboard |
| Backend | 3000 | rict-backend | NestJS API & Telegram bot |
| Database | - | MongoDB Atlas | Cloud database |

## 🛠️ Docker Commands

### Production
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and start
docker-compose up -d --build
```

### Development
```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# View development logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop development services
docker-compose -f docker-compose.dev.yml down
```

### Management
```bash
# Check service status
docker-compose ps

# Restart specific service
docker-compose restart backend

# View service logs
docker-compose logs backend
docker-compose logs frontend

# Access containers
docker exec -it rict-backend sh
docker exec -it rict-frontend sh
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file based on `env.example`:

```env
# Required
TELEGRAM_TOKEN=your_telegram_bot_token_here
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/rict?retryWrites=true&w=majority

# Optional (defaults shown)
NODE_ENV=production
PORT=3000
```

### MongoDB Atlas Setup
1. **Create Cluster**: Use MongoDB Atlas free tier
2. **Database Access**: Create a user with read/write permissions
3. **Network Access**: Add your IP address or use `0.0.0.0/0` for all IPs
4. **Connection String**: Copy from Atlas dashboard and update `.env` file

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Issues**
   ```bash
   # Check backend logs
   docker-compose logs backend
   
   # Verify connection string format
   # Should be: mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   ```

2. **Port Already in Use**
   ```bash
   # Check what's using the port
   lsof -i :3000
   
   # Stop conflicting services
   sudo systemctl stop <service-name>
   ```

3. **Build Failures**
   ```bash
   # Clean build cache
   docker-compose build --no-cache
   
   # Remove all containers and images
   docker-compose down --rmi all
   ```

4. **Permission Issues**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

### Health Checks
```bash
# Check service health
docker-compose ps

# Check specific service health
docker inspect rict-backend | grep Health -A 10
```

## 📊 Monitoring

### Resource Usage
```bash
# Check resource usage
docker stats

# Check disk usage
docker system df
```

### Logs
```bash
# View all logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# View specific service logs
docker-compose logs --tail=100 backend
```

## 🔄 Development Workflow

### Hot Reload
For development with hot reload:

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# Access development frontend
# http://localhost:4200
```

### Code Changes
- Backend changes will auto-reload
- Frontend changes will auto-reload
- Database changes persist in Atlas

## 🗄️ Data Management

### MongoDB Atlas Management
- **Backup**: Atlas provides automatic backups
- **Monitoring**: Use Atlas dashboard for monitoring
- **Scaling**: Atlas handles scaling automatically

### Manual Database Operations
```bash
# Connect to Atlas from your local machine
mongosh "mongodb+srv://your_username:your_password@your_cluster.mongodb.net/rict"

# Or use MongoDB Compass with your connection string
```

## 🔒 Security

### Production Considerations
- Use strong passwords for Atlas users
- Enable IP whitelist in Atlas
- Use HTTPS in production
- Set up proper firewall rules
- Use secrets management for sensitive data
- Regularly update Docker images

### Security Headers
The frontend includes security headers:
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: no-referrer-when-downgrade

## 📈 Scaling

### Scale Services
```bash
# Scale backend services
docker-compose up -d --scale backend=3

# Scale frontend services
docker-compose up -d --scale frontend=2
```

### Atlas Scaling
- Atlas automatically handles database scaling
- Upgrade your Atlas cluster as needed

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section
2. Review application logs
3. Check Docker and Docker Compose documentation
4. Check MongoDB Atlas documentation
5. Create an issue in the repository

## 📄 License

This project is licensed under the MIT License.
