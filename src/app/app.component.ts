import { Component } from '@angular/core';
import {HomeComponent} from "./home/home.component";
import {SideBarComponent} from "./side-bar/side-bar.component";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, SideBarComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'StudyMateExchange';
}
