import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ArticleInfoDto {
  @IsString()
  @ApiProperty({
    description: 'Article title.',
    example: 'This is my first article',
  })
  title: string;

  // @IsString()
  // @ApiProperty({
  //   description: 'Article keyword.',
  //   example: 'Nest.js.',
  // })
  // keyword: string;

  @IsString()
  @ApiProperty({
    description: 'Author.',
    example: 'XuJiazhen.',
  })
  author: string;

  @IsString()
  @ApiProperty({
    description: 'Date.',
    example: String(new Date().getTime()),
  })
  date: string;

  @IsString()
  @ApiProperty({
    description: 'Article introduction.',
    example: 'Powered by Node.js + Nest.js + MongoDB + Mongoose.',
  })
  summary: string;

  @IsString()
  @ApiProperty({
    description: 'Article content.',
    example: 'ASQQWASASAASZAQWQWQWSDDWQWSASASASSAQQWKJKLJHOIHJNB',
  })
  content: string;

  // metadata: ArticleMetadataDto;
}

export class ArticleMetadataDto {
  @IsNumber()
  views: number;

  @IsNumber()
  likes: number;

  @IsNumber()
  comments: number;
}
