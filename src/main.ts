import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  app.enableCors({
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
