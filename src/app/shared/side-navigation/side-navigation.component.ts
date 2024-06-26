import {Component, viewChild} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
//import {SearchBarComponent} from "../../search-bar/search-bar.component";
import {StudentService} from "../../core/services/student.service";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {
  MatTab,
  MatTabChangeEvent,
  MatTabContent,
  MatTabGroup,
  MatTabLink,
  MatTabNav,
  MatTabNavPanel
} from "@angular/material/tabs";
import {StudySessionsComponent} from "../../paths/study-sessions/study-sessions.component";
import {StudentsTableComponent} from "../../paths/students-table/students-table.component";
import {ProfileContent, SignInComponent} from "../../paths/sign-in/sign-in.component";


@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatGridList,
    MatGridTile,
    MatTabNav,
    MatTabLink,
    MatTabNavPanel,
    MatTabGroup,
    MatTab,
    StudySessionsComponent,
    StudentsTableComponent,
    SignInComponent,
    ProfileContent,
    MatTabContent,
    //SearchBarComponent
  ],
  providers: [StudentService],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.css'
})
export class SideNavigationComponent {
  constructor(public studentService: StudentService) {

  }


}
