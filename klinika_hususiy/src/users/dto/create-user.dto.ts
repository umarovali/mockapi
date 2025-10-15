import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsInt,
  ValidateIf,
} from "class-validator";
import { Gender, Role, StaffShift } from "../../../generated/prisma";

export class CreateUserDto {
  @IsString()
  full_name: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  confirm_password: string;

  @IsOptional()
  @IsString()
  hashed_refresh_token?: string;

  gender: Gender;

  @IsDateString()
  birth_date: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  role: Role;

  activation_link?: string;

  @ValidateIf((o) => o.role === "DOCTOR")
  @IsString()
  specialization: string;

  @ValidateIf((o) => o.role === "DOCTOR")
  @IsInt()
  experience: number;

  @ValidateIf((o) => o.role === "DOCTOR")
  @IsDateString()
  hired_date: string;

  @ValidateIf((o) => o.role === "DOCTOR")
  @IsInt()
  clinicId: number;

  @ValidateIf((o) => o.role === "STAFF")
  @IsString()
  shift: StaffShift;

  @ValidateIf((o) => o.role === "STAFF")
  @IsInt()
  position: string;
}
