import { Module } from '@nestjs/common';
import { UserStatusService } from './user-status.service';
import { UserStatusGateway } from './user-status.gateway';
import { UserStatusController } from './user-status.controller';

@Module({
  controllers: [UserStatusController],
  providers: [UserStatusService, UserStatusGateway]
})
export class UserStatusModule { }
