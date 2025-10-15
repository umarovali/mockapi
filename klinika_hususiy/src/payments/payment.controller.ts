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
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/roles.guard";
import { AuthGuard } from "../common/guards/jwt-auth.guard";

@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "OWNER")
  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "OWNER")
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "OWNER")
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "OWNER")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.paymentService.remove(+id);
  }
}
