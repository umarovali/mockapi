import { Module } from "@nestjs/common";
import { SmartFiltersService } from "./smart_filters.service";
import { SmartFiltersController } from "./smart_filters.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [SmartFiltersController],
  providers: [SmartFiltersService],
})
export class SmartFiltersModule {}
