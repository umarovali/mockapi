import { Module } from "@nestjs/common";
import { MedicineService } from "./medicine.service";
import { MedicineController } from "./medicine.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [MedicineController],
  providers: [MedicineService],
})
export class MedicineModule {}
