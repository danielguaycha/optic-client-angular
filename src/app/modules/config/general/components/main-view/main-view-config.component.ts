import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast.service';
import { ConfigService } from '../../services/config.service';
import { SecureStorageService } from '../../../../auth/services/secure-storage.service';

@Component({
  selector: 'app-general-main-view',
  templateUrl: './main-view-config.component.html'
})

export class MainViewConfigComponent implements OnInit {
ngOnInit(): void {}}