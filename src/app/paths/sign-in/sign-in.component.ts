import {Component, Inject, OnInit} from '@angular/core';
import {MatFormField, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {StudentService} from "../../core/services/student.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {StudySession} from "../../core/types/study-session";
import {Student} from "../../core/types/student";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";

export interface createNewUser {
  pid: number;
  plastName: string;
  pfirstName: string;
  planguage: string;
  pemail: string;
  ppassword: string;
}

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

  pid: number;
  plastName: string;
  pfirstName: string;
  planguage: string;
  pemail: string;
  ppassword: string;

  //private updateSubscription: Subscription;
  constructor(private studentService: StudentService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getStudents();
  }
  getStudents(text: string = ''): void {
    this.studentService.getStudents(text)
      .subscribe(students => this.students = students);
  }
  signIn(email:String) {
    console.log(this.students)
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
        this.studentService.selected.setValue(this.studentService.tabs.length );
        //this.studentService.signedIn = true;
      }
    }
    console.log('signed in? ' + this.studentService.signedIn);
    this.password = '';
  }

  newUser() {
    const dialogref = this.dialog.open(NewUser, {
      data: {
        pid: this.pid,
        plastName: this.plastName,
        pfirstName: this.pfirstName,
        planguage: this.planguage,
        pemail: this.pemail,
        ppassword: this.ppassword
      }
    });
    dialogref.afterClosed().subscribe(results => {
      console.log('result ' + results.pemail)
      this.students.push({
        email: results.pemail,
        firstName: results.pfirstName,
        id: 8,
        language: results.planguage,
        lastName: results.plastName,
        password: results.ppassword,
        sessions: []
      })
    })
    this.studentService.allStudents = this.students
    //this.ngOnInit()
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
    for(var i = 0; i < this.userProf[0].sessions.length; i++){

      var proID = this.userProf[0].sessions[i];
      var newData = this.studysessions.filter(object => {
        return object['id'] === proID;
      });
      this.allTitles.push(newData.map(item => {return item.title}));
      this.theSessions.push(newData);
    }
  }
  logOff() {
    console.log('signed in? ' + this.studentService.signedIn);
    this.studentService.logInDisable = false;
    this.studentService.removeTab(0);
    this.studentService.selected.setValue(this.studentService.tabs.length);
    //this.studentService.signedIn = false;
  }
}

@Component({
  selector: 'new-user',
  templateUrl: './new-user.html',
  standalone: true,
  styleUrls: [],
  imports: [
    MatGridList,
    MatGridTile,
    MatButton,
    MatProgressSpinner,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class NewUser implements OnInit{
  newUserProf: Student[] = [];
  constructor(public dialogRef: MatDialogRef<NewUser>,
    @Inject(MAT_DIALOG_DATA) public data: createNewUser) {

  }
  // @ts-ignore
  pfirstName: any;
  plastName: any;
  planguage: any;
  pemail: any;
  ppassword: any;

  ngOnInit(): void {

  }

  createNewUser(){
    this.newUserProf.push(
    {email: this.pemail,
      id: 8,
      language: this.planguage,
      lastName: this.plastName,
      password: this.ppassword,
      sessions: [],
      firstName: this.pfirstName
    })
    var newData = [{
      id: 8,
      language: this.planguage,
      lastName: this.plastName,
      password: this.ppassword,
      sessions: [],
      firstName: this.pfirstName
    }]
    //this.studentService.creatingNewUser(pfirstName, plastName, planguage, pemail, ppassword);
    console.log(this.newUserProf)
    //this.dialogRef.close(newData);
  }


}
