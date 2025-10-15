import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

@Injectable()
export class OWNERGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.admin;

    if (!user || typeof user.is_creator !== "boolean") return false;

    return user.is_creator === true;
  }
}
