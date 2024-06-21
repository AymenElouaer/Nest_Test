import { Module } from '@nestjs/common';
import { UserStatusModule } from './user-status/user-status.module';

@Module({
  imports: [UserStatusModule]
})
export class AppModule { }
