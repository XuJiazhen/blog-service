import { Module, OnModuleInit } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './auth.schema';
import { md5Decode } from 'src/utils/auth';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements OnModuleInit {
  constructor(private readonly authService: AuthService) {}

  private async adminInit() {
    const auth = await this.authService.findAdminInfo({ username: 'Admin' });

    if (!auth) {
      const password = md5Decode('123321');

      await this.authService.createAdmin({ username: 'Admin', password });
    }
  }

  public onModuleInit() {
    this.adminInit();
  }
}
