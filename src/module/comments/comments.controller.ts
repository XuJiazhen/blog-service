import { Controller, Post, Body, Put, Param, Get } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsInfoDto, ReplyListDto } from './comments.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('comments')
@ApiTags('Comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get all comments.' })
  public getAllComments() {
    return this.commentsService.getAllComments();
  }

  @Post('create')
  @ApiOperation({ summary: 'Create comment.' })
  public createComment(@Body() commentInfo: CommentsInfoDto) {
    return this.commentsService.createComment(commentInfo);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update comment.' })
  public updateComment(
    @Param('id') id: number,
    @Body() replyList: ReplyListDto,
  ) {
    return this.commentsService.updateComment(id, replyList);
  }
}
