import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitando CORS:
  app.enableCors({
    origin: 'http://localhost:3001', // ou '*'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
 
  await app.listen(3000);
}
bootstrap();
