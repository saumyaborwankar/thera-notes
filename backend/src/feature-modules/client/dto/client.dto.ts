import { IsNotEmpty, IsString } from 'class-validator';

export class NewClientDetails {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  phoneNumber: string;
}
