import { Controller, Post, Body, Put, Get, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsInfoDto, ReplyListDto, LikeInfoDto } from './comments.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/api/comments')
@ApiTags('Comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get all comments.' })
  public getCommentsByArticleID(@Param('id') id: string) {
    return this.commentsService.getCommentsByArticleID(id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create comment.' })
  public createComment(@Body() commentInfo: CommentsInfoDto) {
    return this.commentsService.createComment(commentInfo);
  }

  @Put('update')
  @ApiOperation({ summary: 'Update comment.' })
  public updateComment(@Body() replyList: ReplyListDto) {
    return this.commentsService.updateComment(replyList);
  }

  @Put('like')
  @ApiOperation({ summary: 'Like comment.' })
  public likeComment(@Body() likeInfo: LikeInfoDto) {
    return this.commentsService.likeComment(likeInfo);
  }
}
