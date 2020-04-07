import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { config } from './module/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // use global pipes to validate
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // config swagger-ui
  const options = new DocumentBuilder()
    .setTitle('Blog API Docs.')
    .setDescription('The Blog API description.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  // 开启跨域
  app.enableCors({
    credentials: true,
  });

  // 使用 Helmet 设置安全相关的 HTTP 头
  app.use(helmet());

  // 开启限速
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  const currentPort =
    process.env.NODE_ENV === 'development' ? config.APP_PORT : 80;

  await app.listen(currentPort);
}
bootstrap();
