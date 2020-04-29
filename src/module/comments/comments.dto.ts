export class CommentsInfoDto {
  articleId: string;
  author: string;
  email: string;
  content: string;
  publishedAt: number;
  replyList?: ReplyListDto;
  likes?: number;
}

export class ReplyListDto {
  id?: string;
  data?: ReplyDataDto;
}

export class ReplyDataDto {
  author: string;
  toAuthor: string;
  content: string;
  queryId: number;
  commentAt: number;
  likes?: number;
}

export class LikeInfoDto {
  id: string;
  sId?: string;
  type: number;
}
