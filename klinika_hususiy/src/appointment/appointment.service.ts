import { Injectable } from "@nestjs/common";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AppointmentService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createAppointmentDto: CreateAppointmentDto) {
    return this.prismaService.appointment.create({
      data: {
        reserved_date: createAppointmentDto.reservedDate,
        status: createAppointmentDto.status,
        patient: { connect: { id: createAppointmentDto.patientId } },
        doctor: { connect: { id: createAppointmentDto.doctorId } },
      },
    });
  }

  findAll() {
    return this.prismaService.appointment.findMany({
      include: {
        patient: true,
        doctor: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.appointment.findMany({
      where: { id },
    });
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return this.prismaService.appointment.update({
      where: { id },
      data: updateAppointmentDto,
    });
  }

  remove(id: number) {
    return this.prismaService.appointment.delete({
      where: { id },
    });
  }
}
