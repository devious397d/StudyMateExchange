import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SideNavigationComponent} from "./shared/side-navigation/side-navigation.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SideNavigationComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'StudyMate';
}
