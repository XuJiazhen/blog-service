export class CommentInfoDto {
  userId: number;
  articleId: string;
  author: string;
  email: string;
  content: string;
  likes: number;
  published_at: Date;
}

export class UpdateCommentDto {}
