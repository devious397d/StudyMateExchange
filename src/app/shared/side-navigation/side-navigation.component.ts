import {Component} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {SearchBarComponent} from "../search-bar/search-bar.component";
import {Student} from "../../core/types/student";
import {StudentService} from "../../core/services/student.service";

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
    MatSidenav,
    SearchBarComponent
  ],
  providers: [StudentService],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.css'
})
export class SideNavigationComponent {

  students: Student[] = [];

  constructor(private studentService: StudentService) {
  }

  getStudents(text: string = ''): void {
    this.studentService.getStudents(text)
        .subscribe(students => this.students = students);
  }

  receiveMessage(message: string) {
    this.getStudents(message);
  }


}
