import { Injectable } from "@nestjs/common";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class DoctorService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createDoctorDto: CreateDoctorDto) {
    return this.prismaService.doctor.create({
      data: {
        userId: createDoctorDto.userId,
        specialty: createDoctorDto.specialization,
        experience: createDoctorDto.experience,
        hired_date: new Date(createDoctorDto.hired_date),
        gender: createDoctorDto.gender,
      },
    });
  }

  findAll() {
    return this.prismaService.doctor.findMany({
      include: {
        appointment: true,
        user: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.doctor.findUnique({ where: { id } });
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return this.prismaService.doctor.update({
      data: updateDoctorDto,
      where: { id },
    });
  }

  remove(id: number) {
    return this.prismaService.doctor.delete({ where: { id } });
  }
}
