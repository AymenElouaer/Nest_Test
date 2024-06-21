import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserStatusService } from './user-status.service';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('status')
export class UserStatusController {
  constructor(private readonly userStatusService: UserStatusService) { }

  @Get()
  getStatuses() {
    return this.userStatusService.getStatuses();
  }

  @Post()
  updateStatus(@Body() updateStatusDto: UpdateStatusDto) {
    this.userStatusService.updateStatus(updateStatusDto.userId, updateStatusDto.status);
    return { success: true };
  }
}
