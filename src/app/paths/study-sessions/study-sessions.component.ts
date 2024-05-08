import {Component, OnInit, Inject, inject, ViewChild} from '@angular/core';
import {StudentService} from "../../core/services/student.service";
import {StudySession} from "../../core/types/study-session";
import {SearchBarSessionComponent} from "../../shared/search-bar-session/search-bar-session.component";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle} from "@angular/material/dialog";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatCard, MatCardModule, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {CdkAccordion, CdkAccordionItem} from "@angular/cdk/accordion";
import {SearchBarComponent} from "../../shared/search-bar/search-bar.component";
import { Observable,Subscription, interval  } from 'rxjs';
import {SignInComponent} from "../sign-in/sign-in.component";

export interface createSessionData {
  ctitle: string;
  clanguage: string;
  cinstructor: string;
  cdescription: string;
  cdate: string;
  ctime: string;
  cmeetinglocation:string;
}


@Component({
  selector: 'app-study-sessions',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    MatButton,
    MatCardTitle,
    MatCard,
    MatCardTitle,
    MatCardModule,
    MatLabel,
    MatButtonModule,
    CdkAccordion,
    CdkAccordionItem,
    SearchBarSessionComponent,
    SearchBarComponent
  ],
  providers: [StudentService],
  styleUrl: 'study-sessions.compnent.css',
  templateUrl: './study-sessions.component.html',
})
export class StudySessionsComponent implements OnInit {
  @ViewChild(SignInComponent) signIn;

  sessions: StudySession[] = [];
  ctitle: string;
  clanguage: string;
  cinstructor: string;
  cdescription: string;
  cdate: string;
  ctime: string;
  cmeetinglocation:string;

  newSessions: StudySession[] = [];
  private updateSubscription: Subscription;

    constructor(public studentService: StudentService,
              public dialog: MatDialog,) {
      console.log('signed in???: ' + this.signIn)
  }

  ngOnInit(): void {
    this.getSessions();
  }
  getSessions(text: string = ''): void {
    this.studentService.getSessions(text)
      .subscribe(sessions => this.sessions = sessions);

  }

  receiveMessage(message: string) {
    console.log("got message");
    this.getSessions(message);
  }

  openSessionDialog(ID:number) {

    console.log('signed in???: ' + this.studentService.giveLogInStatus());

    var newData = this.sessions.filter(object => {
      return object['id'] == ID;
    })

    console.log(newData);
    console.log(newData.map(item => {
      return item.meetinglocation
    }));

    this.dialog.open(SessionDialogContent, {
      data: {
        title: newData.map(item => {
          return item.title
        }),
        language: newData.map(item => {
          return item.language
        }),
        instructor: newData.map(item => {
          return item.instructor
        }),
        description: newData.map(item => {
          return item.description
        }),
        date: newData.map(item => {
          return item.date
        }),
        time: newData.map(item => {
          return item.time
        }),
        meetinglocation: newData.map(item => {
          return item.meetinglocation
        })
      }
    });
  }
  openCreateClassDialog(){

    const dialogRef = this.dialog.open(CreateDialogContent,{
      data: {
        ctitle: this.ctitle,
        clanguage: this.clanguage,
        cinstructor: this.cinstructor,
        cdescription: this.cdescription,
        cdate: this.cdate,
        ctime: this.ctime,
        cmeetinglocation: this.cmeetinglocation
      }
    })
    dialogRef.afterClosed().subscribe(results => {
      this.sessions.push({
        date: results.cdate,
        description: results.cdescription,
        id: 7,
        instructor: results.cinstructor,
        language: results.clanguage,
        meetinglocation: results.cmeetinglocation,
        time: results.ctime,
        title: results.ctitle
      })
    })
  }
  getNextID(obj){
    return (Math.max.apply(Math, obj.map(function(o) {
      return o.id;
    })) + 1);

  }
}
@Component({
  selector: 'session-dialog-content',
  templateUrl: './session-dialog-content.html',
  standalone: true,
  imports: [MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule],
})
export class SessionDialogContent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public studentService : StudentService) {
  }
  onJoinClick(){

    alert("You Have Joined The Class");

  }
}

@Component({
  selector: 'create-dialog-content',
  templateUrl: './create-dialog-content.html',
  standalone: true,
  providers: [StudentService],
  imports: [MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatFormField,
    MatInput,
    FormsModule,
    MatLabel
  ],
})
export class CreateDialogContent {
  findIDs: StudySession[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: createSessionData,
              private studentService: StudentService) {

  }
}
