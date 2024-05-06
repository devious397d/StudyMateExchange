import {Component, OnInit, Inject, inject} from '@angular/core';
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
  sessions: StudySession[] = [];
  ctitle: string;
  clanguage: string;
  cinstructor: string;
  cdescription: string;
  cdate: string;
  ctime: string;
  cmeetinglocation:string;

    constructor(private studentService: StudentService,
              public dialog: MatDialog,) {

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

    console.log(ID);

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
    let watcherId = this.getNextID(this.sessions);
    console.log(watcherId);

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
    dialogRef.afterClosed().subscribe()
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
  onJoinClick(){
    this.data.close()
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
  submitCreateSession(stitle: string, clanguage: string,cinstructor: string,cdescription: string,cdate: string,ctime: string,cmeetinglocation: string){
    console.log(stitle);
  }
}
