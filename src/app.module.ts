import { Module } from '@nestjs/common';
import { ArticleModule } from './module/article/article.module';

@Module({
  imports: [ArticleModule],
  providers: [],
})
export class AppModule {}
