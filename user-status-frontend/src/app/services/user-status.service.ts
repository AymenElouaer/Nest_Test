// src/app/services/user-status.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';
import { USER_STATUS } from '../../../../shared/constants/status.constants';

@Injectable({
    providedIn: 'root',
})
export class UserStatusService {
    private socket;
    private statusSubject = new BehaviorSubject<string>(USER_STATUS.ACTIVE);
    status$ = this.statusSubject.asObservable();

    constructor() {
        this.socket = io('http://localhost:3000');

        this.socket.on('statusUpdated', (statuses) => {
            const userId = 'user1'; // Assuming userId is 'user1' for demonstration purposes
            if (statuses[userId]) {
                this.statusSubject.next(statuses[userId]);
            }
        });
    }

    updateStatus(userId: string, status: string) {
        this.socket.emit('updateStatus', { userId, status });
    }
}
