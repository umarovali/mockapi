import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from "@nestjs/common";

@Injectable()
export class AdminSelfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const admin = request.admin;
    const paramId = Number(request.params.id);

    console.log({ adminId: admin?.id, isCreator: admin?.is_creator, paramId });

    if (!admin) {
      throw new ForbiddenException("No admin authenticated.");
    }

    if (admin.is_creator) {
      return true;
    }

    if (Number(admin.id) === paramId) {
      return true;
    }

    throw new ForbiddenException("You can only access your own data.");
  }
}
