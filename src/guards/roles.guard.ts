import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';

const ADMIN_JWT_SECRETKEY = 'Dotdotdot2020320900';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private getToken(req: Request): string {
    const token = req.headers['x-admin-token'];
    return token;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const token = this.getToken(request);

    if (token) {
      try {
        const decodeToken = jwt.verify(token, ADMIN_JWT_SECRETKEY);
        const role = decodeToken['username'];
        const hasRoles = roles.includes(role.toLowerCase());
        const isExpired = decodeToken['exp'] < Math.floor(Date.now() / 1000);

        if (hasRoles && !isExpired) {
          return true;
        }
      } catch (error) {
        throw new UnauthorizedException('用户信息已过期，请重新登录');
      }
    }

    return false;
  }
}
