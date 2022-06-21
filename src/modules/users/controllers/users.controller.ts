import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SigninDto } from '../dtos/signin.dto';
import { SignupDto } from '../dtos/signup.dto';
import { User } from '../models/users.model';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  public async signup(@Body() signupDto: SignupDto): Promise<User> {
    return this.usersService.signup(signupDto);
  }

  @Post('signin')
  public async signin(@Body() signinDto: SigninDto): Promise<any> {
    return this.usersService.signin(signinDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  public async index(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
