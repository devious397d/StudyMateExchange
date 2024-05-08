import {Component, OnInit} from '@angular/core';
import {Student} from "../../core/types/student";
import {StudentService} from "../../core/services/student.service";
import {SearchBarComponent} from "../../shared/search-bar/search-bar.component";
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
import {CdkAccordion, CdkAccordionItem} from "@angular/cdk/accordion";
import {Observable, Subscription, interval, switchMap} from 'rxjs';

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
    SearchBarComponent,
    CdkAccordion,
    CdkAccordionItem
  ],
  providers: [StudentService],
  styleUrl: 'student-table.component.css',
  templateUrl: './students-table.component.html'
})
export class StudentsTableComponent implements OnInit {
  students: Student[] = [];
  private updateSubscription: Subscription;

  constructor(public studentService: StudentService) {
  }

  ngOnInit(): void {
    //this.getUpdatedStudents()
    this.updateSubscription = interval(3000).subscribe(
      (val) => { this.getUpdatedStudents()});
    //this.getStudents();
  }
  getUpdatedStudents(text: string = '') {
    this.getStudents();
    this.students = this.studentService.allStudents;
    return this.students;
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
