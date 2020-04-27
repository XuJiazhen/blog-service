import { CommentsInfoDto } from './comments.dto';
import { Document } from 'mongoose';

export interface Comments extends CommentsInfoDto, Document {}
