import { Module } from '@nestjs/common';
import { Auth } from './services/auth';

@Module({
  providers: [Auth]
})
export class AuthModule {}
