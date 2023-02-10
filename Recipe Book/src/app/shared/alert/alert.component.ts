import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  template: `
    <div class="backdrop" (click)="onClose()"></div>
    <div class="alert-box">
      <p>{{ message }}</p>
      <div class="alert-box-actions">
        <button class="btn btn-primary" (click)="onClose()">Close</button>
      </div>
    </div>
  `,
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message: string;
  @Output() close = new EventEmitter<void>();

  onClose = () => {
    this.close.emit();
  }
}
