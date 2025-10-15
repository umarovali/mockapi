import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsString } from "class-validator";
import { MedicineType } from "../../../generated/prisma";

export class CreateMedicineDto {
  @ApiProperty({ enum: MedicineType, example: MedicineType.TABLET })
  @IsEnum(MedicineType)
  type: MedicineType;

  @ApiProperty({ example: "Paracetamol" })
  @IsString()
  name: string;

  @ApiProperty({ example: "Paracetamol 500mg, Starch, Povidone" })
  @IsString()
  ingredients: string;
  @ApiProperty({ example: 2 })
  @IsInt()
  prescriptionId: number;
}
