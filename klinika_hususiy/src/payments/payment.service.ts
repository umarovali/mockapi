import { Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { PrismaService } from "../prisma/prisma.service";
import { connect } from "http2";

@Injectable()
export class PaymentService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createPaymentDto: CreatePaymentDto) {
    const treatment = await this.prismaService.treatments.findUnique({
      where: { id: createPaymentDto.treatmentId },
      select: { price: true },
    });

    if (!treatment) {
      throw new Error("Treatment not found");
    }

    return this.prismaService.payment.create({
      data: {
        payment_date: createPaymentDto.payment_date,
        payment_method: createPaymentDto.payment_method,
        status: createPaymentDto.status,
        amount: treatment.price,
        treatment: { connect: { id: createPaymentDto.treatmentId } },
        patient: { connect: { id: createPaymentDto.patientId } },
      },
    });
  }

  findAll() {
    return this.prismaService.payment.findMany({
      include: {
        treatment: true,
        patient: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.payment.findUnique({ where: { id } });
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.prismaService.payment.update({
      where: { id },
      data: updatePaymentDto,
    });
  }

  remove(id: number) {
    return this.prismaService.payment.delete({ where: { id } });
  }
}
