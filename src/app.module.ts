import { Module } from '@nestjs/common';
import { ArticleModule } from './module/article/article.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './module/config/config.module';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { config } from './module/config/config.service';
import { CommentsModule } from './module/comments/comments.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.MONGO_URL, {
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    ArticleModule,
    ConfigModule,
    AuthModule,
    CommentsModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
