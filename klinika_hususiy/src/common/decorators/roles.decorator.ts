import { SetMetadata } from "@nestjs/common";
import { Role } from "generated/prisma"; // Assuming this is an enum

export type AllowedRoles =
  | Role
  | "ADMIN"
  | "OWNER"
  | "OWNER"
  | "PATIENT"
  | "DOCTOR";

export const ROLES_KEY = "roles";
export const Roles = (...roles: AllowedRoles[]) =>
  SetMetadata(ROLES_KEY, roles);
