export class CommentsInfoDto {
  articleId: string;
  author: string;
  email: string;
  content: string;
  replyList?: ReplyListDto;
  likes?: number;
}

export class ReplyListDto {
  id: string;
  author: string;
  toAuthor: string;
  content: string;
  likes?: number;
}

export class LikeInfoDto {
  id: string;
  sId?: string;
  type: number;
}

export class UpdateCommentDto {}
