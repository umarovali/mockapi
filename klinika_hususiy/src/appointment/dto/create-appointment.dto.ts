import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsInt } from "class-validator";
import { AppointmentStatus } from "../../../generated/prisma";

export class CreateAppointmentDto {
  @ApiProperty({ example: 3 })
  @IsInt()
  patientId: number;

  @ApiProperty({ example: "2025-08-05T14:30:00.000Z" })
  @IsDateString()
  reservedDate: Date; 

  @ApiProperty({ example: 7 })
  @IsInt()
  doctorId: number;

  @ApiProperty({ enum: AppointmentStatus, example: AppointmentStatus.PENDING })
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;
}
