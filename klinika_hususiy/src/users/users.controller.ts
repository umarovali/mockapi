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
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Roles } from "src/common/decorators/roles.decorator";
import { AuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from "@nestjs/swagger";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "OWNER")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all users (ADMIN, OWNER only)" })
  @ApiResponse({ status: 200, description: "List of users returned" })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update user by id (Authenticated users)" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "User updated successfully" })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("OWNER")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete user by id (OWNER only)" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "User deleted successfully" })
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
