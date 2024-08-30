import { IsNotEmpty, IsString } from 'class-validator';

export class NewNoteDetails {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  clientId: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
