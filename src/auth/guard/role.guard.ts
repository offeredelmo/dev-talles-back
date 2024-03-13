import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorators';
import { Role } from 'src/common/rol.enum';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) { }


  canActivate(context: ExecutionContext,): boolean {

    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()])
    console.log(roles)

    if (!roles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    return roles.includes(user.role);

  }



}
