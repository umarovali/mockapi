import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Param,
  UseGuards,
  HttpCode,
  BadRequestException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SignInUserDto } from "../users/dto/sign-user.dto";
import { CreateAdminDto } from "../admins/dto/create-admin.dto";
import { SignInAdminDto } from "../admins/dto/signin-admin.dto";
import { Request, Response } from "express";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/roles.guard";
import { UsersService } from "../users/users.service";
import { AuthGuard } from "../common/guards/jwt-auth.guard";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { CreateDoctorDto } from "../doctor/dto/create-doctor.dto";
import { MailService } from "../mail/mail.service";
import { randomUUID } from "crypto";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
        private readonly mailService: MailService
    
  ) {}

  @Post("user/signup")
  @ApiOperation({ summary: "User signup" })
  @ApiResponse({ status: 201, description: "User created successfully" })
  async signUpUser(@Body() dto: CreateUserDto) {
    return this.authService.signUpUser(dto);
  }

  @Get("activate/:link")
  @ApiOperation({ summary: "Activate user via link" })
  @ApiResponse({ status: 200, description: "User activated successfully" })
  async activateUser(@Param("link") link: string) {
    return this.authService.activateUser(link);
  }

  @Post("user/signin")
  @ApiOperation({ summary: "User sign in" })
  @ApiResponse({ status: 200, description: "User signed in" })
  async signInUser(@Body() dto: SignInUserDto, @Res() res: Response) {
    const result = await this.authService.signin(dto, res);
    return res.json(result);
  }

  @Post("user/signout")
  @ApiOperation({ summary: "User sign out" })
  @ApiResponse({ status: 200, description: "User signed out" })
  async signOutUser(@Body("userId") userId: number, @Res() res: Response) {
    return this.authService.signout(userId, res);
  }

  @Post("user/refresh")
  @HttpCode(200)
  @ApiOperation({ summary: "Refresh user token" })
  @ApiResponse({ status: 200, description: "Token refreshed" })
  async refreshUserToken(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshUserToken(req, res);
  }

  @Post("admin/signin")
  @ApiOperation({ summary: "Admin sign in" })
  @ApiResponse({ status: 200, description: "Admin signed in" })
  async signInAdmin(@Body() dto: SignInAdminDto, @Res() res: Response) {
    const result = await this.authService.signinAdmin(dto, res);
    return res.json(result);
  }

  @Post("admin/signout")
  @ApiOperation({ summary: "Admin sign out" })
  @ApiResponse({ status: 200, description: "Admin signed out" })
  async signOutAdmin(@Body("adminId") adminId: number, @Res() res: Response) {
    return this.authService.signoutAdmin(adminId, res);
  }

  @Post("admin/refresh")
  @HttpCode(200)
  @ApiOperation({ summary: "Refresh admin token" })
  @ApiResponse({ status: 200, description: "Admin token refreshed" })
  async refreshAdminToken(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshAdminToken(req, res);
  }

  @Post("admin/signup")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("OWNER")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Register new admin (OWNER only)" })
  @ApiResponse({ status: 201, description: "Admin registered" })
  async signUpAdmin(@Body() dto: CreateAdminDto) {
    return this.authService.signUpAdmin(dto);
  }

  @Post("admin_rights")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Register doctor or staff (ADMIN only)" })
  @ApiResponse({ status: 201, description: "Doctor or Staff registered" })
  async registerDoctor(@Body() dto: CreateUserDto) {
    const staff_admin = ["STAFF", "DOCTOR"];
    if (!staff_admin.includes(dto.role)) {
      throw new BadRequestException("Doctor or Staff creation !!!");
    }
    const activationLink = randomUUID();

    const doctor = await this.usersService.create({
      role: dto.role,
      clinicId: dto.clinicId,
      confirm_password: dto.confirm_password,
      password: dto.password,
      birth_date: dto.birth_date,
      email: dto.email,
      specialization: dto.specialization,
      experience: dto.experience,
      full_name: dto.full_name,
      gender: dto.gender,
      hired_date: dto.hired_date,
      phone: dto.phone,
      position: dto.position,
      shift: dto.shift,
      activation_link: activationLink
    });
        await this.mailService.sendMail(doctor, activationLink).catch((err) => {
          throw new ServiceUnavailableException(err);
        });
    return doctor;
  }
}
