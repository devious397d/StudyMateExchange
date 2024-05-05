import {Component, OnInit} from '@angular/core';
import {Student} from "../../core/types/student";
import {StudentService} from "../../core/services/student.service";
import {SearchBarComponent} from "../../search-bar/search-bar.component";
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
  MatTable
} from "@angular/material/table";

@Component({
  selector: 'app-students-table',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatRow,
    MatRowDef,
    MatHeaderRow,
    MatHeaderRowDef,
    SearchBarComponent
  ],
  providers: [StudentService],
  templateUrl: './students-table.component.html'
})
export class StudentsTableComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(text: string = ''): void {
    this.studentService.getStudents(text)
      .subscribe(students => this.students = students);
  }

  receiveMessage(message: string) {
    console.log("got message");
    this.getStudents(message);
  }

}
