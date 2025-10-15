import { Controller, Get, Query } from "@nestjs/common";
import { SmartFiltersService } from "./smart_filters.service";
import { StaffShift } from "../../generated/prisma";
import { ApiTags, ApiQuery } from "@nestjs/swagger";

@ApiTags("Smart Filters")
@Controller("smart-filters")
export class SmartFiltersController {
  constructor(private readonly smartFiltersService: SmartFiltersService) {}

  @Get("staff-by-shift")
  @ApiQuery({
    name: "shift",
    enum: StaffShift,
    required: true,
    description: "Filter staff by shift (MORNING, AFTERNOON, NIGHT)",
  })
  async getStaffByShift(@Query("shift") shift: StaffShift) {
    return this.smartFiltersService.getStaffByShift(shift);
  }
}
