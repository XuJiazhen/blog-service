import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AdminInfoDto {
  _id?: string;
  username?: string;
  password?: string;
  newPassword?: string;
  oldPassword?: string;
}
export class AdminDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ description: 'Username', example: 'Admin' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ description: 'Password', example: '123321' })
  password: string;
}
