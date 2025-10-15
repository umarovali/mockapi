import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import { UpdatePrescriptionDto } from "./dto/update-prescription.dto";

@Injectable()
export class PrescriptionService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPrescriptionDto: CreatePrescriptionDto) {
    const {  reason, solution } =
      createPrescriptionDto;


    const prescriptions = await this.prismaService.prescriptions.create({
      data: {
        reason,
        solution,
      },
    });

    return prescriptions;
  }

  findAll() {
    return this.prismaService.prescriptions.findMany({
      include: {
        medicines: {
          select: {
            prescription: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.prescriptions.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePrescriptionDto: UpdatePrescriptionDto) {
    return this.prismaService.prescriptions.update({
      where: { id },
      data: updatePrescriptionDto,
    });
  }

  remove(id: number) {
    return this.prismaService.prescriptions.delete({
      where: { id },
    });
  }
}
