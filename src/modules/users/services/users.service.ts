import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { SignupDto } from '../dtos/signup.dto';
import { User } from '../models/users.model';
import { SigninDto } from '../dtos/signin.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly usersModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

  public async signup(signupDto: SignupDto): Promise<User> {
    const emailExists = await this.findByEmail(signupDto.email);
    if (emailExists) {
      throw new BadRequestException('E-mail already in use');
    }

    const user = new this.usersModel(signupDto);
    return user.save();
  }

  public async signin(
    signinDto: SigninDto,
  ): Promise<{ name: string; jwtToken: string; email: string }> {
    const userExists = await this.findByEmail(signinDto.email);

    const match = await this.checkPassword(signinDto.password, userExists);
    if (!match) {
      throw new NotFoundException('Invalid credentials');
    }

    const token = await this.authService.createAccessToken(userExists._id);
    return { name: userExists.name, jwtToken: token, email: userExists.email };
  }

  public async findAll(): Promise<User[]> {
    const users = await this.usersModel.find();

    return users;
  }

  private async findByEmail(email: string): Promise<User> {
    const user = await this.usersModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('E-mail not found');
    }
    return user;
  }

  private async checkPassword(password: string, user: User): Promise<boolean> {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new NotFoundException('Password incorrect');
    }
    return match;
  }
}
