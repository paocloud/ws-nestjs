import { Controller, 
         Get, 
         Post,
         Body,
         Query,
         Param,
         Delete,
         HttpCode,
         UseGuards,
         HttpException,
         HttpStatus
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiParam, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from '../services/user.service';
import { User } from '../interfaces/user.interface';
import { findUser } from '../interfaces/findUser.interface';
import { UserDto } from '../dto/user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindUserDto } from '../dto/findUser.dto';
import { ResponseSuccess, ResponseError } from '../dto/response.dto';

@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Get all user' })
    @ApiResponse({ status: 200, description: 'Found all user'})
    @ApiResponse({ status: 404, description: 'Not found any user'})
    @Get()
    async findAll(): Promise<any[]> {
        try {
            let result =  await this.userService.findAll();
            return result
        }
        catch (error){
            throw new HttpException('NOT_FOUND_USER', HttpStatus.NOT_FOUND);
        }

    }
    
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Find user by Id' })
    @ApiParam({name: "id", required: true})
    @ApiResponse({ status: 200, description: 'Found all user'})
    @ApiResponse({ status: 404, description: 'Not found any user'})
    @Get(':id')
    async findById(@Param() params) {
        try{
            let result = await this.userService.findById(params.id);
            return new ResponseSuccess("COMMON.SUCCESS", new UserDto(result));
        }
        catch(error){
            throw new HttpException('NOT_FOUND_USER', HttpStatus.NOT_FOUND);
        }
        
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiOperation({ summary: 'Add new user' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({ status: 201, description: 'The user record has been successfully created.'})
    @ApiResponse({ status: 500, description: 'Can not create new user record'})
    async saveUser(@Body() user: User) {
        let result = await this.userService.create(user);
        return result
    }


    @Post('/find')
    @ApiBody({ type: FindUserDto })
    @ApiOperation({ summary: 'Find user by id,username or email' })
    @ApiResponse({ status: 200, description: 'Found user'})
    @ApiResponse({ status: 404, description: 'Not found user'})
    @ApiResponse({ status: 400, description: 'Request not valid'})
    @HttpCode(200)
    async findUser(@Body() user: findUser) {
        if(user.findby === 'username'){
            try {
                let result = await this.userService.findByUsername(user.value);
                return new ResponseSuccess("COMMON.SUCCESS", new UserDto(result));
            }
            catch (error) {
                throw new HttpException('NOT_FOUND_THIS_USER', HttpStatus.BAD_REQUEST);
            }
        }
        else if(user.findby === 'id'){
            try {
                let result = await this.userService.findById(user.value);
                return new ResponseSuccess("COMMON.SUCCESS", new UserDto(result));
            }
            catch (error) {
                throw new HttpException('NOT_FOUND_THIS_USER', HttpStatus.BAD_REQUEST);
            }
        }
        else if(user.findby === 'email'){
            try {
                let result = await this.userService.findByEmail(user.value);
                return new ResponseSuccess("COMMON.SUCCESS", new UserDto(result));
            }
            catch (error) {
                throw new HttpException('NOT_FOUND_THIS_USER', HttpStatus.BAD_REQUEST);
            }
        }
        else {
            throw new HttpException('REQUEST_INVALID', HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @ApiParam({name: "id", required: true})
    @ApiOperation({ summary: 'Delete exist user' })
    @ApiResponse({ status: 204, description: 'Deleted this user'})
    @ApiResponse({ status: 404, description: 'Not found user'})
    async deleteById(@Param() params) {
        try {
            let result = await this.userService.removeById(params.id);
            return result
        }
        catch (error) {
            throw new HttpException('NOT_FOUND_THIS_USER', HttpStatus.NOT_FOUND);
        }
    }
}