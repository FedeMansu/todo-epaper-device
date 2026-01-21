// header.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  @Output() menuToggle = new EventEmitter<void>();
  @Output() toggleSidebar = new EventEmitter<void>();

  onMenuClick() {
    this.menuToggle.emit();
  }
}