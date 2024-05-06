import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

// @ts-ignore
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

}
