import { Module } from '@nestjs/common';
import { ArticleModule } from './module/article/article.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/service'),
    ArticleModule,
  ],
  providers: [],
})
export class AppModule {}
