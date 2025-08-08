import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Enable CORS for frontend
  app.enableCors({
    origin: configService.get('FRONTEND_URL') || 'http://localhost:4200',
    credentials: true,
  });

  // Global prefix for API routes
  app.setGlobalPrefix('api');

  const port = configService.get('PORT') || 3000;
  await app.listen(port);
  
  console.log('🚀 RICT Admin Panel Backend Started');
  console.log(`📍 Server running on: http://localhost:${port}`);
  console.log(`🌐 API base URL: http://localhost:${port}/api`);
  console.log(`📊 MongoDB Atlas: Connected successfully`);
  console.log(`🤖 Telegram Bot: ${configService.get('TELEGRAM_BOT_TOKEN') ? 'Configured' : 'Not configured'}`);
  console.log(`🔗 Frontend URL: ${configService.get('FRONTEND_URL') || 'http://localhost:4200'}`);
  console.log('\n📝 Available endpoints:');
  console.log('   POST /api/broadcast - Send message to all users');
  console.log('   GET  /api/registration/status - Get registration status');
  console.log('   POST /api/registration/toggle - Toggle registration');
  console.log('   GET  /api/users - Get all registered users');
  console.log('   GET  /api/bot/test - Test bot status');
  console.log('\n🎯 Ready to receive requests!');
}
bootstrap();
