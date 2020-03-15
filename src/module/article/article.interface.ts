import { Document } from 'mongoose';
import { ArticleInfoDto } from './article.dto';

export interface Article extends ArticleInfoDto, Document {}
