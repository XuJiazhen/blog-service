import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 使用全局 Pipes 进行验证
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // 配置 Swagger-UI
  const options = new DocumentBuilder()
    .setTitle('Blog API Docs.')
    .setDescription('The Blog API description.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
