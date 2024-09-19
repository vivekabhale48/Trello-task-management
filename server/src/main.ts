import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  console.log('Client URL:', process.env.CLIENT_URL);

  app.enableCors({
    origin: [
      'http://localhost:3000', 
      'https://www.vvainfo.life', 
      /\.vvainfo\.life$/, 
      /\.trello-task-management-xi\.vercel\.app$/,
      'https://trello-task-management-xi.vercel.app'
    ],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
  .setTitle('Cats example')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('cats')
  .build();

  const PORT = process.env.PORT
    
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(PORT);
}
bootstrap();
