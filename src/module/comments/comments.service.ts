import { Injectable } from '@nestjs/common';
import { CommentInfoDto } from './comments.dto';

@Injectable()
export class CommentsService {
  public createComment(commentInfo: CommentInfoDto) {
    console.log(commentInfo);
  }
}
