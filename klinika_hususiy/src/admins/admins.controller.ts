import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { AdminsService } from "./admins.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { AuthGuard } from "src/common/guards/jwt-auth.guard";
import { AdminSelfGuard } from "../common/guards/admin-self.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";

@Controller("admins")
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("OWNER")
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("OWNER")
  findAll() {
    return this.adminsService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthGuard, AdminSelfGuard)
  findOne(@Param("id") id: string) {
    return this.adminsService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("OWNER")
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("OWNER")
  remove(@Param("id") id: string) {
    return this.adminsService.remove(+id);
  }
}
