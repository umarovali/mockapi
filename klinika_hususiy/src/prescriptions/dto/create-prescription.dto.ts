import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, IsBoolean } from "class-validator";

export class CreatePrescriptionDto {
  @ApiProperty({ example: "Persistent headache due to sinus infection" })
  @IsString()
  reason: string;

  @ApiProperty({ example: "Prescribed antihistamines and rest" })
  @IsString()
  solution: string;

}
