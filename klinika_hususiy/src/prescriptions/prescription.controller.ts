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
import { PrescriptionService } from "./prescription.service";
import { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import { UpdatePrescriptionDto } from "./dto/update-prescription.dto";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { AuthGuard } from "../common/guards/jwt-auth.guard";

@Controller("prescription")
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("DOCTOR")
  @Post()
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionService.create(createPrescriptionDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "OWNER")
  @Get()
  findAll() {
    return this.prescriptionService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "OWNER")
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.prescriptionService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("DOCTOR")
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto
  ) {
    return this.prescriptionService.update(+id, updatePrescriptionDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("DOCTOR")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.prescriptionService.remove(+id);
  }
}
