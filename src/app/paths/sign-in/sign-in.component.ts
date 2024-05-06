import {Component, Inject, OnInit} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {StudentService} from "../../core/services/student.service";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {StudySession} from "../../core/types/study-session";
import {Student} from "../../core/types/student";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {delay} from "rxjs";


// @ts-ignore
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit{
  students: Student[] = [];
  email: String | any;
  password: String | any;
  constructor(private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.getStudents();
  }
  getStudents(text: string = ''): void {
    this.studentService.getStudents(text)
      .subscribe(students => this.students = students);
  }
  signIn(email:String) {
    if(this.students.find(x => x.email == this.email) != undefined){
      if(this.students.find(x => x.password == this.password) != undefined){
        const studentData = this.students.filter(object => {
          return object['email'] == email;
        });
        this.studentService.profileInfo = studentData;
        console.log(studentData)
        this.studentService.addTab('Profile');
        this.studentService.logInDisable = true;
        this.studentService.loggedEmail = this.email;
        this.studentService.selected.setValue(this.studentService.tabs.length + 2);
      }
    }
  }
}
@Component({
  selector: 'profile-content',
  templateUrl: './profile-content.html',
  standalone: true,
  styleUrls: ['profile-content.css'],
  imports: [
    MatGridList,
    MatGridTile,
    MatButton,
    MatProgressSpinner
  ],
})
export class ProfileContent implements OnInit{
  studysessions: StudySession[] = [];
  students: Student[] = [];
  userProf= this.studentService.profileInfo;
  theSessions = [];
  allTitles= [];
  constructor(public studentService: StudentService) {

  }
  // @ts-ignore

  ngOnInit(): void {
    this.getSessions();
    this.getStudents();
    setTimeout(()=> this.getEnrolledClasses(), 3000);
  }

  getStudents(text: string = ''): void {
    this.studentService.getStudents(text)
      .subscribe(students => this.students = students);
  }
  getSessions(): void {
    this.studentService.getSessions()
      .subscribe(sessions => this.studysessions = sessions);
  }
  getEnrolledClasses(){
    console.log("in enrolled");
    for(var i = 0; i < this.userProf[0].sessions.length; i++){
      console.log("in IF");
      console.log("i");
      console.log(i);

      var proID = this.userProf[0].sessions[i];
      console.log(proID)
      var newData = this.studysessions.filter(object => {
        return object['id'] === proID;
      });
      this.allTitles.push(newData.map(item => {return item.title}));
      console.log("newData");
      console.log(newData);
      this.theSessions.push(newData);
    }
    var title1 = this.allTitles.at(0)
    console.log(title1)
    console.log(this.theSessions);
    console.log(this.allTitles);
    console.log("end");
  }
  logOff() {
    this.studentService.logInDisable = false;
    this.studentService.removeTab(0);
    this.studentService.selected.setValue(this.studentService.tabs.length + 2);
  }
  protected readonly setTimeout = setTimeout;
}
