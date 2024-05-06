import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SideNavigationComponent} from "./shared/side-navigation/side-navigation.component";
import {SignInComponent} from "./paths/sign-in/sign-in.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [
        RouterOutlet,
        SideNavigationComponent,
        SignInComponent
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'StudyMate';
}
