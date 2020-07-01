import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../services/user.service';
//import { User } from '../auth/entity/user.entity';

@Injectable()
export class WsGuard implements CanActivate {

  constructor(private userService: UserService) {
  }

  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    //const bearerToken = context.args[0].handshake.headers.authorization.split(' ')[1];
    try {
      //const decoded = jwt.verify(bearerToken, jwtConstants.secret) as any;
      //console.log(bearerToken);
      return true
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
}