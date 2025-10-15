import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { StaffShift } from "../../generated/prisma";

@Injectable()
export class SmartFiltersService {
  constructor(private readonly prisma: PrismaService) {}

  async getStaffByShift(shift: StaffShift) {
    return this.prisma.staff.findMany({
      where: { shift },
    });
  }
}
