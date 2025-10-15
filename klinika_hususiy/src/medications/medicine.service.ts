import { Injectable } from "@nestjs/common";
import { CreateMedicineDto } from "./dto/create-medicine.dto";
import { UpdateMedicineDto } from "./dto/update-medicine.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class MedicineService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createMedicineDto: CreateMedicineDto) {
    return this.prismaService.medicines.create({
      data: {
        type: createMedicineDto.type,
        name: createMedicineDto.name,
        ingredients: createMedicineDto.ingredients,
        prescriptionId: createMedicineDto.prescriptionId
      },
    });
  }

  findAll() {
    return this.prismaService.medicines.findMany({
      include: { prescription: true },
    });
  }

  findOne(id: number) {
    return this.prismaService.medicines.findMany({
      where: { id },
    });
  }

  update(id: number, updateMedicineDto: UpdateMedicineDto) {
    return this.prismaService.medicines.update({
      where: { id },
      data: updateMedicineDto,
    });
  }

  remove(id: number) {
    return this.prismaService.medicines.delete({
      where: { id },
    });
  }
}
