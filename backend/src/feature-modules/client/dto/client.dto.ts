import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class NewClientDetails {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsNumber()
  age: number;
}
