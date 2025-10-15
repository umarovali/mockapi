import { Injectable } from "@nestjs/common";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class StaffService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createStaffDto: CreateStaffDto) {
    return this.prismaService.staff.create({
      data: {
        userId: createStaffDto.userId,
        posititon: createStaffDto.position,
        shift: createStaffDto.shift,
      },
    });
  }

  findAll() {
    return this.prismaService.staff.findMany({
      include: {
        user: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.staff.findUnique({ where: { id } });
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return this.prismaService.staff.update({
      data: updateStaffDto,
      where: { id },
    });
  }

  remove(id: number) {
    return this.prismaService.staff.delete({ where: { id } });
  }
}
