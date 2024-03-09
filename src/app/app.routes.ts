import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ClassDetailsComponent} from "./class-details/class-details.component";
import {SignInComponent} from "./sign-in/sign-in.component";

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page'
  },
  {
    path: 'signIn',
    component: SignInComponent,
    title: 'Sign In Page'
  },
  {
    path: 'classInfo/:id',
    component: ClassDetailsComponent,
    title: 'ClassInfo Page'
  }
];
export default routeConfig;
