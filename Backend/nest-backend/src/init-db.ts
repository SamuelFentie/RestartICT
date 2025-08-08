import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AdminService } from './admin/admin.service';
import { ConfigService } from '@nestjs/config';

async function initializeDatabase() {
  console.log('🚀 Initializing RICT Database...\n');
  
  const app = await NestFactory.createApplicationContext(AppModule);
  const adminService = app.get(AdminService);
  const configService = app.get(ConfigService);

  try {
    console.log('📊 Checking database connection...');
    
    // Test the connection by getting registration status
    const status = await adminService.getRegistrationStatus();
    console.log('✅ Database connection successful!');
    console.log(`   Registration status: ${status.enabled ? 'Enabled' : 'Disabled'}`);
    console.log(`   Last updated: ${status.lastUpdated}`);

    // Get user count
    const users = await adminService.getRegisteredUsers();
    console.log(`   Total registered users: ${users.total}`);

    console.log('\n🎉 Database initialization completed successfully!');
    console.log('\n📝 Database is ready for:');
    console.log('   - User registration via Telegram bot');
    console.log('   - Broadcast messaging');
    console.log('   - Registration status management');
    
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Check your MONGODB_URI in .env file');
    console.log('   2. Verify your Atlas cluster is running');
    console.log('   3. Check if your IP is whitelisted in Atlas');
    console.log('   4. Ensure your database user has proper permissions');
  } finally {
    await app.close();
  }
}

initializeDatabase();
