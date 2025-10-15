import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsDateString, IsEnum, IsString } from "class-validator";
import { Gender } from "../../../generated/prisma";

export class CreateDoctorDto {
  @ApiProperty({ example: 101 })
  @IsInt()
  userId: number;

  @ApiProperty({ example: "Cardiology" })
  @IsString()
  specialization: string;

  @ApiProperty({ example: 12 })
  @IsInt()
  experience: number;

  @ApiProperty({ example: "2020-03-01T09:30:00.000Z" })
  @IsDateString()
  hired_date: string;

  @ApiProperty({ enum: Gender, example: Gender.FEMALE })
  @IsEnum(Gender)
  gender: Gender;
}
