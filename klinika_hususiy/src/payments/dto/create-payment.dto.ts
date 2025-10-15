import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsEnum, IsDateString, IsNumber } from "class-validator";
import { PaymentMethod, PaymentStatus } from "../../../generated/prisma";

export class CreatePaymentDto {
  @ApiProperty({ example: 87 })
  @IsInt()
  treatmentId: number;

  @ApiProperty({ example: "2025-08-05T12:00:00.000Z" })
  @IsDateString()
  payment_date: Date;

  @ApiProperty({ enum: PaymentMethod, example: PaymentMethod.CASH })
  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;

  @ApiProperty({ enum: PaymentStatus, example: PaymentStatus.COMPLETED })
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @ApiProperty({ example: 45 })
  @IsInt()
  patientId: number;

  @ApiProperty({ example: 75000 })
  @IsNumber()
  amount: number;
}
