import * as Mongoose from 'mongoose';

export const CommentsSchema = new Mongoose.Schema({
  // 一级评论 ID
  userId: { type: Number, required: true },

  // 所在文章 ID
  articleId: { type: String, required: true },

  // 评论者姓名
  author: { type: String, required: true },

  // 评论者邮箱
  email: { type: String, required: true },

  // 内容
  content: { type: String, required: true },

  // 被赞数
  likes: { type: Number, required: true },

  // 发表日期
  publishedAt: { type: Date, default: Date.now() },

  // 修改日期
  updatedAt: { type: Date, default: Date.now() },

  // 评论二级回复者
  replyList: { type: Array },
});
