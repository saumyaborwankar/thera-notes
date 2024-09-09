import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../models/user.entity';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from '../mailer/mail.module';
@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy],
})
export class AuthModule {}
