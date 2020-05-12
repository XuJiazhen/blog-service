import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsSchema } from './comments.schema';
import { ArticleModule } from '../article/article.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comments', schema: CommentsSchema }]),
    ArticleModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
