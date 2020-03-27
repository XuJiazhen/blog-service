import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminDto } from './auth.dto';
import { md5Decode, createToken } from 'src/utils/auth';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login' })
  public async login(@Body() adminInfo: AdminDto) {
    // encoded admin info
    const admin = await this.authService.findAdminInfo({
      username: adminInfo.username,
    });
    if (admin) {
      if (md5Decode(adminInfo.password) === admin.password) {
        // if the admin user exists and the password is correct
        // then give him a token
        const token = createToken({ username: adminInfo.username });
        return { token };
      } else {
        throw new UnauthorizedException('Please enter the correct password.');
      }
    } else {
      throw new UnauthorizedException('Account does not exist.');
    }
  }
}
