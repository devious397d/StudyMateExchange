import {Component, OnInit} from '@angular/core';
import {Student} from "../../core/types/student";
import {StudentService} from "../../core/services/student.service";
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
    MatHeaderRowDef
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

  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(students => this.students = students);
  }
}
