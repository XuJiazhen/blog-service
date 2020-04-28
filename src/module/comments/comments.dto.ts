export class CommentsInfoDto {
  userId: number;
  articleId: string;
  author: string;
  email: string;
  content: string;
  likes: number;
  replyList?: object[];
  publishedAt?: Date;
}

export class ReplyListDto {
  id: string;
  content: string;
  author: string;
  toAuthor: string;
  selfId: number;
}

export class UpdateCommentDto {}
