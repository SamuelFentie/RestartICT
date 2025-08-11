import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get(ConfigService);

  // Allowlist CORS (Cloud Run frontend + localhost). Add more as needed.
  const FRONTEND_URL = config.get<string>('FRONTEND_URL'); // optional
  const allowlist = [
    FRONTEND_URL,                                 // from env if set
    'http://localhost:4200',
    'http://127.0.0.1:4200',
    // your Cloud Run frontend (http/https both ok)
    'https://frontend-restartict-618223024788.europe-west1.run.app',
    'https://restartict-frontend-618223024788.europe-west1.run.app',
  ].filter(Boolean);

  app.enableCors({
    origin: (origin, cb) => {
      // allow no-origin (curl, same-origin) and any in allowlist
      if (!origin || allowlist.some(u => origin.startsWith(u))) return cb(null, true);
      return cb(new Error('Not allowed by CORS'), false);
    },
    credentials: true,
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization'],
  });

  // API prefix
  app.setGlobalPrefix('api');

  // Cloud Run requires PORT to be used (defaults to 8080)
  const port = process.env.PORT || config.get('PORT') || 8080;
  await app.listen(port);

  console.log(`✅ Backend listening on :${port} (prefix: /api)`);
}
bootstrap();
