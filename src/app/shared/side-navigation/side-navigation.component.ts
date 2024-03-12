import {Component} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [
    MatSidenav,
    MatSidenavContent,
    MatSidenavContainer,
    MatNavList,
    MatToolbar,
    MatIcon,
    RouterOutlet,
    MatButton,
    MatListItem,
    RouterLink,
    RouterLinkActive,
    MatSidenav
  ],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.css'
})
export class SideNavigationComponent {
}
