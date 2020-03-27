import { Module } from '@nestjs/common';
import { ArticleModule } from './module/article/article.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './module/config/config.module';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/service', {
      useFindAndModify: true,
      useNewUrlParser: true,
    }),
    ArticleModule,
    ConfigModule,
    AuthModule,
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
