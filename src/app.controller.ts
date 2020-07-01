import { Controller, Request, Post, Get, UseGuards, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserLoginDto } from '../src/dto/login.dto';

@Controller('')
export class AppController {
  constructor(
  	private readonly appService: AppService,
  	private readonly authService: AuthService
  ) {}

  @ApiOperation({ summary: 'Return home api endpoint' })
  @ApiResponse({ status: 200, description: 'Return home api endpoint'})
  @Get()
  @HttpCode(200)
  getHello(): object {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login and get your personal info' })
  @ApiResponse({ status: 200, description: 'Return personal info'})
  @ApiResponse({ status: 401, description: 'Unauthoriz'})
  @ApiBody({ type: UserLoginDto })
  async login(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login/jwt')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login and get your JWT token' })
  @ApiResponse({ status: 200, description: 'Return user jwt token'})
  @ApiResponse({ status: 401, description: 'Unauthoriz'})
  @ApiBody({ type: UserLoginDto })
  async loginJwt(@Request() req) { 
    return this.authService.login(req.user);
  }
  
}
