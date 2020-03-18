import { Injectable } from '@nestjs/common';
import { ConfigService } from './module/config/config.service';

@Injectable()
export class AppService {
  constructor(config: ConfigService) {
    console.log(config.MONGO_URL);
  }
}
