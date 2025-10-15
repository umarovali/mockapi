import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "../prisma/prisma.module";
import { UsersModule } from "../users/users.module";
import { ConfigModule } from "@nestjs/config";
import { AdminsModule } from "../admins/admins.module";
import { MailModule } from "../mail/mail.module";
import { AuthController } from "./auth.controller";
import { AuthGuard } from "../common/guards/jwt-auth.guard";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    JwtModule.register({}),
    PrismaModule,
    forwardRef(() => UsersModule),
    MailModule,
    forwardRef(() => AdminsModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard, JwtModule],
})
export class AuthModule {}
