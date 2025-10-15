import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { DoctorModule } from "./doctor/doctor.module";
import { AdminsModule } from "./admins/admins.module";
import { AuthModule } from "./auth/auth.module";
import { AppointmentModule } from "./appointment/appointment.module";
import { PaymentModule } from "./payments/payment.module";
import { PrescriptionModule } from "./prescriptions/prescription.module";
import { MedicineModule } from "./medications/medicine.module";
import { StaffModule } from "./staff/staff.module";
import { SmartFiltersModule } from "./smart_filters/smart_filters.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    PrismaModule,
    UsersModule,
    SmartFiltersModule,
    AdminsModule,
    AuthModule,
    DoctorModule,
    PaymentModule,
    AppointmentModule,
    PrescriptionModule,
    MedicineModule,
    StaffModule,
    SmartFiltersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
