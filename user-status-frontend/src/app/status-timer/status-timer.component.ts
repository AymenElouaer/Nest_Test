import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStatusService } from '../services/user-status.service';
import { USER_STATUS } from '../../../../shared/constants/status.constants';

@Component({
    selector: 'app-status-timer',
    standalone: true,
    imports: [CommonModule],
    template: '',
})
export class StatusTimerComponent implements OnInit {
    private idleTimeout: any;
    private afkTimeout: any;

    constructor(private userStatusService: UserStatusService) { }

    ngOnInit() {
        this.resetTimers();
    }

    @HostListener('document:mousemove', ['$event'])
    @HostListener('document:keypress', ['$event'])
    handleUserActivity() {
        this.resetTimers();
        this.userStatusService.updateStatus('user1', USER_STATUS.ACTIVE);
    }

    resetTimers() {
        clearTimeout(this.idleTimeout);
        clearTimeout(this.afkTimeout);

        this.idleTimeout = setTimeout(() => {
            this.userStatusService.updateStatus('user1', USER_STATUS.IDLE);
        }, 30000); // 30 seconds to idle

        this.afkTimeout = setTimeout(() => {
            this.userStatusService.updateStatus('user1', USER_STATUS.AFK);
        }, 60000); // 1 minute to AFK
    }
}
