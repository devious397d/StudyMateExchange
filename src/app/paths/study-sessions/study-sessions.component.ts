import {Component, OnInit} from '@angular/core';
import {StudentService} from "../../core/services/student.service";
import {StudySession} from "../../core/types/study-session";

import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from "@angular/material/table";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";

@Component({
  selector: 'app-study-sessions',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    MatGridList,
    MatGridTile
  ],
  providers: [StudentService],
  styleUrl: 'study-sessions.compnent.css',
  templateUrl: './study-sessions.component.html',
})
export class StudySessionsComponent implements OnInit {
  sessions: StudySession[] = [];

  constructor(private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.getSessions();
  }

  getSessions(): void {
    this.studentService.getSessions()
      .subscribe(sessions => this.sessions = sessions);
  }
}
