import { Module, OnModuleInit } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './auth.schema';
import { md5Decode } from 'src/utils/auth';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements OnModuleInit {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  private async adminInit() {
    const auth = await this.authService.findAdminInfo({
      username: this.config.DEFAULT_USERNAME,
    });

    if (!auth) {
      const username = this.config.DEFAULT_USERNAME;
      const password = md5Decode(this.config.DEFAULT_PWD);

      await this.authService.createAdmin({ username, password });
    }
  }

  public onModuleInit() {
    this.adminInit();
  }
}
