import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
    <div class="sidenav">
      <a routerLink='signIn'>
        Sign In
      </a>
    </div>
  `,
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

}
