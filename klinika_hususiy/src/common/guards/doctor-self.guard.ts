import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class DoctorSelfGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const doctorIdFromUser = request.user?.id;
    const doctorIdFromParams = parseInt(request.params.id);

    // Optional: Fetch doctor from DB for deeper verification
    const doctor = await this.prisma.doctor.findUnique({
      where: { id: doctorIdFromParams },
    });

    if (!doctor || doctor.id !== doctorIdFromUser) {
      throw new ForbiddenException(
        "Access denied: You can only access your own doctor profile"
      );
    }

    return true;
  }
}
