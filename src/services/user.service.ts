import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';

import { isValidEmail } from '../utils/isvalidemail.util';

const saltRounds = 10

@Injectable()
export class UserService {
  constructor(
    @InjectModel('users') private readonly userModel: Model<User>
    ) { }

  async findAll(): Promise<User[]> {
    let result = await this.userModel.find().exec();
    if(!result){
      throw new HttpException('NOT_FOUND_ANY_USER', HttpStatus.NOT_FOUND);
    }
    return result
  }

  async findById(id: string): Promise<User> {
      let result =  await this.userModel.findOne({ _id: id }).exec();
      if(!result){
        throw new HttpException('NOT_FOUND_THIS_USER', HttpStatus.NOT_FOUND);
      }
      return result
  }

  async findByUsername(username: string): Promise<User> {
    let result =  await this.userModel.findOne({username: username}).exec();
    if(!result){
      throw new HttpException('NOT_FOUND_THIS_USER', HttpStatus.NOT_FOUND);
    }      
    return result
  }

  async findByEmail(email: string): Promise<User> {
    let result =  await this.userModel.findOne({email: email}).exec();
    if(!result){
      throw new HttpException('NOT_FOUND_THIS_USER', HttpStatus.NOT_FOUND);
    }
    return result
  }
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    if(createUserDto.username && createUserDto.password && isValidEmail(createUserDto.email)){
      let userRegistered = await this.userModel.findOne({username: createUserDto.username}).exec();
      let emailRegistered = await this.userModel.findOne({email: createUserDto.email}).exec();

      if(userRegistered){
        throw new HttpException('REGISTRATION.USER_ALREADY_REGISTERED', HttpStatus.BAD_REQUEST);
      }
      else if (emailRegistered) {
        throw new HttpException('REGISTRATION.EMAIL_ALREADY_REGISTERED', HttpStatus.BAD_REQUEST);
      }
      else {
        createUserDto.password = await bcrypt.hashSync(createUserDto.password, saltRounds);
        let createdUser = await this.userModel(createUserDto);
        return createdUser.save();
      }
    }
    else {
      throw new HttpException('REGISTRATION.MISSING_MANDATORY_PARAMETERS', HttpStatus.BAD_REQUEST);
    }
  }
  
  async removeById(id) {
        try {
          let result = await this.userModel.remove({ _id: id }).exec();
          return result;
        }
        catch (error) {
          throw new HttpException('CAN_NOT_DELETE_THIS_USER', HttpStatus.INTERNAL_SERVER_ERROR);
        }
   }
}
