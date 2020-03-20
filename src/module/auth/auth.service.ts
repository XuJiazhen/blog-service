import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from './auth.interface';
import { AdminDto, AdminInfoDto } from './auth.dto';
@Injectable()
export class AuthService {
  constructor(@InjectModel('Auth') private readonly authModel: Model<Auth>) {}

  public async createAdmin(admin: AdminDto) {
    return await this.authModel.create(admin);
  }

  public async findAdminInfo(adminInfo?: AdminInfoDto) {
    return await this.authModel.findOne({ ...adminInfo });
  }

  // public async updateAdminInfo() {
  //   const result = await this.authModel.findOne();
  //   return result;
  // }
}
