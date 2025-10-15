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
import { DoctorService } from "./doctor.service";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/roles.guard";
import { AuthGuard } from "../common/guards/jwt-auth.guard";
import { DoctorSelfGuard } from "../common/guards/doctor-self.guard";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";

@ApiTags("Doctor")
@Controller("doctor")
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @ApiOperation({ summary: "Create a new doctor" })
  @ApiResponse({ status: 201, description: "Doctor created successfully" })
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "OWNER")
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all doctors (ADMIN, OWNER only)" })
  @ApiResponse({ status: 200, description: "List of doctors returned" })
  findAll() {
    return this.doctorService.findAll();
  }

  @UseGuards(AuthGuard, DoctorSelfGuard)
  @Get(":id")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get a doctor by id (self or authorized)" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Doctor details returned" })
  findOne(@Param("id") id: string) {
    return this.doctorService.findOne(+id);
  }

  @UseGuards(AuthGuard, DoctorSelfGuard)
  @Patch(":id")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a doctor by id (self or authorized)" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Doctor updated successfully" })
  update(@Param("id") id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(+id, updateDoctorDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "OWNER")
  @Delete(":id")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete a doctor by id (ADMIN, OWNER only)" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Doctor deleted successfully" })
  remove(@Param("id") id: string) {
    return this.doctorService.remove(+id);
  }
}
