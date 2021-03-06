import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleInfoDto } from './article.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator/roles.decorator';

@Controller('/api/article')
@ApiTags('Article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @ApiOperation({ summary: 'Get all articles.' })
  public getArticles() {
    return this.articleService.getArticles();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an article by ID.' })
  public getArticleByID(@Param('id') id: string) {
    return this.articleService.getArticleByID(id);
  }

  @Post()
  @Roles('xujiazhen')
  @ApiOperation({ summary: 'Create an article.' })
  public createArticle(@Body() articleInfo: ArticleInfoDto) {
    return this.articleService.createArticle(articleInfo);
  }

  @Put(':id')
  @Roles('xujiazhen')
  @ApiOperation({ summary: 'Update an article by ID.' })
  public updateArticle(
    @Param('id') id: string,
    @Body() articleInfo: ArticleInfoDto,
  ) {
    return this.articleService.updateArticle(id, articleInfo);
  }

  @Delete(':id')
  @Roles('xujiazhen')
  @ApiOperation({ summary: 'Delete an article by ID.' })
  public deleteArticle(@Param('id') id: string) {
    return this.articleService.deleteArticle(id);
  }

  @Put('like/:id')
  @ApiOperation({ summary: 'Like Article.' })
  public likeArticle(@Param('id') id: string) {
    return this.articleService.likeArticle(id);
  }
}
