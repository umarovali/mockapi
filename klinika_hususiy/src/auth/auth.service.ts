import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Admin, User } from "../../generated/prisma";
import { AdminsService } from "../admins/admins.service";
import { CreateAdminDto } from "../admins/dto/create-admin.dto";
import { SignInAdminDto } from "../admins/dto/signin-admin.dto";
import { JwtPayload, ResponseFields, Tokens } from "../common/types";
import { AdminResponseFields } from "../common/types/admin-response.type";
import { UsersService } from "../users/users.service";
import { AdminJwtPayload } from "../common/types/admin-jwt-payload.type";
import { randomUUID } from "crypto";
import { MailService } from "../mail/mail.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SignInUserDto } from "../users/dto/sign-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly adminsService: AdminsService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService
  ) {}

  async generateTokensuser(user: User): Promise<Tokens> {
    const payload: JwtPayload = {
      id: Number(user.id),
      email: user.email,
      role: user.role,
      is_active: user.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: Number(process.env.SECRET_TOKEN_TIME),
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: Number(process.env.REFRESH_TOKEN_TIME),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signUpUser(createUserDto: CreateUserDto) {
    const condidate = await this.prismaService.user
      .findUnique({ where: { email: createUserDto.email } })
      .catch(() => null);
    if (condidate) throw new ConflictException("user already exists");

    if (createUserDto.role == "DOCTOR") {
      throw new BadRequestException(
        "only admin can create doctor by using the function registerDoctor"
      );
    }
    if (createUserDto.role == "OWNER") {
      throw new BadRequestException("owner cannot be created");
    }
    if (createUserDto.role == "ADMIN") {
      throw new BadRequestException(
        "only owner can create admin by using the function registerDoctor"
      );
    }
    if (createUserDto.role == "STAFF") {
      throw new BadRequestException(
        "only admin can create staff by using the function registerDoctor"
      );
    }

    const activationLink = randomUUID();
    const newUser = await this.usersService.create({
      ...createUserDto,
      activation_link: activationLink,
    });
    await this.mailService.sendMail(newUser, activationLink).catch((err) => {
      throw new ServiceUnavailableException(err);
    });

    return {
      message: `Ro'yhatdan o'tdingiz. Akkauntni faollashtirish uchun emailni tasdiqlang!`,
    };
  }

  async activateUser(activationLink: string) {
    if (!activationLink)
      throw new UnauthorizedException("Activation link is required");

    const user = await this.prismaService.user.findFirst({
      where: { activation_link: activationLink },
    });
    if (!user) throw new NotFoundException("Invalid activation link");

    if (user.is_active)
      throw new ConflictException("User account already activated");

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { is_active: true },
    });
    return { message: "User account activated successfully" };
  }

  async signin(
    signInUserDto: SignInUserDto,
    res: Response
  ): Promise<ResponseFields> {
    const { email, password } = signInUserDto;
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException("User not found");

    const isValid = await bcrypt.compare(password, user.hashed_password);
    if (!isValid)
      throw new UnauthorizedException("Email or password is incorrect");

    const { accessToken, refreshToken } = await this.generateTokensuser(user);
    if (!refreshToken)
      throw new UnauthorizedException("Refresh token generation failed");

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.prismaService.user.update({
      where: { id: user.id },
      data: { hashed_refresh_token: hashedRefreshToken },
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return {
      message: "User signed in ",
      userId: Number(user.id),
      accessToken,
    };
  }

  async signout(userId: number, res: Response) {
    await this.prismaService.user.update({
      where: { id: userId },
      data: { hashed_refresh_token: null },
    });

    res.clearCookie("refreshToken");

    return res.status(200).json({
      message: "Successfully signed out",
    });
  }

  async refreshUserToken(req: Request, res: Response) {
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) throw new UnauthorizedException("No refresh token");

    const userId = this.jwtService.decode(refreshToken)["id"];
    const user = await this.prismaService.user.findUnique({
      where: { id: Number(userId) },
    });
    if (!user || !user.hashed_refresh_token)
      throw new UnauthorizedException("Access Denied 1");

    const rtMatches = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token
    );
    if (!rtMatches) throw new ForbiddenException("Token notogri");

    const tokens = await this.generateTokensuser(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 10);

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { hashed_refresh_token },
    });

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.json({
      message: "User accessToken refreshed",
      userId: Number(user.id),
      accessToken: tokens.accessToken,
    });
  }

  async generateTokensAdmin(admin: Admin): Promise<Tokens> {
    const payload: AdminJwtPayload = {
      id: Number(admin.id),
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ADMIN_ACCESS_TOKEN_KEY,
        expiresIn: process.env.ADMIN_ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.ADMIN_REFRESH_TOKEN_KEY,
        expiresIn: process.env.ADMIN_REFRESH_TOKEN_TIME,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async signUpAdmin(createAdminDto: CreateAdminDto) {
    const admin = await this.prismaService.admin.findUnique({
      where: { email: createAdminDto.email },
    });
    if (admin) throw new ConflictException("This admin already exists");
    const newAdmin = await this.adminsService.create(createAdminDto);
    return { message: "Admin registered successfully", admin: newAdmin };
  }

  async signinAdmin(
    signInAdminDto: SignInAdminDto,
    res: Response
  ): Promise<AdminResponseFields> {
    const { email, password } = signInAdminDto;
    const admin = await this.prismaService.admin.findUnique({
      where: { email },
    });
    if (!admin) throw new NotFoundException("Admin not found");

    const isValid = await bcrypt.compare(password, admin.hashed_password);
    if (!isValid)
      throw new UnauthorizedException("Email or password is incorrect");

    const { accessToken, refreshToken } = await this.generateTokensAdmin(admin);
    if (!refreshToken)
      throw new UnauthorizedException("Refresh token generation failed");

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.prismaService.admin.update({
      where: { id: admin.id },
      data: { hashed_refresh_token: hashedRefreshToken },
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return {
      message: "Admin signed in",
      adminId: Number(admin.id),
      accessToken,
    };
  }

  async signoutAdmin(adminId: number, res: Response) {
    await this.prismaService.admin.updateMany({
      where: { id: adminId, hashed_refresh_token: { not: null } },
      data: { hashed_refresh_token: null },
    });
    res.clearCookie("refreshToken");
    return true;
  }

  async refreshAdminToken(req: Request, res: Response) {
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) throw new UnauthorizedException("No refresh token");

    const userId = this.jwtService.decode(refreshToken)["id"];
    const admin = await this.prismaService.admin.findUnique({
      where: { id: Number(userId) },
    });
    if (!admin || !admin.hashed_refresh_token)
      throw new UnauthorizedException("Access Denied 1");

    const rtMatches = await bcrypt.compare(
      refreshToken,
      String(admin.hashed_refresh_token)
    );
    if (!rtMatches) throw new ForbiddenException("Token notogri");

    const tokens = await this.generateTokensAdmin(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 10);

    await this.prismaService.user.update({
      where: { id: admin.id },
      data: { hashed_refresh_token },
    });

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.json({
      message: "Admin accessToken refreshed",
      userId: Number(admin.id),
      accessToken: tokens.accessToken,
    });
  }
}
