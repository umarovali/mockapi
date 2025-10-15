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
import { MedicineService } from "./medicine.service";
import { CreateMedicineDto } from "./dto/create-medicine.dto";
import { UpdateMedicineDto } from "./dto/update-medicine.dto";
import { AuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";

@ApiTags("Medicine")
@Controller("medicine")
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("DOCTOR", "ADMIN")
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new medicine (DOCTOR, ADMIN only)" })
  @ApiResponse({ status: 201, description: "Medicine created successfully" })
  create(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicineService.create(createMedicineDto);
  }

  @Get()
  @ApiOperation({ summary: "Get list of all medicines" })
  @ApiResponse({ status: 200, description: "List of medicines returned" })
  findAll() {
    return this.medicineService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get medicine by id" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Medicine details returned" })
  findOne(@Param("id") id: string) {
    return this.medicineService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("DOCTOR", "ADMIN")
  @Patch(":id")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update medicine by id (DOCTOR, ADMIN only)" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Medicine updated successfully" })
  update(
    @Param("id") id: string,
    @Body() updateMedicineDto: UpdateMedicineDto
  ) {
    return this.medicineService.update(+id, updateMedicineDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("DOCTOR", "ADMIN")
  @Delete(":id")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete medicine by id (DOCTOR, ADMIN only)" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Medicine deleted successfully" })
  remove(@Param("id") id: string) {
    return this.medicineService.remove(+id);
  }
}
