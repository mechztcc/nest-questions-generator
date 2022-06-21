import { Body, Controller, Inject, Post } from '@nestjs/common';
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
}
