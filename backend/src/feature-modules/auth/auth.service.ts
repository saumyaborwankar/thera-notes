import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { AuthDto, SingupAuthDto } from './dto/auth.dto';
import {
  AuthResponse,
  JwtPayload,
  RegisterResponse,
  Tokens,
} from './types/auth.types';
import * as argon from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { IsNull, Not, Repository } from 'typeorm';
import { User } from '../../models/user.entity';
import { UserResponse } from './dto/user.dto';
import { EmailService } from '../mailer/email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService,
  ) {}

  async signupLocal(dto: SingupAuthDto): Promise<RegisterResponse> {
    const hash = await argon.hash(dto.password);
    const verificationToken = '12321';
    const userExists = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });
    if (userExists) {
      if (userExists.isVerified) {
        return {
          message: 'Looks like you have already signed up. Try logging in.',
        };
      }
      await this.sendVerificationEmail(
        userExists.email,
        verificationToken,
        userExists.id,
      );
      return {
        message:
          "Looks like you have already signed up. We've sent you a link to verify your email.",
      };
    }

    await this.userRepository.save({
      id: uuidv4(),
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: hash,
      username: dto.username,
      verificationToken,
    });
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refreshToken);
    await this.sendVerificationEmail(user.email, verificationToken, user.id);

    return { message: 'Please check your email to verify your account.' };
  }

  async sendVerificationEmail(email: string, token: string, userId: string) {
    await this.emailService.sendVerificationEmail(email, token, userId);
  }

  async verifyEmail(token: string, userId: string): Promise<AuthResponse> {
    const userExists = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (userExists) {
      if (userExists.isVerified) {
        return;
      }
      if (userExists.verificationToken != token) {
        throw new HttpException('Please recheck the verification token', 400);
      }
      userExists.isVerified = true;
      userExists.verificationToken = null;
      await this.userRepository.save(userExists);
      const tokens = await this.getTokens(userExists.id, userExists.email);
      return { tokens, user: this.userMapper(userExists) };
    }
    throw new HttpException('No user exists.', 400);
  }

  async signinLocal(dto: AuthDto): Promise<AuthResponse> {
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon.verify(user.password, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refreshToken);

    return { tokens, user: this.userMapper(user) };
  }

  async logout(userId: string): Promise<boolean> {
    await this.userRepository.update(
      {
        id: userId,
        hashedRt: Not(IsNull()),
      },
      {
        hashedRt: null,
      },
    );
    return true;
  }

  async refreshTokens(userId: string, rt: string): Promise<AuthResponse> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refreshToken);

    return { tokens, user: this.userMapper(user) };
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.userRepository.update({ id: userId }, { hashedRt: hash });
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      username: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('AT_SECRET'),
        expiresIn: '5s',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  private userMapper(user: User): UserResponse {
    const userResponse: UserResponse = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return userResponse;
  }

  async validateAccessTokenAndGetUser(userId: string): Promise<UserResponse> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });
      if (!user || !user.hashedRt)
        throw new ForbiddenException('Access Denied');

      return this.userMapper(user);
    } catch (err) {
      return null;
    }
  }
}
