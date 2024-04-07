import {Component, OnInit, Inject, inject} from '@angular/core';
import {StudentService} from "../../core/services/student.service";
import {StudySession} from "../../core/types/study-session";

import {
  MatGridList,
  MatGridTile
} from "@angular/material/grid-list";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {
  MatButton, MatButtonModule
} from "@angular/material/button";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-study-sessions',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    MatButton
  ],
  providers: [StudentService],
  styleUrl: 'study-sessions.compnent.css',
  templateUrl: './study-sessions.component.html',
})
export class StudySessionsComponent implements OnInit {
  sessions: StudySession[] = [];
  constructor(private studentService: StudentService,
              public dialog: MatDialog,
              private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.getSessions();
  }
  getSessions(): void {
    this.studentService.getSessions()
      .subscribe(sessions => this.sessions = sessions);

  }

  openDialog(ID:number) {

    console.log(ID);

    var newData = this.sessions.filter(object => {
      return object['id'] == ID;
    })

    console.log(newData);
    console.log(newData.map(item => {
      return item.meetinglocation
    }));

    this.dialog.open(DialogContent, {
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
}
@Component({
  selector: 'dialog-content',
  templateUrl: './dialog-content.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
})
export class DialogContent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
  onJoinClick(){
    this.data.close()
  }
}
