import { Module } from "@nestjs/common";
import { AppointmentService } from "./appointment.service";
import { AppointmentController } from "./appointment.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
