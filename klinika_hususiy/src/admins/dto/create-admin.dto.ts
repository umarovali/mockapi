import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsBoolean,
  IsEmail,
  Matches,
  IsPhoneNumber,
} from "class-validator";

export class CreateAdminDto {
  @ApiProperty({ example: "Gulsanam M" })
  @IsString()
  name: string;

  @ApiProperty({ example: "+998901234567" })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: "admin@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  is_creator: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({ example: "YourSecurePassword" })
  @IsString()
  password: string;

  @ApiProperty({ example: "YourSecurePassword" })
  @IsString()
  confirm_password: string;
}
