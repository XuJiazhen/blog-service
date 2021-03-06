import * as Mongoose from 'mongoose';

export const ReplyData = new Mongoose.Schema({
  // 评论者
  author: { type: String, required: true, maxlength: 12 },

  // 被评论者
  toAuthor: { type: String, required: true, maxlength: 12 },

  // 内容
  content: { type: String, required: true, maxlength: 1000 },

  // 查询 ID
  queryId: { type: Number, required: true },

  // 请求来源类型：0 子级评论，1 父级评论

  // 被赞数
  likes: { type: Number, default: 0 },

  // 评论日期
  commentAt: { type: Number },

  // 更新日期
  updatedAt: { type: Date, default: Date.now() },
});

export const ReplyList = new Mongoose.Schema({
  id: { type: String },
  data: [ReplyData],
});

export const CommentsSchema = new Mongoose.Schema({
  // 所在文章 ID
  articleId: { type: String, required: true },

  // 评论者
  author: { type: String, required: true, maxlength: 12 },

  // 评论者邮箱
  email: { type: String, required: true, maxlength: 40 },

  // 内容
  content: { type: String, required: true, maxlength: 1000 },

  // 被赞数
  likes: { type: Number, default: 0 },

  // 发表日期
  publishedAt: { type: Number },

  // 修改日期
  updatedAt: { type: Date, default: Date.now() },

  // 评论二级回复者
  replyList: ReplyList,
});
