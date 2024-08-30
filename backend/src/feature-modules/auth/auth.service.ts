import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { AuthDto, SingupAuthDto } from './dto/auth.dto';
import { AuthResponse, JwtPayload, Tokens } from './types/auth.types';
import * as argon from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { IsNull, Not, Repository } from 'typeorm';
import { User } from '../../models/user.entity';
import { UserResponse } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}
  // async getMe(username:string){
  //   const
  // }

  async signupLocal(dto: SingupAuthDto): Promise<AuthResponse> {
    const hash = await argon.hash(dto.password);
    await this.userRepository.save({
      id: uuidv4(),
      email: dto.email,
      password: hash,
      username: dto.username,
    });
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refreshToken);

    return { tokens, user: this.userMapper(user) };
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
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '5s',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
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
