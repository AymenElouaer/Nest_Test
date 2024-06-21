import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStatusService } from '../services/user-status.service';

@Component({
    selector: 'app-status-display',
    standalone: true,
    imports: [CommonModule],
    template: '<div>User Status: {{ status }}</div>',
})
export class StatusDisplayComponent implements OnInit {
    status: string ='';

    constructor(private userStatusService: UserStatusService) { }

    ngOnInit() {
        this.userStatusService.status$.subscribe((status) => {
            this.status = status;
        });
    }
}
