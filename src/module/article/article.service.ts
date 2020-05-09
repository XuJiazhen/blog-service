import { Injectable } from '@nestjs/common';
import { ArticleInfoDto } from './article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './article.interface';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
  ) {}

  public async getArticles() {
    const res = await this.articleModel.find().sort({ releasedAt: -1 });
    return res;
  }

  public async getArticleByID(id: string) {
    const res = await this.articleModel.findById(id);
    return res;
  }

  public async createArticle(articleInfo: ArticleInfoDto) {
    const res = await this.articleModel.create(articleInfo);
    return res && { success: true };
  }

  public async updateArticle(id: string, articleInfo: ArticleInfoDto) {
    const res = await this.articleModel.findByIdAndUpdate(id, articleInfo);
    return res && { success: true };
  }

  public async deleteArticle(id: string) {
    const res = await this.articleModel.findByIdAndRemove(id);
    return res && { success: true };
  }

  public async likeArticle(id: string) {
    const res = await this.articleModel.findOneAndUpdate(
      { _id: id },
      { $inc: { likes: 1 } },
      { new: true },
    );
    return res;
  }
}
