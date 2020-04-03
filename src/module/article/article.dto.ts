import { IsString, IsNotEmpty } from 'class-validator';
export class ArticleInfoDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  summary: string;

  @IsString()
  content: string;

  @IsString()
  @IsNotEmpty()
  coverUrl: string;

  releasedAt?: Date;

  updatedAt?: Date;
}
