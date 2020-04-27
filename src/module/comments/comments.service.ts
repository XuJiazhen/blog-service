import { Injectable } from '@nestjs/common';
import { CommentsInfoDto, ReplyListDto } from './comments.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comments } from './comments.interface';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('Comments') private readonly commentsModel: Model<Comments>,
  ) {}

  public async getAllComments() {
    const res = await this.commentsModel.find();
    return res;
  }

  public async createComment(commentInfo: CommentsInfoDto) {
    const res = await this.commentsModel.create(commentInfo);
    return res && { success: true };
  }

  public async updateComment(id: number, replyList: ReplyListDto) {
    const res = await this.commentsModel.findOneAndUpdate(
      { userId: id },
      replyList,
      { new: true },
    );
    return res;
  }
}
