export class CommentsInfoDto {
  userId: number;
  articleId: string;
  author: string;
  email: string;
  content: string;
  likes: number;
  replyList?: object[];
}

export class ReplyListDto {
  content: string;
  author: string;
  userId: number;
  selfId: number;
}

export class UpdateCommentDto {}
