// sidebar.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatSidenavModule, MatListModule, MatIconModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class SidebarComponent {
  @Input() isOpen = false;

  menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/users', label: 'Users', icon: '👥' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ];
}