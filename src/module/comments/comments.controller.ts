import { Controller, Post, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentInfoDto } from './comments.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  public createComment(@Body() commentInfo: CommentInfoDto) {
    this.commentsService.createComment(commentInfo);
  }
}
