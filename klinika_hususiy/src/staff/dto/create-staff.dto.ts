import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";
import { StaffShift } from "../../../generated/prisma";

export class CreateStaffDto {
  @ApiProperty({ example: 101 })
  @IsInt()
  userId: number;

  @IsString()
  shift: StaffShift;

  @IsString()
  position: string;
}
