import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { Users } from './services/users';

@Module({
  controllers: [UsersController],
  providers: [Users],
})
export class UsersModule {}
