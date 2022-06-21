import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { User } from '../models/users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly usersModel: Model<User>,
    private readonly authService: AuthService,
  ) {}
}
