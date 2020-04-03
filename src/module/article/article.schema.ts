import * as Mongoose from 'mongoose';

export const ArticleSchema = new Mongoose.Schema({
  // 标题
  title: { type: String, required: true },

  // 作者
  author: { type: String, required: true },

  // 日期
  date: { type: String, default: String(Date.now) },
  // 关键字
  // keyword: { type: String, required: true },

  // 摘要
  summary: { type: String, required: true },

  // 内容
  content: { type: String, required: true },

  // 封面图片地址
  coverUrl: { type: String, required: true },
  // // 发布日期
  // releasedAt: { type: Date, default: Date.now },

  // // 更新日期
  // updatedAt: { type: Date, default: Date.now },

  // // 元数据
  // metadata: {
  //   views: { type: Number, default: 0 },
  //   likes: { type: Number, default: 0 },
  //   comments: { type: Number, default: 0 },
  // },
});
