import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SingupAuthDto extends AuthDto {
  @IsNotEmpty()
  @IsString()
  username: string;
}
