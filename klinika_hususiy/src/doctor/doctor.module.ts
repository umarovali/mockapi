import { forwardRef, Module } from "@nestjs/common";
import { DoctorService } from "./doctor.service";
import { DoctorController } from "./doctor.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    PrismaModule,
    JwtModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
