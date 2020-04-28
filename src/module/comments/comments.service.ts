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

  public async getCommentsByArticleID(id) {
    const res = await this.commentsModel
      .find({ articleId: id })
      .sort({ publishedAt: -1 });
    return res;
  }

  public async createComment(commentInfo: CommentsInfoDto) {
    const res = await this.commentsModel.create(commentInfo);
    return res;
  }

  public async updateComment(replyList: ReplyListDto) {
    const res = await this.commentsModel.findOneAndUpdate(
      { _id: replyList.id },
      { $push: { replyList: replyList } },
      { new: true },
    );
    console.log(replyList);

    return res;
  }
}
