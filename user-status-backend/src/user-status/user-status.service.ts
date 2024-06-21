// src/modules/user-status/user-status.service.ts
import { Injectable } from '@nestjs/common';
import { UserStatus } from './interfaces/user-status.interface';

@Injectable()
export class UserStatusService {
    private readonly statuses: { [userId: string]: string } = {};

    getStatuses(): { [userId: string]: string } {
        return this.statuses;
    }

    updateStatus(userId: string, status: string): void {
        this.statuses[userId] = status;
    }
}
