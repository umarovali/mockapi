import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateAdminDto, UpdateAdminDto } from "./dto";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "../users/dto/create-user.dto";
@Injectable()
export class AdminsService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password } = createAdminDto;
    if (password !== confirm_password) {
      throw new BadRequestException(
        "Password is not the same as confirm_password"
      );
    }
    const hashed_password = bcrypt.hashSync(password, 7);

    return this.prismaService.admin.create({
      data: {
        name: createAdminDto.name,
        email: createAdminDto.email,
        is_creator: createAdminDto.is_creator,
        is_active: createAdminDto.is_active,
        hashed_password: hashed_password,
      },
    });
  }

  findAll() {
    return this.prismaService.admin.findMany();
  }

  findOne(id: number) {
    return this.prismaService.admin.findUnique({ where: { id } });
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.prismaService.admin.update({
      where: { id },
      data: updateAdminDto,
    });
  }

  remove(id: number) {
    return this.prismaService.admin.delete({ where: { id } });
  }
}
