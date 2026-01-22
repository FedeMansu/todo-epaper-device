import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "../header/header";
import { FooterComponent } from "../footer/footer";
import { SidebarComponent } from "../sidebar/sidebar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SidebarComponent, MatSidenavModule, MatListModule, MatIconModule],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss']
})
export class MainLayoutComponent {
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}