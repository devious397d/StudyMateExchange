import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  template: `
    <header style="font-size: x-large">
     Please Sign In <br><br>
      <form>
        <label for="email">Email:</label>
        <input type="text" id="femail" name="femail"><br>
        <label for="password">Password:</label>
        <input type="text" id="fpassword" name="fpassword"><br><br>
        <input type="submit" value="Submit">
      </form>
    </header>
  `,
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

}
