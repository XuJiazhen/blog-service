import { Injectable } from '@nestjs/common';
import { CommentsInfoDto, ReplyListDto, LikeInfoDto } from './comments.dto';
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
    return res;
  }

  public async likeComment(likeInfo: LikeInfoDto) {
    if (likeInfo.type === 1) {
      const res = await this.commentsModel.findOneAndUpdate(
        { _id: likeInfo.id },
        { $inc: { likes: 1 } },
        { new: true },
      );

      return res;
    } else if (likeInfo.type === 0) {
      const res = await this.commentsModel.findOneAndUpdate(
        { _id: likeInfo.sId, 'replyList._id': likeInfo.id },
        { $inc: { 'replyList.$.likes': 1 } },
        { new: true },
      );

      return res;
    }
  }
}
