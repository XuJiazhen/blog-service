import { Module } from '@nestjs/common';
import { ArticleModule } from './module/article/article.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './module/config/config.module';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/service'),
    ArticleModule,
    ConfigModule,
  ],
  providers: [AppService],
})
export class AppModule {}
