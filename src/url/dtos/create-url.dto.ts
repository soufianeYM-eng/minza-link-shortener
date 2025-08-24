import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export default class CreateUrlDto {
  @IsString()
  @IsNotEmpty()
  long: string;

  @IsDateString()
  @IsNotEmpty()
  expirationDate: string;
}
