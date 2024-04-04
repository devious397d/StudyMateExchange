import {Routes} from '@angular/router';
import {StudentsTableComponent} from "./paths/students-table/students-table.component";
import {StudySessionsComponent} from "./paths/study-sessions/study-sessions.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'students',
    pathMatch: 'full'
  },
  {
    path: 'students',
    component: StudentsTableComponent
  },
  {
    path: 'sessions',
    component: StudySessionsComponent
  }
];
