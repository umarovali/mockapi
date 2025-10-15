import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const {
      full_name,
      phone,
      email,
      password,
      gender,
      birth_date,
      is_active,
      role,
      hashed_refresh_token,
      specialization,
      experience,
      hired_date,
      activation_link,
      position,
      shift,
    } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prismaService.user.create({
      data: {
        full_name,
        phone,
        email,
        hashed_password: hashedPassword,
        hashed_refresh_token,
        activation_link,
        gender,
        birth_date: new Date(birth_date),
        is_active,
        role: createUserDto.role,
      },
    });

    if (role === "DOCTOR") {
      if (!specialization || !experience || !hired_date) {
        throw new BadRequestException("Missing doctor details for DOCTOR role");
      }

      await this.prismaService.doctor.create({
        data: {
          userId: user.id,
          specialty: specialization,
          experience,
          hired_date: new Date(hired_date),
          gender,
        },
      });
    }
    if (role === "STAFF") {
      if (!position || !shift) {
        throw new BadRequestException("Missing staff details for STAFF role");
      }

      await this.prismaService.staff.create({
        data: {
          userId: user.id,
          shift,
          posititon: position
        },
      });
    }

    return user;
  }

  findAll() {
    return this.prismaService.user.findMany({
      include: {
        payments: true,
        appointments: true,
        doctor: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
