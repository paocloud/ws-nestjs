import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { User } from '../interfaces/user.interface';

@Injectable()
export class AuthService {
	constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
		private readonly jwtService: JwtService
	) {}
  
	async validateUser(username: string, password: string): Promise<any> {
    	const userFromDb = await this.userModel.findOne({username: username});

      if(!userFromDb) throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);
      
      const isValidPass = await bcrypt.compare(password, userFromDb.password);
	  //const isValidPass = true;
      if (userFromDb && isValidPass) {
      		return userFromDb;
    	}
    	return null;
  	  }
    
  	async login(user: any) {
    	const payload = { username: user.username, sub: user._id };
    	return {
      		access_token: this.jwtService.sign(payload),
    	};
  	}
    
}
