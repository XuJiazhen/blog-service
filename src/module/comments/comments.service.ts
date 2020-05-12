import { Injectable } from '@nestjs/common';
import { CommentsInfoDto, ReplyListDto, LikeInfoDto } from './comments.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comments } from './comments.interface';
import { ArticleService } from '../article/article.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('Comments') private readonly commentsModel: Model<Comments>,
    private readonly articleService: ArticleService,
  ) {}

  public async getCommentsByArticleID(id) {
    const res = await this.commentsModel
      .find({ articleId: id })
      .sort({ publishedAt: -1 });
    return res;
  }

  public async getCommentById(id) {
    const res = await this.commentsModel.findById(id);
    return res;
  }

  public async createComment(commentInfo: CommentsInfoDto) {
    const res = await this.commentsModel.create(commentInfo);
    return res;
  }

  public async updateComment(replyList: ReplyListDto) {
    let res = await this.commentsModel.findOneAndUpdate(
      { _id: replyList.id },
      {
        $set: { 'replyList.id': replyList.id },
        $push: { 'replyList.data': replyList.data },
      },
      { new: true },
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    res = res.replyList.data.find(comment => {
      return Object.is(comment.queryId, replyList.data.queryId);
    });
    return {
      id: replyList.id,
      data: res,
    };
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
        { _id: likeInfo.sId, 'replyList.data._id': likeInfo.id },
        { $inc: { 'replyList.data.$.likes': 1 } },
        { new: true },
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      // res = res.replyList.data.find(comment => {
      //   return Object.is(String(comment._id), String(likeInfo.id));
      // });

      return res;
    }
  }

  public async updateArticleCmtCount(id: string) {
    if (id) {
      const comments = await this.getCommentsByArticleID(id);
      const count = comments.length;
      this.articleService.updateArticleCmtCount(id, count);
    }
    return id;
  }
}
